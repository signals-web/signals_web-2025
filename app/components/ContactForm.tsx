'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'

type FormData = {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // You'll need to set up an API route to handle this
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          to: 'grimley@sendoutsignals.com', // The email address to send to
        }),
      })

      if (!response.ok) throw new Error('Failed to send message')
      
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Failed to send message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-base md:text-[1.25rem] font-light mb-2">
          Name
        </label>
        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          id="name"
          className="w-full bg-transparent border border-signals-gray/30 p-3 text-base md:text-[1.25rem] font-light focus:outline-none focus:border-signals-red"
        />
        {errors.name && <p className="text-signals-red mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-base md:text-[1.25rem] font-light mb-2">
          Email
        </label>
        <input
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          type="email"
          id="email"
          className="w-full bg-transparent border border-signals-gray/30 p-3 text-base md:text-[1.25rem] font-light focus:outline-none focus:border-signals-red"
        />
        {errors.email && <p className="text-signals-red mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-base md:text-[1.25rem] font-light mb-2">
          Message
        </label>
        <textarea
          {...register("message", { required: "Message is required" })}
          id="message"
          rows={6}
          className="w-full bg-transparent border border-signals-gray/30 p-3 text-base md:text-[1.25rem] font-light focus:outline-none focus:border-signals-red"
        />
        {errors.message && <p className="text-signals-red mt-1">{errors.message.message}</p>}
      </div>

      {submitStatus === 'success' && (
        <p className="text-signals-navy font-light">Message sent successfully!</p>
      )}
      
      {submitStatus === 'error' && (
        <p className="text-signals-red font-light">Failed to send message. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-signals-navy text-white px-8 py-3 text-base md:text-[1.25rem] font-light hover:bg-signals-navy/90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
} 