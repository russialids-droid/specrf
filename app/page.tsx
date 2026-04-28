import { CATEGORIES } from '@/data/categories'
import { CITIES } from '@/data/cities'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'СпецРФ — найти специалиста в вашем городе',
  description: 'Справочник проверенных специалистов по всей России. Юристы, психологи, репетиторы, врачи, электрики — с реальными отзывами и честными ценами.',
}

export default function HomePage() {
  const topCities = CITIES.slice(0, 16)
  const topCategories = CATEGORIES.slice(0, 20)

  return (
    <div>
      <section className="hero">
        <h1>Найдите специалиста в вашем городе</h1>
        <p>Более 50 категорий специалистов по всей России — с реальными отзывами</p>
        <div className="hero-search">
          <input type="text" placeholder="Юрист, психолог, репетитор..." />
          <button>Найти</button>
        </div>
      </section>

      <section className="padded">
        <h2 className="section-title">Категории специалистов</h2>
        <p className="section-sub">Выберите нужную специализацию</p>
        <div className="grid-5">
          {topCategories.map(cat => (
            <a key={cat.slug} href={`/${cat.slug}`} className="card" style={{textDecoration:'none'}}>
              <div className="card-icon">{cat.icon}</div>
              <div className="card-title">{cat.namePlural}</div>
              <div className="card-sub">{cat.avgPrice}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="padded bg-white">
        <div style={{maxWidth:'1152px',margin:'0 auto'}}>
          <h2 className="section-title">Популярные города</h2>
          <p className="section-sub">Специалисты в крупнейших городах России</p>
          <div className="grid-4">
            {topCities.map(city => (
              <a key={city.slug} href={`/yurist/${city.slug}`} className="city-card">
                <div className="city-icon">{city.name.slice(0,2)}</div>
                <div>
                  <div className="city-name">{city.name}</div>
                  <div className="city-region">{city.region}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="padded">
        <h2 className="section-title" style={{textAlign:'center'}}>Как найти специалиста</h2>
        <div className="steps">
          {[
            {step:'1', title:'Выберите специальность', desc:'Найдите нужную категорию специалистов — юрист, врач, репетитор и другие'},
            {step:'2', title:'Укажите город', desc:'Выберите ваш город из списка — покажем специалистов в вашем регионе'},
            {step:'3', title:'Оставьте заявку', desc:'Заполните форму — специалист свяжется с вами в течение часа'},
          ].map(({step,title,desc}) => (
            <div key={step} className="step-item">
              <div className="step-num">{step}</div>
              <div className="step-title">{title}</div>
              <p className="step-desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue">
        <h2 className="section-title">Вы специалист?</h2>
        <p style={{color:'#4b5563',marginBottom:'1.5rem'}}>Разместите профиль бесплатно и получайте клиентов из поиска</p>
        <a href="/add-specialist" className="cta-btn" style={{display:'inline-block',padding:'0.75rem 2rem',borderRadius:'0.75rem',fontWeight:600}}>
          Добавить профиль бесплатно
        </a>
      </section>
    </div>
  )
}
