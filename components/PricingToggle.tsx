import React from 'react';
import { DayType } from '../types';
import { Calendar } from 'lucide-react';

interface PricingToggleProps {
  dayType: DayType;
  setDayType: (type: DayType) => void;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({ dayType, setDayType }) => {
  return (
    <div className="flex flex-col items-center mb-12">
      <div className="flex flex-col md:flex-row items-center gap-3 mb-6 bg-brand-50/50 px-6 py-4 rounded-2xl border border-brand-100/50 shadow-sm text-center">
        <div className="bg-white p-2 rounded-full shadow-sm text-brand-600 shrink-0 hidden md:block">
            <Calendar size={20} />
        </div>
        <p className="text-gray-900 text-lg md:text-xl font-bold leading-tight max-w-lg">
          Пожалуйста, выберите на какой день вы хотите забронировать мероприятие?
        </p>
      </div>
      
      <div className="bg-white p-1.5 rounded-full shadow-xl shadow-brand-100/50 border border-brand-100 inline-flex relative w-full max-w-[360px] md:max-w-[550px]">
        {/* Sliding Background */}
        <div 
          className={`absolute top-1.5 bottom-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md bg-gradient-to-r from-brand-500 to-brand-600`}
          style={{
            left: dayType === 'weekday' ? '6px' : '50%',
            width: 'calc(50% - 6px)',
          }}
        />

        <button
          onClick={() => setDayType('weekday')}
          className={`relative z-10 flex-1 px-2 py-3 rounded-full text-xs md:text-base font-bold transition-colors duration-300 flex items-center justify-center gap-1.5 md:gap-2 ${
            dayType === 'weekday' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span className="whitespace-nowrap">Будни (пн-пт)</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wide transition-all ${
              dayType === 'weekday' 
                ? 'bg-white/20 text-white' 
                : 'bg-red-50 text-red-500 ring-1 ring-red-100'
          }`}>
            -20%
          </span>
        </button>
        <button
          onClick={() => setDayType('weekend')}
          className={`relative z-10 flex-1 px-2 py-3 rounded-full text-xs md:text-base font-bold transition-colors duration-300 whitespace-nowrap ${
            dayType === 'weekend' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Выходные (сб-вс и праздники)
        </button>
      </div>
    </div>
  );
};