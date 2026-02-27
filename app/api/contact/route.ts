import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not defined')
      return NextResponse.json({ error: 'Mail service not configured' }, { status: 500 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const body = await request.json()
    const { name, email, message } = body

    const { data, error } = await resend.emails.send({
      from: 'Signals Web <grimley@sendoutsignals.com>',
      to: ['grimley@sendoutsignals.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json({ error: `Resend error: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err: any) {
    console.error('Failed to process contact form:', err)
    return NextResponse.json(
      { error: `Internal error: ${err.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
} 