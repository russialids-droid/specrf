import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Политика конфиденциальности — СпецРФ',
  description: 'Политика конфиденциальности сервиса СпецРФ.',
}
export default function PrivacyPage() {
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'3rem 1rem'}}>
      <h1 style={{fontSize:'2rem',fontWeight:700,marginBottom:'1.5rem'}}>Политика конфиденциальности</h1>
      <div style={{fontSize:'1rem',lineHeight:1.8,color:'#374151'}}>
        <p style={{marginBottom:'1rem'}}>Дата вступления в силу: 28 апреля 2026 года</p>
        <h2 style={{fontSize:'1.25rem',fontWeight:700,margin:'2rem 0 1rem'}}>1. Сбор данных</h2>
        <p style={{marginBottom:'1rem'}}>Мы собираем только те данные, которые вы добровольно предоставляете при заполнении формы заявки: имя и номер телефона. Эти данные используются исключительно для связи специалиста с вами.</p>
        <h2 style={{fontSize:'1.25rem',fontWeight:700,margin:'2rem 0 1rem'}}>2. Использование данных</h2>
        <p style={{marginBottom:'1rem'}}>Ваши контактные данные передаются специалисту, которому адресована заявка. Мы не продаём и не передаём ваши данные третьим лицам в маркетинговых целях.</p>
        <h2 style={{fontSize:'1.25rem',fontWeight:700,margin:'2rem 0 1rem'}}>3. Cookie</h2>
        <p style={{marginBottom:'1rem'}}>Сайт использует технические cookie для корректной работы. Аналитические cookie не используются.</p>
        <h2 style={{fontSize:'1.25rem',fontWeight:700,margin:'2rem 0 1rem'}}>4. Контакты</h2>
        <p>По вопросам конфиденциальности: <a href="mailto:info@specrf.ru">info@specrf.ru</a></p>
      </div>
    </div>
  )
}
