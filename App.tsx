import React, { useState, useEffect } from 'react';
import { PACKAGES } from './data';
import { DayType } from './types';
import { PackageCard } from './components/PackageCard';
import { PricingToggle } from './components/PricingToggle';
import { GuestSelector } from './components/GuestSelector';
import { Constructor } from './components/Constructor';
import { Timeline } from './components/Timeline';
import { Reviews } from './components/Reviews';
import { Locations } from './components/Locations';
import { Phone, Heart, ShieldCheck, Camera, Sparkles, ArrowUp, Mail, MapPin, Clock, X, MessageCircle, Wand2, Cookie, BellRing, HelpCircle, Timer } from 'lucide-react';

const App: React.FC = () => {
  const [dayType, setDayType] = useState<DayType>('weekday');
  const [extraGuests, setExtraGuests] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  
  // Visibility states for menus & Popups
  const [showHeader, setShowHeader] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // New States
  const [isBusinessHours, setIsBusinessHours] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showManagerPopup, setShowManagerPopup] = useState(false);

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);

    // Business Hours Logic (09:30 - 20:00)
    const checkTime = () => {
        const now = new Date();
        const minutes = now.getHours() * 60 + now.getMinutes();
        // 9:30 = 9*60 + 30 = 570
        // 20:00 = 20*60 = 1200
        setIsBusinessHours(minutes >= 570 && minutes < 1200);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    // Cookie Consent Check
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        setTimeout(() => setShowCookieConsent(true), 2000);
    }

    // Exit Intent Logic
    const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
            const hasSeenExit = sessionStorage.getItem('hasSeenExitPopup');
            if (!hasSeenExit) {
                setShowExitPopup(true);
                sessionStorage.setItem('hasSeenExitPopup', 'true');
            }
        }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mouseleave', handleMouseLeave);
        clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePackageSelect = (id: string) => {
    setSelectedPackageId(id);
    const constructorElement = document.getElementById('constructor-section');
    if (constructorElement) {
      constructorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieConsent(false);
  };

  const handleManagerSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowManagerPopup(false);
      alert('Спасибо! Ваша заявка принята. Менеджер свяжется с вами в ближайшее время.');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative">
      
      {/* Decorative Background Elements (Simplified/Whitened) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40"></div>
      </div>

      {/* Compact Header */}
      {showHeader && (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm supports-[backdrop-filter]:bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center relative">
            
            <div className="text-xl font-black text-brand-900 tracking-tight flex items-center gap-2">
              <span className="w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-base shadow-md">O</span>
              Obrazwill
            </div>

            <div className="flex items-center gap-4">
               <a href="tel:+78412500523" className="group flex items-center gap-2 text-brand-800 font-bold bg-white border border-brand-100 px-3 py-1.5 rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all shadow-sm">
                <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                  <Phone size={14} fill="currentColor" />
                </div>
                <span className="hidden md:inline text-sm">+7 (8412) 50-05-23</span>
              </a>

              {/* Header Close Button */}
              <button 
                onClick={() => setShowHeader(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all opacity-40 hover:opacity-100"
                aria-label="Скрыть меню"
              >
                <X size={16} />
              </button>
            </div>

          </div>
        </header>
      )}

      {/* Main Content Wrapper */}
      <main className={`relative z-10 transition-all duration-300 ${showHeader ? 'pt-20 md:pt-24' : 'pt-8 md:pt-12'}`}>
        
        {/* Hero Section */}
        <section className="pb-16 px-4 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-white border border-red-100 rounded-full pl-3 pr-5 py-1.5 text-sm font-bold text-gray-800 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <Heart size={18} className="text-red-500 fill-red-500 animate-pulse" />
            <span>Мамы доверяют, дети в восторге</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
            Подарите ребенку <br className="hidden md:block" />
            праздник мечты, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange">
              а себе — 3 часа отдыха
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
            Мы не продаем просто "аниматора". Мы продаем <span className="text-gray-900 font-semibold underline decoration-brand-300 decoration-2 underline-offset-2">спокойствие родителей</span>, 
            вовлеченность каждого ребенка и крутой контент на память.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-20">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-green-200 transition-colors group">
                  <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <ShieldCheck size={28} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">100% Спокойствия</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Дети заняты и под присмотром. Вы отдыхаете и общаетесь с гостями.</p>
                  </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-orange-200 transition-colors group">
                  <div className="bg-orange-100 w-12 h-12 rounded-2xl flex items-center justify-center text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Sparkles size={28} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">Именинник — звезда</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">В центре внимания весь праздник, а не только когда выносят торт.</p>
                  </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-blue-200 transition-colors group">
                  <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Camera size={28} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">Контент на память</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">Видео с квеста или фото — чтобы праздник остался в истории.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pb-24 px-4 max-w-7xl mx-auto" id="pricing">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Выберите сценарий идеального дня рождения</h2>
            <p className="text-lg text-gray-500">Выберите уровень впечатлений, который подходит вашему ребенку</p>
          </div>
          
          <PricingToggle dayType={dayType} setDayType={setDayType} />
          
          <GuestSelector extraGuests={extraGuests} setExtraGuests={setExtraGuests} />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start mb-16 px-2">
            {PACKAGES.map((pkg) => (
              <PackageCard 
                key={pkg.id} 
                pkg={pkg} 
                dayType={dayType} 
                extraGuests={extraGuests}
                onSelect={() => handlePackageSelect(pkg.id)}
              />
            ))}
          </div>

          {/* Flexible Package Banner */}
          <div className="max-w-4xl mx-auto mb-20 px-4">
            <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 text-center relative overflow-hidden shadow-sm">
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-brand-500 mb-4">
                        <Wand2 size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        Все пакеты — мобильны!
                    </h3>
                    <p className="text-gray-600 md:text-lg max-w-2xl leading-relaxed">
                        Если вам чего-то не хватает или наоборот что-то лишнее, то мы готовы собрать <span className="text-brand-700 font-semibold">идеальный праздник мечты</span> специально для вас.
                    </p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-brand-100/50 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-orange/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            </div>
          </div>

          {/* Timeline visualization */}
          <div className="max-w-4xl mx-auto mb-32">
             <Timeline />
          </div>

          {/* Constructor */}
          <div id="constructor-section" className="max-w-6xl mx-auto mb-20 scroll-mt-28">
            <div className="text-center mb-12">
              <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block">Индивидуальный подход</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Хотите собрать свой вариант?</h2>
              <p className="text-gray-600 text-lg">Начните с базы и добавьте только то, что хочется</p>
            </div>
            <Constructor 
              dayType={dayType} 
              setDayType={setDayType}
              extraGuests={extraGuests}
              selectedPackageId={selectedPackageId}
              onClearPackage={() => setSelectedPackageId(null)}
              onOpenManagerPopup={() => setShowManagerPopup(true)}
            />
          </div>

        </section>

        {/* Lead/Questions Section */}
        <section className="bg-brand-900 py-16 md:py-24 relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute inset-0">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-700/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-800/50 rounded-full blur-[100px] -ml-32 -mb-32"></div>
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
             </div>

             <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                 <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-lg text-brand-300">
                     <HelpCircle size={36} />
                 </div>
                 
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    Остались вопросы? <br className="hidden md:block"/>
                    <span className="text-brand-300">Наши менеджеры ответят и расскажут</span>
                 </h2>
                 <p className="text-brand-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Мы понимаем, что каждый праздник уникален. Позвоните нам или оставьте заявку, чтобы обсудить детали и подобрать идеальный вариант.
                 </p>

                 <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <button 
                        onClick={() => setShowManagerPopup(true)}
                        className="w-full sm:w-auto px-8 py-4 bg-white text-brand-900 font-bold text-lg rounded-xl hover:bg-brand-50 transition-colors shadow-xl shadow-brand-900/20 active:scale-[0.98]"
                     >
                        Задать вопрос менеджеру
                     </button>
                     <a href="tel:+78412500523" className="w-full sm:w-auto px-8 py-4 bg-brand-700/50 backdrop-blur border border-brand-500/30 text-white font-bold text-lg rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2">
                        <Phone size={20} />
                        <span>+7 (8412) 50-05-23</span>
                     </a>
                 </div>
             </div>
        </section>

        {/* Reviews Section */}
        <Reviews />
        
        {/* NEW: Map Slider Section */}
        <Locations />

        {/* DUPLICATED Pricing Section for Bottom */}
        <section className="pb-24 px-4 max-w-7xl mx-auto border-t border-gray-200 pt-20">
          <div className="text-center mb-12">
             <span className="text-accent-orange font-bold tracking-wider uppercase text-sm mb-2 block animate-pulse">Не упустите дату</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Всё ещё думаете?</h2>
            <p className="text-lg text-gray-500">Сравните тарифы еще раз и оставьте заявку, пока есть места</p>
          </div>
          
          <PricingToggle dayType={dayType} setDayType={setDayType} />
          
          <GuestSelector extraGuests={extraGuests} setExtraGuests={setExtraGuests} />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start px-2">
            {PACKAGES.map((pkg) => (
              <PackageCard 
                key={`${pkg.id}-bottom`} 
                pkg={pkg} 
                dayType={dayType} 
                extraGuests={extraGuests}
                onSelect={() => handlePackageSelect(pkg.id)}
              />
            ))}
          </div>
        </section>

        {/* FINAL Call to Action Block */}
        <section className="py-20 px-4 relative">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-900 to-brand-800 rounded-[2.5rem] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-900/30">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/30 rounded-full blur-3xl -ml-16 -mb-16"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              
              <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                      Остались вопросы?
                  </h2>
                  <p className="text-brand-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                      Оставьте заявку и мы перезвоним вам в течении <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-2.5 py-0.5 rounded-lg text-white font-bold border border-white/10"><Timer size={16} /> 5-15 минут</span>, чтобы ответить на любые Ваши вопросы
                  </p>
                  
                  <button 
                      onClick={() => setShowManagerPopup(true)}
                      className="bg-white text-brand-900 font-bold text-lg px-12 py-5 rounded-2xl hover:bg-brand-50 transition-all shadow-xl shadow-brand-900/40 active:scale-[0.95] hover:-translate-y-1 ring-4 ring-brand-900/20"
                  >
                      Оставить заявку
                  </button>
              </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`bg-gray-900 text-white py-16 px-4 relative z-10 transition-all duration-300 ${showBottomBar ? 'mb-[80px]' : ''}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
            
            {/* Legal Info + Addresses */}
            <div className="md:col-span-5">
                <div className="text-3xl font-black text-white mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-lg">O</span>
                  Obrazwill
                </div>
                
                <div className="space-y-4 text-gray-400 text-sm leading-relaxed mb-8">
                    <p>
                        <strong className="text-gray-200">ИП Фролов Максим Вячеславович</strong><br/>
                        ИНН: 583715087360<br/>
                        ОГРН: 322583500036950
                    </p>
                </div>

                <div className="space-y-4">
                  <h5 className="font-bold text-white text-sm uppercase tracking-wider">Адреса наших квестов в Пензе:</h5>
                  <div className="space-y-2 text-gray-400 text-sm">
                    <div className="flex items-start gap-2">
                        <MapPin size={16} className="shrink-0 mt-0.5 text-brand-500" />
                        <p>Г. Пенза, ул. Гагарина 28</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <MapPin size={16} className="shrink-0 mt-0.5 text-brand-500" />
                        <p>Г. Пенза, ул. Пролетарская 6</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <MapPin size={16} className="shrink-0 mt-0.5 text-brand-500" />
                        <p>Г. Пенза, ул. Чаадаева 36а</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-xs text-gray-600">
                    © {new Date().getFullYear()} Obrazwill. Все права защищены.
                </div>
            </div>

            {/* Contacts */}
            <div className="md:col-span-4">
                <h4 className="font-bold text-white mb-6 text-lg">Связаться с нами</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                        <Phone size={18} />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold">Телефон</span>
                        <a href="tel:+78412500523" className="text-white hover:text-brand-300 transition-colors text-lg font-bold">+7 (8412) 50-05-23</a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                        <Mail size={18} />
                    </div>
                    <div>
                        <span className="block text-xs text-gray-500 uppercase font-bold">Email</span>
                        <a href="mailto:obraz.strah@yandex.ru" className="text-white hover:text-brand-300 transition-colors">obraz.strah@yandex.ru</a>
                    </div>
                  </li>
                </ul>
            </div>

            {/* Hours */}
            <div className="md:col-span-3">
                <h4 className="font-bold text-white mb-6 text-lg">Режим работы</h4>
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-brand-400">
                        <Clock size={18} />
                    </div>
                    <div>
                        <p className="text-white font-medium">Ежедневно</p>
                        <p className="text-gray-400 text-sm mb-1">с понедельника по воскресенье</p>
                        <p className="text-brand-300 font-bold text-lg">09:00 — 00:00</p>
                    </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  {/* Social placeholders */}
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0077FF] hover:text-white transition-all cursor-pointer text-gray-400 border border-gray-700">
                    <span className="font-bold text-[10px]">VK</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#2AABEE] hover:text-white transition-all cursor-pointer text-gray-400 border border-gray-700">
                    <span className="font-bold text-[10px]">TG</span>
                  </div>
                </div>
            </div>
        </div>
      </footer>

      {/* Floating Buttons Container */}
      <div className={`fixed right-4 md:right-6 z-[55] flex flex-col items-end gap-3 transition-all duration-300`}
           style={{ bottom: showBottomBar ? '80px' : '30px' }}>
         
         {/* Contact Menu Items */}
         <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${isContactOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
            <a href="https://vk.com/obrazwill" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-3 bg-[#0077FF] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-lg hover:brightness-110 transition-all border border-white/20">
               <span className="text-xs font-bold whitespace-nowrap">Написать в VK</span>
               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.162 18.994c.609 0 1.016-.085 1.232-.249.203-.163.266-.45.266-.879 0-.606-.025-1.32.044-1.587.106-.414.497-.563.894-.156.403.414 1.765 2.566 2.658 2.87.671.228 1.173.067 1.173.067l2.36-.024c.71 0 .695-.376.541-.75-.195-.466-1.302-2.316-1.683-2.736-.37-.406-.514-.57-.096-1.144 0 0 1.956-2.666 2.13-3.486.079-.374-.265-.544-.813-.544l-2.434.017c-.206-.007-.446.064-.582.353-.058.125-.972 2.406-1.353 3.053-.787 1.34-1.106 1.458-1.236 1.267-.282-.416-.208-1.673-.208-2.585 0-2.822.446-4.008-1.047-4.008-1.011 0-1.678.307-2.112.63-.306.226-.538.744-.395.772.179.035.586.166.801.446.28.365.27.913.27 2.916 0 .618-.113 2.218-1.139 2.218-.328 0-1.137-.367-1.928-1.688-1.04-1.745-1.847-3.69-1.847-3.69s-.144-.355-.407-.549c-.214-.158-.512-.209-.512-.209l-2.569.017c-.383 0-.528.174-.528.367 0 .341.42 2.059 2.007 4.195 2.484 3.344 5.345 3.514 5.954 3.514z"/></svg>
               </div>
            </a>
         </div>

         {/* Main Contact Toggle */}
         <button 
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="w-12 h-12 bg-brand-500 text-white rounded-full shadow-xl shadow-brand-500/30 flex items-center justify-center hover:bg-brand-600 hover:scale-105 transition-all relative z-10"
            aria-label="Связаться с нами"
         >
            {isContactOpen ? <X size={24} /> : <MessageCircle size={24} fill="currentColor" className="text-white" />}
            {!isContactOpen && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>}
         </button>

         {/* Scroll Top - Stacked below */}
         <button 
            onClick={scrollToTop}
            className={`w-10 h-10 bg-gray-900/80 backdrop-blur text-white rounded-full shadow-lg flex items-center justify-center hover:bg-black transition-all duration-300
                ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0 h-0 w-0 overflow-hidden'}
            `}
            aria-label="Наверх"
         >
            <ArrowUp size={20} />
         </button>

      </div>

      {/* Optimized Sticky Bottom Bar */}
      {showBottomBar && (
        <div className="fixed bottom-0 left-0 right-0 z-[50] bg-white/95 backdrop-blur-xl border-t border-brand-200 shadow-[0_-4px_30px_rgba(0,0,0,0.08)] py-3 px-3 animate-in slide-in-from-bottom-full duration-500">
             <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 md:gap-4 relative pr-8 md:pr-0">
                
                {/* Dynamic Status Text */}
                <div className="hidden md:block shrink-0">
                    {isBusinessHours ? (
                        <p className="font-bold text-gray-900 text-sm leading-tight flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse ring-4 ring-green-100"></span>
                            Мы сейчас онлайн и оперативно ответим
                        </p>
                    ) : (
                        <p className="font-bold text-gray-900 text-sm leading-tight flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                            Мы сейчас отдыхаем, но утром сразу перезвоним
                        </p>
                    )}
                </div>

                <form className="flex w-full md:w-auto gap-2 flex-1 md:flex-none justify-center" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="tel" 
                        placeholder="+7 (___) ___-__-__" 
                        className="w-full md:w-56 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all text-gray-900"
                    />
                    <button className="bg-brand-600 text-white font-bold text-sm px-4 py-2 rounded-lg hover:bg-brand-700 active:scale-95 transition-all shadow-sm shadow-brand-200 whitespace-nowrap">
                        Жду звонка
                    </button>
                </form>

                 {/* Close Button */}
                 <button 
                    onClick={() => setShowBottomBar(false)} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 md:static md:translate-y-0 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                    aria-label="Скрыть"
                 >
                    <X size={18} />
                 </button>
             </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
          <div className="fixed bottom-0 md:bottom-20 left-0 right-0 md:left-4 md:right-auto md:max-w-md z-[60] p-4 animate-in slide-in-from-bottom duration-500">
            <div className="bg-gray-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-white/10 flex flex-col gap-3">
               <div className="flex items-start gap-3">
                   <Cookie className="text-brand-400 shrink-0" size={24} />
                   <p className="text-sm text-gray-300 leading-relaxed">
                       Мы используем куки, чтобы сайт работал быстрее, а праздник подбирался удобнее.
                   </p>
               </div>
               <button 
                  onClick={acceptCookies}
                  className="bg-white text-gray-900 font-bold py-2 px-4 rounded-xl text-sm hover:bg-gray-200 transition-colors w-full"
                >
                   Хорошо, я согласен
               </button>
            </div>
          </div>
      )}

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             {/* Backdrop */}
             <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowExitPopup(false)}></div>
             
             {/* Modal */}
             <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
                 <button 
                    onClick={() => setShowExitPopup(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full"
                 >
                     <X size={20} />
                 </button>

                 <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 animate-bounce">
                        <BellRing size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Подождите!</h3>
                    <p className="text-gray-600 text-lg leading-snug">
                       Давайте мы перезвоним и ответим на все ваши вопросы?
                    </p>
                 </div>

                 <form onSubmit={(e) => { e.preventDefault(); setShowExitPopup(false); alert('Спасибо! Мы скоро перезвоним.'); }}>
                    <div className="space-y-3">
                        <input 
                            type="tel" 
                            placeholder="Ваш номер телефона" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                        />
                        <button className="w-full bg-brand-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                            Позвоните мне
                        </button>
                    </div>
                 </form>
                 <p className="text-xs text-center text-gray-400 mt-4">
                     Это займет всего 30 секунд
                 </p>
             </div>
        </div>
      )}

      {/* NEW: Manager Lead Popup */}
      {showManagerPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
             {/* Backdrop */}
             <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowManagerPopup(false)}></div>
             
             {/* Modal */}
             <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
                 <button 
                    onClick={() => setShowManagerPopup(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full"
                 >
                     <X size={20} />
                 </button>

                 <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                        <MessageCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Задать вопрос</h3>
                    <p className="text-gray-600 leading-snug">
                       Оставьте свои контакты, и наш менеджер свяжется с вами, чтобы обсудить детали вашего праздника.
                    </p>
                 </div>

                 <form onSubmit={handleManagerSubmit}>
                    <div className="space-y-3">
                        <input 
                            type="text" 
                            placeholder="Как вас зовут?" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                        />
                        <input 
                            type="tel" 
                            placeholder="Номер телефона" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                        />
                        <button className="w-full bg-brand-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                            Отправить заявку
                        </button>
                    </div>
                 </form>
                 <p className="text-[10px] text-center text-gray-400 mt-4 leading-tight">
                     Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                 </p>
             </div>
        </div>
      )}

    </div>
  );
};
export default App;