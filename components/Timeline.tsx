import React from 'react';
import { TIMELINE_EVENTS } from '../data';

const STEP_COLORS = [
  { bg: 'bg-brand-100', text: 'text-brand-700', dot: 'bg-brand-200', line: 'bg-brand-200', badge: 'bg-brand-50 text-brand-700 border-brand-200' },
  { bg: 'bg-brand-200', text: 'text-brand-700', dot: 'bg-brand-300', line: 'bg-brand-300', badge: 'bg-brand-100 text-brand-800 border-brand-300' },
  { bg: 'bg-brand-300', text: 'text-white', dot: 'bg-brand-400', line: 'bg-brand-400', badge: 'bg-brand-200 text-brand-900 border-brand-400' },
  { bg: 'bg-brand-500', text: 'text-white', dot: 'bg-brand-500', line: 'bg-brand-500', badge: 'bg-brand-400 text-white border-brand-500' },
  { bg: 'bg-brand-700', text: 'text-white', dot: 'bg-brand-700', line: 'bg-brand-700', badge: 'bg-brand-600 text-white border-brand-700' },
];

export const Timeline: React.FC = () => {
  return (
    <div className="py-10 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl text-brand-600 shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <div>
          <h3 className="text-2xl font-black text-gray-900">Идеальный тайминг</h3>
          <p className="text-sm text-gray-500 font-medium">3 часа → праздник мечты</p>
        </div>
      </div>

      {/* Desktop: horizontal stepper */}
      <div className="hidden md:block">
        <div className="flex items-start gap-0">
          {TIMELINE_EVENTS.map((event, idx) => {
            const color = STEP_COLORS[idx];
            const isLast = idx === TIMELINE_EVENTS.length - 1;
            return (
              <div key={idx} className="flex-1 relative flex flex-col items-center">
                {/* Connector line */}
                {!isLast && (
                  <div className={`absolute top-5 left-1/2 w-full h-0.5 ${color.line} z-0`} />
                )}
                {/* Step circle */}
                <div className={`relative z-10 w-10 h-10 rounded-full ${color.bg} ${color.text} flex items-center justify-center font-black text-sm shadow-md border-2 border-white mb-4`}>
                  {idx + 1}
                </div>
                {/* Time badge */}
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border mb-2 whitespace-nowrap ${color.badge}`}>
                  {event.time}
                </span>
                {/* Content */}
                <div className="text-center px-2">
                  <h4 className="font-black text-gray-900 text-sm leading-tight mb-1">{event.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden space-y-0">
        {TIMELINE_EVENTS.map((event, idx) => {
          const color = STEP_COLORS[idx];
          const isLast = idx === TIMELINE_EVENTS.length - 1;
          return (
            <div key={idx} className="flex gap-4">
              {/* Left: step circle + line */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full ${color.bg} ${color.text} flex items-center justify-center font-black text-sm shadow-sm border-2 border-white shrink-0`}>
                  {idx + 1}
                </div>
                {!isLast && <div className={`w-0.5 flex-1 ${color.line} mt-1 mb-1 min-h-[24px]`} />}
              </div>
              {/* Right: content */}
              <div className={`pb-6 ${isLast ? '' : ''}`}>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border inline-block mb-1.5 ${color.badge}`}>
                  {event.time}
                </span>
                <h4 className="font-black text-gray-900 text-base leading-tight">{event.title}</h4>
                <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{event.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-gray-500 text-center italic bg-gray-50 p-4 rounded-2xl border border-gray-100">
        * Тайминг проверен на сотнях праздников. Дети заняты, не устают и не разносят комнату.<br/>
        <span className="font-semibold text-gray-700">Итоговый тайминг зависит от выбранного пакета или выбранных дополнительных услуг.</span>
      </p>
    </div>
  );
};
