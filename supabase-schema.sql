-- =============================================
-- SPECRF.RU — Supabase Database Schema
-- Выполнить в Supabase SQL Editor
-- =============================================

-- Специалисты
CREATE TABLE specialists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  city_slug TEXT NOT NULL,
  description TEXT,
  experience_years INTEGER DEFAULT 0,
  price_from INTEGER DEFAULT 0,
  price_to INTEGER DEFAULT 0,
  phone TEXT,
  email TEXT,
  photo_url TEXT,
  rating DECIMAL(3,1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  plan TEXT DEFAULT 'free', -- free | basic | pro | top
  plan_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX idx_specialists_category_city ON specialists(category_slug, city_slug);
CREATE INDEX idx_specialists_featured ON specialists(is_featured DESC, rating DESC);
CREATE INDEX idx_specialists_active ON specialists(is_active) WHERE is_active = true;

-- Лиды (заявки от пользователей)
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  category_slug TEXT NOT NULL,
  city_slug TEXT NOT NULL,
  source_url TEXT,
  status TEXT DEFAULT 'new', -- new | contacted | closed
  assigned_to UUID REFERENCES specialists(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_category_city ON leads(category_slug, city_slug);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created ON leads(created_at DESC);

-- Отзывы
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  specialist_id UUID REFERENCES specialists(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_specialist ON reviews(specialist_id);

-- Мета-данные страниц (для кастомного контента)
CREATE TABLE page_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_slug TEXT NOT NULL,
  city_slug TEXT NOT NULL,
  intro_text TEXT, -- уникальный вводный абзац, сгенерированный AI
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(category_slug, city_slug)
);

-- Аналитика (простая)
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_slug TEXT,
  city_slug TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS политики (Row Level Security)
ALTER TABLE specialists ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Публичный доступ на чтение специалистов
CREATE POLICY "Public read specialists" ON specialists
  FOR SELECT USING (is_active = true);

-- Публичный доступ на чтение контента страниц
CREATE POLICY "Public read page_content" ON page_content
  FOR SELECT USING (true);

-- Публичный доступ на чтение отзывов
CREATE POLICY "Public read reviews" ON reviews
  FOR SELECT USING (true);

-- Только service_role может создавать лиды
CREATE POLICY "Service insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Триггер: обновление рейтинга при добавлении отзыва
CREATE OR REPLACE FUNCTION update_specialist_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE specialists
  SET
    rating = (SELECT AVG(rating) FROM reviews WHERE specialist_id = NEW.specialist_id),
    reviews_count = (SELECT COUNT(*) FROM reviews WHERE specialist_id = NEW.specialist_id)
  WHERE id = NEW.specialist_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_rating
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_specialist_rating();

-- Тестовые данные
INSERT INTO specialists (name, category_slug, city_slug, description, experience_years, price_from, price_to, rating, reviews_count, is_featured, is_verified) VALUES
('Александр Петров', 'yurist', 'moskva', 'Специализируюсь на семейном и гражданском праве. Более 200 успешных дел.', 8, 2000, 5000, 4.9, 47, true, true),
('Ирина Смирнова', 'yurist', 'moskva', 'Юрист по недвижимости и корпоративному праву. Работаю с физическими и юридическими лицами.', 12, 3000, 8000, 4.8, 63, true, true),
('Дмитрий Козлов', 'psiholog', 'sanklt-peterburg', 'Когнитивно-поведенческая терапия, работа с тревогой и депрессией.', 6, 2500, 4000, 4.7, 31, false, true),
('Наталья Иванова', 'repetitor', 'novosibirsk', 'Репетитор по математике, подготовка к ЕГЭ и ОГЭ. Гарантия результата.', 5, 800, 1500, 4.9, 28, false, true);
