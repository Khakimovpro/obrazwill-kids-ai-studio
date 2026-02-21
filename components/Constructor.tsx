import React, { useState, useEffect } from 'react';
import { ADDONS, PACKAGES, CONSTRUCTOR_BASE_PRICE, EXTRA_GUEST_PRICE } from '../data';
import { DayType } from '../types';
import { Check, Plus, Wrench, Info, Sparkles, Camera, Gamepad2, Gift, ChevronDown, MessageCircleQuestion, X, Calendar, User, Phone } from 'lucide-react';

interface ConstructorProps {
  dayType: DayType;
  setDayType?: (type: DayType) => void;
  extraGuests: number;
  selectedPackageId?: string | null;
  onClearPackage?: () => void;
  onOpenManagerPopup?: () => void;
}

export const Constructor: React.FC<ConstructorProps> = ({ dayType, setDayType, extraGuests, selectedPackageId, onClearPackage, onOpenManagerPopup }) => {
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    entertainment: true,
    activity: true,
    media: true,
    decor: true
  });
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);

  // Reset addons when switching packages to avoid confusion
  useEffect(() => {
    setSelectedAddons(new Set());
  }, [selectedPackageId]);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAddon = (id: string) => {
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

  // Prepayment Calculation (10% but min 2000)
  const prepayment = Math.max(2000, Math.floor(grandTotal * 0.1));

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

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrderPopupOpen(false);
    alert("Спасибо! Ваша заявка успешно отправлена. Менеджер свяжется с вами для уточнения деталей и бронирования.");
  };

  return (
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
      {/* IMPORTANT: items-start is critical for sticky behavior to work in flex container */}
      <div className="flex flex-col lg:flex-row items-start">
        
        {/* Left: Options */}
        <div className="flex-1 p-6 md:p-8 bg-gray-50/50 rounded-bl-[2.5rem] lg:rounded-bl-[2.5rem]">
            
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
                                    <h4 className="font-bold text-gray-800 text-lg">{cat.label}</h4>
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
                                        
                                        const price = getAddonPrice(item.price);
                                        const oldPrice = item.price;
                                        const hasDiscount = dayType === 'weekday' && price < oldPrice && oldPrice > 0;

                                        let priceText = `${formatPrice(price)} ₽`;
                                        if (item.price === 0) {
                                          if (item.id === 'cake') priceText = 'по запросу';
                                          else priceText = '0 ₽';
                                        }

                                        return (
                                            <div 
                                                key={item.id}
                                                onClick={() => toggleAddon(item.id)}
                                                className={`
                                                    cursor-pointer relative p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 group
                                                    ${isSelected 
                                                    ? 'border-brand-500 bg-brand-50/30 shadow-sm ring-1 ring-brand-500 z-10' 
                                                    : 'border-gray-100 bg-white hover:border-brand-300 hover:shadow-sm'}
                                                `}
                                            >
                                                <div className={`
                                                    w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                                                    ${isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300 bg-gray-50 group-hover:border-brand-300'}
                                                `}>
                                                    {isSelected && <Check size={12} strokeWidth={3} />}
                                                    {!isSelected && <Plus size={12} className="text-gray-400 group-hover:text-brand-500" />}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <span className={`font-semibold text-sm leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{item.name}</span>
                                                        <div className="flex flex-col items-end leading-none">
                                                            <span className={`font-bold text-sm whitespace-nowrap ${isSelected ? 'text-brand-700' : 'text-gray-900'}`}>
                                                                {priceText}
                                                            </span>
                                                            {hasDiscount && (
                                                                <span className="text-[10px] text-gray-400 line-through decoration-red-400 decoration-1">
                                                                    {formatPrice(oldPrice)} ₽
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {item.description && (
                                                        <p className="text-[11px] text-gray-400 leading-tight mt-1 truncate">{item.description}</p>
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

        {/* Right: Summary Sidebar (Sticky) */}
        {/* lg:sticky applies position:sticky on desktop */}
        {/* lg:top-24 accounts for the fixed header height (~80px) + ~20px visual buffer */}
        {/* lg:self-start ensures the block doesn't stretch to full height of parent */}
        <div className="lg:w-[350px] bg-white border-l border-gray-100 p-6 md:p-8 flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-20 lg:sticky lg:top-24 lg:self-start rounded-br-[2.5rem] lg:rounded-br-[2.5rem] lg:rounded-bl-none">
            
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
            
            <div className="flex-1 overflow-y-auto max-h-[400px] lg:max-h-[calc(100vh-500px)] pr-2 custom-scrollbar">
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
        </div>

      </div>

      {/* Order Popup */}
      {isOrderPopupOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
             {/* Backdrop */}
             <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsOrderPopupOpen(false)}></div>
             
             {/* Modal */}
             <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                 <button 
                    onClick={() => setIsOrderPopupOpen(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full transition-colors"
                 >
                     <X size={20} />
                 </button>

                 <div className="text-center mb-6">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Оформление заявки</h3>
                    <p className="text-gray-600 text-sm">
                       Заполните форму, и мы свяжемся с вами для подтверждения даты и деталей.
                    </p>
                 </div>
                 
                 {/* Summary inside Popup */}
                 <div className="bg-brand-50 rounded-xl p-4 mb-6 border border-brand-100 flex justify-between items-center">
                    <div>
                        <div className="text-xs text-brand-600 uppercase font-bold tracking-wider">Итоговая сумма</div>
                        <div className="text-xl font-black text-brand-900">{formatPrice(grandTotal)} ₽</div>
                    </div>
                    <div className="text-right">
                         <div className="text-xs text-gray-500">Предоплата</div>
                         <div className="font-bold text-gray-800">{formatPrice(prepayment)} ₽</div>
                    </div>
                 </div>

                 <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Как вас зовут?</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="text" 
                                placeholder="Ваше имя" 
                                className="w-full pl-10 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Номер телефона</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="tel" 
                                placeholder="+7 (___) ___-__-__" 
                                className="w-full pl-10 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Желаемая дата (ориентировочно)</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input 
                                type="date" 
                                className="w-full pl-10 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all text-gray-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Комментарий</label>
                        <textarea 
                            placeholder="Особенности ребенка, пожелания..." 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all min-h-[80px]"
                        ></textarea>
                    </div>

                    <button className="w-full bg-brand-600 text-white font-bold text-lg py-3.5 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                        Отправить заявку
                    </button>
                 </form>
                 <p className="text-[10px] text-center text-gray-400 mt-4 leading-tight">
                     Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных. Оплата производится после согласования с менеджером.
                 </p>
             </div>
        </div>
      )}

    </div>
  );
};