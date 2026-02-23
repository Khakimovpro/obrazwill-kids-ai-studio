import React from 'react';
import { Package, DayType } from '../types';
import { Check, Star, Sparkles, Gift, AlertCircle, ThumbsUp } from 'lucide-react';
import { BASE_GUEST_COUNT, EXTRA_GUEST_PRICE } from '../data';

interface PackageCardProps {
  pkg: Package;
  dayType: DayType;
  extraGuests: number;
  onSelect?: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, dayType, extraGuests, onSelect }) => {
  const currentPrice = dayType === 'weekday' ? pkg.price.weekday : pkg.price.weekend;
  const totalPrice = currentPrice + (extraGuests * EXTRA_GUEST_PRICE);
  const totalGuests = BASE_GUEST_COUNT + extraGuests;
  const isLargeGroup = totalGuests > 12;

  // Visual variants based on popularity
  const cardClasses = pkg.isPopular
    ? 'border-[3px] border-brand-500 shadow-[0_20px_60px_-15px_rgba(192,38,211,0.3)] scale-100 md:scale-110 z-20 ring-4 ring-brand-100 bg-gradient-to-b from-white to-brand-50/30'
    : 'border border-gray-100 shadow-md hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 bg-white';
    
  const buttonClasses = pkg.isPopular
    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-700 hover:to-brand-600 shadow-lg shadow-brand-200'
    : pkg.id === 'vip'
      ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:from-black hover:to-gray-800 shadow-lg shadow-gray-300'
      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm';

  // Formatting utility
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU').replace(/\s/g, ' '); // Replace standard space with non-breaking space
  };

  return (
    <div className={`relative flex flex-col h-full rounded-[2rem] transition-all duration-300 overflow-hidden ${cardClasses}`}>
      
      {/* Popular Badge */}
      {pkg.isPopular && (
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400" />
      )}
      {pkg.isPopular && (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-500 text-white px-4 py-1.5 rounded-b-xl text-sm font-bold shadow-md flex items-center gap-1.5">
          <Star size={14} fill="currentColor" className="text-yellow-300" /> 
          <span className="tracking-wide">ХИТ ПРОДАЖ</span>
        </div>
      )}

      <div className="p-6 md:p-8 flex-grow flex flex-col">
        <div className="mb-6 pt-2">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">{pkg.name}</h3>
          <p className="text-brand-600 font-medium text-sm mt-1 flex items-center gap-1">
             {pkg.tagline}
          </p>
        </div>

        <div className={`mb-8 p-5 rounded-2xl text-center ${pkg.isPopular ? 'bg-gradient-to-br from-brand-50 to-white border border-brand-100' : 'bg-gradient-to-br from-gray-50 to-white border border-gray-100'}`}>
          <div className="flex items-baseline justify-center gap-1">
            <span className={`text-4xl md:text-5xl font-black tracking-tight ${pkg.isPopular ? 'text-brand-700' : 'text-gray-900'}`}>
                {formatPrice(totalPrice)}
            </span>
            <span className="text-2xl text-gray-400 font-semibold ml-1">₽</span>
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1.5 uppercase tracking-wide">
             за {totalGuests} {totalGuests === 8 ? 'детей' : totalGuests < 5 ? 'ребенка' : 'детей'}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          {pkg.description}
        </p>

        <ul className="space-y-4 mb-6">
          {pkg.features.map((feature, idx) => {
            const isQuestFeature = feature.text.includes('Квест');
            const showQuestWarning = isQuestFeature && isLargeGroup;

            return (
              <li key={idx} className="group">
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex-shrink-0 p-1 rounded-full bg-gray-50 group-hover:bg-brand-50 transition-colors">
                    {feature.isWow ? (
                      <Sparkles size={16} className="text-accent-orange fill-accent-orange/20" />
                    ) : feature.isValue ? (
                      <Gift size={16} className="text-brand-500" />
                    ) : (
                      <Check size={16} className="text-green-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className={feature.isWow ? 'font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent' : ''}>
                      {feature.text}
                    </span>
                    {feature.description && (
                      <p className="text-xs text-gray-400 mt-0.5 font-medium">{feature.description}</p>
                    )}
                    {feature.isRecommended && (
                       <div className="mt-2.5">
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wide border border-brand-200 shadow-sm animate-pulse">
                              <ThumbsUp size={12} /> Рекомендуем
                           </span>
                       </div>
                    )}
                  </div>
                </div>
                {showQuestWarning && (
                   <div className="ml-9 mt-2 p-2.5 bg-orange-50 border border-orange-100 rounded-xl text-xs text-orange-800 flex items-start gap-2">
                      <AlertCircle size={14} className="mt-0.5 shrink-0" />
                      <span>Для компаний 12+ чел. рекомендуем <strong>Among Us</strong> (квест вмещает до 12)</span>
                   </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="p-6 md:p-8 pt-0 mt-auto">
        <button 
          onClick={onSelect}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-[0.98] ${buttonClasses}`}>
          Выбрать {pkg.name}
        </button>
      </div>
    </div>
  );
};