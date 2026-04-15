import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Save, Settings, CheckCircle2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'

export default async function SettingsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams
  const supabase = await createClient()

  // 1. Fetch current settings
  // It has id = 1 from our migrations
  const { data: settings } = await supabase
    .from('platform_settings')
    .select('*')
    .eq('id', 1)
    .single()

  // Fallback defaults in case migration just ran and empty row isn't there yet somehow
  const currentSettings = settings || {
    contact_email: '',
    whatsapp_number: '',
    instagram_handle: '',
    location_address: '',
    support_snippet: ''
  }

  // 2. Server Action to Update
  async function updateSettings(formData: FormData) {
    'use server'
    await requireAdmin()
    const supabase = await createClient()

    const payload = {
      contact_email: formData.get('contact_email') as string,
      whatsapp_number: formData.get('whatsapp_number') as string,
      instagram_handle: formData.get('instagram_handle') as string,
      location_address: formData.get('location_address') as string,
      support_snippet: formData.get('support_snippet') as string,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('platform_settings')
      .upsert({ id: 1, ...payload })

    if (!error) {
      revalidatePath('/', 'layout') // Revalidate entire layout to refresh footers/contact info globally
      redirect('/admin/settings?saved=true')
    } else {
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-display text-night flex items-center gap-2">
            <Settings size={24} className="text-[#C17A2C]" />
            Global Platform Settings
          </h1>
          <p className="text-sm text-smoke mt-1">Manage all public-facing contact information and footer links globally from here.</p>
        </div>
      </div>

      {searchParams?.saved === 'true' && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md border border-green-200 text-sm flex items-center gap-2">
          <CheckCircle2 size={16} />
          Settings saved successfully. Changes are now live across the entire website.
        </div>
      )}

      <form action={updateSettings} className="space-y-6">
        
        {/* Core Info */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Official Support Email</label>
              <input type="email" name="contact_email" defaultValue={currentSettings.contact_email} required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" placeholder="hello@brand.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">WhatsApp Link / Number</label>
              <input type="text" name="whatsapp_number" defaultValue={currentSettings.whatsapp_number} required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" placeholder="e.g. +212 600..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Instagram URL or Handle</label>
              <input type="text" name="instagram_handle" defaultValue={currentSettings.instagram_handle} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" placeholder="@azarbi.rugs" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Physical HQ Address</label>
              <input type="text" name="location_address" defaultValue={currentSettings.location_address} required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" placeholder="Atlas Mountains, Morocco" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-night mb-1.5">Support SLA Snippet</label>
              <input type="text" name="support_snippet" defaultValue={currentSettings.support_snippet} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" placeholder="We respond within 24 hours, Monday–Friday." />
              <p className="text-xs text-smoke mt-1.5">This tiny sentence displays on the Contact Us page below the email module.</p>
            </div>
          </div>
        </section>

        <div className="sticky bottom-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-[#EBE6DF] shadow-lg flex items-center justify-end z-10">
          <button type="submit" className="flex items-center gap-2 bg-[#1C1815] hover:bg-black text-white px-8 py-3 rounded-sm text-sm font-medium transition-transform active:scale-95 shadow-md">
            <Save size={18} />
            Publish Global Settings
          </button>
        </div>
      </form>
    </div>
  )
}
