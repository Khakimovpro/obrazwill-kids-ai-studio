import React, { useState } from 'react';
import { MapPin, ChevronRight, ChevronLeft, Navigation } from 'lucide-react';

const LOCATIONS = [
  {
    id: 1,
    address: "г. Пенза, ул. Чаадаева 36А",
    mapUrl: "https://yandex.ru/map-widget/v1/?text=Пенза+Чаадаева+36А&z=17",
    desc: "Район ГПЗ-24"
  },
  {
    id: 2,
    address: "г. Пенза, ул. Пролетарская 6",
    mapUrl: "https://yandex.ru/map-widget/v1/?text=Пенза+Пролетарская+6&z=17",
    desc: "Район Автовокзала"
  },
  {
    id: 3,
    address: "г. Пенза, ул. Гагарина 28",
    mapUrl: "https://yandex.ru/map-widget/v1/?text=Пенза+Гагарина+28&z=17",
    desc: "Заводской район"
  }
];

export const Locations: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextLocation = () => {
    setActiveIndex((prev) => (prev + 1) % LOCATIONS.length);
  };

  const prevLocation = () => {
    setActiveIndex((prev) => (prev - 1 + LOCATIONS.length) % LOCATIONS.length);
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block">Контакты</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            Где нас найти?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Мы находимся в трех районах города. Выбирайте, куда удобнее добраться гостям.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 rounded-[2.5rem] p-4 md:p-6 shadow-sm border border-gray-200">
          
          {/* Sidebar / List */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {LOCATIONS.map((loc, idx) => (
              <button
                key={loc.id}
                onClick={() => setActiveIndex(idx)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border group ${
                  idx === activeIndex 
                    ? 'bg-white border-brand-500 shadow-lg shadow-brand-100 scale-[1.02]' 
                    : 'bg-white/50 border-transparent hover:bg-white hover:border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    idx === activeIndex ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-500'
                  }`}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-lg mb-1 ${idx === activeIndex ? 'text-gray-900' : 'text-gray-600'}`}>
                      {loc.address}
                    </h4>
                    <p className="text-sm text-gray-400">{loc.desc}</p>
                    
                    {idx === activeIndex && (
                      <div className="mt-4 inline-flex items-center gap-2 text-brand-600 font-bold text-sm animate-in fade-in slide-in-from-left-2">
                        <span>Показать на карте</span>
                        <ChevronRight size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Map Viewer */}
          <div className="lg:w-2/3 relative min-h-[400px] lg:min-h-[500px] rounded-[2rem] overflow-hidden shadow-inner border border-gray-200 bg-gray-200">
            {LOCATIONS.map((loc, idx) => (
               <iframe
                 key={loc.id}
                 src={loc.mapUrl}
                 width="100%"
                 height="100%"
                 className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                 allowFullScreen={true}
                 loading="lazy"
                 title={`Карта ${loc.address}`}
               ></iframe>
            ))}

            {/* Mobile Navigation Overlays */}
            <div className="lg:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20 pointer-events-none">
                <button 
                  onClick={prevLocation}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto active:scale-95"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextLocation}
                  className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-700 pointer-events-auto active:scale-95"
                >
                  <ChevronRight size={24} />
                </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};