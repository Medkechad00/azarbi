'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function BespokeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/bespoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()
      
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <h4 className="font-display text-2xl text-night mb-4">Enquiry Received</h4>
        <p className="text-smoke">Thank you. Our bespoke team will review your specifications and contact you within 48 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-label-sm uppercase tracking-widest text-smoke mb-2 block">Name *</label>
          <Input name="name" required className="w-full bg-linen border-bone2" />
        </div>
        <div>
          <label className="text-label-sm uppercase tracking-widest text-smoke mb-2 block">Email *</label>
          <Input type="email" name="email" required className="w-full bg-linen border-bone2" />
        </div>
      </div>

      <div>
        <label className="text-label-sm uppercase tracking-widest text-smoke mb-2 block">Category Preference</label>
        <select name="category_pref" className="w-full bg-linen border border-bone2 rounded-brand px-4 py-3 font-sans text-night focus:outline-none focus:border-clay">
          <option value="beni_ourain">Beni Ourain (Geometric, High-pile)</option>
          <option value="azilal">Azilal (Abstract, Mid-pile)</option>
          <option value="kilim">Kilim (Flat-weave)</option>
          <option value="boucherouite">Boucherouite (Recycled)</option>
          <option value="unsure">Unsure / Need Advice</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-label-sm uppercase tracking-widest text-smoke mb-2 block">Width (cm)</label>
          <Input type="number" name="width_cm" placeholder="e.g. 200" className="w-full bg-linen border-bone2" />
        </div>
        <div>
          <label className="text-label-sm uppercase tracking-widest text-smoke mb-2 block">Length (cm)</label>
          <Input type="number" name="length_cm" placeholder="e.g. 300" className="w-full bg-linen border-bone2" />
        </div>
      </div>

      <div>
        <label className="text-label-sm uppercase tracking-widest text-smoke mb-2 block">Message / Design Vision *</label>
        <textarea 
          name="message" 
          required 
          rows={4} 
          className="w-full bg-linen border border-bone2 rounded-brand px-4 py-3 font-sans text-night focus:outline-none focus:border-clay resize-none"
          placeholder="Describe your room, colors, patterns, and what you're looking for..."
        />
      </div>

      {status === 'error' && (
        <p className="text-clay text-sm">An error occurred. Please try again or email us directly.</p>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full justify-center mt-2 h-14">
        {status === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
      </Button>
    </form>
  )
}
