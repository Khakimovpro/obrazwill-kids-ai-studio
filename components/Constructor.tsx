import React, { useState, useEffect, useMemo } from 'react';
import { ADDONS, PACKAGES, CONSTRUCTOR_BASE_PRICE, EXTRA_GUEST_PRICE, BASE_GUEST_COUNT } from '../data';
import { DayType } from '../types';
import { Check, Plus, Minus, Wrench, Info, Sparkles, Camera, Gamepad2, Gift, ChevronDown, MessageCircleQuestion, X, Calendar, User, Phone, Baby } from 'lucide-react';

interface ConstructorProps {
  dayType: DayType;
  setDayType?: (type: DayType) => void;
  extraGuests: number;
  setExtraGuests?: (count: number) => void;
  selectedPackageId?: string | null;
  onClearPackage?: () => void;
  onOpenManagerPopup?: () => void;
}

export const Constructor: React.FC<ConstructorProps> = ({ dayType, setDayType, extraGuests, setExtraGuests, selectedPackageId, onClearPackage, onOpenManagerPopup }) => {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    entertainment: false,
    activity: false,
    media: false,
    decor: false
  });
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [showVipCelebration, setShowVipCelebration] = useState(false);
  const [orderName, setOrderName] = useState('');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [orderComment, setOrderComment] = useState('');

  const TELEGRAM_BOT_TOKEN = '8266667158:AAFo42PLtASo-fJfsKjxl8-1YhDznV2oZco';
  const TELEGRAM_CHAT_ID = '-5266991467';

  // Escapes HTML special chars to prevent injection via Telegram parse_mode:'HTML'
  const sanitizeHtml = (str: string): string =>
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

  const sendToTelegram = async (text: string) => {
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
      });
    } catch (err) {
      console.error('Telegram error:', err);
    }
  };

  const parseStoredSubmissions = (stored: string | null): number[] => {
    if (!stored) return [];
    try { return JSON.parse(stored); } catch { return []; }
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const submissions = parseStoredSubmissions(localStorage.getItem('formSubmissions'));
    const recent = submissions.filter(t => now - t < 120 * 60 * 1000);
    if (recent.length > 0 && now - recent[recent.length - 1] < 60 * 1000) return false;
    if (recent.length >= 3) return false;
    return true;
  };

  const recordSubmission = () => {
    const now = Date.now();
    const submissions = parseStoredSubmissions(localStorage.getItem('formSubmissions'));
    const recent = submissions.filter(t => now - t < 120 * 60 * 1000);
    recent.push(now);
    localStorage.setItem('formSubmissions', JSON.stringify(recent));
  };

  const confettiPieces = useMemo(() =>
    Array.from({ length: 72 }, (_, i) => ({
      id: i,
      x: 2 + (i * 1.34) % 96,
      size: 6 + (i * 3.7) % 10,
      color: ['#a855f7','#7c3aed','#f59e0b','#10b981','#ef4444','#3b82f6','#ec4899','#fbbf24','#34d399'][i % 9],
      duration: 2.5 + (i * 0.07) % 2.5,
      delay: (i * 0.043) % 2,
      isCircle: i % 3 === 0,
    }))
  , []);

  // Reset addons when switching packages to avoid confusion
  useEffect(() => {
    setSelectedAddons(new Set());
  }, [selectedPackageId]);

  // VIP celebration trigger
  useEffect(() => {
    if (selectedPackageId === 'vip') {
      setShowVipCelebration(true);
      const timer = setTimeout(() => setShowVipCelebration(false), 4500);
      return () => clearTimeout(timer);
    } else {
      setShowVipCelebration(false);
    }
  }, [selectedPackageId]);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Addons already included in the selected package (grayed out / not selectable)
  const disabledAddons = new Set<string>();
  if (selectedPackageId === 'vip') {
    disabledAddons.add('photo_report');
    disabledAddons.add('video_report');
    disabledAddons.add('photo_video_bundle');
  } else if (selectedPackageId === 'comfort') {
    disabledAddons.add('photo_report');
    disabledAddons.add('photo_video_bundle');
  }

  const toggleAddon = (id: string) => {
    if (disabledAddons.has(id)) return;
    const next = new Set(selectedAddons);
    
    // Groups of mutually exclusive items
    const exclusiveGroups = [
      ['disco_heroes', 'neon_disco'], // Disco variants
      ['pinata_full', 'pinata_empty'], // Pinata variants
    ];

    // Handle Media Bundle Exclusivity manually
    if (id === 'photo_video_bundle') {
        // If selecting bundle, remove individual items
        if (!next.has(id)) {
            next.delete('photo_report');
            next.delete('video_report');
        }
    }
    if (id === 'photo_report' || id === 'video_report') {
         // If selecting individual items, remove bundle
         if (!next.has(id)) {
             next.delete('photo_video_bundle');
         }
    }

    const group = exclusiveGroups.find(g => g.includes(id));

    if (next.has(id)) {
      next.delete(id);
    } else {
      // If belonging to an exclusive group, remove others from that group
      if (group) {
        group.forEach(gId => next.delete(gId));
      }
      next.add(id);
    }
    setSelectedAddons(next);
  };

  const selectedPackage = selectedPackageId ? PACKAGES.find(p => p.id === selectedPackageId) : null;

  // Calculate Base Price
  let basePrice = 0;
  let weekendBasePrice = 0; // For strikethrough calculation

  if (selectedPackage) {
    basePrice = dayType === 'weekday' ? selectedPackage.price.weekday : selectedPackage.price.weekend;
    weekendBasePrice = selectedPackage.price.weekend;
  } else {
    basePrice = dayType === 'weekday' ? CONSTRUCTOR_BASE_PRICE : CONSTRUCTOR_BASE_PRICE + 3000;
    weekendBasePrice = CONSTRUCTOR_BASE_PRICE + 3000;
  }

  // Calculate Addon Price with Discount Logic (20% off on weekdays)
  const getAddonPrice = (price: number) => {
    if (price === 0) return 0;
    if (dayType === 'weekend') return price;
    // 20% discount for weekdays
    return Math.floor(price * 0.8);
  };

  // Total for Addons (using current day rates)
  const addonsTotal = ADDONS.filter(a => selectedAddons.has(a.id))
      .reduce((sum, a) => sum + getAddonPrice(a.price), 0);
  
  // Total for Addons (Standard/Weekend rates for strikethrough)
  const addonsOldTotal = ADDONS.filter(a => selectedAddons.has(a.id))
      .reduce((sum, a) => sum + a.price, 0);

  const guestsTotal = extraGuests * EXTRA_GUEST_PRICE;
  
  const grandTotal = basePrice + addonsTotal + guestsTotal;
  
  // Fake "Old Price" for marketing strikethrough (Weekend Price + Standard Addons)
  const oldTotal = weekendBasePrice + addonsOldTotal + guestsTotal;

  // Prepayment Calculation (always 10%)
  const prepayment = Math.floor(grandTotal * 0.1);

  // Calculate Potential Savings
  let potentialSavings = 0;
  if (dayType === 'weekend') {
      const weekdayBase = selectedPackage ? selectedPackage.price.weekday : CONSTRUCTOR_BASE_PRICE;
      const weekdayAddons = ADDONS.filter(a => selectedAddons.has(a.id))
          .reduce((sum, a) => sum + Math.floor(a.price * 0.8), 0);
      const weekdayTotal = weekdayBase + weekdayAddons + guestsTotal;
      potentialSavings = grandTotal - weekdayTotal;
  }

  const categories = [
    { id: 'entertainment', label: 'Шоу и развлечения', icon: Sparkles },
    { id: 'activity', label: 'Активность и игры', icon: Gamepad2 },
    { id: 'media', label: 'Фото и видео', icon: Camera },
    { id: 'decor', label: 'Декор и угощения', icon: Gift },
  ];

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU').replace(/\s/g, ' ');
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkRateLimit()) { alert('Слишком много заявок. Подождите немного и попробуйте снова.'); return; }
    const packageName = selectedPackage ? selectedPackage.name : 'Свой конструктор';
    const addonNames = ADDONS.filter(a => selectedAddons.has(a.id)).map(a => a.name).join(', ') || 'нет';
    const commentStr = orderComment || 'нет';
    const dayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    let dateStr = 'не указана';
    if (orderDate) {
      const d = new Date(orderDate + 'T12:00:00');
      const dow = d.getDay();
      const isWknd = dow === 0 || dow === 6;
      dateStr = `${orderDate} (${dayNames[dow]}, ${isWknd ? '🟠 выходной' : '🟢 будний'})`;
    }
    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    const device = /Mobi|Android/i.test(navigator.userAgent) ? '📱 Мобильный' : '🖥 Десктоп';
    const referrer = document.referrer ? `\n🔗 Откуда: ${sanitizeHtml(document.referrer)}` : '';
    const totalChildren = BASE_GUEST_COUNT + extraGuests;
    const text = `🎉 <b>Новая заявка на праздник</b>\n\n👤 Имя: ${sanitizeHtml(orderName)}\n📞 Телефон: ${sanitizeHtml(orderPhone)}\n📅 Дата: ${sanitizeHtml(dateStr)}\n📦 Пакет: ${sanitizeHtml(packageName)}\n🗓 День: ${dayType === 'weekday' ? 'Будний' : 'Выходной'}\n👶 Детей: ${totalChildren}\n🎁 Доп. услуги: ${sanitizeHtml(addonNames)}\n💰 Сумма: ${grandTotal.toLocaleString('ru-RU')} ₽\n💬 Комментарий: ${sanitizeHtml(commentStr)}\n\n🕐 Время: ${now} (МСК)\n${device}${referrer}\n🌐 URL: ${sanitizeHtml(window.location.href)}`;
    await sendToTelegram(text);
    recordSubmission();
    setOrderName('');
    setOrderPhone('');
    setOrderDate('');
    setOrderComment('');
    setIsOrderPopupOpen(false);
    window.location.href = '/?thanks';
  };

  return (
    <>
    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-brand-900/5 border border-gray-200 overflow-visible relative">
      {/* Header */}
      <div className="bg-brand-900 p-6 md:p-8 text-white relative overflow-hidden rounded-t-[2.5rem]">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md">
                        <Wrench className="text-brand-300" size={20} />
                    </div>
                    <h3 className="text-2xl font-black tracking-tight">Конструктор праздника</h3>
                </div>
                <p className="text-brand-100 text-sm opacity-90">
                    {selectedPackage 
                        ? `Вы выбрали пакет "${selectedPackage.name}". Хотите добавить что-то еще?`
                        : "Добавьте услуги к базовому пакету"}
                </p>
            </div>
            {/* Mobile Summary Mini-view */}
            <div className="md:hidden bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                <div className="text-xs text-brand-200 uppercase tracking-wider mb-1">Итого</div>
                <div className="font-bold text-xl">{formatPrice(grandTotal)} ₽</div>
            </div>
         </div>
      </div>

      {/* Main Content Area - Layout for Sticky Sidebar */}
      {/* items-stretch (default) lets the right column match left column height, enabling sticky */}
      <div className="flex flex-col lg:flex-row lg:items-start">

        {/* Left: Options */}
        <div className="flex-1 p-6 md:p-8 bg-gray-50/50 rounded-bl-[2.5rem] lg:rounded-bl-[2.5rem]">
            
            {/* Day Type Toggle */}
            {setDayType && (
                <div className="flex items-center gap-3 mb-6 bg-white rounded-xl border border-gray-200 p-1.5 shadow-sm">
                    <button
                        onClick={() => setDayType('weekday')}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                            dayType === 'weekday'
                                ? 'bg-brand-600 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Будни (пн–пт)
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded transition-all ${
                            dayType === 'weekday' ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500 ring-1 ring-red-100'
                        }`}>−20%</span>
                    </button>
                    <button
                        onClick={() => setDayType('weekend')}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                            dayType === 'weekend'
                                ? 'bg-brand-600 text-white shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Выходные (сб–вс)
                    </button>
                </div>
            )}

            {/* Children Count */}
            {setExtraGuests && (
                <div className="flex items-center justify-between gap-4 mb-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 shrink-0">
                            <Baby size={20} strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900 text-sm leading-tight">Количество детей</div>
                            <div className="text-xs text-gray-400 mt-0.5">База: {BASE_GUEST_COUNT} чел. · доп. +{EXTRA_GUEST_PRICE} ₽</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-xl border border-gray-100 shrink-0">
                        <button
                            onClick={() => setExtraGuests(Math.max(0, extraGuests - 1))}
                            disabled={extraGuests === 0}
                            className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand-600 hover:border-brand-200 disabled:opacity-40 transition-all shadow-sm active:scale-95"
                            aria-label="Меньше детей"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-bold text-xl text-gray-900">{BASE_GUEST_COUNT + extraGuests}</span>
                        <button
                            onClick={() => setExtraGuests(extraGuests + 1)}
                            className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 shadow-md shadow-brand-200 transition-all active:scale-95"
                            aria-label="Больше детей"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Base Included - Compact */}
            <div className={`rounded-2xl p-5 border shadow-sm mb-8 transition-colors ${selectedPackage ? 'bg-brand-50 border-brand-200' : 'bg-white border-brand-100'}`}>
                <div className="flex items-center justify-between mb-3 border-b border-gray-200/50 pb-2">
                    <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        <Info size={16} className="text-brand-500" />
                        {selectedPackage ? `Тариф «${selectedPackage.name}»` : 'Базовый пакет'}
                    </h4>
                    
                    <div className="flex items-center gap-3">
                         <span className="font-bold text-brand-600 text-sm">{formatPrice(basePrice)} ₽</span>
                         {selectedPackage && onClearPackage && (
                             <button 
                                onClick={onClearPackage}
                                className="text-xs text-gray-500 hover:text-red-500 underline decoration-dashed"
                             >
                                Сбросить
                             </button>
                         )}
                    </div>
                </div>
                
                {/* List Included Features */}
                {selectedPackage ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                        {selectedPackage.features.map((f, i) => (
                             <div key={i} className="flex items-start gap-1.5">
                                <Check size={14} className="text-green-500 mt-0.5 shrink-0"/> 
                                <span className="leading-tight">{f.text}</span>
                             </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
                        <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500"/> Квест / Among Us</div>
                        <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500"/> Комната 60 мин</div>
                        <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500"/> Музыка + Ведущий</div>
                        <div className="flex items-center gap-1.5"><Check size={14} className="text-green-500"/> Координатор</div>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            {(() => {
              const addonCount = selectedAddons.size;
              // 50% base, each addon adds 10%, max 100%
              const progress = Math.min(100, 50 + addonCount * 10);
              const isEnriched = addonCount >= 1;
              return (
                <div className="mb-8 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-700">Насыщенность праздника</span>
                    <span className={`text-sm font-black transition-colors ${isEnriched ? 'text-brand-600' : 'text-gray-400'}`}>{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${progress}%`,
                        background: isEnriched
                          ? 'linear-gradient(90deg, #a855f7, #7c3aed)'
                          : 'linear-gradient(90deg, #d8b4fe, #c084fc)',
                      }}
                    />
                  </div>
                  <p className={`mt-2.5 text-xs leading-relaxed transition-colors ${isEnriched ? 'text-brand-600 font-medium' : 'text-gray-400'}`}>
                    {addonCount === 0
                      ? 'Добавьте услуги из списка ниже, чтобы сделать праздник незабываемым'
                      : addonCount < 3
                      ? `Отлично! Ещё пара деталей — и праздник будет полным 🎉`
                      : 'Праздник собран на максимум — дети будут в восторге!'}
                  </p>
                </div>
              );
            })()}

{/* Categories - Compact Grid */}
            <div className="space-y-4">
                {categories.map(cat => {
                    const catItems = ADDONS.filter(i => i.category === cat.id);
                    if (catItems.length === 0) return null;
                    const Icon = cat.icon;
                    const isOpen = openCategories[cat.id];

                    return (
                        <div key={cat.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300">
                            {/* Category Header */}
                            <div 
                                onClick={() => toggleCategory(cat.id)}
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors select-none"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center">
                                        <Icon size={18} />
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-xl">{cat.label}</h4>
                                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{catItems.length}</span>
                                </div>
                                <div className={`transform transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                            
                            {/* Collapsible Content */}
                            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {catItems.map(item => {
                                        const isSelected = selectedAddons.has(item.id);
                                        const isDisabled = disabledAddons.has(item.id);

                                        const price = getAddonPrice(item.price);
                                        const oldPrice = item.price;
                                        const hasDiscount = dayType === 'weekday' && price < oldPrice && oldPrice > 0;

                                        let priceText = `${formatPrice(price)} ₽`;
                                        if (item.price === 0) {
                                          if (item.id === 'cake') priceText = 'по запросу';
                                          else priceText = '0 ₽';
                                        }

                                        const isWow = item.id === 'pinata_full';

                                        return (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleAddon(item.id)}
                                                className={`
                                                    relative p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 group
                                                    ${isDisabled
                                                    ? 'cursor-not-allowed opacity-50 bg-gray-50 border-gray-200'
                                                    : isSelected
                                                    ? 'cursor-pointer border-brand-500 bg-brand-50/30 shadow-sm ring-1 ring-brand-500 z-10'
                                                    : 'cursor-pointer border-gray-100 bg-white hover:border-brand-300 hover:shadow-sm'}
                                                `}
                                            >
                                                {/* WOW badge */}
                                                {isWow && !isDisabled && (
                                                    <span className="absolute -top-2.5 -right-1 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide whitespace-nowrap z-10">
                                                        WOW! Рекомендуем
                                                    </span>
                                                )}

                                                {/* Disabled: "included in package" icon, else toggle */}
                                                {isDisabled ? (
                                                    <div className="w-5 h-5 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center shrink-0">
                                                        <Check size={12} className="text-gray-400" strokeWidth={3} />
                                                    </div>
                                                ) : (
                                                    <div className={`
                                                        w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                                                        ${isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300 bg-gray-50 group-hover:border-brand-300'}
                                                    `}>
                                                        {isSelected && <Check size={12} strokeWidth={3} />}
                                                        {!isSelected && <Plus size={12} className="text-gray-400 group-hover:text-brand-500" />}
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <span className={`font-semibold text-base leading-tight ${isDisabled ? 'text-gray-400' : isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                                            {item.name}
                                                        </span>
                                                        <div className="flex flex-col items-end leading-none">
                                                            {isDisabled ? (
                                                                <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">Включено</span>
                                                            ) : (
                                                                <>
                                                                    <span className={`font-bold text-base whitespace-nowrap ${isSelected ? 'text-brand-700' : 'text-gray-900'}`}>
                                                                        {priceText}
                                                                    </span>
                                                                    {hasDiscount && (
                                                                        <span className="text-[10px] text-gray-400 line-through decoration-red-400 decoration-1">
                                                                            {formatPrice(oldPrice)} ₽
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {item.description && (
                                                        <p className={`text-xs leading-tight mt-1 truncate ${isDisabled ? 'text-gray-400' : 'text-gray-400'}`}>{item.description}</p>
                                                    )}
                                                    {isDisabled && (
                                                        <p className="text-[10px] text-gray-400 leading-tight mt-0.5">Входит в выбранный тариф</p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Right: Summary Sidebar — outer column stretches to match left height */}
        {/* Inner div is sticky, so it pins to top while left column is taller */}
        <div className="lg:w-[350px] lg:self-start border-l border-gray-100 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] rounded-br-[2.5rem]">
        <div className="bg-white p-6 md:p-8 flex flex-col rounded-br-[2.5rem] lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-108px)] lg:overflow-y-auto">
            
            {/* Total Block */}
            <div className="mb-6 pb-6 border-b border-gray-100">
                <span className="text-gray-500 text-sm font-medium block mb-1">Итоговая стоимость:</span>
                
                <div className="flex flex-col items-start w-full">
                    {/* Marketing Strikethrough Logic */}
                    {dayType === 'weekday' && (
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg text-gray-400 line-through font-semibold decoration-red-400 decoration-2">{formatPrice(oldTotal)} ₽</span>
                            <span className="bg-red-50 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100 uppercase">-20% (Будни пн-пт)</span>
                         </div>
                    )}
                    
                    <span className="text-4xl font-black text-brand-900 tracking-tight leading-none mb-2">{formatPrice(grandTotal)} ₽</span>

                    {/* Prepayment Note */}
                    <div className="text-xs text-gray-500 font-medium mb-4 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100 w-full">
                       ❗ Предоплата для бронирования 10% (не менее 2000₽): <span className="font-bold text-gray-900">{formatPrice(prepayment)} ₽</span>
                    </div>

                    {/* Weekend Discount Offer */}
                    {dayType === 'weekend' && potentialSavings > 0 && (
                        <div className="w-full bg-brand-50 border border-brand-200 rounded-xl p-3 mb-4 animate-in fade-in slide-in-from-bottom-2">
                             <p className="text-sm text-gray-800 leading-snug mb-2">
                                Выберите <span className="font-bold">будний день</span> и сэкономьте <span className="font-bold text-brand-600 bg-brand-100 px-1 rounded">{formatPrice(potentialSavings)} ₽</span>
                             </p>
                             {setDayType && (
                                 <button 
                                    onClick={() => setDayType('weekday')}
                                    className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm"
                                 >
                                    Выбрать будний день
                                 </button>
                             )}
                        </div>
                    )}

                    {/* Simple Tip if no discount available */}
                    {dayType === 'weekend' && potentialSavings === 0 && (
                         <div className="mt-2 p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-500 leading-tight flex gap-2 items-start w-full">
                             <span className="shrink-0 text-base">💡</span>
                             <span>В <b>будние дни</b> действует скидка 20% на все дополнительные услуги и пакеты!</span>
                        </div>
                    )}
                </div>
                
                {selectedAddons.has('cake') && <div className="text-xs text-gray-400 font-normal mt-2">+ стоимость торта</div>}

                <button 
                  onClick={() => setIsOrderPopupOpen(true)}
                  className="w-full mt-6 bg-brand-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200 active:scale-[0.98]"
                >
                    Оформить заказ
                </button>
                {selectedPackage && onClearPackage && (
                    <button 
                        onClick={onClearPackage}
                        className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        Вернуться к конструктору с нуля
                    </button>
                )}
            </div>

            <h4 className="font-bold text-gray-900 mb-4 text-lg">Детализация</h4>
            
            <div className="pr-2">
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600 pb-3 border-b border-gray-100">
                        <span className="font-medium text-gray-900">
                            {selectedPackage ? `Пакет «${selectedPackage.name}»` : 'База конструктора'} 
                            <span className="block text-xs text-gray-400 font-normal">({dayType === 'weekday' ? 'Будни' : 'Выходной'})</span>
                        </span>
                        <span>{formatPrice(basePrice)} ₽</span>
                    </div>
                    {extraGuests > 0 && (
                        <div className="flex justify-between text-gray-600 pb-3 border-b border-gray-100">
                            <span>Доп. гости ({extraGuests})</span>
                            <span>{formatPrice(guestsTotal)} ₽</span>
                        </div>
                    )}
                    {Array.from(selectedAddons).map(id => {
                        const item = ADDONS.find(a => a.id === id);
                        if (!item) return null;
                        
                        const price = getAddonPrice(item.price);
                        
                        let priceDisplay = `${formatPrice(price)} ₽`;
                         if (item.price === 0) {
                             if (item.id === 'cake') priceDisplay = 'по запросу';
                             else priceDisplay = '0 ₽';
                         }

                        return (
                            <div key={id} className="flex justify-between text-brand-700 font-medium py-1">
                                <span className="truncate pr-2 text-xs">{item.name}</span>
                                <span className="shrink-0 text-xs">{priceDisplay}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Ask Manager Button */}
            {onOpenManagerPopup && (
                <button 
                    onClick={onOpenManagerPopup}
                    className="w-full mt-4 bg-gray-100 text-gray-600 border border-gray-200 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                    <MessageCircleQuestion size={18} />
                    Задать вопрос менеджеру
                </button>
            )}
        </div>{/* end sticky inner */}
        </div>{/* end right column wrapper */}

      </div>

      {/* VIP Celebration */}
      {showVipCelebration && (
        <>
          <style>{`
            @keyframes vipFall {
              0%   { transform: translateY(-10px) rotateZ(0deg); opacity: 1; }
              85%  { opacity: 1; }
              100% { transform: translateY(105vh) rotateZ(700deg); opacity: 0; }
            }
            @keyframes vipAchievement {
              0%   { transform: translateY(30px) scale(0.85); opacity: 0; }
              12%  { transform: translateY(0) scale(1.05); opacity: 1; }
              85%  { transform: translateY(0) scale(1); opacity: 1; }
              100% { transform: translateY(-16px) scale(0.95); opacity: 0; }
            }
          `}</style>
          {/* Confetti rain */}
          <div className="fixed inset-0 pointer-events-none z-[190] overflow-hidden">
            {confettiPieces.map((p) => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: `${p.x}%`,
                  top: '-12px',
                  width: `${p.size}px`,
                  height: p.isCircle ? `${p.size}px` : `${p.size * 0.45}px`,
                  backgroundColor: p.color,
                  borderRadius: p.isCircle ? '50%' : '2px',
                  animation: `vipFall ${p.duration}s ${p.delay}s ease-in forwards`,
                }}
              />
            ))}
          </div>
          {/* Achievement toast */}
          <div
            className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[200] pointer-events-none whitespace-nowrap"
            style={{ animation: 'vipAchievement 4.5s ease forwards' }}
          >
            <div className="bg-gradient-to-r from-brand-900 to-brand-700 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-brand-900/60 border border-brand-500/30 flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shrink-0 text-2xl">
                🏆
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-300 mb-0.5">Достижение разблокировано</div>
                <div className="font-black text-lg leading-tight">Мастер праздника!</div>
                <div className="text-xs text-brand-200 mt-0.5">VIP — максимальный восторг для всех</div>
              </div>
              <div className="text-2xl">✨</div>
            </div>
          </div>
        </>
      )}

      {/* Order Popup */}
      {isOrderPopupOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pt-16">
             <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsOrderPopupOpen(false)}></div>

             <div className="relative bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 max-h-[85vh] overflow-y-auto">
                 <button
                    onClick={() => setIsOrderPopupOpen(false)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full transition-colors"
                 >
                     <X size={20} />
                 </button>

                 <h3 className="text-xl font-black text-gray-900 mb-3 pr-8">Оформление заявки</h3>

                 <div className="bg-brand-50 rounded-xl px-4 py-3 mb-4 border border-brand-100 flex justify-between items-center">
                    <div>
                        <div className="text-[10px] text-brand-600 uppercase font-bold tracking-wider">Итоговая сумма</div>
                        <div className="text-xl font-black text-brand-900">{formatPrice(grandTotal)} ₽</div>
                    </div>
                    <div className="text-right">
                         <div className="text-[10px] text-gray-500">Предоплата</div>
                         <div className="font-bold text-gray-800">{formatPrice(prepayment)} ₽</div>
                    </div>
                 </div>

                 <form onSubmit={handleOrderSubmit} className="space-y-2.5">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder="Как вас зовут?"
                            maxLength={50}
                            className="w-full pl-9 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                            value={orderName}
                            onChange={e => setOrderName(e.target.value.slice(0, 50))}
                        />
                    </div>

                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            placeholder="Номер телефона"
                            maxLength={18}
                            pattern="[\d\s+\-()]{10,18}"
                            className="w-full pl-9 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                            value={orderPhone}
                            onChange={e => setOrderPhone(e.target.value.replace(/[^\d\s+\-()]/g, '').slice(0, 18))}
                        />
                    </div>

                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-9 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all text-gray-700"
                            value={orderDate}
                            onChange={e => setOrderDate(e.target.value)}
                        />
                    </div>

                    <textarea
                        placeholder="Комментарий: особенности ребенка, пожелания..."
                        maxLength={500}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all min-h-[52px]"
                        value={orderComment}
                        onChange={e => setOrderComment(e.target.value.slice(0, 500))}
                    ></textarea>

                    <button className="w-full bg-brand-600 text-white font-bold text-base py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                        Отправить заявку
                    </button>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-500">
                        <input type="checkbox" required className="w-4 h-4 shrink-0 rounded accent-brand-600 cursor-pointer" />
                        <span>Даю согласие на <a href="/privacy" className="underline hover:text-brand-600 transition-colors">обработку персональных данных</a></span>
                    </label>
                 </form>
             </div>
        </div>
      )}

    </div>

    {/* Beta notice */}
    <div className="mt-5 mx-1 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex items-start gap-3">
      <span className="text-xl shrink-0">⚠️</span>
      <p className="text-sm text-amber-800 leading-relaxed">
        <span className="font-black">Бета-тестирование.</span> Возможны технические ошибки — приносим извинения. Актуальные цены и точная информация — у менеджера по телефону.
      </p>
    </div>
    </>
  );
};