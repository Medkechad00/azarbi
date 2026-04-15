import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, Settings, ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export default async function TeamAdminPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient()

  // 1. Get current logged-in admin user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/admin/login')
  }

  // 3. Server Action Update Password for current user
  async function updatePassword(formData: FormData) {
    'use server'
    await requireAdmin()
    const supabase = await createClient()
    const currentPassword = formData.get('current_password') as string
    const newPassword = formData.get('password') as string
    
    // Verify current password first
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email!,
        password: currentPassword
    })

    if (signInError) {
        redirect('/admin/team?error=invalid_password')
        return
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (!error) {
      redirect('/admin/team?msg=password_updated')
    }
  }

  // 4. Server Action Invite New Admin (Using Service Role Key to bypass active session overwrite)
  async function createAdmin(formData: FormData) {
    'use server'
    await requireAdmin(['super_admin', 'admin'])
    
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Create a Supabase client with the service role key to securely bypass RLS and session issues
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      app_metadata: { role: 'admin' } // Give them admin privileges immediately
    })

    if (!error) {
      revalidatePath('/admin/team')
    } else {
      console.error("Failed to create admin:", error.message)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display text-night">Admin & Profile</h1>
        <p className="text-sm text-smoke mt-1">Manage your account security and provision master access to new operators.</p>
      </div>

      {searchParams?.error === 'invalid_password' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          Current password is incorrect. No changes were made.
        </div>
      )}
      
      {searchParams?.msg === 'password_updated' && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 text-sm flex items-center gap-2">
          <ShieldCheck size={16} />
          Security credentials updated successfully.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Profile Settings */}
        <div className="space-y-6">
          <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
            <h2 className="text-lg font-medium text-night mb-1 flex items-center gap-2">
              <Settings size={20} className="text-[#C17A2C]" />
              My Profile
            </h2>
            <p className="text-xs text-smoke mb-6 border-b border-[#EBE6DF] pb-4">You are logged in as {user.email}</p>
            
            <form action={updatePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-night mb-1.5">Current Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
                  <input type="password" name="current_password" required placeholder="Enter current password to verify" className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6F2] border border-[#EBE6DF] rounded focus:border-[#C17A2C] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-night mb-1.5">New Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
                  <input type="password" name="password" required minLength={8} placeholder="Enter new strong password" className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6F2] border border-[#EBE6DF] rounded focus:border-[#C17A2C] outline-none" />
                </div>
                <p className="text-[10px] text-smoke mt-1">Must be at least 8 characters long.</p>
              </div>
              <button type="submit" className="px-5 py-2.5 bg-[#1C1815] text-white rounded text-sm font-medium hover:bg-black transition-colors w-full mt-2">
                Update Security Credentials
              </button>
            </form>
          </section>
        </div>

        {/* Team Provisioning */}
        <div className="space-y-6">
          <section className="bg-white p-6 md:p-8 rounded-xl border border-[#C17A2C]/20 shadow-lg shadow-[#C17A2C]/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 h-full">
              <ShieldCheck size={120} className="text-[#F8F6F2] opacity-50 -mr-8 -mt-4 transform rotate-12" />
            </div>

            <h2 className="text-lg font-medium text-night mb-1 flex items-center gap-2 relative z-10">
              <UserPlus size={20} className="text-[#C17A2C]" />
              Provision New Master Admin
            </h2>
            <p className="text-xs text-smoke mb-6 border-b border-[#EBE6DF] pb-4 relative z-10 max-w-[80%]">
              Create an encrypted master account to give another operator full CRUD access to this dashboard.
            </p>
            
            <form action={createAdmin} className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-medium text-night mb-1.5">Operator Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
                  <input type="email" name="email" required placeholder="colleague@brand.com" className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6F2] border border-[#EBE6DF] rounded focus:border-[#C17A2C] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-night mb-1.5">Temporary Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" />
                  <input type="password" name="password" required minLength={8} placeholder="Assign temporary password" className="w-full pl-10 pr-4 py-2.5 bg-[#F8F6F2] border border-[#EBE6DF] rounded focus:border-[#C17A2C] outline-none" />
                </div>
              </div>
              <button type="submit" className="px-5 py-2.5 bg-[#C17A2C] hover:bg-[#A66825] transition-colors text-white rounded text-sm font-medium w-full mt-2">
                Deploy Admin Privileges
              </button>
            </form>
          </section>
        </div>

      </div>
    </div>
  )
}
