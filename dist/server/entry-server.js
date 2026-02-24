import { jsxs, jsx } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Star, Sparkles, Gift, Check, ThumbsUp, AlertCircle, Calendar, Baby, Minus, Plus, Wrench, Info, Gamepad2, Camera, ChevronDown, MessageCircleQuestion, X, User, Phone, Clock, CheckCircle, MapPin, ChevronRight, Map, ChevronLeft, CheckCircle2, PartyPopper, Heart, ArrowRight, MessageCircle, Users, Mail, ShieldCheck, Lock, CreditCard, RefreshCw, Shield, FileText, HelpCircle, Trophy, CalendarDays, Award, Wand2, Timer, ArrowUp, Cookie, BellRing } from "lucide-react";
const PACKAGES = [
  {
    id: "start",
    name: "Старт",
    tagline: "Всё готово, ничего лишнего",
    price: { weekday: 24900, weekend: 27900 },
    description: "Идеально, чтобы занять детей, поздравить именинника и не думать о посуде и уборке.",
    features: [
      { text: "Координатор праздника (3 часа)", isValue: true, description: "Следит за таймингом и гостями весь праздник" },
      { text: "Квест или Among Us (1 час)", description: "Активная игра, где каждый ребенок вовлечен" },
      { text: "Комната праздников (1 час)", description: "Для застолья и отдыха" },
      { text: "Дискотека (танцы под популярные хиты) (20 мин)", description: "Танцевальный батл и веселье" },
      { text: "Поздравление от персонажа (вынос торта) (5 мин)", isValue: true, description: "Любимый герой поздравляет именинника" },
      { text: "Электронные пригласительные (на 8 человек)", isValue: true },
      { text: "Праздничная сервировка стола (на 8 человек)", isValue: true },
      { text: "Видеопрохождение квеста (запись с камер без звука)", isValue: true, description: "На память родителям" }
    ]
  },
  {
    id: "comfort",
    name: "Комфорт",
    tagline: "Выбор большинства мам",
    isPopular: true,
    price: { weekday: 29900, weekend: 34900 },
    description: "Полное спокойствие: детей развлекают профессионалы, фотограф ловит эмоции, вы отдыхаете.",
    features: [
      { text: "Всё, что в тарифе «Старт»" },
      { text: "Программа с аниматором (конкурсы, игры) (1 час)", description: "Профессиональный ведущий держит внимание" },
      { text: "Флешмоб / дискотека с героями / рыцарский турнир / Тик-Ток шоу (20 мин)", isWow: true, description: "Персонализированное шоу на выбор" },
      { text: "Фоторепортаж (30-40 мин)", isRecommended: true, description: "Профессиональная съемка эмоций" }
    ]
  },
  {
    id: "vip",
    name: "VIP",
    tagline: "Максимальный восторг",
    price: { weekday: 39900, weekend: 44900 },
    description: 'Праздник "под ключ" с вау-эффектами. Именинник — звезда, родители — гости на празднике.',
    features: [
      { text: "Всё, что в тарифе «Комфорт»" },
      { text: "Неоновая или Серебряная дискотека (30 мин)", isWow: true, description: "Самая зрелищная часть праздника" },
      { text: "Рыцарский турнир (20 мин)", isWow: true, description: "Захватывающее состязание" },
      { text: "Беспроигрышная лотерея", isWow: true, description: "Никто не уйдёт без маленького подарка" },
      { text: "Видеопроздравление имениннику", isValue: true },
      { text: "Полный пакет фото + видео (1 час)", description: "Профессиональная съемка и клип" }
    ]
  }
];
const ADDONS = [
  // Entertainment
  { id: "animator_prog", name: "Программа с аниматором (конкурсы, игры)", price: 4500, category: "entertainment", description: "Подбирается индивидуально под вас." },
  { id: "disco_heroes", name: "Дискотека с персонажами квеста", price: 2900, category: "entertainment", description: "Танцы с любимыми героями." },
  { id: "char_greet", name: "Поздравление от персонажа (вынос торта)", price: 1500, category: "entertainment", description: "Не выходя из образа, дети будут в восторге!" },
  { id: "neon_disco", name: "Неоновая дискотека", price: 4500, category: "entertainment", description: "Такое диско запомнится навсегда!" },
  { id: "inflatable", name: "Поздравление в надувном костюме (на выбор)", price: 3e3, category: "entertainment", description: "Огромный герой, вау-фото." },
  { id: "tiktok", name: "Тик ток шоу (20 мин)", price: 4900, category: "entertainment", description: "Тренды, челленджи, хайп." },
  // Activity
  { id: "touch_box", name: 'Игра "Кажется нащупал"', price: 4e3, category: "activity", description: "Угадай предмет на ощупь." },
  { id: "knight", name: "Рыцарский турнир (15 мин)", price: 4e3, category: "activity", description: "Безопасная битва на мечах." },
  { id: "lottery", name: "Беспроигрышная лотерея", price: 5900, category: "activity", description: "Каждый гость получит подарок из лототрона." },
  { id: "pinata_full", name: "Взрыв эмоций: пиньята с горой сладостей", price: 6500, category: "activity", description: "Сладкий взрыв (наше наполнение)" },
  { id: "pinata_empty", name: "Пиньята без наполнения", price: 4900, category: "activity", description: "Наполнение привозят родители" },
  // Media
  { id: "video_quest", name: "Видеопрохождение квеста (запись без звука)", price: 1e3, category: "media", description: "Смешные моменты с камер." },
  { id: "video_greet", name: "Видеопроздравление имениннику", price: 2e3, category: "media", description: "Личное обращение от героя." },
  { id: "photo_report", name: "Фоторепортаж", price: 3900, category: "media", description: "Репортажная съемка праздника" },
  { id: "video_report", name: "Видеосъемка", price: 2900, category: "media", description: "Яркий клип на память." },
  { id: "photo_video_bundle", name: "Фоторепортаж + видеосъемка", price: 5400, category: "media", description: "Выгодно! Скидка 20%" },
  // Decor & Extras
  { id: "invitations", name: "Электронные пригласительные (на 8 чел)", price: 0, category: "decor", description: "Стильно, удобно для WhatsApp." },
  { id: "tableware", name: "Праздничная сервировка стола (на 8 чел)", price: 0, category: "decor", description: "Тематическая сервировка, никакой мойки." },
  { id: "balloons", name: "Шар цифра + 3 фигурных шара", price: 3e3, category: "decor", description: "Готовая фотозона праздника." },
  { id: "cake", name: "Торт", price: 0, category: "decor", description: "Цена зависит от состава и размера" }
];
const TIMELINE_EVENTS = [
  { time: "0:00 – 0:10", title: "Встреча гостей", desc: "Знакомство, правила, разогрев" },
  { time: "0:10 – 1:10", title: "Главное приключение", desc: "Квест или игра Among Us" },
  { time: "1:10 – 2:10", title: "Комната отдыха", desc: "Пицца, торт, подарки, передышка" },
  { time: "2:10 – 2:40", title: "Развлекательный блок", desc: "Дискотека, флешмоб или шоу (зависит от тарифа)" },
  { time: "2:40 – 3:00", title: "Финал праздника", desc: "Торжественный вынос торта, фото на память" }
];
const EXTRA_GUEST_PRICE = 1900;
const BASE_GUEST_COUNT = 8;
const CONSTRUCTOR_BASE_PRICE = 19900;
const REVIEWS = [
  {
    id: 1,
    author: "Ирина",
    date: "декабрь 2025 г.",
    source: "2GIS",
    verified: true,
    text: "Воспользовались услугами компании в организации детских ДР. И это был ЛУЧШИЙ выбор!!! У меня двое сыновей, с разницей в год. И они абсолютно разные! Администраторы учли все особенности и пожелания. Помогли подобрать не только квест, но и подарки по предпочтениям. В рамках данных мероприятий посетили два квеста: KIDNET и ПИКОВУЮ ДАМУ. Оба брали с повышенным уровнем страха (не помню, как это называется). Но это то, что НУЖНО! В таком режиме актёры подходят практически индивидуально к каждой компании. У нас было 8 детей, возраст с разбегом от 7 до 13 лет. Все остались в полном восторге, никто не вышел из игры. После прохождения квеста, в комнате праздников имениннику вручался торт и подарок. Первому ребенку в подарок заказывали маску их же производства. Маска ручной работы по индивидуальным эскизам. Сын коллекционирует маски (обычно заказываем на ВБ, но эта однозначно стала венцом коллекции). Второму в подарок был сертификат на квест и шкатулка ручной работы из игры ФНАФ! Всё это упаковали в антуражную коробку с логотипом (которая теперь тоже бережно хранится). Туда же положили сюрприз-бокс, в котором были сладости, стикеры и мерч-браслет. В общем, получили массу положительных эмоций! Из услуг брали видеозапись прохождения (дети с удовольствием на себя смотрели потом и переживали всё заново). Также ребёнок попробовал себя в роли актёра и во время квеста пугал своих друзей. Незабываемые эмоции!!! Очень советую провести детский праздник с OBRAZWILL!!! (Медиа материалы к отзыву прилагаю))) P.S. Команда OBRAZWILL, ещё раз ВАМ огромное спасибо. Ребята, отдача у вас на все 100%! Обязательно придём к вам ещё не раз!!! Желаю роста, процветания и чтобы вы и дальше радовали нас новинками!"
  },
  {
    id: 2,
    author: "Атмосфера, студия красоты",
    date: "ноябрь 2025 г.",
    source: "2GIS",
    verified: true,
    text: "Ходили с сыном и его друзьями на квест, эмоций у ребят куча, очень крутое место. Хочу отметить отличную организацию самой работы – все моменты предусмотрены до мелочей, актёры – мастера своего дела, находят подход к людям любого возраста. Молодцы!!! Ребята, так держать, успеха и процветания вашему делу!!!!"
  },
  {
    id: 3,
    author: "Екатерина Павлова",
    date: "2025 г.",
    source: "Яндекс Карты",
    verified: true,
    text: "Праздновали день рождения 10 лет, все прошло супер. Дети довольны, родители тоже) Отдельное спасибо администратору за помощь!"
  }
];
const PackageCard = ({ pkg, dayType, extraGuests, onSelect }) => {
  const currentPrice = dayType === "weekday" ? pkg.price.weekday : pkg.price.weekend;
  const totalPrice = currentPrice + extraGuests * EXTRA_GUEST_PRICE;
  const totalGuests = BASE_GUEST_COUNT + extraGuests;
  const isLargeGroup = totalGuests > 12;
  const cardClasses = pkg.isPopular ? "border-[3px] border-brand-500 shadow-[0_20px_60px_-15px_rgba(192,38,211,0.3)] scale-100 md:scale-110 z-20 ring-4 ring-brand-100 bg-gradient-to-b from-white to-brand-50/30" : "border border-gray-100 shadow-lg hover:shadow-xl hover:border-brand-200 bg-white";
  const buttonClasses = pkg.isPopular ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 shadow-lg shadow-brand-200" : "bg-gray-50 text-gray-800 hover:bg-gray-100 border border-gray-200";
  const formatPrice = (price) => {
    return price.toLocaleString("ru-RU").replace(/\s/g, " ");
  };
  return /* @__PURE__ */ jsxs("div", { className: `relative flex flex-col h-full rounded-[2rem] transition-all duration-300 overflow-hidden ${cardClasses}`, children: [
    pkg.isPopular && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400" }),
    pkg.isPopular && /* @__PURE__ */ jsxs("div", { className: "absolute -top-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-1.5 rounded-b-xl text-sm font-bold shadow-md flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx(Star, { size: 14, fill: "currentColor", className: "text-yellow-300" }),
      /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: "ХИТ ПРОДАЖ" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 flex-grow flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-6 pt-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl md:text-3xl font-bold text-gray-900 tracking-tight", children: pkg.name }),
        /* @__PURE__ */ jsx("p", { className: "text-brand-600 font-medium text-sm mt-1 flex items-center gap-1", children: pkg.tagline })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-1", children: /* @__PURE__ */ jsxs("span", { className: "text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight", children: [
          formatPrice(totalPrice),
          /* @__PURE__ */ jsx("span", { className: "text-3xl text-gray-400 ml-2 font-semibold", children: "₽" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide", children: [
          "Цена за ",
          totalGuests,
          " детей"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm mb-8 leading-relaxed", children: pkg.description }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-4 mb-6", children: pkg.features.map((feature, idx) => {
        const isQuestFeature = feature.text.includes("Квест");
        const showQuestWarning = isQuestFeature && isLargeGroup;
        return /* @__PURE__ */ jsxs("li", { className: "group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3.5", children: [
            /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex-shrink-0 p-1 rounded-full bg-gray-50 group-hover:bg-brand-50 transition-colors", children: feature.isWow ? /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "text-accent-orange fill-accent-orange/20" }) : feature.isValue ? /* @__PURE__ */ jsx(Gift, { size: 16, className: "text-brand-500" }) : /* @__PURE__ */ jsx(Check, { size: 16, className: "text-green-500" }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-700", children: [
              /* @__PURE__ */ jsx("span", { className: feature.isWow ? "font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" : "", children: feature.text }),
              feature.description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mt-0.5 font-medium", children: feature.description }),
              feature.isRecommended && /* @__PURE__ */ jsx("div", { className: "mt-2.5", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wide border border-brand-200 shadow-sm animate-pulse", children: [
                /* @__PURE__ */ jsx(ThumbsUp, { size: 12 }),
                " Рекомендуем"
              ] }) })
            ] })
          ] }),
          showQuestWarning && /* @__PURE__ */ jsxs("div", { className: "ml-9 mt-2 p-2.5 bg-orange-50 border border-orange-100 rounded-xl text-xs text-orange-800 flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(AlertCircle, { size: 14, className: "mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Для компаний 12+ чел. рекомендуем ",
              /* @__PURE__ */ jsx("strong", { children: "Among Us" }),
              " (квест вмещает до 12)"
            ] })
          ] })
        ] }, idx);
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-6 md:p-8 pt-0 mt-auto", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: onSelect,
        className: `w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${buttonClasses}`,
        children: [
          "Выбрать ",
          pkg.name
        ]
      }
    ) })
  ] });
};
const PricingToggle = ({ dayType, setDayType }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-3 mb-6 bg-brand-50/50 px-6 py-4 rounded-2xl border border-brand-100/50 shadow-sm text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-white p-2 rounded-full shadow-sm text-brand-600 shrink-0 hidden md:block", children: /* @__PURE__ */ jsx(Calendar, { size: 20 }) }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-900 text-lg md:text-xl font-bold leading-tight max-w-lg", children: "Пожалуйста, выберите на какой день вы хотите забронировать мероприятие?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-1.5 rounded-full shadow-xl shadow-brand-100/50 border border-brand-100 inline-flex relative w-full max-w-[360px] md:max-w-[550px]", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md bg-gradient-to-r from-brand-500 to-brand-600`,
          style: {
            left: dayType === "weekday" ? "6px" : "50%",
            width: "calc(50% - 6px)"
          }
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setDayType("weekday"),
          className: `relative z-10 flex-1 px-2 py-3 rounded-full text-xs md:text-base font-bold transition-colors duration-300 flex items-center justify-center gap-1.5 md:gap-2 ${dayType === "weekday" ? "text-white" : "text-gray-500 hover:text-gray-700"}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: "Будни (пн-пт)" }),
            /* @__PURE__ */ jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wide transition-all ${dayType === "weekday" ? "bg-white/20 text-white" : "bg-red-50 text-red-500 ring-1 ring-red-100"}`, children: "-20%" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setDayType("weekend"),
          className: `relative z-10 flex-1 px-2 py-3 rounded-full text-xs md:text-base font-bold transition-colors duration-300 whitespace-nowrap ${dayType === "weekend" ? "text-white" : "text-gray-500 hover:text-gray-700"}`,
          children: "Выходные (сб-вс и праздники)"
        }
      )
    ] })
  ] });
};
const GuestSelector = ({ extraGuests, setExtraGuests }) => {
  const totalGuests = BASE_GUEST_COUNT + extraGuests;
  const increment = () => setExtraGuests(extraGuests + 1);
  const decrement = () => setExtraGuests(Math.max(0, extraGuests - 1));
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-100/50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto mb-24 relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-2xl -mr-10 -mt-10 opacity-60" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-brand-50 p-4 rounded-2xl text-brand-600 shadow-inner", children: /* @__PURE__ */ jsx(Baby, { size: 32, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-xl", children: "Количество детей" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm mt-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-gray-500", children: [
            "База: ",
            BASE_GUEST_COUNT,
            " чел."
          ] }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:block text-gray-300", children: "•" }),
          /* @__PURE__ */ jsxs("span", { className: "text-brand-600 font-medium", children: [
            "Доп. гость +",
            EXTRA_GUEST_PRICE,
            " ₽"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-green-600 font-bold mt-1.5 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-500" }),
          "Взрослые сопровождающие — бесплатно"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 relative z-10 bg-gray-50 p-1.5 rounded-2xl border border-gray-100", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: decrement,
          className: "w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand-600 hover:border-brand-200 disabled:opacity-40 disabled:hover:text-gray-600 transition-all shadow-sm active:scale-95",
          disabled: extraGuests === 0,
          "aria-label": "Меньше гостей",
          children: /* @__PURE__ */ jsx(Minus, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "w-14 text-center", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-3xl block leading-none text-gray-900", children: totalGuests }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: increment,
          className: "w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 shadow-md shadow-brand-200 hover:shadow-lg transition-all active:scale-95",
          "aria-label": "Больше гостей",
          children: /* @__PURE__ */ jsx(Plus, { size: 20 })
        }
      )
    ] })
  ] });
};
const Constructor = ({ dayType, setDayType, extraGuests, selectedPackageId, onClearPackage, onOpenManagerPopup }) => {
  const [selectedAddons, setSelectedAddons] = useState(/* @__PURE__ */ new Set());
  const [openCategories, setOpenCategories] = useState({
    entertainment: false,
    activity: false,
    media: false,
    decor: false
  });
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  useEffect(() => {
    setSelectedAddons(/* @__PURE__ */ new Set());
  }, [selectedPackageId]);
  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const toggleAddon = (id) => {
    const next = new Set(selectedAddons);
    const exclusiveGroups = [
      ["disco_heroes", "neon_disco"],
      // Disco variants
      ["pinata_full", "pinata_empty"]
      // Pinata variants
    ];
    if (id === "photo_video_bundle") {
      if (!next.has(id)) {
        next.delete("photo_report");
        next.delete("video_report");
      }
    }
    if (id === "photo_report" || id === "video_report") {
      if (!next.has(id)) {
        next.delete("photo_video_bundle");
      }
    }
    const group = exclusiveGroups.find((g) => g.includes(id));
    if (next.has(id)) {
      next.delete(id);
    } else {
      if (group) {
        group.forEach((gId) => next.delete(gId));
      }
      next.add(id);
    }
    setSelectedAddons(next);
  };
  const selectedPackage = selectedPackageId ? PACKAGES.find((p) => p.id === selectedPackageId) : null;
  let basePrice = 0;
  let weekendBasePrice = 0;
  if (selectedPackage) {
    basePrice = dayType === "weekday" ? selectedPackage.price.weekday : selectedPackage.price.weekend;
    weekendBasePrice = selectedPackage.price.weekend;
  } else {
    basePrice = dayType === "weekday" ? CONSTRUCTOR_BASE_PRICE : CONSTRUCTOR_BASE_PRICE + 3e3;
    weekendBasePrice = CONSTRUCTOR_BASE_PRICE + 3e3;
  }
  const getAddonPrice = (price) => {
    if (price === 0) return 0;
    if (dayType === "weekend") return price;
    return Math.floor(price * 0.8);
  };
  const addonsTotal = ADDONS.filter((a) => selectedAddons.has(a.id)).reduce((sum, a) => sum + getAddonPrice(a.price), 0);
  const addonsOldTotal = ADDONS.filter((a) => selectedAddons.has(a.id)).reduce((sum, a) => sum + a.price, 0);
  const guestsTotal = extraGuests * EXTRA_GUEST_PRICE;
  const grandTotal = basePrice + addonsTotal + guestsTotal;
  const oldTotal = weekendBasePrice + addonsOldTotal + guestsTotal;
  const prepayment = Math.max(2e3, Math.floor(grandTotal * 0.1));
  let potentialSavings = 0;
  if (dayType === "weekend") {
    const weekdayBase = selectedPackage ? selectedPackage.price.weekday : CONSTRUCTOR_BASE_PRICE;
    const weekdayAddons = ADDONS.filter((a) => selectedAddons.has(a.id)).reduce((sum, a) => sum + Math.floor(a.price * 0.8), 0);
    const weekdayTotal = weekdayBase + weekdayAddons + guestsTotal;
    potentialSavings = grandTotal - weekdayTotal;
  }
  const categories = [
    { id: "entertainment", label: "Шоу и развлечения", icon: Sparkles },
    { id: "activity", label: "Активность и игры", icon: Gamepad2 },
    { id: "media", label: "Фото и видео", icon: Camera },
    { id: "decor", label: "Декор и угощения", icon: Gift }
  ];
  const formatPrice = (price) => {
    return price.toLocaleString("ru-RU").replace(/\s/g, " ");
  };
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setIsOrderPopupOpen(false);
    alert("Спасибо! Ваша заявка успешно отправлена. Менеджер свяжется с вами для уточнения деталей и бронирования.");
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-200 overflow-visible relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-brand-900 p-6 md:p-8 text-white relative overflow-hidden rounded-t-[2.5rem]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "p-1.5 bg-white/10 rounded-lg backdrop-blur-md", children: /* @__PURE__ */ jsx(Wrench, { className: "text-brand-300", size: 20 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black tracking-tight", children: "Конструктор праздника" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-brand-100 text-sm opacity-90", children: selectedPackage ? `Вы выбрали пакет "${selectedPackage.name}". Хотите добавить что-то еще?` : "Добавьте услуги к базовому пакету" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:hidden bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-brand-200 uppercase tracking-wider mb-1", children: "Итого" }),
          /* @__PURE__ */ jsxs("div", { className: "font-bold text-xl", children: [
            formatPrice(grandTotal),
            " ₽"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 p-6 md:p-8 bg-gray-50/50 rounded-bl-[2.5rem] lg:rounded-bl-[2.5rem]", children: [
        /* @__PURE__ */ jsxs("div", { className: `rounded-2xl p-5 border shadow-sm mb-8 transition-colors ${selectedPackage ? "bg-brand-50 border-brand-200" : "bg-white border-brand-100"}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 border-b border-gray-200/50 pb-2", children: [
            /* @__PURE__ */ jsxs("h4", { className: "font-bold text-gray-900 text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Info, { size: 16, className: "text-brand-500" }),
              selectedPackage ? `Тариф «${selectedPackage.name}»` : "Базовый пакет"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-brand-600 text-sm", children: [
                formatPrice(basePrice),
                " ₽"
              ] }),
              selectedPackage && onClearPackage && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onClearPackage,
                  className: "text-xs text-gray-500 hover:text-red-500 underline decoration-dashed",
                  children: "Сбросить"
                }
              )
            ] })
          ] }),
          selectedPackage ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700", children: selectedPackage.features.map((f, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsx(Check, { size: 14, className: "text-green-500 mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "leading-tight", children: f.text })
          ] }, i)) }) : /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Check, { size: 14, className: "text-green-500" }),
              " Квест / Among Us"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Check, { size: 14, className: "text-green-500" }),
              " Комната 60 мин"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Check, { size: 14, className: "text-green-500" }),
              " Музыка + Ведущий"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Check, { size: 14, className: "text-green-500" }),
              " Координатор"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: categories.map((cat) => {
          const catItems = ADDONS.filter((i) => i.category === cat.id);
          if (catItems.length === 0) return null;
          const Icon = cat.icon;
          const isOpen = openCategories[cat.id];
          return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                onClick: () => toggleCategory(cat.id),
                className: "flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors select-none",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center", children: /* @__PURE__ */ jsx(Icon, { size: 18 }) }),
                    /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-800 text-lg", children: cat.label }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full", children: catItems.length })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: `transform transition-transform duration-300 text-gray-400 ${isOpen ? "rotate-180" : ""}`, children: /* @__PURE__ */ jsx(ChevronDown, { size: 20 }) })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: `transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`, children: /* @__PURE__ */ jsx("div", { className: "p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-3", children: catItems.map((item) => {
              const isSelected = selectedAddons.has(item.id);
              const price = getAddonPrice(item.price);
              const oldPrice = item.price;
              const hasDiscount = dayType === "weekday" && price < oldPrice && oldPrice > 0;
              let priceText = `${formatPrice(price)} ₽`;
              if (item.price === 0) {
                if (item.id === "cake") priceText = "по запросу";
                else priceText = "0 ₽";
              }
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  onClick: () => toggleAddon(item.id),
                  className: `
                                                    cursor-pointer relative p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 group
                                                    ${isSelected ? "border-brand-500 bg-brand-50/30 shadow-sm ring-1 ring-brand-500 z-10" : "border-gray-100 bg-white hover:border-brand-300 hover:shadow-sm"}
                                                `,
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: `
                                                    w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                                                    ${isSelected ? "bg-brand-500 border-brand-500 text-white" : "border-gray-300 bg-gray-50 group-hover:border-brand-300"}
                                                `, children: [
                      isSelected && /* @__PURE__ */ jsx(Check, { size: 12, strokeWidth: 3 }),
                      !isSelected && /* @__PURE__ */ jsx(Plus, { size: 12, className: "text-gray-400 group-hover:text-brand-500" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                        /* @__PURE__ */ jsx("span", { className: `font-semibold text-sm leading-tight ${isSelected ? "text-gray-900" : "text-gray-700"}`, children: item.name }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end leading-none", children: [
                          /* @__PURE__ */ jsx("span", { className: `font-bold text-sm whitespace-nowrap ${isSelected ? "text-brand-700" : "text-gray-900"}`, children: priceText }),
                          hasDiscount && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-400 line-through decoration-red-400 decoration-1", children: [
                            formatPrice(oldPrice),
                            " ₽"
                          ] })
                        ] })
                      ] }),
                      item.description && /* @__PURE__ */ jsx("p", { className: "text-[11px] text-gray-400 leading-tight mt-1 truncate", children: item.description })
                    ] })
                  ]
                },
                item.id
              );
            }) }) })
          ] }, cat.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "lg:w-[350px] bg-white border-l border-gray-100 p-6 md:p-8 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-20 lg:sticky lg:top-24 lg:self-start rounded-br-[2.5rem] lg:rounded-br-[2.5rem] lg:rounded-bl-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 pb-6 border-b border-gray-100", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm font-medium block mb-1", children: "Итоговая стоимость:" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start w-full", children: [
            dayType === "weekday" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-lg text-gray-400 line-through font-semibold decoration-red-400 decoration-2", children: [
                formatPrice(oldTotal),
                " ₽"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100 uppercase", children: "-20% (Будни пн-пт)" })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-4xl font-black text-brand-900 tracking-tight leading-none mb-2", children: [
              formatPrice(grandTotal),
              " ₽"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 font-medium mb-4 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100 w-full", children: [
              "❗ Предоплата для бронирования 10% (не менее 2000₽): ",
              /* @__PURE__ */ jsxs("span", { className: "font-bold text-gray-900", children: [
                formatPrice(prepayment),
                " ₽"
              ] })
            ] }),
            dayType === "weekend" && potentialSavings > 0 && /* @__PURE__ */ jsxs("div", { className: "w-full bg-brand-50 border border-brand-200 rounded-xl p-3 mb-4 animate-in fade-in slide-in-from-bottom-2", children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-800 leading-snug mb-2", children: [
                "Выберите ",
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: "будний день" }),
                " и сэкономьте ",
                /* @__PURE__ */ jsxs("span", { className: "font-bold text-brand-600 bg-brand-100 px-1 rounded", children: [
                  formatPrice(potentialSavings),
                  " ₽"
                ] })
              ] }),
              setDayType && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setDayType("weekday"),
                  className: "w-full py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm",
                  children: "Выбрать будний день"
                }
              )
            ] }),
            dayType === "weekend" && potentialSavings === 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2 p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-500 leading-tight flex gap-2 items-start w-full", children: [
              /* @__PURE__ */ jsx("span", { className: "shrink-0 text-base", children: "💡" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "В ",
                /* @__PURE__ */ jsx("b", { children: "будние дни" }),
                " действует скидка 20% на все дополнительные услуги и пакеты!"
              ] })
            ] })
          ] }),
          selectedAddons.has("cake") && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400 font-normal mt-2", children: "+ стоимость торта" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setIsOrderPopupOpen(true),
              className: "w-full mt-6 bg-brand-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 active:scale-[0.98]",
              children: "Оформить заказ"
            }
          ),
          selectedPackage && onClearPackage && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClearPackage,
              className: "w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors",
              children: "Вернуться к конструктору с нуля"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 mb-4 text-lg", children: "Детализация" }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto max-h-[400px] lg:max-h-[calc(100vh-500px)] pr-2 custom-scrollbar", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600 pb-3 border-b border-gray-100", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium text-gray-900", children: [
              selectedPackage ? `Пакет «${selectedPackage.name}»` : "База конструктора",
              /* @__PURE__ */ jsxs("span", { className: "block text-xs text-gray-400 font-normal", children: [
                "(",
                dayType === "weekday" ? "Будни" : "Выходной",
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              formatPrice(basePrice),
              " ₽"
            ] })
          ] }),
          extraGuests > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gray-600 pb-3 border-b border-gray-100", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "Доп. гости (",
              extraGuests,
              ")"
            ] }),
            /* @__PURE__ */ jsxs("span", { children: [
              formatPrice(guestsTotal),
              " ₽"
            ] })
          ] }),
          Array.from(selectedAddons).map((id) => {
            const item = ADDONS.find((a) => a.id === id);
            if (!item) return null;
            const price = getAddonPrice(item.price);
            let priceDisplay = `${formatPrice(price)} ₽`;
            if (item.price === 0) {
              if (item.id === "cake") priceDisplay = "по запросу";
              else priceDisplay = "0 ₽";
            }
            return /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-brand-700 font-medium py-1", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate pr-2 text-xs", children: item.name }),
              /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs", children: priceDisplay })
            ] }, id);
          })
        ] }) }),
        onOpenManagerPopup && /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: onOpenManagerPopup,
            className: "w-full mt-4 bg-gray-100 text-gray-600 border border-gray-200 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsx(MessageCircleQuestion, { size: 18 }),
              "Задать вопрос менеджеру"
            ]
          }
        )
      ] })
    ] }),
    isOrderPopupOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[120] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300", onClick: () => setIsOrderPopupOpen(false) }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsOrderPopupOpen(false),
            className: "absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full transition-colors",
            children: /* @__PURE__ */ jsx(X, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-gray-900 mb-2", children: "Оформление заявки" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: "Заполните форму, и мы свяжемся с вами для подтверждения даты и деталей." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-brand-50 rounded-xl p-4 mb-6 border border-brand-100 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-brand-600 uppercase font-bold tracking-wider", children: "Итоговая сумма" }),
            /* @__PURE__ */ jsxs("div", { className: "text-xl font-black text-brand-900", children: [
              formatPrice(grandTotal),
              " ₽"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500", children: "Предоплата" }),
            /* @__PURE__ */ jsxs("div", { className: "font-bold text-gray-800", children: [
              formatPrice(prepayment),
              " ₽"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleOrderSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Как вас зовут?" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Ваше имя",
                  className: "w-full pl-10 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Номер телефона" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "tel",
                  placeholder: "+7 (___) ___-__-__",
                  className: "w-full pl-10 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all",
                  required: true
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Желаемая дата (ориентировочно)" }),
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", size: 18 }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "date",
                  min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                  className: "w-full pl-10 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all text-gray-700"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-1", children: "Комментарий" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                placeholder: "Особенности ребенка, пожелания...",
                className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all min-h-[80px]"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("button", { className: "w-full bg-brand-600 text-white font-bold text-lg py-3.5 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]", children: "Отправить заявку" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-center text-gray-400 mt-4 leading-tight", children: "Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных. Оплата производится после согласования с менеджером." })
      ] })
    ] })
  ] });
};
const Timeline = () => {
  return /* @__PURE__ */ jsxs("div", { className: "py-12 bg-white rounded-3xl shadow-sm border border-brand-100 p-6 md:p-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "p-3 bg-brand-100 rounded-full text-brand-700", children: /* @__PURE__ */ jsx(Clock, { size: 24 }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-800", children: "Идеальный тайминг (3 часа)" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute left-[19px] top-4 bottom-4 w-0.5 bg-brand-200 hidden md:block" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6 md:space-y-0", children: TIMELINE_EVENTS.map((event, idx) => /* @__PURE__ */ jsxs("div", { className: "relative md:pl-12 md:pb-8 last:pb-0 flex flex-col md:block items-center text-center md:text-left", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute left-0 top-1 w-10 h-10 bg-white border-4 border-brand-300 rounded-full z-10" }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden bg-brand-100 text-brand-800 font-bold px-3 py-1 rounded-full text-sm mb-2 inline-block", children: event.time }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "hidden md:inline-block font-bold text-brand-600 mr-2", children: event.time }),
          /* @__PURE__ */ jsx("h4", { className: "text-lg font-bold text-gray-900 inline-block", children: event.title }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 mt-1", children: event.desc })
        ] })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-gray-500 text-center md:text-left italic bg-gray-50 p-4 rounded-xl border border-gray-100", children: [
      "* Тайминг проверен на сотнях праздников. Дети заняты, не устают и не разносят комнату.",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-gray-700", children: "Итоговый тайминг зависит от выбранного пакета или выбранных дополнительных услуг." })
    ] })
  ] });
};
const AVATAR_GRADIENTS = [
  "from-brand-400 to-brand-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-rose-500"
];
const getInitials = (name) => name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
const Avatar = ({ name, id, size = "sm" }) => /* @__PURE__ */ jsx("div", { className: `${size === "lg" ? "w-16 h-16 text-lg" : "w-12 h-12 text-sm"} rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-black shrink-0 shadow-sm`, children: getInitials(name) });
const ReviewCard = ({ review, onOpen }) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 md:p-8 rounded-[2rem] shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col h-full relative group hover:border-brand-200 transition-colors", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
      /* @__PURE__ */ jsx(Avatar, { name: review.author, id: review.id }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 leading-tight text-lg", children: review.author }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 flex items-center gap-1.5 mt-1", children: [
          /* @__PURE__ */ jsx("span", { className: "bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium", children: review.source }),
          /* @__PURE__ */ jsx("span", { children: review.date }),
          review.verified && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-green-600 font-medium", title: "Отзыв подтвержден", children: [
            /* @__PURE__ */ jsx(CheckCircle, { size: 12, fill: "currentColor", className: "text-white" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Подтвержден" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-4", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(Star, { size: 16, className: "fill-yellow-400 text-yellow-400" }, star)) }),
    /* @__PURE__ */ jsx("div", { className: "relative flex-grow", children: /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed line-clamp-4", children: review.text }) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onOpen(review),
        className: "mt-4 text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors self-start focus:outline-none",
        children: "Читать полностью"
      }
    )
  ] });
};
const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  React.useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedReview]);
  return /* @__PURE__ */ jsxs("section", { "aria-label": "Отзывы клиентов", className: "py-20 md:py-28 px-4 max-w-7xl mx-auto border-t border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("span", { className: "text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block", children: "Отзывы" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight", children: "Что говорят родители" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-gray-500 max-w-2xl mx-auto", children: "Мы гордимся тем, что 98% клиентов рекомендуют нас своим друзьям. Вот последние отзывы с независимых площадок." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start", children: REVIEWS.map((review) => /* @__PURE__ */ jsx(ReviewCard, { review, onOpen: setSelectedReview }, review.id)) }),
    selectedReview && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200",
          onClick: () => setSelectedReview(null)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto flex flex-col", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedReview(null),
            className: "absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors z-10",
            children: /* @__PURE__ */ jsx(X, { size: 24 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6 pr-8", children: [
          /* @__PURE__ */ jsx(Avatar, { name: selectedReview.author, id: selectedReview.id, size: "lg" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 text-xl", children: selectedReview.author }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium", children: selectedReview.source }),
              /* @__PURE__ */ jsx("span", { children: selectedReview.date })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-1 mb-6", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx(Star, { size: 20, className: "fill-yellow-400 text-yellow-400" }, star)) }),
        /* @__PURE__ */ jsx("div", { className: "text-gray-700 leading-relaxed whitespace-pre-line text-lg overflow-y-auto pr-2", children: selectedReview.text }),
        /* @__PURE__ */ jsx("div", { className: "mt-8 pt-6 border-t border-gray-100 flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedReview(null),
            className: "text-brand-600 font-bold hover:bg-brand-50 px-6 py-2 rounded-xl transition-colors",
            children: "Закрыть"
          }
        ) })
      ] })
    ] })
  ] });
};
const LOCATIONS = [
  {
    id: 3,
    address: "г. Пенза, ул. Гагарина 28",
    mapUrl: "https://yandex.ru/map-widget/v1/?text=Пенза+Гагарина+28&z=17",
    desc: "Заводской район",
    isMain: true
  },
  {
    id: 1,
    address: "г. Пенза, ул. Чаадаева 36А",
    mapUrl: "https://yandex.ru/map-widget/v1/?text=Пенза+Чаадаева+36А&z=17",
    desc: "Район ГПЗ-24",
    isMain: false
  },
  {
    id: 2,
    address: "г. Пенза, ул. Пролетарская 6",
    mapUrl: "https://yandex.ru/map-widget/v1/?text=Пенза+Пролетарская+6&z=17",
    desc: "Район Автовокзала",
    isMain: false
  }
];
const Locations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const nextLocation = () => {
    setActiveIndex((prev) => (prev + 1) % LOCATIONS.length);
  };
  const prevLocation = () => {
    setActiveIndex((prev) => (prev - 1 + LOCATIONS.length) % LOCATIONS.length);
  };
  return /* @__PURE__ */ jsx("section", { ref: sectionRef, "aria-label": "Наши адреса в Пензе", className: "py-20 bg-white border-t border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("span", { className: "text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block", children: "Контакты" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight", children: "Где нас найти?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-500 max-w-2xl mx-auto", children: "Мы находимся в трех районах города. Выбирайте, куда удобнее добраться гостям." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 bg-gray-50 rounded-[2.5rem] p-4 md:p-6 shadow-sm border border-gray-200", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:w-1/3 flex flex-col gap-4", children: LOCATIONS.map((loc, idx) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveIndex(idx),
          className: `text-left p-6 rounded-2xl transition-all duration-300 border group ${idx === activeIndex ? "bg-white border-brand-500 shadow-lg shadow-brand-100 scale-[1.02]" : "bg-white/50 border-transparent hover:bg-white hover:border-gray-200"}`,
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${idx === activeIndex ? "bg-brand-500 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-500"}`, children: /* @__PURE__ */ jsx(MapPin, { size: 20 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsx("h4", { className: `font-bold text-lg ${idx === activeIndex ? "text-gray-900" : "text-gray-600"}`, children: loc.address }),
                loc.isMain && /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full shrink-0", children: "Основная" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-400", children: loc.desc }),
              idx === activeIndex && /* @__PURE__ */ jsxs("div", { className: "mt-4 inline-flex items-center gap-2 text-brand-600 font-bold text-sm animate-in fade-in slide-in-from-left-2", children: [
                /* @__PURE__ */ jsx("span", { children: "Показать на карте" }),
                /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
              ] })
            ] })
          ] })
        },
        loc.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "lg:w-2/3 relative min-h-[400px] lg:min-h-[500px] rounded-[2rem] overflow-hidden shadow-inner border border-gray-200 bg-gray-100", children: [
        mapVisible ? /* @__PURE__ */ jsx(
          "iframe",
          {
            src: LOCATIONS[activeIndex].mapUrl,
            width: "100%",
            height: "100%",
            className: "absolute inset-0 w-full h-full",
            allowFullScreen: true,
            loading: "lazy",
            title: `Карта ${LOCATIONS[activeIndex].address}`
          },
          LOCATIONS[activeIndex].id
        ) : /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center", children: /* @__PURE__ */ jsx(Map, { size: 32, className: "text-gray-400" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Карта загружается..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "lg:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-none", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prevLocation,
              className: "w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto active:scale-95",
              children: /* @__PURE__ */ jsx(ChevronLeft, { size: 24 })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: nextLocation,
              className: "w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto active:scale-95",
              children: /* @__PURE__ */ jsx(ChevronRight, { size: 24 })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
const ThankYou = () => {
  const [isBusinessHours, setIsBusinessHours] = useState(false);
  useEffect(() => {
    const checkTime = () => {
      const now = /* @__PURE__ */ new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      setIsBusinessHours(minutes >= 570 && minutes < 1200);
    };
    checkTime();
    const interval = setInterval(checkTime, 6e4);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[15%] w-3 h-3 bg-brand-300/40 rounded-full animate-bounce", style: { animationDelay: "0s", animationDuration: "3s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[25%] right-[20%] w-2 h-2 bg-accent-orange/40 rounded-full animate-bounce", style: { animationDelay: "1s", animationDuration: "4s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[50%] left-[8%] w-4 h-4 bg-brand-200/30 rounded-full animate-bounce", style: { animationDelay: "0.5s", animationDuration: "3.5s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[15%] right-[10%] w-2 h-2 bg-green-300/40 rounded-full animate-bounce", style: { animationDelay: "2s", animationDuration: "4s" } })
    ] }),
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("a", { href: "/", className: "text-xl font-black text-brand-900 tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-base shadow-md", children: "O" }),
        "Obrazwill"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "tel:+78412500523", className: "group flex items-center gap-2 text-brand-800 font-bold bg-white border border-brand-100 px-3 py-1.5 rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Phone, { size: 14, fill: "currentColor" }) }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-sm", children: "+7 (8412) 50-05-23" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 pt-20 md:pt-24", children: [
      /* @__PURE__ */ jsxs("section", { className: "pb-12 px-4 text-center max-w-4xl mx-auto pt-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2.5 bg-white border border-green-100 rounded-full pl-3 pr-5 py-1.5 text-sm font-bold text-gray-800 mb-8 shadow-sm", children: [
          /* @__PURE__ */ jsx(CheckCircle2, { size: 18, className: "text-green-500 fill-green-500" }),
          /* @__PURE__ */ jsx("span", { children: "Заявка успешно принята!" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-24 h-24 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-brand-100 relative", children: [
          /* @__PURE__ */ jsx(PartyPopper, { size: 44, className: "text-brand-600" }),
          /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -right-2 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-white text-lg shadow-md", children: "🎉" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight", children: [
          "Спасибо за доверие! ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange", children: "Праздник уже близко" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium", children: [
          "Ваша заявка принята. Совсем скоро",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-semibold underline decoration-brand-300 decoration-2 underline-offset-2", children: "с вами свяжется наш менеджер" }),
          ", чтобы обсудить детали и подтвердить бронирование."
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-brand-200 transition-colors group relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-brand-50/50 rounded-full -mr-6 -mt-6 blur-xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-black text-lg mb-4 group-hover:scale-110 transition-transform duration-300", children: "1" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-2", children: "Менеджер позвонит" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: isBusinessHours ? "Мы сейчас онлайн — ожидайте звонка в ближайшие 5–15 минут." : "Звонок поступит утром, как только начнётся рабочий день с 09:30." }),
            /* @__PURE__ */ jsxs("div", { className: `mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${isBusinessHours ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-600"}`, children: [
              /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${isBusinessHours ? "bg-green-500 animate-pulse" : "bg-orange-400"}` }),
              isBusinessHours ? "Сейчас онлайн" : "Сейчас не в сети"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-amber-200 transition-colors group relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-amber-50/50 rounded-full -mr-6 -mt-6 blur-xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-black text-lg mb-4 group-hover:scale-110 transition-transform duration-300", children: "2" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-2", children: "Предоплата 10%" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: "Для подтверждения бронирования необходима предоплата в размере 10% от стоимости. Менеджер расскажет, как её внести." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-green-200 transition-colors group relative overflow-hidden", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-20 h-20 bg-green-50/50 rounded-full -mr-6 -mt-6 blur-xl" }),
          /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-black text-lg mb-4 group-hover:scale-110 transition-transform duration-300", children: "3" }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-2", children: "Праздник мечты!" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: "Всё готово — приезжайте и наслаждайтесь незабываемым детским днём рождения вместе с вашим ребёнком." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-12 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(AlertCircle, { size: 22 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-amber-900 text-base mb-1", children: "Важно для участников младше 16 лет" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800 leading-relaxed", children: "Для лиц, не достигших 16-летнего возраста, необходима расписка от родителя или законного представителя. Пожалуйста, уточните этот момент у менеджера при звонке." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-brand-100/40 rounded-full -mr-16 -mt-16 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-accent-orange/10 rounded-full -ml-16 -mb-16 blur-3xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row gap-8 items-start", children: [
          /* @__PURE__ */ jsxs("div", { className: "shrink-0 flex flex-col items-center gap-3 md:items-start", children: [
            /* @__PURE__ */ jsx("div", { className: "w-24 h-24 rounded-2xl overflow-hidden shadow-lg shadow-brand-200 border-2 border-brand-100", children: /* @__PURE__ */ jsx("img", { src: "/maxim.jpg", alt: "Максим Фролов", className: "w-full h-full object-cover object-top" }) }),
            /* @__PURE__ */ jsxs("div", { className: "text-center md:text-left", children: [
              /* @__PURE__ */ jsx("p", { className: "font-black text-gray-900 text-base leading-tight", children: "Максим Фролов" }),
              /* @__PURE__ */ jsx("p", { className: "text-brand-600 text-xs font-semibold", children: "Основатель OBRAZWILL" }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5 mt-1.5 justify-center md:justify-start", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { size: 12, className: "text-amber-400 fill-amber-400" }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-white border border-brand-100 rounded-full px-3 py-1 text-xs font-bold text-brand-700 mb-4 shadow-sm", children: [
              /* @__PURE__ */ jsx(Heart, { size: 12, className: "fill-brand-400 text-brand-400" }),
              "Личное обращение основателя"
            ] }),
            /* @__PURE__ */ jsxs("blockquote", { className: "text-gray-700 leading-relaxed text-base md:text-lg", children: [
              "Здравствуйте! Меня зовут Максим, и я являюсь одним из основателей компании",
              " ",
              /* @__PURE__ */ jsx("strong", { className: "text-brand-700", children: "OBRAZWILL" }),
              ". Очень рад, что вы решили подарить своему ребёнку по-настоящему яркий праздник у нас!",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              "Я лично гарантирую качество каждого нашего проекта. Если по какой-то причине вам не понравится квест или праздник — я ",
              /* @__PURE__ */ jsx("strong", { className: "text-gray-900", children: "верну деньги в полном размере" }),
              ". Это не просто слова: за нами стоят сотни счастливых семей в Пензе.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("br", {}),
              "Хорошей игры и незабываемого праздника! 🎈"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsx("span", { className: "text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block", children: "Оставайтесь с нами" }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black text-gray-900 mb-3", children: "Акции, конкурсы и новые квесты" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 max-w-xl mx-auto leading-relaxed", children: "Мы регулярно проводим акции и конкурсы, публикуем интересный контент и делаем анонсы новых квестов. Присоединяйтесь — там особенно интересно!" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://vk.com/obrazwill",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-5 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:border-[#0077FF]/30 hover:shadow-md transition-all",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-[#0077FF]/10 rounded-2xl flex items-center justify-center text-[#0077FF] shrink-0 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-7 h-7", children: /* @__PURE__ */ jsx("path", { d: "M13.162 18.994c.609 0 1.016-.085 1.232-.249.203-.163.266-.45.266-.879 0-.606-.025-1.32.044-1.587.106-.414.497-.563.894-.156.403.414 1.765 2.566 2.658 2.87.671.228 1.173.067 1.173.067l2.36-.024c.71 0 .695-.376.541-.75-.195-.466-1.302-2.316-1.683-2.736-.37-.406-.514-.57-.096-1.144 0 0 1.956-2.666 2.13-3.486.079-.374-.265-.544-.813-.544l-2.434.017c-.206-.007-.446.064-.582.353-.058.125-.972 2.406-1.353 3.053-.787 1.34-1.106 1.458-1.236 1.267-.282-.416-.208-1.673-.208-2.585 0-2.822.446-4.008-1.047-4.008-1.011 0-1.678.307-2.112.63-.306.226-.538.744-.395.772.179.035.586.166.801.446.28.365.27.913.27 2.916 0 .618-.113 2.218-1.139 2.218-.328 0-1.137-.367-1.928-1.688-1.04-1.745-1.847-3.69-1.847-3.69s-.144-.355-.407-.549c-.214-.158-.512-.209-.512-.209l-2.569.017c-.383 0-.528.174-.528.367 0 .341.42 2.059 2.007 4.195 2.484 3.344 5.345 3.514 5.954 3.514z" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-black text-gray-900 text-lg mb-0.5", children: "Вступить в группу ВКонтакте" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Акции, конкурсы и новости квестов" })
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "text-gray-300 group-hover:text-[#0077FF] group-hover:translate-x-1 transition-all" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://t.me/obrazwill",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-5 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:border-[#2AABEE]/30 hover:shadow-md transition-all",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-[#2AABEE]/10 rounded-2xl flex items-center justify-center text-[#2AABEE] shrink-0 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-7 h-7", children: /* @__PURE__ */ jsx("path", { d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" }) }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsx("p", { className: "font-black text-gray-900 text-lg mb-0.5", children: "Подписаться на Telegram" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Эксклюзивные предложения в канале" })
                ] }),
                /* @__PURE__ */ jsx(ArrowRight, { size: 20, className: "text-gray-300 group-hover:text-[#2AABEE] group-hover:translate-x-1 transition-all" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "bg-brand-900 py-14 md:py-20 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[400px] h-[400px] bg-brand-700/50 rounded-full blur-[100px] -mr-32 -mt-32" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-800/50 rounded-full blur-[100px] -ml-32 -mb-32" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-4 relative z-10 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 text-brand-300", children: /* @__PURE__ */ jsx(MessageCircle, { size: 30 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-4xl font-black text-white mb-4 tracking-tight", children: "Есть дополнительные вопросы?" }),
          /* @__PURE__ */ jsx("p", { className: "text-brand-100 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed", children: "Наш менеджер обязательно ответит на все вопросы при звонке. Или напишите нам прямо сейчас в удобном мессенджере." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://vk.com/obrazwill",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "w-full sm:w-auto px-8 py-4 bg-white text-brand-900 font-bold text-base rounded-xl hover:bg-brand-50 transition-colors shadow-xl shadow-brand-900/20 flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Users, { size: 18 }),
                  "Написать в VK"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+78412500523",
                className: "w-full sm:w-auto px-8 py-4 bg-brand-700/50 backdrop-blur border border-brand-500/30 text-white font-bold text-base rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Phone, { size: 18 }),
                  "+7 (8412) 50-05-23"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "py-12 px-4 text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-gray-400 mb-6", children: [
          /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "text-brand-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Хорошей игры и незабываемого праздника!" }),
          /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "text-brand-400" })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors text-sm underline underline-offset-4 decoration-brand-200 hover:decoration-brand-400",
            children: "← Вернуться на главную страницу"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white py-16 px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-3xl font-black text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-lg", children: "O" }),
          "Obrazwill"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 text-gray-400 text-sm leading-relaxed mb-8", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "ИП Фролов Максим Вячеславович" }),
          /* @__PURE__ */ jsx("br", {}),
          "ИНН: 583715087360",
          /* @__PURE__ */ jsx("br", {}),
          "ОГРН: 322583500036950",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Юридический адрес:" }),
          " 440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Адреса наших квестов в Пензе:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-400 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Гагарина 28" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Пролетарская 6" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Чаадаева 36а" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 text-xs text-gray-600 space-y-1.5", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Obrazwill. Все права защищены."
          ] }),
          /* @__PURE__ */ jsx("a", { href: "/?payment", className: "text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block", children: "Правила оплаты и защита данных" }),
          /* @__PURE__ */ jsx("a", { href: "/?agreement", className: "text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block", children: "Пользовательское соглашение" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Связаться с нами" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Телефон" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+78412500523", className: "text-white hover:text-brand-300 transition-colors text-lg font-bold", children: "+7 (8412) 50-05-23" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Mail, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:obraz.strah@yandex.ru", className: "text-white hover:text-brand-300 transition-colors", children: "obraz.strah@yandex.ru" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Режим работы" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-400", children: /* @__PURE__ */ jsx(Clock, { size: 18 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: "Ежедневно" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-1", children: "с понедельника по воскресенье" }),
            /* @__PURE__ */ jsx("p", { className: "text-brand-300 font-bold text-lg", children: "09:00 — 00:00" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("nav", { "aria-label": "Социальные сети", className: "mt-8 flex gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "https://vk.com/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "ВКонтакте Obrazwill", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0077FF] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "VK" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://t.me/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "Telegram Obrazwill", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#2AABEE] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "TG" }) })
        ] })
      ] })
    ] }) })
  ] });
};
const PaymentPolicy = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40" })
    ] }),
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("a", { href: "/", className: "text-xl font-black text-brand-900 tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-base shadow-md", children: "O" }),
        "Obrazwill"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "tel:+78412500523", className: "group flex items-center gap-2 text-brand-800 font-bold bg-white border border-brand-100 px-3 py-1.5 rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Phone, { size: 14, fill: "currentColor" }) }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-sm", children: "+7 (8412) 50-05-23" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 pt-20 md:pt-24", children: [
      /* @__PURE__ */ jsxs("section", { className: "pb-12 px-4 text-center max-w-4xl mx-auto pt-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2.5 bg-white border border-brand-100 rounded-full pl-3 pr-5 py-1.5 text-sm font-bold text-gray-800 mb-8 shadow-sm", children: [
          /* @__PURE__ */ jsx(ShieldCheck, { size: 18, className: "text-brand-500" }),
          /* @__PURE__ */ jsx("span", { children: "Ваши данные надёжно защищены" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-brand-100", children: /* @__PURE__ */ jsx(Lock, { size: 44, className: "text-brand-600" }) }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight", children: [
          "Оплата и защита ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange", children: "ваших данных" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium", children: [
          "Мы заботимся о безопасности каждой транзакции и",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-semibold underline decoration-brand-300 decoration-2 underline-offset-2", children: "не передаём ваши данные третьим лицам" }),
          ". Ниже — всё, что стоит знать перед оплатой."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 shrink-0", children: /* @__PURE__ */ jsx(CreditCard, { size: 22 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black text-gray-900", children: "Способы оплаты" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-7 rounded-3xl shadow-sm border border-white hover:border-brand-200 transition-colors group relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-brand-50/60 rounded-full -mr-8 -mt-8 blur-2xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-5 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(CreditCard, { size: 26 }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-2", children: "Банковская карта" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 leading-relaxed mb-4", children: [
                "Принимаем карты Visa, Mastercard и МИР. Платежи проходят через защищённый шлюз",
                " ",
                /* @__PURE__ */ jsx("strong", { className: "text-gray-800", children: "ПАО Сбербанк" }),
                " — данные карты шифруются по стандарту TLS и не попадают на наши серверы."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 14 }),
                "Безопасное соединение SSL"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-7 rounded-3xl shadow-sm border border-white hover:border-amber-200 transition-colors group relative overflow-hidden", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-amber-50/60 rounded-full -mr-8 -mt-8 blur-2xl" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 26 }) }),
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-2", children: "Предоплата 10%" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600 leading-relaxed mb-4", children: [
                "При бронировании вносится предоплата — ",
                /* @__PURE__ */ jsx("strong", { className: "text-gray-800", children: "от 2 000 ₽" }),
                ", не более 10% от стоимости пакета. Остаток оплачивается в день праздника наличными или картой."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 14 }),
                "Без скрытых комиссий"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-brand-100/40 rounded-full -mr-16 -mt-16 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-accent-orange/10 rounded-full -ml-16 -mb-16 blur-3xl" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col md:flex-row gap-6 items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white shrink-0", children: /* @__PURE__ */ jsx(RefreshCw, { size: 28 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black text-gray-900 mb-3", children: "Гарантия возврата средств" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600 leading-relaxed text-base md:text-lg mb-4", children: [
              "Максим Фролов, основатель Obrazwill Kids, лично гарантирует: если праздник не оправдал ожиданий или возникла проблема при оплате — мы ",
              /* @__PURE__ */ jsx("strong", { className: "text-brand-700", children: "вернём деньги в полном объёме" }),
              ". Без бюрократии и лишних вопросов."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
              "Для инициирования возврата свяжитесь с нами по телефону",
              " ",
              /* @__PURE__ */ jsx("a", { href: "tel:+78412500523", className: "text-brand-600 font-bold hover:underline", children: "+7 (8412) 50-05-23" }),
              " ",
              "или по email",
              " ",
              /* @__PURE__ */ jsx("a", { href: "mailto:obraz.strah@yandex.ru", className: "text-brand-600 font-bold hover:underline", children: "obraz.strah@yandex.ru" }),
              "."
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex items-start gap-5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0 mt-0.5", children: /* @__PURE__ */ jsx(AlertCircle, { size: 24 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-amber-900 text-xl mb-3", children: "Почему платёж может не пройти?" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800 leading-relaxed mb-4", children: "В редких случаях банк может отклонить транзакцию. Самые частые причины:" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: [
            "Недостаточно средств на счёте",
            "Истёк срок действия карты",
            "Ошибка при вводе реквизитов — проверьте номер, дату и CVV",
            "Банк заблокировал онлайн-платежи — уточните в службе поддержки вашего банка"
          ].map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2.5 text-sm text-amber-800", children: [
            /* @__PURE__ */ jsx("span", { className: "w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-amber-700 font-bold text-[10px]", children: i + 1 }),
            item
          ] }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-800 mt-4", children: "Если проблема не решается — позвоните нам, предложим альтернативный способ оплаты." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 shrink-0", children: /* @__PURE__ */ jsx(Lock, { size: 22 }) }),
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black text-gray-900", children: "Конфиденциальность данных" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm overflow-hidden", children: [
          {
            icon: /* @__PURE__ */ jsx(ShieldCheck, { size: 20 }),
            color: "bg-brand-100 text-brand-700",
            title: "Шифрование при передаче",
            text: "Имя, телефон, email и платёжные реквизиты передаются исключительно по протоколу HTTPS. Соединение защищено современным TLS-шифрованием."
          },
          {
            icon: /* @__PURE__ */ jsx(RefreshCw, { size: 20 }),
            color: "bg-green-100 text-green-700",
            title: "Данные не хранятся после оплаты",
            text: "Номер карты и CVV-код не сохраняются на серверах Obrazwill Kids — после завершения транзакции они немедленно удаляются из системы."
          },
          {
            icon: /* @__PURE__ */ jsx(Lock, { size: 20 }),
            color: "bg-purple-100 text-purple-700",
            title: "Никакой передачи третьим лицам",
            text: "Ваши персональные данные используются только для подтверждения бронирования и связи с вами. Продажа или передача данных третьим лицам исключена."
          },
          {
            icon: /* @__PURE__ */ jsx(CheckCircle2, { size: 20 }),
            color: "bg-amber-100 text-amber-700",
            title: "Соответствие законодательству РФ",
            text: "Мы работаем в соответствии с Федеральным законом №152-ФЗ «О персональных данных». Вы вправе запросить удаление своих данных в любой момент."
          }
        ].map((item, i) => /* @__PURE__ */ jsxs("div", { className: `flex items-start gap-5 p-6 ${i < 3 ? "border-b border-gray-100" : ""}`, children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shrink-0`, children: item.icon }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h4", { className: "font-bold text-gray-900 text-base mb-1", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: item.text })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-brand-900 rounded-[2rem] p-8 md:p-10 text-center text-white relative overflow-hidden shadow-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -ml-16 -mb-16" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl md:text-3xl font-black mb-3", children: "Остались вопросы по оплате?" }),
          /* @__PURE__ */ jsx("p", { className: "text-brand-100 mb-8 max-w-xl mx-auto leading-relaxed", children: "Наш менеджер объяснит всё лично и подберёт удобный для вас способ расчёта." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+78412500523",
                className: "w-full sm:w-auto px-8 py-3.5 bg-white text-brand-900 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-lg flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Phone, { size: 18 }),
                  "+7 (8412) 50-05-23"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:obraz.strah@yandex.ru",
                className: "w-full sm:w-auto px-8 py-3.5 bg-brand-700/50 border border-brand-500/30 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsx(Mail, { size: 18 }),
                  "obraz.strah@yandex.ru"
                ]
              }
            )
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-10 px-4 text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 mb-4", children: "Последнее обновление: 25.02.2026 · ИП Фролов Максим Вячеславович" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors text-sm underline underline-offset-4 decoration-brand-200 hover:decoration-brand-400",
            children: "← Вернуться на главную страницу"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white py-16 px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-3xl font-black text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-lg", children: "O" }),
          "Obrazwill"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 text-gray-400 text-sm leading-relaxed mb-8", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "ИП Фролов Максим Вячеславович" }),
          /* @__PURE__ */ jsx("br", {}),
          "ИНН: 583715087360",
          /* @__PURE__ */ jsx("br", {}),
          "ОГРН: 322583500036950"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Адреса наших квестов в Пензе:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-400 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Гагарина 28" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Пролетарская 6" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Чаадаева 36а" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 text-xs text-gray-600", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Obrazwill. Все права защищены."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Связаться с нами" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Телефон" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+78412500523", className: "text-white hover:text-brand-300 transition-colors text-lg font-bold", children: "+7 (8412) 50-05-23" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Mail, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:obraz.strah@yandex.ru", className: "text-white hover:text-brand-300 transition-colors", children: "obraz.strah@yandex.ru" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Режим работы" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-400", children: /* @__PURE__ */ jsx(Clock, { size: 18 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: "Ежедневно" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-1", children: "с понедельника по воскресенье" }),
            /* @__PURE__ */ jsx("p", { className: "text-brand-300 font-bold text-lg", children: "09:00 — 00:00" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("nav", { "aria-label": "Социальные сети", className: "mt-8 flex gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "https://vk.com/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "ВКонтакте Obrazwill", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0077FF] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "VK" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://t.me/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "Telegram Obrazwill", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#2AABEE] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "TG" }) })
        ] })
      ] })
    ] }) })
  ] });
};
const AGREEMENT_URL = "https://obrazwill-kids.ru/?agreement";
const UserAgreement = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[10%] left-[15%] w-3 h-3 bg-brand-300/40 rounded-full animate-bounce", style: { animationDelay: "0s", animationDuration: "3s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[25%] right-[20%] w-2 h-2 bg-accent-orange/40 rounded-full animate-bounce", style: { animationDelay: "1s", animationDuration: "4s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[50%] left-[8%] w-4 h-4 bg-brand-200/30 rounded-full animate-bounce", style: { animationDelay: "0.5s", animationDuration: "3.5s" } })
    ] }),
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("a", { href: "/", className: "text-xl font-black text-brand-900 tracking-tight flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-base shadow-md", children: "O" }),
        "Obrazwill"
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "tel:+78412500523", className: "group flex items-center gap-2 text-brand-800 font-bold bg-white border border-brand-100 px-3 py-1.5 rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Phone, { size: 14, fill: "currentColor" }) }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-sm", children: "+7 (8412) 50-05-23" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 pt-20 md:pt-24", children: [
      /* @__PURE__ */ jsxs("section", { className: "pb-12 px-4 text-center max-w-4xl mx-auto pt-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2.5 bg-white border border-brand-100 rounded-full pl-3 pr-5 py-1.5 text-sm font-bold text-gray-800 mb-8 shadow-sm", children: [
          /* @__PURE__ */ jsx(Shield, { size: 18, className: "text-brand-500" }),
          /* @__PURE__ */ jsx("span", { children: "Юридическая информация" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-brand-100", children: /* @__PURE__ */ jsx(FileText, { size: 44, className: "text-brand-600" }) }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight", children: [
          "Пользовательское ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange", children: "соглашение" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium", children: [
          "Дата последнего обновления: ",
          /* @__PURE__ */ jsx("strong", { className: "text-gray-700", children: "25 февраля 2026 года" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "pb-8 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-brand-100/40 rounded-full -mr-16 -mt-16 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-accent-orange/10 rounded-full -ml-16 -mb-16 blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-700 leading-relaxed text-base md:text-lg", children: [
          "Настоящее пользовательское соглашение (далее — Соглашение) определяет порядок и условия использования материалов и сервисов, размещённых в сети Интернет по адресу",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://obrazwill-kids.ru/", target: "_blank", rel: "noopener noreferrer", className: "text-brand-600 font-semibold hover:text-brand-700 underline underline-offset-2 decoration-brand-300", children: "https://obrazwill-kids.ru/" }),
          " ",
          "(далее — Сайт) Пользователями данного Сайта. Использование Пользователями Сайта означает, что они безоговорочно принимают и обязуются соблюдать все условия настоящего Соглашения."
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxs(AgreementSection, { number: "1", title: "ОБЩИЕ ПОЛОЖЕНИЯ", children: [
          /* @__PURE__ */ jsxs("p", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("strong", { children: "1.1" }),
            " В настоящем Соглашении, если из текста прямо не вытекает иное, следующие термины имеют указанные ниже значения:"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 pl-4 border-l-2 border-brand-100", children: [
            /* @__PURE__ */ jsx(TermDef, { term: "Администратор", children: "индивидуальный предприниматель Фролов Максим Вячеславович, ИНН: 583715087360, ОГРНИП: 322583500036950, юридический адрес: 440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93, которому принадлежат все соответствующие права на Сайт." }),
            /* @__PURE__ */ jsxs(TermDef, { term: "Акцепт", children: [
              "полное и безоговорочное принятие условий настоящего Соглашения, размещённого на Сайте по адресу",
              " ",
              /* @__PURE__ */ jsx("a", { href: AGREEMENT_URL, className: "text-brand-600 hover:text-brand-700 underline underline-offset-2 decoration-brand-300", children: AGREEMENT_URL }),
              ", осуществляемое путём совершения Пользователем любых действий по использованию Сайта."
            ] }),
            /* @__PURE__ */ jsx(TermDef, { term: "Пользователь", children: "лицо, осуществляющее доступ к Сайту и использующее материалы и сервисы, размещённые на Сайте." }),
            /* @__PURE__ */ jsx(TermDef, { term: "Контент", children: "любое информационно значимое наполнение Сайта, включая, но не ограничиваясь, фото, аудио, видео, текст и иные медиаматериалы." }),
            /* @__PURE__ */ jsx(TermDef, { term: "Личный кабинет", children: "персонализированная часть Сайта, посредством которой обеспечивается обмен информацией и документацией в электронном виде между Пользователем и Сайтом. Доступ к Личному кабинету осуществляется путём ввода Пользователем аутентификационных данных." }),
            /* @__PURE__ */ jsx(TermDef, { term: "Персональные данные", children: "любая информация, относящаяся к определённому или определяемому физическому лицу (субъекту персональных данных), в том числе его фамилия, имя, отчество, дата и место рождения, адрес, семейное, социальное, имущественное положение, образование, профессия, доходы и иные сведения." }),
            /* @__PURE__ */ jsx(TermDef, { term: "Обработка персональных данных", children: "любое действие или совокупность действий, совершаемых с использованием средств автоматизации или без них с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, удаление и уничтожение персональных данных." }),
            /* @__PURE__ */ jsxs(TermDef, { term: "Сайт", children: [
              "ресурс в сети Интернет, представляющий собой совокупность информации и объектов интеллектуальной собственности, доступ к которому обеспечивается с пользовательских устройств, подключённых к сети Интернет, по адресу",
              " ",
              /* @__PURE__ */ jsx("a", { href: "https://obrazwill-kids.ru/", target: "_blank", rel: "noopener noreferrer", className: "text-brand-600 hover:text-brand-700 underline underline-offset-2", children: "https://obrazwill-kids.ru/" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
            /* @__PURE__ */ jsx("strong", { children: "1.2" }),
            " Все остальные термины и определения толкуются в соответствии с действующим законодательством Российской Федерации."
          ] })
        ] }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "2", title: "ПРЕДМЕТ СОГЛАШЕНИЯ", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2.1" }),
            " В соответствии с настоящим Соглашением Администратор предоставляет любому Пользователю право безвозмездного использования Сайта любым способом и в любой форме в пределах его объявленных функциональных возможностей."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2.2" }),
            " Использование Сайта осуществляется в соответствии с принятым в мировой практике принципом «как есть» (as is). Никакие гарантии бесперебойной и безошибочной работы Сайта не прилагаются и не предусматриваются."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2.3" }),
            " Пользователь считается присоединившимся к настоящему Соглашению в соответствии с положениями статьи 438 ГК РФ при:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "pl-6 space-y-1 list-none", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2.3.1" }),
                " просмотре материалов, размещённых на Сайте;"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2.3.2" }),
                " использовании сервисов Сайта;"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2.3.3" }),
                " направлении сообщений через онлайн-формы на Сайте;"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "2.3.4" }),
                " ином использовании Сайта."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2.4" }),
            " Используя Сайт, Пользователь подтверждает, что ознакомился с условиями настоящего Соглашения в полном объёме и безоговорочно принимает их."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2.5" }),
            " Ни одно из положений Соглашения не может трактоваться как установление агентских отношений, совместной деятельности или иных правоотношений, прямо не предусмотренных Соглашением."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2.6" }),
            " Все возможные споры подлежат разрешению в соответствии с законодательством Российской Федерации."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "2.7" }),
            " Порядок исполнения обязательств по иным договорам между Пользователем и Администратором устанавливается в таких договорах."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "3", title: "ПРАВА И ОБЯЗАННОСТИ АДМИНИСТРАТОРА", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3.1" }),
            " В целях повышения качества Сайта Администратор вправе осуществлять сбор мнений и отзывов Пользователей. Собранные отзывы могут использоваться для формирования статистических данных и быть опубликованы Администратором."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3.2" }),
            " Администратор вправе направлять на адрес электронной почты и (или) абонентский номер Пользователя информационные сообщения, в том числе уведомления, связанные с функционированием Сайта и исполнением договоров."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3.3" }),
            " Администратор оставляет за собой право заблокировать Личный кабинет Пользователя в случае нарушения им условий настоящего Соглашения."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3.4" }),
            " Сайт или его сервисы могут быть частично или полностью недоступны в период проведения профилактических работ. Администратор вправе производить модификацию программного обеспечения Сайта по личному усмотрению."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3.5" }),
            " Администратор не несёт ответственности за ошибки, прерывания, удаление данных, сбои линий связи, несанкционированный доступ к информации Пользователя, размещённой на Сайте."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3.6" }),
            " Администратор предпримет все разумные усилия для устранения технических сбоев в приемлемый срок, не гарантируя при этом полного их отсутствия."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "3.7" }),
            " Пользователю не предоставляются интеллектуальные права на Сайт, его программное обеспечение, дизайн и иные объекты, за исключением прямо предусмотренных настоящим Соглашением."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "4", title: "ПРАВА И ОБЯЗАННОСТИ ПОЛЬЗОВАТЕЛЯ", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.1" }),
            " Пользователь обязуется знакомиться с актуальной версией Соглашения при каждом посещении Сайта и соблюдать его условия."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.2" }),
            " Пользователь обязуется предоставлять достоверную и полную информацию при использовании Сайта."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.3" }),
            " Пользователь соглашается не предпринимать действий, нарушающих российское законодательство, международные нормы в сфере интеллектуальной собственности, общепринятые нормы морали, а также не совершать действий, нарушающих нормальную работу Сайта."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.4" }),
            " Использование материалов Сайта без согласия правообладателей не допускается."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.5" }),
            " При цитировании материалов Сайта, включая охраняемые авторские произведения, ссылка на Сайт обязательна."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.6" }),
            " При использовании Сайта Пользователь не вправе нарушать права и законные интересы третьих лиц, а также причинять вред деловой репутации."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.7" }),
            " Пользователь не вправе нарушать нормальную работу Сайта и его отдельных сервисов."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.8" }),
            " Пользователь обязан самостоятельно отслеживать внесение изменений в настоящее Соглашение."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "4.9" }),
            " Пользователь вправе прекратить доступ к Личному кабинету путём направления соответствующего уведомления Администратору."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "5", title: "ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ АДМИНИСТРАТОРА", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.1" }),
            " Администратор гарантирует достоверность только той информации, которую он сам непосредственно разместил на Сайте. Ответственность за информацию, размещённую третьими лицами, Администратор не несёт."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.2" }),
            " Администратор не несёт ответственности за некорректное поведение лиц, использующих Сайт."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.3" }),
            " Администратор не гарантирует, что Сайт будет соответствовать всем требованиям Пользователя, работать непрерывно и без ошибок, а результаты его использования будут точными и надёжными."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.4" }),
            " Администратор не несёт ответственности за потери или убытки, связанные с содержанием Сайта, товарами или услугами, доступными через внешние ресурсы."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.5" }),
            " Администратор не несёт ответственности за полноту и достоверность сведений, предоставляемых Пользователями при регистрации, и не обязан проверять их достоверность."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.6" }),
            " Администратор не возмещает ущерб, включая упущенную выгоду, потерянные данные или иные убытки, возникшие в связи с использованием Сайта, за исключением случаев, прямо предусмотренных Соглашением."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.7" }),
            " Ответственность за правомерность и достоверность персональных данных, переданных через формы Сайта, несёт исключительно Пользователь."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "5.8" }),
            " Администратор не несёт ответственности за утрату, подмену или порчу данных, возникшие вследствие невыполнения Пользователем условий настоящего Соглашения."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "6", title: "ДОСТУП К РЕСУРСАМ ТРЕТЬИХ ЛИЦ", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "6.1" }),
            " Доступ Пользователя к Сайту может вызвать обращение на интернет-ресурсы третьих лиц и загрузку с них программного кода или графических объектов, используемых в рекламных целях и в целях сбора статистики. Владельцы таких ресурсов самостоятельно определяют условия использования собранной информации."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "6.2" }),
            " Пользователь вправе заблокировать запросы на графические изображения, размещённые на серверах третьих лиц, путём настройки программного обеспечения. Блокировка может привести к частичной потере функциональности страниц Сайта."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "6.3" }),
            " При переходе с Сайта на страницы сторонних ресурсов Пользователи самостоятельно определяют допустимые пределы использования своих данных в рамках правил этих ресурсов."
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "7", title: "ИСПОЛЬЗОВАНИЕ ИНФОРМАЦИИ, ХРАНЯЩЕЙСЯ НА СТОРОНЕ БРАУЗЕРА", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "7.1" }),
            " Администратор использует информацию, хранящуюся на стороне браузера Пользователя, для:"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "pl-6 space-y-1 list-none", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "поддержки функциональности ресурсов, требующих сохранения состояния сеанса;" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "измерения размеров аудитории Сайта;" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "определения информационных предпочтений Пользователей при доступе к различным страницам;" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(ArrowRight, { size: 14, className: "text-brand-400 mt-1 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: "исследования корреляции данных о посещаемости с социометрическими показателями." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Пользователь вправе запретить использование подобной информации через настройки браузера, однако это может привести к частичной или полной потере функциональности страниц Сайта." })
        ] }) }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "8", title: "СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "8.1" }),
          " Обработка персональных данных Пользователей осуществляется Администратором в соответствии с политикой конфиденциальности, размещённой по адресу",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://obrazwill-kids.ru/privacy", target: "_blank", rel: "noopener noreferrer", className: "text-brand-600 hover:text-brand-700 underline underline-offset-2 decoration-brand-300", children: "https://obrazwill-kids.ru/privacy" }),
          "."
        ] }) }),
        /* @__PURE__ */ jsx(AgreementSection, { number: "9", title: "ИЗМЕНЕНИЕ УСЛОВИЙ И РАСТОРЖЕНИЕ СОГЛАШЕНИЯ", children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "9.1" }),
            " Соглашение может быть расторгнуто в любое время по инициативе любой из сторон. Администратор уведомляет о расторжении путём размещения соответствующего уведомления на Сайте и (или) направления письма на e-mail Пользователя. С момента такого размещения / направления Соглашение считается расторгнутым."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "9.2" }),
            " Пользователь может расторгнуть настоящее Соглашение, направив уведомление Администратору по электронной почте:",
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:obraz.strah@yandex.ru", className: "text-brand-600 hover:text-brand-700 underline underline-offset-2 decoration-brand-300", children: "obraz.strah@yandex.ru" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("strong", { children: "9.3" }),
            " Пользователь соглашается, что настоящее Соглашение может быть изменено Администратором в одностороннем порядке путём публикации обновлённого текста. Дальнейшее использование Сайта подтверждает согласие с изменёнными условиями. При несогласии Пользователь обязуется прекратить использование Сайта."
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "pb-16 px-4 max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 shadow-sm", children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-xl font-black text-gray-900 mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-black text-base", children: "A" }),
          "Информация об Администраторе"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5 text-sm text-gray-600", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-gray-900 text-base", children: "ИП Фролов Максим Вячеславович" }),
            /* @__PURE__ */ jsx("p", { children: "ИНН: 583715087360" }),
            /* @__PURE__ */ jsx("p", { children: "ОГРНИП: 322583500036950" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 15, className: "text-brand-500 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("p", { children: "440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Mail, { size: 15, className: "text-brand-500 shrink-0" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:obraz.strah@yandex.ru", className: "text-brand-600 hover:text-brand-700 transition-colors", children: "obraz.strah@yandex.ru" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "py-12 px-4 text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 text-gray-400 mb-6", children: [
          /* @__PURE__ */ jsx(Shield, { size: 16, className: "text-brand-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Ваши права надёжно защищены" }),
          /* @__PURE__ */ jsx(Shield, { size: 16, className: "text-brand-400" })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/",
            className: "inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors text-sm underline underline-offset-4 decoration-brand-200 hover:decoration-brand-400",
            children: "← Вернуться на главную страницу"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white py-16 px-4 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-3xl font-black text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-lg", children: "O" }),
          "Obrazwill"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 text-gray-400 text-sm leading-relaxed mb-8", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "ИП Фролов Максим Вячеславович" }),
          /* @__PURE__ */ jsx("br", {}),
          "ИНН: 583715087360",
          /* @__PURE__ */ jsx("br", {}),
          "ОГРН: 322583500036950",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Юридический адрес:" }),
          " 440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Адреса наших квестов в Пензе:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-400 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Гагарина 28" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Пролетарская 6" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Чаадаева 36а" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 text-xs text-gray-600 space-y-1.5", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Obrazwill. Все права защищены."
          ] }),
          /* @__PURE__ */ jsx("a", { href: "/?payment", className: "text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block", children: "Правила оплаты и защита данных" }),
          /* @__PURE__ */ jsx("a", { href: "/?agreement", className: "text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block", children: "Пользовательское соглашение" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Связаться с нами" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Телефон" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+78412500523", className: "text-white hover:text-brand-300 transition-colors text-lg font-bold", children: "+7 (8412) 50-05-23" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Mail, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:obraz.strah@yandex.ru", className: "text-white hover:text-brand-300 transition-colors", children: "obraz.strah@yandex.ru" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Режим работы" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-400", children: /* @__PURE__ */ jsx(Clock, { size: 18 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: "Ежедневно" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-1", children: "с понедельника по воскресенье" }),
            /* @__PURE__ */ jsx("p", { className: "text-brand-300 font-bold text-lg", children: "09:00 — 00:00" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("nav", { "aria-label": "Социальные сети", className: "mt-8 flex gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "https://vk.com/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "ВКонтакте Obrazwill", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0077FF] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "VK" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://t.me/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "Telegram Obrazwill", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#2AABEE] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "TG" }) })
        ] })
      ] })
    ] }) })
  ] });
};
const AgreementSection = ({ number, title, children }) => /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white p-7 md:p-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
    /* @__PURE__ */ jsx("div", { className: "w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-black text-base shrink-0", children: number }),
    /* @__PURE__ */ jsx("h2", { className: "text-lg md:text-xl font-black text-gray-900 tracking-tight", children: title })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "text-gray-700 text-sm md:text-base leading-relaxed space-y-2", children })
] });
const TermDef = ({ term, children }) => /* @__PURE__ */ jsxs("div", { children: [
  /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: term }),
  " — ",
  /* @__PURE__ */ jsx("span", { children })
] });
const FAQ_ITEMS = [
  {
    question: "С какого возраста подходят ваши праздники?",
    answer: "Наши программы рассчитаны на детей от 7 лет. Программу подбираем индивидуально под именинника и его гостей — возраст, интересы и характер компании учитываем при каждом бронировании. Подробности уточняйте у менеджера."
  },
  {
    question: "Сколько детей может участвовать?",
    answer: "Базовые пакеты рассчитаны на 8 детей. Каждый дополнительный гость — +1 900 ₽. Для компаний от 12 детей рекомендуем формат Among Us — он вмещает больше участников и подходит для больших групп."
  },
  {
    question: "Входят ли взрослые в стоимость?",
    answer: "Взрослые сопровождающие проходят бесплатно. Пока дети веселятся на квесте — вы можете спокойно отдыхать за столом и общаться с другими родителями."
  },
  {
    question: "Можно ли принести свой торт?",
    answer: "Да! Вы можете привезти торт от любого кондитера. Мы также можем помочь с заказом — уточните у менеджера при бронировании, и мы подберём подходящий вариант."
  },
  {
    question: "Что если ребёнок испугается во время квеста?",
    answer: "Наши актёры — профессионалы, которые чутко следят за настроением каждого ребёнка. Уровень интенсивности настраивается под вашу компанию ещё до начала. Выйти из игры можно в любой момент — никакого давления."
  },
  {
    question: "Как происходит оплата?",
    answer: "Для подтверждения брони нужна предоплата 10% (минимум 2 000 ₽). Оставшуюся сумму оплачиваете в день праздника — наличными или картой."
  },
  {
    question: "Есть ли парковка рядом с площадками?",
    answer: "Да, у всех трёх наших локаций есть удобная парковка для гостей. Точное место для парковки менеджер пришлёт вместе с подтверждением бронирования."
  },
  {
    question: "Можно ли выбрать тему или персонажей праздника?",
    answer: "Конечно! Мы адаптируем программу под любимых героев именинника. Расскажите менеджеру об интересах ребёнка — придумаем персонализированный сценарий."
  }
];
const FAQ = ({ onOpenManager }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return /* @__PURE__ */ jsxs("section", { id: "faq", "aria-label": "Часто задаваемые вопросы", className: "py-20 md:py-28 px-4 max-w-4xl mx-auto border-t border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("span", { className: "text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block", children: "FAQ" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight", children: "Отвечаем на частые вопросы" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-500 max-w-2xl mx-auto", children: "Если не нашли ответ — напишите нам, ответим быстро." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-3", children: FAQ_ITEMS.map((item, idx) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: `bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === idx ? "border-brand-300 shadow-md shadow-brand-100/50" : "border-gray-100 shadow-sm hover:border-brand-200"}`,
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "w-full text-left px-6 py-5 flex items-center justify-between gap-4",
              "aria-expanded": openIndex === idx,
              onClick: () => setOpenIndex(openIndex === idx ? null : idx),
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-500"}`,
                      children: /* @__PURE__ */ jsx(HelpCircle, { size: 16 })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900 text-base md:text-lg leading-snug", children: item.question })
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `shrink-0 transition-transform duration-300 ${openIndex === idx ? "rotate-180 text-brand-500" : "text-gray-400"}`,
                    children: /* @__PURE__ */ jsx(ChevronDown, { size: 20 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
              children: /* @__PURE__ */ jsx("p", { className: "px-6 pb-6 text-gray-600 leading-relaxed pl-[4.25rem]", children: item.answer })
            }
          )
        ]
      },
      idx
    )) }),
    onOpenManager && /* @__PURE__ */ jsxs("div", { className: "mt-10 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "Не нашли ответ на свой вопрос?" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: onOpenManager,
          className: "inline-flex items-center gap-2 bg-brand-50 text-brand-700 border border-brand-200 font-bold px-6 py-3 rounded-xl hover:bg-brand-100 transition-colors",
          children: [
            /* @__PURE__ */ jsx(MessageCircle, { size: 20 }),
            "Задать вопрос менеджеру"
          ]
        }
      )
    ] })
  ] });
};
const MainApp = () => {
  const [dayType, setDayType] = useState("weekday");
  const [extraGuests, setExtraGuests] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBusinessHours, setIsBusinessHours] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showManagerPopup, setShowManagerPopup] = useState(false);
  const cookieBannerActiveRef = useRef(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    const checkTime = () => {
      const now = /* @__PURE__ */ new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      setIsBusinessHours(minutes >= 570 && minutes < 1200);
    };
    checkTime();
    const interval = setInterval(checkTime, 6e4);
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => {
        setShowCookieConsent(true);
        cookieBannerActiveRef.current = true;
      }, 2e3);
    }
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0) {
        const hasSeenExit = sessionStorage.getItem("hasSeenExitPopup");
        if (!hasSeenExit && !cookieBannerActiveRef.current) {
          setShowExitPopup(true);
          sessionStorage.setItem("hasSeenExitPopup", "true");
        }
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handlePackageSelect = (id) => {
    setSelectedPackageId(id);
    const constructorElement = document.getElementById("constructor-section");
    if (constructorElement) {
      constructorElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookieConsent(false);
    cookieBannerActiveRef.current = false;
  };
  const handleManagerSubmit = (e) => {
    e.preventDefault();
    setShowManagerPopup(false);
    alert("Спасибо! Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.");
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative", children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 pointer-events-none z-0", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40" })
    ] }),
    /* @__PURE__ */ jsx("header", { className: "fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm supports-[backdrop-filter]:bg-white/80", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-base font-black text-brand-900 tracking-tight flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "w-6 h-6 bg-gradient-to-br from-brand-500 to-brand-700 rounded-md flex items-center justify-center text-white text-xs shadow-md", children: "O" }),
        "Obrazwill"
      ] }),
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Навигация по странице", className: "hidden lg:flex items-center gap-5", children: [
        /* @__PURE__ */ jsx("a", { href: "#pricing", className: "text-xs font-medium text-gray-600 hover:text-brand-600 transition-colors", children: "Пакеты и цены" }),
        /* @__PURE__ */ jsx("a", { href: "#constructor-section", className: "text-xs font-medium text-gray-600 hover:text-brand-600 transition-colors", children: "Конструктор" }),
        /* @__PURE__ */ jsx("a", { href: "#faq", className: "text-xs font-medium text-gray-600 hover:text-brand-600 transition-colors", children: "FAQ" })
      ] }),
      /* @__PURE__ */ jsxs("a", { href: "tel:+78412500523", className: "group flex items-center gap-1.5 text-brand-800 font-bold bg-white border border-brand-100 px-2.5 py-1 rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all shadow-sm", children: [
        /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Phone, { size: 12, fill: "currentColor" }) }),
        /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-xs", children: "+7 (8412) 50-05-23" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "relative z-10 pt-16 md:pt-20", children: [
      /* @__PURE__ */ jsxs("section", { "aria-label": "Главная секция", className: "pb-16 px-4 text-center max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2.5 bg-white border border-red-100 rounded-full pl-3 pr-5 py-1.5 text-sm font-bold text-gray-800 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default", children: [
          /* @__PURE__ */ jsx(Heart, { size: 18, className: "text-red-500 fill-red-500 animate-pulse" }),
          /* @__PURE__ */ jsx("span", { children: "Мамы доверяют, дети в восторге" })
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight", children: [
          "Подарите ребенку ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          "праздник мечты, ",
          /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange", children: "а себе — 3 часа отдыха" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed font-medium", children: [
          'Мы не продаем просто "аниматора". Мы продаем ',
          /* @__PURE__ */ jsx("span", { className: "text-gray-900 font-semibold underline decoration-brand-300 decoration-2 underline-offset-2", children: "спокойствие родителей" }),
          ", вовлеченность каждого ребенка и крутой контент на память."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-20", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-green-200 transition-colors group", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 28 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-1", children: "100% Спокойствия" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: "Дети заняты и под присмотром. Вы отдыхаете и общаетесь с гостями." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-orange-200 transition-colors group", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-orange-100 w-12 h-12 rounded-2xl flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Sparkles, { size: 28 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-1", children: "Именинник — звезда" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: "В центре внимания весь праздник, а не только когда выносят торт." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-blue-200 transition-colors group", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Camera, { size: 28 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-gray-900 text-lg mb-1", children: "Контент на память" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 leading-relaxed", children: "Видео с квеста или фото — чтобы праздник остался в истории." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { "aria-label": "Наши достижения", className: "pb-16 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm border border-white rounded-3xl p-6 text-center shadow-sm hover:shadow-md hover:border-brand-100 transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-11 h-11 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Trophy, { size: 22 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 leading-none mb-1", children: "500+" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 font-medium leading-tight", children: [
            "праздников",
            /* @__PURE__ */ jsx("br", {}),
            "проведено"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm border border-white rounded-3xl p-6 text-center shadow-sm hover:shadow-md hover:border-brand-100 transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-11 h-11 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(CalendarDays, { size: 22 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 leading-none mb-1", children: "5+" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 font-medium leading-tight", children: [
            "лет на рынке",
            /* @__PURE__ */ jsx("br", {}),
            "развлечений"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm border border-white rounded-3xl p-6 text-center shadow-sm hover:shadow-md hover:border-amber-100 transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-11 h-11 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Star, { size: 22, className: "fill-amber-400 text-amber-400" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-black text-gray-900 leading-none mb-1", children: "5.0 ⭐" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 font-medium leading-tight", children: [
            "рейтинг на",
            /* @__PURE__ */ jsx("br", {}),
            "Яндекс.Картах"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/80 backdrop-blur-sm border border-white rounded-3xl p-6 text-center shadow-sm hover:shadow-md hover:border-brand-100 transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-11 h-11 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Award, { size: 22 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-black text-gray-900 leading-none mb-1", children: "2026" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500 font-medium leading-tight", children: [
            "«Хорошее место»",
            /* @__PURE__ */ jsx("br", {}),
            "Яндекс.Карты"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { "aria-labelledby": "pricing-heading", className: "pb-24 px-4 max-w-7xl mx-auto", id: "pricing", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("h2", { id: "pricing-heading", className: "text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight", children: "Выберите сценарий идеального дня рождения" }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-500", children: "Выберите уровень впечатлений, который подходит вашему ребенку" })
        ] }),
        /* @__PURE__ */ jsx(PricingToggle, { dayType, setDayType }),
        /* @__PURE__ */ jsx(GuestSelector, { extraGuests, setExtraGuests }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6 lg:gap-8 items-start mb-16 px-2", children: PACKAGES.map((pkg) => /* @__PURE__ */ jsx(
          PackageCard,
          {
            pkg,
            dayType,
            extraGuests,
            onSelect: () => handlePackageSelect(pkg.id)
          },
          pkg.id
        )) }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mb-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 text-center relative overflow-hidden shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-brand-500 mb-4", children: /* @__PURE__ */ jsx(Wand2, { size: 24 }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-gray-900 mb-3", children: "Все пакеты — мобильны!" }),
            /* @__PURE__ */ jsxs("p", { className: "text-gray-600 md:text-lg max-w-2xl leading-relaxed", children: [
              "Если вам чего-то не хватает или наоборот что-то лишнее, то мы готовы собрать ",
              /* @__PURE__ */ jsx("span", { className: "text-brand-700 font-semibold", children: "идеальный праздник мечты" }),
              " специально для вас."
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-40 h-40 bg-brand-100/50 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-40 h-40 bg-accent-orange/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto mb-32", children: /* @__PURE__ */ jsx(Timeline, {}) }),
        /* @__PURE__ */ jsxs("div", { id: "constructor-section", className: "max-w-6xl mx-auto mb-20 scroll-mt-28", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
            /* @__PURE__ */ jsx("span", { className: "text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block", children: "Индивидуальный подход" }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-black text-gray-900 mb-4", children: "Хотите собрать свой вариант?" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg", children: "Начните с базы и добавьте только то, что хочется" })
          ] }),
          /* @__PURE__ */ jsx(
            Constructor,
            {
              dayType,
              setDayType,
              extraGuests,
              selectedPackageId,
              onClearPackage: () => setSelectedPackageId(null),
              onOpenManagerPopup: () => setShowManagerPopup(true)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { "aria-label": "Вопросы и контакты", className: "bg-brand-900 py-16 md:py-24 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-brand-700/50 rounded-full blur-[100px] -mr-32 -mt-32" }),
          /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-800/50 rounded-full blur-[100px] -ml-32 -mb-32" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 relative z-10 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-lg text-brand-300", children: /* @__PURE__ */ jsx(HelpCircle, { size: 36 }) }),
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-5xl font-black text-white mb-6 tracking-tight", children: [
            "Остались вопросы? ",
            /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
            /* @__PURE__ */ jsx("span", { className: "text-brand-300", children: "Наши менеджеры ответят и расскажут" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-brand-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed", children: "Мы понимаем, что каждый праздник уникален. Позвоните нам или оставьте заявку, чтобы обсудить детали и подобрать идеальный вариант." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowManagerPopup(true),
                className: "w-full sm:w-auto px-8 py-4 bg-white text-brand-900 font-bold text-lg rounded-xl hover:bg-brand-50 transition-colors shadow-xl shadow-brand-900/20 active:scale-[0.98]",
                children: "Задать вопрос менеджеру"
              }
            ),
            /* @__PURE__ */ jsxs("a", { href: "tel:+78412500523", className: "w-full sm:w-auto px-8 py-4 bg-brand-700/50 backdrop-blur border border-brand-500/30 text-white font-bold text-lg rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx(Phone, { size: 20 }),
              /* @__PURE__ */ jsx("span", { children: "+7 (8412) 50-05-23" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Reviews, {}),
      /* @__PURE__ */ jsx(Locations, {}),
      /* @__PURE__ */ jsx(FAQ, { onOpenManager: () => setShowManagerPopup(true) }),
      /* @__PURE__ */ jsx("section", { "aria-label": "Оставить заявку", className: "py-20 px-4 relative", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto bg-gradient-to-br from-brand-900 to-brand-800 rounded-[2.5rem] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-900/30", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-brand-500/30 rounded-full blur-3xl -ml-16 -mb-16" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-5xl font-black mb-6 tracking-tight", children: "Остались вопросы?" }),
          /* @__PURE__ */ jsxs("p", { className: "text-brand-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed", children: [
            "Оставьте заявку и мы перезвоним вам в течении ",
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-2.5 py-0.5 rounded-lg text-white font-bold border border-white/10", children: [
              /* @__PURE__ */ jsx(Timer, { size: 16 }),
              " 5-15 минут"
            ] }),
            ", чтобы ответить на любые Ваши вопросы"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowManagerPopup(true),
              className: "bg-white text-brand-900 font-bold text-lg px-12 py-5 rounded-2xl hover:bg-brand-50 transition-all shadow-xl shadow-brand-900/40 active:scale-[0.95] hover:-translate-y-1 ring-4 ring-brand-900/20",
              children: "Оставить заявку"
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: `bg-gray-900 text-white py-16 px-4 relative z-10 transition-all duration-300 ${showBottomBar ? "mb-[72px]" : ""}`, children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto grid md:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-3xl font-black text-white mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-lg", children: "O" }),
          "Obrazwill"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 text-gray-400 text-sm leading-relaxed mb-8", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-gray-200", children: "ИП Фролов Максим Вячеславович" }),
          /* @__PURE__ */ jsx("br", {}),
          "ИНН: 583715087360",
          /* @__PURE__ */ jsx("br", {}),
          "ОГРН: 322583500036950",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-gray-500", children: "Юридический адрес:" }),
          " 440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93"
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h4", { className: "font-bold text-white text-sm uppercase tracking-wider", children: "Адреса наших квестов в Пензе:" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-gray-400 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Гагарина 28" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Пролетарская 6" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsx(MapPin, { size: 16, className: "shrink-0 mt-0.5 text-brand-500" }),
              /* @__PURE__ */ jsx("p", { children: "Г. Пенза, ул. Чаадаева 36а" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 text-xs text-gray-600 space-y-1.5", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Obrazwill. Все права защищены."
          ] }),
          /* @__PURE__ */ jsx("a", { href: "/?payment", className: "text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block", children: "Правила оплаты и защита данных" }),
          /* @__PURE__ */ jsx("a", { href: "/?agreement", className: "text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block", children: "Пользовательское соглашение" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Связаться с нами" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-300", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Phone, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Телефон" }),
              /* @__PURE__ */ jsx("a", { href: "tel:+78412500523", className: "text-white hover:text-brand-300 transition-colors text-lg font-bold", children: "+7 (8412) 50-05-23" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3 group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors", children: /* @__PURE__ */ jsx(Mail, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-gray-500 uppercase font-bold", children: "Email" }),
              /* @__PURE__ */ jsx("a", { href: "mailto:obraz.strah@yandex.ru", className: "text-white hover:text-brand-300 transition-colors", children: "obraz.strah@yandex.ru" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-white mb-6 text-lg", children: "Режим работы" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-400", children: /* @__PURE__ */ jsx(Clock, { size: 18 }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-white font-medium", children: "Ежедневно" }),
            /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-sm mb-1", children: "с понедельника по воскресенье" }),
            /* @__PURE__ */ jsx("p", { className: "text-brand-300 font-bold text-lg", children: "09:00 — 00:00" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("nav", { "aria-label": "Социальные сети", className: "mt-8 flex gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: "https://vk.com/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "ВКонтакте Obrazwill Kids", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0077FF] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "VK" }) }),
          /* @__PURE__ */ jsx("a", { href: "https://t.me/obrazwill", target: "_blank", rel: "noopener noreferrer", "aria-label": "Telegram Obrazwill Kids", className: "w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#2AABEE] hover:text-white transition-all text-gray-400 border border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "font-bold text-[10px]", children: "TG" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed right-4 md:right-6 z-[55] flex flex-col items-end gap-3 transition-all duration-300`,
        style: { bottom: showBottomBar ? "92px" : "30px" },
        children: [
          /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${isContactOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"}`, children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://vk.com/obrazwill",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-3 bg-[#0077FF] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-lg hover:brightness-110 transition-all border border-white/20",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold whitespace-nowrap", children: "Написать в VK" }),
                /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { d: "M13.162 18.994c.609 0 1.016-.085 1.232-.249.203-.163.266-.45.266-.879 0-.606-.025-1.32.044-1.587.106-.414.497-.563.894-.156.403.414 1.765 2.566 2.658 2.87.671.228 1.173.067 1.173.067l2.36-.024c.71 0 .695-.376.541-.75-.195-.466-1.302-2.316-1.683-2.736-.37-.406-.514-.57-.096-1.144 0 0 1.956-2.666 2.13-3.486.079-.374-.265-.544-.813-.544l-2.434.017c-.206-.007-.446.064-.582.353-.058.125-.972 2.406-1.353 3.053-.787 1.34-1.106 1.458-1.236 1.267-.282-.416-.208-1.673-.208-2.585 0-2.822.446-4.008-1.047-4.008-1.011 0-1.678.307-2.112.63-.306.226-.538.744-.395.772.179.035.586.166.801.446.28.365.27.913.27 2.916 0 .618-.113 2.218-1.139 2.218-.328 0-1.137-.367-1.928-1.688-1.04-1.745-1.847-3.69-1.847-3.69s-.144-.355-.407-.549c-.214-.158-.512-.209-.512-.209l-2.569.017c-.383 0-.528.174-.528.367 0 .341.42 2.059 2.007 4.195 2.484 3.344 5.345 3.514 5.954 3.514z" }) }) })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsContactOpen(!isContactOpen),
              className: "w-12 h-12 bg-brand-500 text-white rounded-full shadow-xl shadow-brand-500/30 flex items-center justify-center hover:bg-brand-600 hover:scale-105 transition-all relative z-10",
              "aria-label": "Связаться с нами",
              children: [
                isContactOpen ? /* @__PURE__ */ jsx(X, { size: 24 }) : /* @__PURE__ */ jsx(MessageCircle, { size: 24, fill: "currentColor", className: "text-white" }),
                !isContactOpen && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: scrollToTop,
              className: `w-10 h-10 bg-gray-900/80 backdrop-blur text-white rounded-full shadow-lg flex items-center justify-center hover:bg-black transition-all duration-300
                ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0 h-0 w-0 overflow-hidden"}
            `,
              "aria-label": "Наверх",
              children: /* @__PURE__ */ jsx(ArrowUp, { size: 20 })
            }
          )
        ]
      }
    ),
    showBottomBar && /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 z-[50] bg-white/95 backdrop-blur-xl border-t border-brand-200 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] py-3 px-4 animate-in slide-in-from-bottom-full duration-500", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto flex items-center justify-between gap-3 md:gap-4 relative pr-8 md:pr-0", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:block shrink-0", children: isBusinessHours ? /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-900 text-xs leading-tight flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-100" }),
        "Мы сейчас онлайн и оперативно ответим"
      ] }) : /* @__PURE__ */ jsxs("p", { className: "font-bold text-gray-900 text-xs leading-tight flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-red-400" }),
        "Мы сейчас отдыхаем, но утром сразу перезвоним"
      ] }) }),
      /* @__PURE__ */ jsxs("form", { className: "flex w-full md:w-auto gap-2 flex-1 md:flex-none justify-center", onSubmit: (e) => {
        e.preventDefault();
        setShowBottomBar(false);
        alert("Спасибо! Мы перезвоним вам в ближайшее время.");
      }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            placeholder: "+7 (___) ___-__-__",
            className: "w-full md:w-56 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all text-gray-900"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "bg-brand-600 text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-brand-700 active:scale-95 transition-all shadow-sm shadow-brand-200 whitespace-nowrap", children: "Жду звонка" })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowBottomBar(false),
          className: "absolute right-0 top-1/2 -translate-y-1/2 md:static md:translate-y-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all",
          "aria-label": "Скрыть",
          children: /* @__PURE__ */ jsx(X, { size: 16 })
        }
      )
    ] }) }),
    showCookieConsent && /* @__PURE__ */ jsx("div", { className: `fixed ${showBottomBar ? "bottom-[84px]" : "bottom-2"} md:bottom-6 left-0 right-0 md:left-4 md:right-auto md:max-w-md z-[60] p-4 animate-in slide-in-from-bottom duration-500`, children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(Cookie, { className: "text-brand-400 shrink-0", size: 24 }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 leading-relaxed", children: "Мы используем куки, чтобы сайт работал быстрее, а праздник подбирался удобнее." })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: acceptCookies,
          className: "bg-white text-gray-900 font-bold py-2 px-4 rounded-xl text-sm hover:bg-gray-200 transition-colors w-full",
          children: "Хорошо, я согласен"
        }
      )
    ] }) }),
    showExitPopup && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300", onClick: () => setShowExitPopup(false) }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowExitPopup(false),
            className: "absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full",
            children: /* @__PURE__ */ jsx(X, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 animate-bounce", children: /* @__PURE__ */ jsx(BellRing, { size: 32 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-gray-900 mb-2 leading-tight", children: "Подождите!" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-lg leading-snug", children: "Давайте мы перезвоним и ответим на все ваши вопросы?" })
        ] }),
        /* @__PURE__ */ jsx("form", { onSubmit: (e) => {
          e.preventDefault();
          setShowExitPopup(false);
          alert("Спасибо! Мы скоро перезвоним.");
        }, children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              placeholder: "Ваш номер телефона",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all",
              required: true
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "w-full bg-brand-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]", children: "Позвоните мне" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-gray-400 mt-4", children: "Это займет всего 30 секунд" })
      ] })
    ] }),
    showManagerPopup && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[110] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300", onClick: () => setShowManagerPopup(false) }),
      /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setShowManagerPopup(false),
            className: "absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full",
            children: /* @__PURE__ */ jsx(X, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600", children: /* @__PURE__ */ jsx(MessageCircle, { size: 32 }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-black text-gray-900 mb-2 leading-tight", children: "Задать вопрос" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-snug", children: "Оставьте свои контакты, и наш менеджер свяжется с вами, чтобы обсудить детали вашего праздника." })
        ] }),
        /* @__PURE__ */ jsx("form", { onSubmit: handleManagerSubmit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Как вас зовут?",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all",
              required: true
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "tel",
              placeholder: "Номер телефона",
              className: "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all",
              required: true
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "w-full bg-brand-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]", children: "Отправить заявку" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-center text-gray-400 mt-4 leading-tight", children: "Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных." })
      ] })
    ] })
  ] });
};
const App = () => {
  if (typeof window !== "undefined") {
    if (window.location.search.includes("thanks") || window.location.hash === "#thanks") {
      return /* @__PURE__ */ jsx(ThankYou, {});
    }
    if (window.location.search.includes("payment") || window.location.hash === "#payment") {
      return /* @__PURE__ */ jsx(PaymentPolicy, {});
    }
    if (window.location.search.includes("agreement") || window.location.hash === "#agreement") {
      return /* @__PURE__ */ jsx(UserAgreement, {});
    }
  }
  return /* @__PURE__ */ jsx(MainApp, {});
};
function render() {
  return renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(App, {}) })
  );
}
export {
  render
};
