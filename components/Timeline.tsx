import React from 'react';
import { TIMELINE_EVENTS } from '../data';
import { Clock } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <div className="py-12 bg-white rounded-3xl shadow-sm border border-brand-100 p-6 md:p-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-brand-100 rounded-full text-brand-700">
          <Clock size={24} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800">Идеальный тайминг (3 часа)</h3>
      </div>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-brand-200 hidden md:block"></div>

        <div className="space-y-6 md:space-y-0">
          {TIMELINE_EVENTS.map((event, idx) => (
            <div key={idx} className="relative md:pl-12 md:pb-8 last:pb-0 flex flex-col md:block items-center text-center md:text-left">
              {/* Dot */}
              <div className="hidden md:block absolute left-0 top-1 w-10 h-10 bg-white border-4 border-brand-300 rounded-full z-10"></div>
              
              {/* Mobile Time Badge */}
              <div className="md:hidden bg-brand-100 text-brand-800 font-bold px-3 py-1 rounded-full text-sm mb-2 inline-block">
                {event.time}
              </div>

              <div>
                 <span className="hidden md:inline-block font-bold text-brand-600 mr-2">{event.time}</span>
                 <h4 className="text-lg font-bold text-gray-900 inline-block">{event.title}</h4>
                 <p className="text-gray-600 mt-1">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-500 text-center md:text-left italic bg-gray-50 p-4 rounded-xl border border-gray-100">
        * Тайминг проверен на сотнях праздников. Дети заняты, не устают и не разносят комнату.<br/>
        <span className="font-semibold text-gray-700">Итоговый тайминг зависит от выбранного пакета или выбранных дополнительных услуг.</span>
      </p>
    </div>
  );
};