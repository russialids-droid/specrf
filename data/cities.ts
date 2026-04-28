export interface City {
  slug: string
  name: string
  nameRod: string // родительный падеж: "в Москве" → "Москвы"
  namePred: string // предложный падеж: "в Москве"
  region: string
  population: number
  lat: number
  lng: number
}

export const CITIES: City[] = [
  { slug: 'moskva', name: 'Москва', nameRod: 'Москвы', namePred: 'Москве', region: 'Москва', population: 12692466, lat: 55.7558, lng: 37.6173 },
  { slug: 'sankt-peterburg', name: 'Санкт-Петербург', nameRod: 'Санкт-Петербурга', namePred: 'Санкт-Петербурге', region: 'Санкт-Петербург', population: 5601911, lat: 59.9311, lng: 30.3609 },
  { slug: 'novosibirsk', name: 'Новосибирск', nameRod: 'Новосибирска', namePred: 'Новосибирске', region: 'Новосибирская область', population: 1633595, lat: 54.9833, lng: 82.8964 },
  { slug: 'ekaterinburg', name: 'Екатеринбург', nameRod: 'Екатеринбурга', namePred: 'Екатеринбурге', region: 'Свердловская область', population: 1544376, lat: 56.8389, lng: 60.6057 },
  { slug: 'kazan', name: 'Казань', nameRod: 'Казани', namePred: 'Казани', region: 'Республика Татарстан', population: 1308660, lat: 55.8304, lng: 49.0661 },
  { slug: 'nizhniy-novgorod', name: 'Нижний Новгород', nameRod: 'Нижнего Новгорода', namePred: 'Нижнем Новгороде', region: 'Нижегородская область', population: 1228199, lat: 56.2965, lng: 43.9361 },
  { slug: 'chelyabinsk', name: 'Челябинск', nameRod: 'Челябинска', namePred: 'Челябинске', region: 'Челябинская область', population: 1196680, lat: 55.1644, lng: 61.4368 },
  { slug: 'samara', name: 'Самара', nameRod: 'Самары', namePred: 'Самаре', region: 'Самарская область', population: 1163897, lat: 53.2028, lng: 50.1606 },
  { slug: 'ufa', name: 'Уфа', nameRod: 'Уфы', namePred: 'Уфе', region: 'Республика Башкортостан', population: 1144809, lat: 54.7388, lng: 55.9721 },
  { slug: 'rostov-na-donu', name: 'Ростов-на-Дону', nameRod: 'Ростова-на-Дону', namePred: 'Ростове-на-Дону', region: 'Ростовская область', population: 1142680, lat: 47.2357, lng: 39.7015 },
  { slug: 'krasnodar', name: 'Краснодар', nameRod: 'Краснодара', namePred: 'Краснодаре', region: 'Краснодарский край', population: 1097879, lat: 45.0328, lng: 38.9769 },
  { slug: 'omsk', name: 'Омск', nameRod: 'Омска', namePred: 'Омске', region: 'Омская область', population: 1154507, lat: 54.9924, lng: 73.3686 },
  { slug: 'krasnoyarsk', name: 'Красноярск', nameRod: 'Красноярска', namePred: 'Красноярске', region: 'Красноярский край', population: 1188747, lat: 56.0153, lng: 92.8932 },
  { slug: 'voronezh', name: 'Воронеж', nameRod: 'Воронежа', namePred: 'Воронеже', region: 'Воронежская область', population: 1058261, lat: 51.6755, lng: 39.2088 },
  { slug: 'perm', name: 'Пермь', nameRod: 'Перми', namePred: 'Перми', region: 'Пермский край', population: 1025275, lat: 58.0105, lng: 56.2502 },
  { slug: 'volgograd', name: 'Волгоград', nameRod: 'Волгограда', namePred: 'Волгограде', region: 'Волгоградская область', population: 1028036, lat: 48.7080, lng: 44.5133 },
  { slug: 'saratov', name: 'Саратов', nameRod: 'Саратова', namePred: 'Саратове', region: 'Саратовская область', population: 909996, lat: 51.5936, lng: 46.0303 },
  { slug: 'tyumen', name: 'Тюмень', nameRod: 'Тюмени', namePred: 'Тюмени', region: 'Тюменская область', population: 848553, lat: 57.1553, lng: 65.5617 },
  { slug: 'tolyatti', name: 'Тольятти', nameRod: 'Тольятти', namePred: 'Тольятти', region: 'Самарская область', population: 707344, lat: 53.5303, lng: 49.3461 },
  { slug: 'izhevsk', name: 'Ижевск', nameRod: 'Ижевска', namePred: 'Ижевске', region: 'Удмуртская Республика', population: 646468, lat: 56.8526, lng: 53.2068 },
  { slug: 'barnaul', name: 'Барнаул', nameRod: 'Барнаула', namePred: 'Барнауле', region: 'Алтайский край', population: 644687, lat: 53.3606, lng: 83.7636 },
  { slug: 'ulyanovsk', name: 'Ульяновск', nameRod: 'Ульяновска', namePred: 'Ульяновске', region: 'Ульяновская область', population: 635947, lat: 54.3282, lng: 48.3866 },
  { slug: 'irkutsk', name: 'Иркутск', nameRod: 'Иркутска', namePred: 'Иркутске', region: 'Иркутская область', population: 617474, lat: 52.2855, lng: 104.2890 },
  { slug: 'khabarovsk', name: 'Хабаровск', nameRod: 'Хабаровска', namePred: 'Хабаровске', region: 'Хабаровский край', population: 610305, lat: 48.4827, lng: 135.0838 },
  { slug: 'vladivostok', name: 'Владивосток', nameRod: 'Владивостока', namePred: 'Владивостоке', region: 'Приморский край', population: 600871, lat: 43.1155, lng: 131.8855 },
  { slug: 'yaroslavl', name: 'Ярославль', nameRod: 'Ярославля', namePred: 'Ярославле', region: 'Ярославская область', population: 599039, lat: 57.6261, lng: 39.8845 },
  { slug: 'makhachkala', name: 'Махачкала', nameRod: 'Махачкалы', namePred: 'Махачкале', region: 'Республика Дагестан', population: 621489, lat: 42.9849, lng: 47.5047 },
  { slug: 'tomsk', name: 'Томск', nameRod: 'Томска', namePred: 'Томске', region: 'Томская область', population: 580678, lat: 56.4977, lng: 84.9744 },
  { slug: 'orenburg', name: 'Оренбург', nameRod: 'Оренбурга', namePred: 'Оренбурге', region: 'Оренбургская область', population: 564443, lat: 51.7879, lng: 55.0988 },
  { slug: 'kemerovo', name: 'Кемерово', nameRod: 'Кемерово', namePred: 'Кемерово', region: 'Кемеровская область', population: 556382, lat: 55.3908, lng: 86.0517 },
  { slug: 'novokuznetsk', name: 'Новокузнецк', nameRod: 'Новокузнецка', namePred: 'Новокузнецке', region: 'Кемеровская область', population: 539655, lat: 53.7557, lng: 87.1099 },
  { slug: 'ryazan', name: 'Рязань', nameRod: 'Рязани', namePred: 'Рязани', region: 'Рязанская область', population: 539290, lat: 54.6269, lng: 39.6916 },
  { slug: 'astrakhan', name: 'Астрахань', nameRod: 'Астрахани', namePred: 'Астрахани', region: 'Астраханская область', population: 532504, lat: 46.3497, lng: 48.0408 },
  { slug: 'penza', name: 'Пенза', nameRod: 'Пензы', namePred: 'Пензе', region: 'Пензенская область', population: 516823, lat: 53.1959, lng: 45.0183 },
  { slug: 'lipetsk', name: 'Липецк', nameRod: 'Липецка', namePred: 'Липецке', region: 'Липецкая область', population: 503957, lat: 52.6031, lng: 39.5708 },
  { slug: 'kirov', name: 'Киров', nameRod: 'Кирова', namePred: 'Кирове', region: 'Кировская область', population: 499688, lat: 58.5966, lng: 49.6562 },
  { slug: 'cheboksary', name: 'Чебоксары', nameRod: 'Чебоксар', namePred: 'Чебоксарах', region: 'Чувашская Республика', population: 496386, lat: 56.1439, lng: 47.2489 },
  { slug: 'tula', name: 'Тула', nameRod: 'Тулы', namePred: 'Туле', region: 'Тульская область', population: 491279, lat: 54.1961, lng: 37.6182 },
  { slug: 'kursk', name: 'Курск', nameRod: 'Курска', namePred: 'Курске', region: 'Курская область', population: 452976, lat: 51.7304, lng: 36.1938 },
  { slug: 'ulan-ude', name: 'Улан-Удэ', nameRod: 'Улан-Удэ', namePred: 'Улан-Удэ', region: 'Республика Бурятия', population: 435400, lat: 51.8272, lng: 107.6065 },
  { slug: 'stavropol', name: 'Ставрополь', nameRod: 'Ставрополя', namePred: 'Ставрополе', region: 'Ставропольский край', population: 450680, lat: 45.0440, lng: 41.9734 },
  { slug: 'ulyanovsk-2', name: 'Тверь', nameRod: 'Твери', namePred: 'Твери', region: 'Тверская область', population: 424969, lat: 56.8587, lng: 35.9176 },
  { slug: 'magnitogorsk', name: 'Магнитогорск', nameRod: 'Магнитогорска', namePred: 'Магнитогорске', region: 'Челябинская область', population: 413253, lat: 53.4028, lng: 59.0469 },
  { slug: 'ivanovo', name: 'Иваново', nameRod: 'Иванова', namePred: 'Иванове', region: 'Ивановская область', population: 400770, lat: 57.0004, lng: 40.9739 },
  { slug: 'bryansk', name: 'Брянск', nameRod: 'Брянска', namePred: 'Брянске', region: 'Брянская область', population: 399244, lat: 53.2434, lng: 34.3640 },
  { slug: 'sochi', name: 'Сочи', nameRod: 'Сочи', namePred: 'Сочи', region: 'Краснодарский край', population: 466656, lat: 43.6028, lng: 39.7342 },
  { slug: 'surgut', name: 'Сургут', nameRod: 'Сургута', namePred: 'Сургуте', region: 'Ханты-Мансийский АО', population: 401754, lat: 61.2540, lng: 73.3964 },
  { slug: 'vladikavkaz', name: 'Владикавказ', nameRod: 'Владикавказа', namePred: 'Владикавказе', region: 'Республика Северная Осетия', population: 307676, lat: 43.0235, lng: 44.6820 },
  { slug: 'arkhangelsk', name: 'Архангельск', nameRod: 'Архангельска', namePred: 'Архангельске', region: 'Архангельская область', population: 331526, lat: 64.5401, lng: 40.5433 },
  { slug: 'chita', name: 'Чита', nameRod: 'Читы', namePred: 'Чите', region: 'Забайкальский край', population: 339597, lat: 52.0339, lng: 113.4994 },
  { slug: 'kaliningrad', name: 'Калининград', nameRod: 'Калининграда', namePred: 'Калининграде', region: 'Калининградская область', population: 489359, lat: 54.7065, lng: 20.5110 },
]

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug)
}
