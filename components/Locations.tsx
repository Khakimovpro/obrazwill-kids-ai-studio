import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronRight, ChevronLeft, Map } from 'lucide-react';

const LOCATIONS = [
  {
    id: 3,
    address: "г. Пенза, ул. Гагарина 28",
    mapUrl: "https://yandex.ru/map-widget/v1/-/CPaxEYZp",
    desc: "Заводской район",
    isMain: true
  },
  {
    id: 1,
    address: "г. Пенза, ул. Чаадаева 36А",
    mapUrl: "https://yandex.ru/map-widget/v1/-/CPeQF07L",
    desc: "Район ГПЗ-24",
    isMain: false
  },
  {
    id: 2,
    address: "г. Пенза, ул. Пролетарская 6",
    mapUrl: "https://yandex.ru/map-widget/v1/-/CPeQJI6g",
    desc: "Район Автовокзала",
    isMain: false
  }
];

export const Locations: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mapVisible, setMapVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
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

  return (
    <section ref={sectionRef} aria-label="Наши адреса в Пензе" className="py-20 bg-white border-t border-gray-100">
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
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className={`font-bold text-lg ${idx === activeIndex ? 'text-gray-900' : 'text-gray-600'}`}>
                        {loc.address}
                      </h4>
                      {loc.isMain && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full shrink-0">
                          Основная
                        </span>
                      )}
                    </div>
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
          <div className="lg:w-2/3 relative min-h-[400px] lg:min-h-[500px] rounded-[2rem] overflow-hidden shadow-inner border border-gray-200 bg-gray-100">
            {mapVisible ? (
              <iframe
                key={LOCATIONS[activeIndex].id}
                src={LOCATIONS[activeIndex].mapUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                allowFullScreen={true}
                loading="lazy"
                title={`Карта ${LOCATIONS[activeIndex].address}`}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center">
                  <Map size={32} className="text-gray-400" />
                </div>
                <p className="text-sm font-medium">Карта загружается...</p>
              </div>
            )}

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
