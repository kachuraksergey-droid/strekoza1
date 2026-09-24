import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const root = __dirname;
// Контент сайту: ціни, майстри, напрямки, відгуки, контакти
const site = {
 "phone": "067 174 78 68",
 "phoneHref": "tel:+380671747868",
 "address": "м. Трускавець, вул. Героїв УПА, 3",
 "booking": "https://w65318.alteg.io/",
 "google": "https://www.google.com/maps/search/%D0%A1%D1%82%D1%80%D0%B5%D0%BA%D0%BE%D0%B7%D0%B0+%D0%A2%D1%80%D1%83%D1%81%D0%BA%D0%B0%D0%B2%D0%B5%D1%86%D1%8C",
 "directions": [
  {
   "num": "01",
   "name": "Трихологія",
   "desc": "Лікування алопеції та порідіння волосся у жінок і чоловіків.",
   "mdesc": "Лікування алопеції та порідіння волосся у жінок і чоловіків.",
   "img": "dir-trichology",
   "pos": "center 40%",
   "href": "404.html"
  },
  {
   "num": "02",
   "name": "Дерматологія",
   "desc": "Запорукою краси є не тільки красива, але і здорова шкіра.",
   "mdesc": "Запорукою краси є не тільки красива, але і здорова шкіра.",
   "img": "dir-dermatology",
   "pos": "center 40%",
   "href": "404.html"
  },
  {
   "num": "03",
   "name": "Естетична косметологія",
   "desc": "Від AI-діагностики стану шкіри до доглядових, апаратних та ін’єкційних процедур. Методики підбираємо індивідуально.",
   "mdesc": "Від AI-діагностики стану шкіри до доглядових, апаратних та ін’єкційних процедур.",
   "img": "dir-aesthetic",
   "pos": "center 30%",
   "href": "404.html"
  },
  {
   "num": "04",
   "name": "Ін’єкційна косметологія",
   "desc": "Корекція об’ємів, мімічної активності та якості шкіри — з природним результатом.",
   "mdesc": "Корекція об’ємів, мімічної активності та якості шкіри — з природним результатом.",
   "img": "dir-injection",
   "pos": "center 40%",
   "href": "404.html"
  },
  {
   "num": "05",
   "name": "Лазерна епіляція",
   "desc": "Лазерна епіляція, IPL, лазерне шліфування, лікування судин і пігментації.",
   "mdesc": "Лазерна епіляція, IPL, лазерне шліфування, лікування судин і пігментації.",
   "img": "dir-laser",
   "pos": "center 60%",
   "href": "404.html"
  },
  {
   "num": "06",
   "name": "Тіло",
   "desc": "Корекція фігури, апаратні методики, масаж і догляд за тілом.",
   "mdesc": "Корекція фігури, апаратні методики, масаж і догляд за тілом.",
   "img": "dir-body",
   "pos": "center 30%",
   "href": "404.html"
  },
  {
   "num": "07",
   "name": "Нігтьовий сервіс",
   "desc": "Від класичного покриття до складного дизайну — акуратно й безпечно.",
   "mdesc": "Від класичного покриття до складного дизайну — акуратно й безпечно.",
   "img": "dir-nails",
   "pos": "center 55%",
   "href": "nigtovyi-servis.html"
  }
 ],
 "brands": [
  {
   "text": "Institut<br>Esthederm"
  },
  {
   "img": "brand-isclinical.png",
   "alt": "iS Clinical"
  },
  {
   "text": "BELOTERO",
   "caps": true
  },
  {
   "img": "brand-mediceuticals.png",
   "alt": "Mediceuticals"
  },
  {
   "img": "brand-duso.png",
   "alt": "DUSO"
  },
  {
   "img": "brand-xeomin.png",
   "alt": "Xeomin"
  },
  {
   "img": "brand-vivace.png",
   "alt": "Vivace"
  },
  {
   "img": "brand-hydrafacial.png",
   "alt": "HydraFacial"
  }
 ],
 "reviews": [
  {
   "quote": "Тут себе почуваєш в надійних руках спеціалістів",
   "name": "Ірина",
   "tag": "Косметологія · масаж",
   "text": "Вражена наданням послуг спеціалістами даного закладу, щиро вдячна косметологу п. Оксані, за масаж Марійці, отримала приємні враження і відчуття, наступного разу прийду саме сюди. Рекомендую для відвідування саме Стрекозу, тут себе почуваєш в надійних руках спеціалістів, які не нав’язують послуги, а пропонують вибрати, що саме тобі підходить, в усьому відчувається професіоналізм і індивідуальність. Щиро вдячна усім співробітникам!"
  },
  {
   "quote": "Це справжній оазис релаксу",
   "name": "Ольга",
   "tag": "Масаж",
   "text": "Масаж був професійним і дуже розслабляючим. Атмосфера спокою та гармонії. Після відвідування почуваюся оновленою."
  }
 ],
 "team": [
  {
   "img": "team-shopiak",
   "name": "Оксана Шоп’як",
   "role": "Лікар дерматолог, дерматохірург",
   "group": "Дерматологія"
  },
  {
   "img": "team-kovalchuk",
   "name": "Ірина Ковальчук",
   "role": "Косметолог",
   "group": "Косметологія"
  },
  {
   "img": "team-kunovska",
   "name": "Ірина Куновська",
   "role": "Спеціаліст з лазерних технологій",
   "group": "Лазерні технології"
  },
  {
   "img": "team-gerda",
   "name": "Марія Герда",
   "role": "Спеціаліст з лазерних технологій",
   "group": "Лазерні технології"
  },
  {
   "img": "team-onysko",
   "name": "Марія Онисько",
   "role": "Естетист по догляду за тілом",
   "group": "Тіло"
  },
  {
   "img": "team-lishchynska",
   "name": "Оля Ліщинська",
   "role": "Естетист по догляду за тілом",
   "group": "Тіло"
  },
  {
   "img": "team-kliushnyk",
   "name": "Оксана Клюшник",
   "role": "Естетист по догляду за тілом",
   "group": "Тіло"
  },
  {
   "img": "team-tsibere",
   "name": "Анна Цібере",
   "role": "Естетист по догляду за тілом",
   "group": "Тіло"
  },
  {
   "img": "team-dydyk",
   "name": "Вероніка Дидик",
   "role": "Майстер нігтьового сервісу",
   "group": "Нігтьовий сервіс"
  },
  {
   "img": "team-pyliak",
   "name": "Анастасія Пиляк",
   "role": "Майстер нігтьового сервісу",
   "group": "Нігтьовий сервіс"
  },
  {
   "img": "team-andrusyk",
   "name": "Каміла Андрусик",
   "role": "Майстер нігтьового сервісу",
   "group": "Нігтьовий сервіс"
  }
 ],
 "teamGroups": [
  "Усі",
  "Дерматологія",
  "Косметологія",
  "Лазерні технології",
  "Тіло",
  "Нігтьовий сервіс"
 ],
 "nailPrices": [
  {
   "name": "Манікюр",
   "count": "06 послуг",
   "rows": [
    {
     "ix": "01",
     "name": "Манікюр апаратний / комбінований",
     "note": "",
     "dur": "45–60 хв",
     "price": "450 грн"
    },
    {
     "ix": "02",
     "name": "Манікюр + відновлення нігтів японською технікою",
     "note": "",
     "dur": "60–80 хв",
     "price": "550 грн"
    },
    {
     "ix": "03",
     "name": "Манікюр + зняття лак-гелю без подальшого покриття + випил форми",
     "note": "",
     "dur": "до 90 хв",
     "price": "550 грн"
    },
    {
     "ix": "04",
     "name": "Манікюр + покриття гель-лаком",
     "note": "",
     "dur": "до 90 хв",
     "price": "700 грн"
    },
    {
     "ix": "05",
     "name": "Манікюр + зняття лак-гелю + покриття гель-лаком / база",
     "note": "",
     "dur": "до 90 хв",
     "price": "750 грн"
    },
    {
     "ix": "06",
     "name": "Манікюр + зняття + покриття «френч»",
     "note": "",
     "dur": "90 хв",
     "price": "850 грн"
    }
   ],
   "open": true
  },
  {
   "name": "Нарощування",
   "count": "05 послуг",
   "rows": [
    {
     "ix": "07",
     "name": "Гелеве нарощування нігтів",
     "note": "Манікюр і однотонне покриття входять у вартість.",
     "dur": "2 год 30 хв",
     "price": "900–1000 грн"
    },
    {
     "ix": "08",
     "name": "Корекція гелевих нігтів",
     "note": "Манікюр і покриття входять у вартість.",
     "dur": "2 год",
     "price": "850–900 грн"
    },
    {
     "ix": "09",
     "name": "Нарощення 1 нігтя",
     "note": "",
     "dur": "до 30 хв",
     "price": "100 грн"
    },
    {
     "ix": "10",
     "name": "Ремонт 1 нігтя",
     "note": "Гель-лак / гель.",
     "dur": "до 30 хв",
     "price": "50 грн"
    },
    {
     "ix": "11",
     "name": "Зняття нарощених нігтів",
     "note": "",
     "dur": "60 хв",
     "price": "275 грн"
    }
   ],
   "open": false
  },
  {
   "name": "Покриття та догляд",
   "count": "08 послуг",
   "rows": [
    {
     "ix": "12",
     "name": "Покриття гель-лак в один тон / камуфлююча база",
     "note": "",
     "dur": "30 хв",
     "price": "300 грн"
    },
    {
     "ix": "13",
     "name": "Покриття лак-гелем + френч",
     "note": "",
     "dur": "30 хв",
     "price": "400 грн"
    },
    {
     "ix": "14",
     "name": "Зняття лак-гелю",
     "note": "За умови повторного покриття.",
     "dur": "30 хв",
     "price": "60 грн"
    },
    {
     "ix": "15",
     "name": "Зняття лак-гелю без подальшого покриття + випил форми",
     "note": "",
     "dur": "45 хв",
     "price": "130 грн"
    },
    {
     "ix": "16",
     "name": "Укріплення нігтьової пластини",
     "note": "",
     "dur": "15 хв",
     "price": "140 грн"
    },
    {
     "ix": "17",
     "name": "Професійне покриття звичайним лаком",
     "note": "",
     "dur": "30 хв",
     "price": "75 грн"
    },
    {
     "ix": "18",
     "name": "Покриття лікувальним лаком",
     "note": "",
     "dur": "30 хв",
     "price": "100 грн"
    },
    {
     "ix": "19",
     "name": "Зняття звичайного лаку",
     "note": "",
     "dur": "15 хв",
     "price": "30 грн"
    }
   ],
   "open": false
  },
  {
   "name": "Педикюр",
   "count": "07 послуг",
   "rows": [
    {
     "ix": "20",
     "name": "Педикюр апаратний / комбінований (жін.) без покриття",
     "note": "",
     "dur": "60 хв",
     "price": "600 грн"
    },
    {
     "ix": "21",
     "name": "Педикюр апаратний / комбінований (чол.)",
     "note": "",
     "dur": "60 хв",
     "price": "650 грн"
    },
    {
     "ix": "22",
     "name": "Педикюр + зняття + покриття гель-лаком",
     "note": "",
     "dur": "90 хв",
     "price": "900 грн"
    },
    {
     "ix": "23",
     "name": "Педикюр + зняття + покриття «френч»",
     "note": "",
     "dur": "90 хв",
     "price": "990 грн"
    },
    {
     "ix": "24",
     "name": "Педикюр апаратний / комбінований — тільки пальці",
     "note": "Жіночий.",
     "dur": "45 хв",
     "price": "450 грн"
    },
    {
     "ix": "25",
     "name": "Педикюр апаратний / комбінований — тільки стопа",
     "note": "Жіночий.",
     "dur": "45 хв",
     "price": "450 грн"
    },
    {
     "ix": "26",
     "name": "Педикюр + звичайне покриття",
     "note": "",
     "dur": "60 хв",
     "price": "650 грн"
    }
   ],
   "open": false
  }
 ],
 "vivacePrices": [
  {
   "name": "Обличчя та шия",
   "count": "06 зон",
   "rows": [
    {
     "ix": "01",
     "name": "Обличчя",
     "note": "",
     "dur": "Vivace",
     "price": "5 000 грн"
    },
    {
     "ix": "02",
     "name": "Обличчя + шия",
     "note": "",
     "dur": "Vivace",
     "price": "5 200 грн"
    },
    {
     "ix": "03",
     "name": "Обличчя + шия + декольте",
     "note": "",
     "dur": "Vivace",
     "price": "5 700 грн"
    },
    {
     "ix": "04",
     "name": "Обличчя + шия + декольте + кисті рук",
     "note": "",
     "dur": "Vivace",
     "price": "5 900 грн"
    },
    {
     "ix": "05",
     "name": "Шия + декольте",
     "note": "",
     "dur": "Vivace",
     "price": "5 000 грн"
    },
    {
     "ix": "06",
     "name": "Зона навколо очей",
     "note": "",
     "dur": "Vivace",
     "price": "4 500 грн"
    }
   ],
   "open": true
  },
  {
   "name": "Тіло",
   "count": "06 зон",
   "rows": [
    {
     "ix": "07",
     "name": "Кисті рук",
     "note": "",
     "dur": "Vivace",
     "price": "4 500 грн"
    },
    {
     "ix": "08",
     "name": "Внутрішня поверхня рук",
     "note": "",
     "dur": "Vivace",
     "price": "4 500 грн"
    },
    {
     "ix": "09",
     "name": "Коліна",
     "note": "",
     "dur": "Vivace",
     "price": "4 500 грн"
    },
    {
     "ix": "10",
     "name": "Лікті",
     "note": "",
     "dur": "Vivace",
     "price": "4 500 грн"
    },
    {
     "ix": "11",
     "name": "Живіт",
     "note": "",
     "dur": "Vivace",
     "price": "5 000 грн"
    },
    {
     "ix": "12",
     "name": "Внутрішня частина стегон",
     "note": "",
     "dur": "Vivace",
     "price": "5 000 грн"
    }
   ],
   "open": false
  },
  {
   "name": "Додатково",
   "count": "01 опція",
   "rows": [
    {
     "ix": "13",
     "name": "+ Мезококтейль",
     "note": "Підбирається під конкретну проблему шкіри.",
     "dur": "До процедури",
     "price": "3 500 грн"
    }
   ],
   "open": false
  }
 ],
 "nailMasters": [
  {
   "img": "team-dydyk",
   "name": "Вероніка Дидик",
   "role": "Майстер нігтьового сервісу",
   "group": "Нігтьовий сервіс"
  },
  {
   "img": "team-pyliak",
   "name": "Анастасія Пиляк",
   "role": "Майстер нігтьового сервісу",
   "group": "Нігтьовий сервіс"
  },
  {
   "img": "team-andrusyk",
   "name": "Каміла Андрусик",
   "role": "Майстер нігтьового сервісу",
   "group": "Нігтьовий сервіс"
  }
 ],
 "otherApparatus": [
  {
   "img": "app-clearlight",
   "name": "ClearLight IPL",
   "desc": "IPL-терапія"
  },
  {
   "img": "app-candela",
   "name": "Candela Frax Pro",
   "desc": "Фракційна шліфовка"
  },
  {
   "img": "app-hydrafacial",
   "name": "HydraFacial",
   "desc": "Очищення та зволоження"
  },
  {
   "img": "app-alexstar",
   "name": "AlexStar",
   "desc": "Лазерна епіляція"
  }
 ]
};

// Сторінки сайту: кожна — окремий HTML у корені проєкту
const pages = {
  index: 'index.html',
  nails: 'nigtovyi-servis.html',
  vivace: 'vivace.html',
  team: 'komanda.html',
  notFound: '404.html',
};

// <img> з srcset: бере img/<name>-800.webp і, якщо є, img/<name>-1600.webp
function img(name, alt, sizes, cls, pos, eager) {
  const has1600 = existsSync(resolve(root, `public/img/${name}-1600.webp`));
  const srcset = has1600 ? ` srcset="img/${name}-800.webp 800w, img/${name}-1600.webp 1600w" sizes="${sizes || '100vw'}"` : '';
  const style = pos && typeof pos === 'string' ? ` style="object-position: ${pos}"` : '';
  const loading = eager === true ? 'eager' : 'lazy';
  return `<img src="img/${name}-800.webp"${srcset} alt="${alt || ''}"${cls && typeof cls === 'string' ? ` class="${cls}"` : ''}${style} loading="${loading}" decoding="async">`;
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([k, f]) => [k, resolve(root, f)])),
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, 'src/partials'),
      context: (pagePath) => ({ ...site, page: pagePath.replace(/^\//, '') }),
      helpers: {
        img: (name, alt, sizes, cls, pos, eager) => img(name, alt, sizes, cls, pos, eager),
        eq: (a, b) => a === b,
        pad: (n) => String(n).padStart(2, '0'),
        inc: (n) => n + 1,
        odd: (n) => 2 * n + 1,
        count: (arr) => String(arr.length).padStart(2, '0'),
        concat: (...a) => a.slice(0, -1).join(''),
        groupCount: (team, g) => String(g === 'Усі' ? team.length : team.filter((t) => t.group === g).length).padStart(2, '0'),
      },
    }),
  ],
});
