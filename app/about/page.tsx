import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'О сервисе СпецРФ — справочник специалистов России',
  description: 'СпецРФ — бесплатный справочник проверенных специалистов по всей России. Найдите юриста, психолога, репетитора или мастера в вашем городе.',
}
export default function AboutPage() {
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'3rem 1rem'}}>
      <h1 style={{fontSize:'2rem',fontWeight:700,marginBottom:'1.5rem'}}>О сервисе СпецРФ</h1>
      <div style={{fontSize:'1rem',lineHeight:1.8,color:'#374151'}}>
        <p style={{marginBottom:'1rem'}}>
          <strong>СпецРФ</strong> — бесплатный справочник проверенных специалистов по всей России. Мы помогаем людям находить профессионалов в своём городе: юристов, психологов, репетиторов, врачей, электриков и многих других.
        </p>
        <p style={{marginBottom:'1rem'}}>
          Наша база содержит специалистов из более чем 100 городов России — от Москвы и Санкт-Петербурга до небольших региональных центров.
        </p>
        <h2 style={{fontSize:'1.25rem',fontWeight:700,margin:'2rem 0 1rem'}}>Как мы работаем</h2>
        <ul style={{paddingLeft:'1.5rem',marginBottom:'1rem'}}>
          <li style={{marginBottom:'0.5rem'}}>Собираем информацию о специалистах из открытых источников</li>
          <li style={{marginBottom:'0.5rem'}}>Публикуем реальные отзывы от клиентов</li>
          <li style={{marginBottom:'0.5rem'}}>Помогаем находить специалистов бесплатно</li>
          <li style={{marginBottom:'0.5rem'}}>Специалисты могут самостоятельно разместить профиль</li>
        </ul>
        <h2 style={{fontSize:'1.25rem',fontWeight:700,margin:'2rem 0 1rem'}}>Контакты</h2>
        <p>Email: <a href="mailto:info@specrf.ru">info@specrf.ru</a></p>
      </div>
    </div>
  )
}
