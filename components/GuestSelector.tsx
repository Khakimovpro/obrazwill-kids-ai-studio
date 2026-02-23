import React from 'react';
import { Minus, Plus, Baby } from 'lucide-react';
import { BASE_GUEST_COUNT, EXTRA_GUEST_PRICE } from '../data';

interface GuestSelectorProps {
  extraGuests: number;
  setExtraGuests: (count: number) => void;
}

export const GuestSelector: React.FC<GuestSelectorProps> = ({ extraGuests, setExtraGuests }) => {
  const totalGuests = BASE_GUEST_COUNT + extraGuests;

  const increment = () => setExtraGuests(extraGuests + 1);
  const decrement = () => setExtraGuests(Math.max(0, extraGuests - 1));

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-gray-100/50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto mb-24 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-2xl -mr-10 -mt-10 opacity-60"></div>

      <div className="flex items-center gap-5 relative z-10">
        <div className="bg-brand-50 p-4 rounded-2xl text-brand-600 shadow-inner">
          <Baby size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-xl">Количество детей</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm mt-1">
            <span className="text-gray-500">База: {BASE_GUEST_COUNT} чел.</span>
            <span className="hidden sm:block text-gray-300">•</span>
            <span className="text-brand-600 font-medium">Доп. гость +{EXTRA_GUEST_PRICE} ₽</span>
          </div>
          <p className="text-xs text-green-600 font-bold mt-1.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            Взрослые сопровождающие — бесплатно
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
        <button 
          onClick={decrement}
          className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-brand-600 hover:border-brand-200 disabled:opacity-40 disabled:hover:text-gray-600 transition-all shadow-sm active:scale-95"
          disabled={extraGuests === 0}
          aria-label="Меньше гостей"
        >
          <Minus size={20} />
        </button>
        
        <div className="w-14 text-center">
            <span className="font-bold text-3xl block leading-none text-gray-900">{totalGuests}</span>
        </div>
        
        <button 
          onClick={increment}
          className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 shadow-md shadow-brand-200 hover:shadow-lg transition-all active:scale-95"
          aria-label="Больше гостей"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};