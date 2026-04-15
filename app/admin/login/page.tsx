'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react'
import { MotifBackground } from '@/components/ui/MotifBackground'
import { DiamondDivider } from '@/components/ui/DiamondDivider'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Use server-side rate-limited login endpoint
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      setErrorMsg(data.error || 'Login failed')
      setIsLoading(false)
      return
    }

    // Re-sync client session after server-side login
    const supabase = createClient()
    await supabase.auth.signInWithPassword({ email, password })

    router.refresh()
    router.push('/admin/dashboard')
  }

  return (
    <div className="min-h-screen w-full flex bg-linen selection:bg-clay/20">
      {/* LEFT: Branding Display Area */}
      <div className="hidden lg:flex flex-col relative w-[55%] bg-clay overflow-hidden justify-between p-12 text-linen">
        <MotifBackground className="opacity-15 mix-blend-overlay text-night" />
        
        {/* Subtle dark gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-clay/20 via-transparent to-night/80 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 pt-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-saffron" strokeWidth={1.5} />
            <span className="font-sans text-label uppercase tracking-[0.2em] text-linen/70">
              Secure Access
            </span>
          </div>
          <h1 className="font-display font-light text-display-md md:text-display-lg max-w-xl leading-tight text-bone">
            Azarbi<br />
            <span className="text-saffron italic">Management System.</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative z-10 max-w-md pb-4"
        >
          <DiamondDivider className="mb-6 opacity-30" />
          <p className="font-sans font-light text-sm md:text-base text-bone/70 leading-relaxed">
            Manage your high-end inventory, orchestrate global shipping logic, 
            and curate the digital storefront for luxury Moroccan rugs.
          </p>
        </motion.div>
      </div>

      {/* RIGHT: Login Form Area */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 md:p-12 lg:p-24 bg-admin-bg relative">
        <div className="absolute top-0 left-0 lg:left-0 right-0 p-8 w-full flex justify-end">
           {/* Decorative corner element */}
           <div className="w-16 h-16 border-r border-t border-bone/50 absolute top-4 right-4" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[420px] bg-admin-card border border-admin-border rounded-brand p-8 md:p-10 shadow-2xl shadow-night/5 relative z-10"
        >
          <div className="mb-10 text-center flex flex-col items-center">
            {/* Mobile-only logo indicator */}
            <div className="lg:hidden mb-6 w-12 h-12 bg-clay rounded-full flex items-center justify-center">
               <ShieldCheck className="w-6 h-6 text-saffron" strokeWidth={1.5} />
            </div>
            
            <h2 className="font-display text-2xl md:text-3xl text-night mb-3">Welcome Back</h2>
            <p className="font-sans text-sm text-smoke">
              Please enter your admin credentials
            </p>
            {errorMsg && (
              <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-brand-sm text-sm font-sans animate-fade-in text-center">
                {errorMsg}
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-smoke group-focus-within:text-clay transition-colors" strokeWidth={1.5} />
                </div>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="name@azarbi.com" 
                  className="pl-11 h-12 bg-admin-bg border-admin-border focus:border-clay/60 focus:ring-1 focus:ring-clay/60 transition-all rounded-brand-sm text-night placeholder:text-smoke font-sans shadow-none"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-smoke group-focus-within:text-clay transition-colors" strokeWidth={1.5} />
                </div>
                <Input 
                  name="password"
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-11 h-12 bg-admin-bg border-admin-border focus:border-clay/60 focus:ring-1 focus:ring-clay/60 transition-all rounded-brand-sm text-night placeholder:text-smoke font-sans shadow-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm py-2">
              <label className="flex items-center gap-2 cursor-pointer font-sans text-night/80">
                <input type="checkbox" className="w-4 h-4 rounded-sm border-smoke text-clay focus:ring-clay bg-admin-bg accent-clay" />
                Remember me
              </label>
              <a href="#" className="font-sans text-smoke hover:text-clay transition-colors underline-offset-4 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-clay hover:bg-clay/90 text-linen text-label tracking-[0.1em] uppercase rounded-brand transition-all flex items-center justify-center gap-2 group shadow-none mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-linen/30 border-t-linen rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Bottom decorative motif */}
          <div className="mt-8 pt-6 border-t border-admin-border flex justify-center">
             <div className="w-1.5 h-1.5 bg-saffron rotate-45 opacity-50" />
             <div className="w-1.5 h-1.5 bg-clay rotate-45 opacity-50 mx-2" />
             <div className="w-1.5 h-1.5 bg-argane rotate-45 opacity-50" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
