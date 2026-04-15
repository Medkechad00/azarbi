'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <section className="py-32 bg-night text-linen border-t border-linen/10 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Title & description */}
          <div>
            <span className="text-label-sm text-smoke uppercase tracking-widest mb-4 block">Newsletter</span>
            <h2 className="font-display text-4xl md:text-5xl text-linen mb-6">
              The Atlas dispatch.
            </h2>
            <p className="text-smoke text-lg leading-relaxed">
              Join our journal. We send rare dispatches on new arrivals, stories from the cooperatives, 
              and early access to one-of-a-kind pieces.
            </p>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-linen/5 border border-linen/10 rounded-brand p-8 lg:p-10 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label htmlFor="newsletter-email" className="text-label-sm uppercase tracking-widest text-smoke block mb-2">
                    Email Address
                  </label>
                  <Input 
                    id="newsletter-email"
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-transparent border border-linen/20 text-linen placeholder:text-smoke/40 rounded-brand px-4 py-3 focus:border-clay focus:outline-none transition-colors"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className="btn-primary h-12 w-full bg-clay hover:bg-clay/90 text-linen border-0"
                >
                  {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Welcome to the collective ✓' : 'Subscribe'}
                </button>
              </form>

              {status !== 'success' && (
                <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 text-[12px] text-smoke">
                  <div className="flex items-center gap-2">
                    <span className="text-clay">✓</span>
                    <span>New arrivals first</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-clay">✓</span>
                    <span>Weaver stories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-clay">✓</span>
                    <span>No spam, ever</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
