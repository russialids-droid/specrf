import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Стать специалистом на СпецРФ — разместить профиль бесплатно',
  description: 'Разместите свой профиль на СпецРФ бесплатно и получайте клиентов из поиска.',
}
export default function AddSpecialistPage() {
  return (
    <div style={{maxWidth:'700px',margin:'0 auto',padding:'3rem 1rem'}}>
      <h1 style={{fontSize:'2rem',fontWeight:700,marginBottom:'0.75rem'}}>Стать специалистом на СпецРФ</h1>
      <p style={{color:'#6b7280',fontSize:'1.125rem',marginBottom:'2rem'}}>Разместите профиль бесплатно и получайте клиентов из поиска Яндекса и Google</p>

      <div style={{display:'grid',gap:'1rem',marginBottom:'2.5rem'}}>
        {[
          {icon:'🎯', title:'Бесплатное размещение', desc:'Базовый профиль абсолютно бесплатен. Платные тарифы дают приоритет в выдаче.'},
          {icon:'📈', title:'Клиенты из поиска', desc:'Ваш профиль индексируется в Яндексе и Google. Клиенты находят вас сами.'},
          {icon:'⭐', title:'Реальные отзывы', desc:'Собирайте отзывы клиентов и повышайте рейтинг.'},
        ].map(({icon,title,desc}) => (
          <div key={title} style={{background:'#fff',border:'1px solid #f3f4f6',borderRadius:'0.75rem',padding:'1.25rem',display:'flex',gap:'1rem',alignItems:'flex-start'}}>
            <span style={{fontSize:'1.75rem'}}>{icon}</span>
            <div>
              <div style={{fontWeight:600,marginBottom:'0.25rem'}}>{title}</div>
              <div style={{fontSize:'0.875rem',color:'#6b7280'}}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{background:'#eff6ff',borderRadius:'1rem',padding:'2rem',textAlign:'center'}}>
        <h2 style={{fontSize:'1.25rem',fontWeight:700,marginBottom:'0.5rem'}}>Оставьте заявку</h2>
        <p style={{color:'#4b5563',marginBottom:'1.5rem',fontSize:'0.875rem'}}>Мы свяжемся с вами и поможем настроить профиль</p>
        <div style={{display:'flex',flexDirection:'column',gap:'0.75rem',maxWidth:'400px',margin:'0 auto'}}>
          <input type="text" placeholder="Ваше имя" style={{padding:'0.75rem 1rem',borderRadius:'0.75rem',border:'1px solid #e5e7eb',fontSize:'1rem',outline:'none'}} />
          <input type="tel" placeholder="+7 (999) 123-45-67" style={{padding:'0.75rem 1rem',borderRadius:'0.75rem',border:'1px solid #e5e7eb',fontSize:'1rem',outline:'none'}} />
          <select style={{padding:'0.75rem 1rem',borderRadius:'0.75rem',border:'1px solid #e5e7eb',fontSize:'1rem',outline:'none',color:'#374151'}}>
            <option value="">Выберите специальность</option>
            <option>Юрист</option><option>Психолог</option><option>Репетитор</option>
            <option>Бухгалтер</option><option>Электрик</option><option>Сантехник</option>
            <option>Врач</option><option>Фотограф</option><option>Другое</option>
          </select>
          <button style={{background:'#2563eb',color:'#fff',padding:'0.875rem',borderRadius:'0.75rem',border:'none',fontWeight:600,fontSize:'1rem',cursor:'pointer'}}>
            Отправить заявку
          </button>
        </div>
      </div>
    </div>
  )
}
