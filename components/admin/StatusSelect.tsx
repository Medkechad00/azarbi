'use client'

import { useRef } from 'react'

interface StatusSelectProps {
  currentStatus: string
  enquiryId: string
  action: (formData: FormData) => Promise<void>
}

const statusStyles: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  quoted: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-green-50 text-green-700 border-green-200',
  declined: 'bg-red-50 text-red-600 border-red-200',
}

export function StatusSelect({ currentStatus, enquiryId, action }: StatusSelectProps) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={action}>
      <input type="hidden" name="id" value={enquiryId} />
      <select
        name="status"
        defaultValue={currentStatus}
        onChange={() => formRef.current?.requestSubmit()}
        className={`text-xs font-medium capitalize px-2 py-1 rounded border cursor-pointer outline-none ${statusStyles[currentStatus] || 'bg-[#F8F6F2] text-smoke border-[#EBE6DF]'}`}
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="quoted">Quoted</option>
        <option value="confirmed">Confirmed</option>
        <option value="declined">Declined</option>
      </select>
    </form>
  )
}
