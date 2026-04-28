import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const LeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(6).max(20),
  message: z.string().max(500).optional(),
  category_slug: z.string(),
  city_slug: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const lead = LeadSchema.parse(body)

    // Сохраняем в Supabase
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    )

    const { error } = await supabase.from('leads').insert({
      ...lead,
      created_at: new Date().toISOString(),
      source_url: req.headers.get('referer') || '',
    })

    if (error) {
      console.error('Supabase lead error:', error)
      return NextResponse.json({ error: 'DB error' }, { status: 500 })
    }

    // Уведомление на email (через Resend, если настроен)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'leads@specrf.ru',
          to: process.env.ADMIN_EMAIL || 'russia.lids@gmail.com',
          subject: `Новый лид: ${lead.name} ищет ${lead.category_slug} в ${lead.city_slug}`,
          html: `
            <h2>Новая заявка на СпецРФ</h2>
            <p><b>Имя:</b> ${lead.name}</p>
            <p><b>Телефон:</b> ${lead.phone}</p>
            <p><b>Категория:</b> ${lead.category_slug}</p>
            <p><b>Город:</b> ${lead.city_slug}</p>
            ${lead.message ? `<p><b>Сообщение:</b> ${lead.message}</p>` : ''}
          `,
        })
      } catch (emailError) {
        console.error('Email error:', emailError)
        // Не фейлим запрос если email не отправился
      }
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: e.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
