import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Privacy Policy — Azarbi',
  description: 'How Azarbi collects, uses, and protects your personal data.',
}

const sections = [
  {
    num: '01',
    title: 'Information We Collect',
    content: [
      { label: 'Personal Information', text: 'Name, email address, phone number, and shipping address — provided voluntarily when you contact us, subscribe to our newsletter, or submit an enquiry.' },
      { label: 'Usage Data', text: 'Browser type, IP address, pages visited, time spent on site, and referring URL — collected automatically to help improve your experience.' },
      { label: 'Cookies', text: 'Small data files stored on your device to remember preferences and provide a smoother browsing experience.' },
    ],
  },
  {
    num: '02',
    title: 'How We Use Your Data',
    content: [
      { label: 'Communication', text: 'Responding to enquiries, bespoke commission requests, and trade applications.' },
      { label: 'Marketing', text: 'Sending newsletter updates — only if you explicitly opt in. You can unsubscribe at any time.' },
      { label: 'Improvement', text: 'Analysing website usage patterns to optimise design, content, and performance.' },
      { label: 'Compliance', text: 'Meeting legal obligations under applicable data protection laws.' },
    ],
  },
  {
    num: '03',
    title: 'Third-Party Services',
    content: [
      { label: 'Supabase', text: 'Database and authentication hosting (EU region).' },
      { label: 'Vercel', text: 'Website hosting and edge network delivery.' },
      { label: 'Etsy / eBay', text: 'Marketplace partners where purchases are completed, subject to their own privacy policies.' },
      { label: 'Analytics', text: 'Anonymous usage analytics to understand traffic patterns.' },
    ],
  },
  {
    num: '04',
    title: 'Your Rights',
    content: [
      { label: 'Access & Portability', text: 'Request a copy of your data or receive it in a portable format.' },
      { label: 'Correction & Deletion', text: 'Update inaccurate information or request full deletion of your data.' },
      { label: 'Withdraw Consent', text: 'Revoke consent for data processing at any time.' },
      { label: 'Complaints', text: 'Lodge a complaint with your local data protection supervisory authority.' },
    ],
  },
  {
    num: '05',
    title: 'Security & Retention',
    content: [
      { label: 'Protection', text: 'We implement industry-standard measures including HTTPS encryption, secure databases, and restricted access controls.' },
      { label: 'Retention Period', text: 'Personal data is retained only as long as necessary to fulfil the purposes described above, or as required by law.' },
      { label: 'Transparency', text: 'This policy may be updated periodically. Changes are posted here with a revised date.' },
    ],
  },
]

export default async function PrivacyPolicyPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('platform_settings').select('contact_email').eq('id', 1).single()
  const email = settings?.contact_email || 'hello@azarbi.com'
  return (
    <div className="bg-linen min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-6 lg:px-12">

        <p className="text-label uppercase tracking-[0.1em] text-smoke mb-4">Legal</p>
        <h1 className="font-display text-display-xl text-night mb-4">Privacy Policy</h1>
        <p className="text-smoke mb-16">Last updated: March 2026</p>

        {/* Statement banner */}
        <div className="bg-argane/10 border border-argane/20 rounded-brand p-8 lg:p-10 mb-16">
          <p className="font-display text-xl text-night leading-relaxed">
            We believe in full transparency. Azarbi <strong>never sells</strong> your personal data 
            to third parties. Your information is used solely to improve your experience 
            and fulfil your requests.
          </p>
        </div>

        {/* Sections grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section) => (
            <div key={section.num} className="bg-bone/30 rounded-brand border border-bone2 p-8 lg:p-10 flex flex-col">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-bone2">
                <span className="font-mono text-3xl text-clay/60">{section.num}</span>
                <h2 className="font-display text-xl text-night">{section.title}</h2>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                {section.content.map((item) => (
                  <div key={item.label}>
                    <span className="text-label-sm uppercase tracking-widest text-night block mb-1">{item.label}</span>
                    <p className="text-sm text-smoke leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-bone2">
          <div>
            <h3 className="font-display text-lg text-night mb-1">Questions about your data?</h3>
            <p className="text-sm text-smoke">We&apos;re happy to help with any privacy-related enquiries.</p>
          </div>
          <a href={`mailto:${email}`} className="btn-secondary">{email}</a>
        </div>

      </div>
    </div>
  )
}
