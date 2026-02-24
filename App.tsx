import React, { useState, useEffect, useRef } from 'react';
import { PACKAGES } from './data';
import { DayType } from './types';
import { PackageCard } from './components/PackageCard';
import { PricingToggle } from './components/PricingToggle';
import { GuestSelector } from './components/GuestSelector';
import { Constructor } from './components/Constructor';
import { Timeline } from './components/Timeline';
import { Reviews } from './components/Reviews';
import { Locations } from './components/Locations';
import { ThankYou } from './components/ThankYou';
import { PaymentPolicy } from './components/PaymentPolicy';
import { UserAgreement } from './components/UserAgreement';
import { FAQ } from './components/FAQ';
import { Blog } from './components/Blog';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Phone, Heart, ShieldCheck, Camera, Sparkles, ArrowUp, MapPin, X, MessageCircle, Wand2, Cookie, BellRing, Timer, Trophy, Star, CalendarDays, Award, PhoneCall } from 'lucide-react';

const MainApp: React.FC = () => {
  const [dayType, setDayType] = useState<DayType>('weekday');
  const [extraGuests, setExtraGuests] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  
  // Visibility states for menus & Popups
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // New States
  const [isBusinessHours, setIsBusinessHours] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showManagerPopup, setShowManagerPopup] = useState(false);
  const [managerName, setManagerName] = useState('');
  const [managerPhone, setManagerPhone] = useState('');
  const [showCallbackPopup, setShowCallbackPopup] = useState(false);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [exitPhone, setExitPhone] = useState('');
  const cookieBannerActiveRef = useRef(false);

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
        setTimeout(() => {
            setShowCookieConsent(true);
            cookieBannerActiveRef.current = true;
        }, 2000);
    }

    // Exit Intent Logic
    const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
            const hasSeenExit = sessionStorage.getItem('hasSeenExitPopup');
            if (!hasSeenExit && !cookieBannerActiveRef.current) {
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
    cookieBannerActiveRef.current = false;
  };

  const buildMeta = () => {
    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
    const device = /Mobi|Android/i.test(navigator.userAgent) ? '📱 Мобильный' : '🖥 Десктоп';
    const referrer = document.referrer ? `\n🔗 Откуда: ${sanitizeHtml(document.referrer)}` : '';
    return `\n\n🕐 Время: ${now} (МСК)\n${device}${referrer}\n🌐 URL: ${sanitizeHtml(window.location.href)}`;
  };

  const handleManagerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkRateLimit()) { alert('Слишком много заявок. Подождите немного и попробуйте снова.'); return; }
    const text = `📩 <b>Новая заявка (форма менеджера)</b>\n\n👤 Имя: ${sanitizeHtml(managerName)}\n📞 Телефон: ${sanitizeHtml(managerPhone)}${buildMeta()}`;
    await sendToTelegram(text);
    recordSubmission();
    setManagerName('');
    setManagerPhone('');
    setShowManagerPopup(false);
    window.location.href = '/?thanks';
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkRateLimit()) { alert('Слишком много заявок. Подождите немного и попробуйте снова.'); return; }
    const text = `📞 <b>Запрос обратного звонка</b>\n\n👤 Имя: ${sanitizeHtml(callbackName)}\n📞 Телефон: ${sanitizeHtml(callbackPhone)}${buildMeta()}`;
    await sendToTelegram(text);
    recordSubmission();
    setCallbackName('');
    setCallbackPhone('');
    setShowCallbackPopup(false);
    setIsContactOpen(false);
    window.location.href = '/?thanks';
  };

  const handleExitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkRateLimit()) { alert('Слишком много заявок. Подождите немного и попробуйте снова.'); return; }
    const text = `🚪 <b>Заявка (exit-popup)</b>\n\n📞 Телефон: ${sanitizeHtml(exitPhone)}${buildMeta()}`;
    await sendToTelegram(text);
    recordSubmission();
    setExitPhone('');
    setShowExitPopup(false);
    window.location.href = '/?thanks';
  };

  return (
    <div className="min-h-screen bg-[#FDFDFE] font-sans text-gray-900 [overflow-x:clip] relative">
      
      {/* Decorative Background Elements (Simplified/Whitened) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40"></div>
      </div>

      {/* Compact Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 shadow-[0_1px_20px_rgba(0,0,0,0.06)] supports-[backdrop-filter]:bg-white/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

          <div className="text-lg font-black text-brand-900 tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-700 rounded-lg flex items-center justify-center text-white text-sm shadow-md shadow-brand-200">O</span>
            Obrazwill
          </div>

          <nav aria-label="Навигация по странице" className="hidden lg:flex items-center gap-1">
            <a href="#pricing" className="text-sm font-semibold text-gray-600 hover:text-brand-600 hover:bg-brand-50 px-4 py-2 rounded-full transition-all">Пакеты и цены</a>
            <a href="#constructor-section" className="text-sm font-semibold text-gray-600 hover:text-brand-600 hover:bg-brand-50 px-4 py-2 rounded-full transition-all">Конструктор</a>
            <a href="#faq" className="text-sm font-semibold text-gray-600 hover:text-brand-600 hover:bg-brand-50 px-4 py-2 rounded-full transition-all">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://t.me/+79521990805?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%AF%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20obrazwill-kids.ru" target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram"
              className="hidden md:flex w-9 h-9 rounded-full bg-[#2AABEE]/10 border border-[#2AABEE]/30 items-center justify-center text-[#2AABEE] hover:bg-[#2AABEE] hover:text-white hover:border-[#2AABEE] hover:shadow-md hover:shadow-sky-200 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.12 14.063l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.696.523z"/></svg>
            </a>
            <a href="https://vk.com/im?sel=-193250153" target="_blank" rel="noopener noreferrer" aria-label="Написать в ВКонтакте"
              className="hidden md:flex w-9 h-9 rounded-full bg-[#0077FF]/10 border border-[#0077FF]/30 items-center justify-center text-[#0077FF] hover:bg-[#0077FF] hover:text-white hover:border-[#0077FF] hover:shadow-md hover:shadow-blue-200 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13.162 18.994c.609 0 1.016-.085 1.232-.249.203-.163.266-.45.266-.879 0-.606-.025-1.32.044-1.587.106-.414.497-.563.894-.156.403.414 1.765 2.566 2.658 2.87.671.228 1.173.067 1.173.067l2.36-.024c.71 0 .695-.376.541-.75-.195-.466-1.302-2.316-1.683-2.736-.37-.406-.514-.57-.096-1.144 0 0 1.956-2.666 2.13-3.486.079-.374-.265-.544-.813-.544l-2.434.017c-.206-.007-.446.064-.582.353-.058.125-.972 2.406-1.353 3.053-.787 1.34-1.106 1.458-1.236 1.267-.282-.416-.208-1.673-.208-2.585 0-2.822.446-4.008-1.047-4.008-1.011 0-1.678.307-2.112.63-.306.226-.538.744-.395.772.179.035.586.166.801.446.28.365.27.913.27 2.916 0 .618-.113 2.218-1.139 2.218-.328 0-1.137-.367-1.928-1.688-1.04-1.745-1.847-3.69-1.847-3.69s-.144-.355-.407-.549c-.214-.158-.512-.209-.512-.209l-2.569.017c-.383 0-.528.174-.528.367 0 .341.42 2.059 2.007 4.195 2.484 3.344 5.345 3.514 5.954 3.514z"/></svg>
            </a>
            <a href="tel:+78412500523" className="group flex items-center gap-2 text-brand-800 font-bold bg-gradient-to-r from-brand-50 to-white border border-brand-200 px-4 py-2 rounded-full hover:border-brand-400 hover:shadow-md hover:shadow-brand-100 transition-all shadow-sm">
              <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                <Phone size={13} fill="currentColor" />
              </div>
              <span className="hidden md:inline text-sm">+7 (8412) 50-05-23</span>
            </a>
          </div>

        </div>
      </header>

      {/* Main Content Wrapper */}
      <main className="relative z-10 pt-20 md:pt-24">
        
        {/* Hero Section */}
        <section aria-label="Главная секция" className="pb-6 px-4 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 rounded-full pl-3 pr-5 py-2 text-sm font-bold text-gray-800 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default ring-1 ring-red-50">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto mb-6">
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-50 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center text-green-600 mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <ShieldCheck size={28} />
                  </div>
                  <div>
                      <h3 className="font-black text-gray-900 text-lg mb-2">100% Спокойствия</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Дети заняты и под присмотром. Вы отдыхаете и общаетесь с гостями.</p>
                  </div>
              </div>
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-orange-100 to-amber-50 w-14 h-14 rounded-2xl flex items-center justify-center text-orange-500 mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <Sparkles size={28} />
                  </div>
                  <div>
                      <h3 className="font-black text-gray-900 text-lg mb-2">Именинник — звезда</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">В центре внимания весь праздник, а не только когда выносят торт.</p>
                  </div>
              </div>
              <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-blue-100 to-sky-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-500 mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <Camera size={28} />
                  </div>
                  <div>
                      <h3 className="font-black text-gray-900 text-lg mb-2">Контент на память</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">Видео с квеста или фото — чтобы праздник остался в истории.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* Social Proof / Stats Section */}
        <section aria-label="Наши достижения" className="pb-16 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

            <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm hover:shadow-lg hover:shadow-brand-50 hover:border-brand-200 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Trophy size={22} />
              </div>
              <p className="text-3xl font-black text-gray-900 leading-none mb-1">500+</p>
              <p className="text-xs text-gray-500 font-medium leading-tight">праздников<br/>проведено</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm hover:shadow-lg hover:shadow-orange-50 hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <CalendarDays size={22} />
              </div>
              <p className="text-3xl font-black text-gray-900 leading-none mb-1">5+</p>
              <p className="text-xs text-gray-500 font-medium leading-tight">лет на рынке<br/>развлечений</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm hover:shadow-lg hover:shadow-amber-50 hover:border-amber-200 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl flex items-center justify-center text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Star size={22} className="fill-amber-400 text-amber-400" />
              </div>
              <p className="text-3xl font-black text-gray-900 leading-none mb-1">5.0 ⭐</p>
              <p className="text-xs text-gray-500 font-medium leading-tight">рейтинг на<br/>Яндекс.Картах</p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm hover:shadow-lg hover:shadow-green-50 hover:border-green-200 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-50 rounded-2xl flex items-center justify-center text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Award size={22} />
              </div>
              <p className="text-2xl font-black text-gray-900 leading-none mb-1">2026</p>
              <p className="text-xs text-gray-500 font-medium leading-tight">«Хорошее место»<br/>Яндекс.Карты</p>
            </div>

          </div>
        </section>

        {/* Video Section */}
        <section aria-label="Видео с праздников" className="pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block">Живые впечатления</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Посмотрите, как дети<br className="hidden md:block" /> проводят время у нас
            </h2>
            <p className="text-lg text-gray-500 mb-6 max-w-xl mx-auto">Вот как выглядит настоящий восторг — и это только маленький кусочек того, что мы делаем для детей.</p>

            <div className="flex items-center justify-center gap-2 mb-4 text-brand-600">
              <svg className="w-5 h-5 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
              <span className="text-sm font-semibold text-gray-500">Нажмите, чтобы посмотреть видео <span className="text-gray-400">(меньше 2 минут)</span></span>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-100/40 border border-gray-100 bg-gray-900">
              <video
                className="w-full aspect-video object-cover"
                controls
                preload="metadata"
                poster=""
              >
                <source src="/video/Квестовый номер old.mp4" type="video/mp4" />
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            </div>

            <div className="mt-10">
              <a
                href="#pricing"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-lg shadow-brand-200 hover:shadow-xl hover:shadow-brand-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Sparkles size={20} />
                Хочу такой праздник!
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section aria-labelledby="pricing-heading" className="pb-24 px-4 max-w-7xl mx-auto" id="pricing">
          <div className="text-center mb-12">
            <h2 id="pricing-heading" className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Выберите сценарий идеального дня рождения</h2>
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
          <div className="max-w-4xl mx-auto mb-40 px-4">
            <div className="bg-gradient-to-br from-brand-50 via-white to-fuchsia-50 border border-brand-100 rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden shadow-md shadow-brand-100/30">
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-lg shadow-brand-100 flex items-center justify-center text-brand-500 mb-5 ring-1 ring-brand-100">
                        <Wand2 size={28} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                        Все пакеты — мобильны!
                    </h3>
                    <p className="text-gray-600 md:text-lg max-w-2xl leading-relaxed">
                        Если вам чего-то не хватает или наоборот что-то лишнее, то мы готовы собрать <span className="text-brand-700 font-semibold">идеальный праздник мечты</span> специально для вас.
                    </p>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-56 h-56 bg-brand-100/60 rounded-full -translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-accent-orange/15 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
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
              setExtraGuests={setExtraGuests}
              selectedPackageId={selectedPackageId}
              onClearPackage={() => setSelectedPackageId(null)}
              onOpenManagerPopup={() => setShowManagerPopup(true)}
            />
          </div>

        </section>

        {/* Hotline Block */}
        <section aria-label="Горячая линия" className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#111115] border border-white/8 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
              {/* Subtle red glow corners */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-brand-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-600/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

              <div className="relative z-10 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Прямая связь с организаторами</p>
                <h2 className="text-xl md:text-3xl font-black text-white mb-2 leading-snug">
                  Горячая линия детских праздников Obrazwill Kids —{' '}
                  <a href="tel:+78412500523" className="text-brand-400 hover:text-brand-300 transition-colors whitespace-nowrap">
                    +7 (8412) 50-05-23
                  </a>
                </h2>
                <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-4 mb-8 leading-relaxed">
                  Не знаете, какой пакет подойдёт вашему ребёнку? Расскажите нам о поводе и пожеланиях — подберём сценарий, ответим на любые вопросы и забронируем удобную дату.
                </p>

                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <a href="tel:+78412500523"
                    className="inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-900/40 active:scale-[0.97]">
                    <Phone size={18} fill="currentColor" />
                    Позвонить
                  </a>
                  <a href="https://t.me/+79521990805?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%AF%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20obrazwill-kids.ru"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#2AABEE] hover:bg-[#1d99d9] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-sky-900/30 active:scale-[0.97]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.12 14.063l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.696.523z"/></svg>
                    Telegram
                  </a>
                  <a href="https://vk.com/im?sel=-193250153"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#0077FF] hover:bg-[#005fcc] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/30 active:scale-[0.97]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.162 18.994c.609 0 1.016-.085 1.232-.249.203-.163.266-.45.266-.879 0-.606-.025-1.32.044-1.587.106-.414.497-.563.894-.156.403.414 1.765 2.566 2.658 2.87.671.228 1.173.067 1.173.067l2.36-.024c.71 0 .695-.376.541-.75-.195-.466-1.302-2.316-1.683-2.736-.37-.406-.514-.57-.096-1.144 0 0 1.956-2.666 2.13-3.486.079-.374-.265-.544-.813-.544l-2.434.017c-.206-.007-.446.064-.582.353-.058.125-.972 2.406-1.353 3.053-.787 1.34-1.106 1.458-1.236 1.267-.282-.416-.208-1.673-.208-2.585 0-2.822.446-4.008-1.047-4.008-1.011 0-1.678.307-2.112.63-.306.226-.538.744-.395.772.179.035.586.166.801.446.28.365.27.913.27 2.916 0 .618-.113 2.218-1.139 2.218-.328 0-1.137-.367-1.928-1.688-1.04-1.745-1.847-3.69-1.847-3.69s-.144-.355-.407-.549c-.214-.158-.512-.209-.512-.209l-2.569.017c-.383 0-.528.174-.528.367 0 .341.42 2.059 2.007 4.195 2.484 3.344 5.345 3.514 5.954 3.514z"/></svg>
                    ВКонтакте
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <Reviews />

        {/* Safety / Trust Block for Moms */}
        <section aria-label="Безопасность" className="py-20 px-4 bg-[#0f0f13] relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-900/60 rounded-[100%] blur-[100px]"></div>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-400 mb-4 bg-brand-900/60 border border-brand-700/40 px-4 py-1.5 rounded-full">Для спокойствия мам</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Безопасность — <span className="text-brand-400">наш стандарт,</span><br className="hidden md:block" /> а не исключение
              </h2>
              <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                Мы понимаем: отпустить ребенка на квест — это доверие. Вот как мы его оправдываем.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {/* Card 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-500/40 hover:bg-white/8 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-brand-700/30 border border-brand-600/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-4 leading-snug">Можно выдохнуть: мы позаботились о каждой детали</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Перед игрой проводим понятный инструктаж для детей — без стресса и страшилок</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Все помещения адаптированы для детей: никаких острых углов и опасных зон</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>По вашей просьбе проводим квест без физического контакта</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Для малышей до 7 лет предусмотрен аниматор-сопровождающий рядом</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-500/40 hover:bg-white/8 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-brand-700/30 border border-brand-600/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-4 leading-snug">Команда, которой мамы доверяют своих детей</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Каждый аниматор проходит регулярное обучение и проверку — случайных людей нет</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Наши сотрудники умеют спокойно действовать в любой нестандартной ситуации</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Администратор следит за игрой в режиме реального времени через камеры</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Команда всегда подстраивается под темп и настроение вашего ребенка</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-brand-500/40 hover:bg-white/8 transition-all group">
                <div className="w-14 h-14 rounded-xl bg-brand-700/30 border border-brand-600/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-4 leading-snug">Всё под контролем — в том числе эмоции</h3>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Уровень страшилок регулируется: скажите нам про чувствительного ребенка — скорректируем сценарий</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Любой участник может выйти из квеста в любой момент — без вопросов</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Вы можете позвонить нам прямо во время игры — мы всегда на связи</li>
                  <li className="flex items-start gap-2.5"><span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"></span>Если праздник не оправдал ожиданий — вернем деньги. Мы уверены в своем продукте</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* NEW: Map Slider Section */}
        <Locations />

        {/* FAQ Section */}
        <FAQ onOpenManager={() => setShowManagerPopup(true)} />

        {/* FINAL Call to Action Block */}
        <section aria-label="Оставить заявку" className="py-20 px-4 relative">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-900 to-brand-800 rounded-[2.5rem] p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-900/30">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/30 rounded-full blur-3xl -ml-16 -mb-16"></div>
              
              <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                      Остались вопросы?
                  </h2>
                  <p className="text-brand-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                      Оставьте заявку и мы перезвоним вам в течении <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur px-2.5 py-0.5 rounded-lg text-white font-bold border border-white/10"><Timer size={16} /> 10 минут</span>, чтобы ответить на любые Ваши вопросы
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
      <footer className={`bg-[#0c0c10] text-white relative z-10 transition-all duration-300 ${showBottomBar ? 'mb-[80px]' : ''}`}>

        {/* Top divider */}
        <div className="border-t border-white/5"></div>

        {/* Main footer body */}
        <div className="max-w-7xl mx-auto px-4 pt-14 pb-10">
          <div className="grid md:grid-cols-12 gap-10 lg:gap-16">

            {/* Col 1: Brand + Legal */}
            <div className="md:col-span-4">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-700 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-brand-900/50 font-black">O</span>
                <span className="text-2xl font-black text-white tracking-tight">Obrazwill</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-5 font-medium tracking-wider uppercase">Образвилл® — зарегистрированный бренд</p>

              <div className="text-gray-400 text-xs leading-relaxed space-y-1 mb-6">
                <p className="text-gray-300 font-medium">ИП Фролов Максим Вячеславович</p>
                <p>ИНН: 583715087360 · ОГРНИП: 322583500036950</p>
                <p>440034, г. Пенза, ул. Ватутина, д. 93</p>
              </div>

              <div className="mb-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Наши квесты в Пензе</p>
                <div className="space-y-1.5 text-gray-400 text-xs">
                  {[['ул. Гагарина, 28'], ['ул. Пролетарская, 6'], ['ул. Чаадаева, 36а']].map(([addr]) => (
                    <div key={addr} className="flex items-center gap-2">
                      <MapPin size={12} className="shrink-0 text-brand-600" />
                      <span>{addr}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Способы оплаты — white bg */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Способы оплаты</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="h-8 px-3 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm" title="Visa">
                    <svg viewBox="0 0 36 20" className="h-4 w-auto" xmlns="http://www.w3.org/2000/svg">
                      <text x="1" y="15" fontFamily="Arial" fontSize="14" fontWeight="900" fill="#1A1F71" letterSpacing="-0.5">VISA</text>
                    </svg>
                  </div>
                  <div className="h-8 px-2.5 bg-white rounded-lg border border-gray-200 flex items-center justify-center gap-1 shadow-sm" title="Mastercard">
                    <div className="w-5 h-5 rounded-full bg-[#EB001B]"></div>
                    <div className="w-5 h-5 rounded-full bg-[#F79E1B] -ml-2.5"></div>
                  </div>
                  <div className="h-8 px-3 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm" title="Мир">
                    <span className="text-[11px] font-black" style={{background:'linear-gradient(90deg,#00B4E6,#4DB45E)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>МИР</span>
                  </div>
                  <div className="h-8 px-3 bg-white rounded-lg border border-gray-200 flex items-center justify-center shadow-sm" title="СБП">
                    <span className="text-[11px] font-black text-[#1D3FBF]">СБП</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2: Contacts */}
            <div className="md:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Контакты</p>
              <ul className="space-y-4">
                <li>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-0.5">Телефон</span>
                  <a href="tel:+78412500523" className="text-white hover:text-brand-300 transition-colors text-lg font-black">+7 (8412) 50-05-23</a>
                </li>
                <li>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-0.5">Email</span>
                  <a href="mailto:obraz.strah@yandex.ru" className="text-gray-300 hover:text-brand-300 transition-colors text-sm">obraz.strah@yandex.ru</a>
                </li>
                <li>
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-0.5">Режим работы</span>
                  <p className="text-gray-300 text-sm">Ежедневно, пн–вс</p>
                  <p className="text-brand-400 font-bold">09:00 — 00:00</p>
                </li>
              </ul>

              <nav aria-label="Мессенджеры" className="mt-6 flex gap-2.5">
                <a href="https://vk.com/im?sel=-193250153" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#0077FF] hover:border-[#0077FF] hover:text-white transition-all text-xs font-bold">VK</a>
                <a href="https://t.me/+79521990805?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%AF%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20obrazwill-kids.ru" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#2AABEE] hover:border-[#2AABEE] hover:text-white transition-all text-xs font-bold">TG</a>
              </nav>
            </div>

            {/* Col 3: Navigation */}
            <div className="md:col-span-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">Навигация</p>
              <nav className="space-y-2.5 text-sm">
                {[
                  ['#pricing', 'Пакеты и цены'],
                  ['#constructor-section', 'Конструктор праздника'],
                  ['#faq', 'Частые вопросы'],
                  ['/blog', 'Блог'],
                ].map(([href, label]) => (
                  <a key={href} href={href} className="flex items-center gap-2 text-gray-400 hover:text-brand-400 transition-colors group">
                    <span className="w-1 h-1 rounded-full bg-brand-600 group-hover:bg-brand-400 transition-colors"></span>
                    {label}
                  </a>
                ))}
              </nav>

              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Правовые документы</p>
                <nav className="space-y-2 text-xs">
                  {[
                    ['/?payment', 'Правила оплаты и возврата'],
                    ['/?agreement', 'Пользовательское соглашение'],
                    ['/privacy', 'Политика конфиденциальности'],
                  ].map(([href, label]) => (
                    <a key={href} href={href} className="text-gray-400 hover:text-brand-400 transition-colors underline underline-offset-2 block">{label}</a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} Obrazwill Kids. Все права защищены. Образвилл® — зарегистрированный товарный знак.</p>
            <p>Пенза, Россия</p>
          </div>
        </div>

      </footer>

      {/* Floating Buttons Container */}
      <div className={`fixed right-4 md:right-6 z-[55] flex flex-col items-end gap-3 transition-all duration-300`}
           style={{ bottom: showBottomBar ? '92px' : '30px' }}>
         
         {/* Contact Menu Items */}
         <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${isContactOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
            <a href="https://t.me/+79521990805?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%AF%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20obrazwill-kids.ru" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 bg-[#2AABEE] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-lg hover:brightness-110 transition-all border border-white/20">
               <span className="text-xs font-bold whitespace-nowrap">Написать в Telegram</span>
               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.12 14.063l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.696.523z"/></svg>
               </div>
            </a>
            <a href="https://vk.com/im?sel=-193250153" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 bg-[#0077FF] text-white pl-4 pr-1.5 py-1.5 rounded-full shadow-lg hover:brightness-110 transition-all border border-white/20">
               <span className="text-xs font-bold whitespace-nowrap">Написать в VK</span>
               <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.162 18.994c.609 0 1.016-.085 1.232-.249.203-.163.266-.45.266-.879 0-.606-.025-1.32.044-1.587.106-.414.497-.563.894-.156.403.414 1.765 2.566 2.658 2.87.671.228 1.173.067 1.173.067l2.36-.024c.71 0 .695-.376.541-.75-.195-.466-1.302-2.316-1.683-2.736-.37-.406-.514-.57-.096-1.144 0 0 1.956-2.666 2.13-3.486.079-.374-.265-.544-.813-.544l-2.434.017c-.206-.007-.446.064-.582.353-.058.125-.972 2.406-1.353 3.053-.787 1.34-1.106 1.458-1.236 1.267-.282-.416-.208-1.673-.208-2.585 0-2.822.446-4.008-1.047-4.008-1.011 0-1.678.307-2.112.63-.306.226-.538.744-.395.772.179.035.586.166.801.446.28.365.27.913.27 2.916 0 .618-.113 2.218-1.139 2.218-.328 0-1.137-.367-1.928-1.688-1.04-1.745-1.847-3.69-1.847-3.69s-.144-.355-.407-.549c-.214-.158-.512-.209-.512-.209l-2.569.017c-.383 0-.528.174-.528.367 0 .341.42 2.059 2.007 4.195 2.484 3.344 5.345 3.514 5.954 3.514z"/></svg>
               </div>
            </a>
            <button
               onClick={() => { setShowCallbackPopup(true); setIsContactOpen(false); }}
               className="flex items-center gap-3 bg-white text-gray-800 pl-4 pr-1.5 py-1.5 rounded-full shadow-lg hover:brightness-95 transition-all border border-gray-200">
               <span className="text-xs font-bold whitespace-nowrap">Перезвоните мне</span>
               <div className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center shrink-0 text-brand-600">
                 <PhoneCall size={16} />
               </div>
            </button>
         </div>

         {/* Main Contact Toggle */}
         <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 text-white rounded-2xl shadow-xl shadow-brand-500/40 flex items-center justify-center hover:shadow-2xl hover:shadow-brand-500/50 hover:scale-105 transition-all relative z-10"
            aria-label="Связаться с нами"
         >
            {isContactOpen ? <X size={24} /> : <MessageCircle size={24} fill="currentColor" className="text-white" />}
            {!isContactOpen && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>}
         </button>

         {/* Scroll Top - same size as chat button */}
         <button
            onClick={scrollToTop}
            className={`w-14 h-14 bg-gray-900/85 backdrop-blur text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-black hover:scale-105 transition-all duration-300
                ${showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0 overflow-hidden pointer-events-none'}
            `}
            aria-label="Наверх"
         >
            <ArrowUp size={22} />
         </button>

      </div>

      {/* Optimized Sticky Bottom Bar */}
      {showBottomBar && (
        <div className="fixed bottom-0 left-0 right-0 z-[50] bg-white border-t border-gray-200 shadow-[0_-8px_40px_rgba(0,0,0,0.12)] py-3 px-4 animate-in slide-in-from-bottom-full duration-500">
          <div className="max-w-4xl mx-auto flex items-center gap-3 md:gap-5">

            {/* Status Text */}
            <div className="hidden md:block shrink-0">
              {isBusinessHours ? (
                <div>
                  <p className="font-black text-gray-900 text-sm leading-tight flex items-center gap-2 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse ring-4 ring-green-100 shrink-0"></span>
                    Мы онлайн — ответим быстро!
                  </p>
                  <p className="text-xs text-gray-400 pl-[18px]">Перезвоним в течение 10 минут</p>
                </div>
              ) : (
                <div>
                  <p className="font-black text-gray-900 text-sm leading-tight flex items-center gap-2 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                    Оставьте номер — перезвоним утром
                  </p>
                  <p className="text-xs text-gray-400">Работаем с 09:00 до 00:00</p>
                </div>
              )}
            </div>

            {/* Form — single row */}
            <form
              className="flex items-center gap-2 flex-1"
              onSubmit={(e) => { e.preventDefault(); setShowBottomBar(false); alert('Спасибо! Мы перезвоним вам в ближайшее время.'); }}
            >
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                maxLength={18}
                pattern="[\d\s+\-()]{10,18}"
                className="flex-1 md:w-56 md:flex-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all text-gray-900"
              />
              <button className="bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:from-brand-700 hover:to-brand-600 active:scale-95 transition-all shadow-md shadow-brand-200 whitespace-nowrap shrink-0">
                Жду звонка
              </button>
              {/* Consent checkbox — inline */}
              <label className="hidden md:flex items-center gap-1.5 cursor-pointer shrink-0">
                <input type="checkbox" required className="w-3.5 h-3.5 rounded accent-brand-600 cursor-pointer shrink-0" />
                <span className="text-[10px] text-gray-400 leading-tight max-w-[120px]">
                  <a href="/privacy" className="underline hover:text-brand-600 transition-colors">Политика обработки данных</a>
                </span>
              </label>
            </form>

            {/* Close */}
            <button
              onClick={() => setShowBottomBar(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all shrink-0"
              aria-label="Скрыть"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
          <div className={`fixed ${showBottomBar ? 'bottom-[84px]' : 'bottom-2'} md:bottom-6 left-0 right-0 md:left-4 md:right-auto md:max-w-md z-[60] p-4 animate-in slide-in-from-bottom duration-500`}>
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

                 <form onSubmit={handleExitSubmit}>
                    <div className="space-y-3">
                        <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            placeholder="Ваш номер телефона"
                            maxLength={18}
                            pattern="[\d\s+\-()]{10,18}"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                            value={exitPhone}
                            onChange={e => setExitPhone(e.target.value.replace(/[^\d\s+\-()]/g, '').slice(0, 18))}
                        />
                        <button className="w-full bg-brand-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                            Позвоните мне
                        </button>
                        <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-600">
                            <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-brand-600 cursor-pointer shrink-0" />
                            <span>Оставляя заявку, вы соглашаетесь на{' '}<a href="/privacy" className="underline text-gray-700 hover:text-brand-600 transition-colors">отправку и обработку персональных данных</a></span>
                        </label>
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
                            name="name"
                            autoComplete="name"
                            placeholder="Как вас зовут?"
                            maxLength={50}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                            value={managerName}
                            onChange={e => setManagerName(e.target.value.slice(0, 50))}
                        />
                        <input
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            placeholder="Номер телефона"
                            maxLength={18}
                            pattern="[\d\s+\-()]{10,18}"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                            required
                            value={managerPhone}
                            onChange={e => setManagerPhone(e.target.value.replace(/[^\d\s+\-()]/g, '').slice(0, 18))}
                        />
                        <button className="w-full bg-brand-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                            Отправить заявку
                        </button>
                        <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-600">
                            <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-brand-600 cursor-pointer shrink-0" />
                            <span>Оставляя заявку, вы соглашаетесь на{' '}<a href="/privacy" className="underline text-gray-700 hover:text-brand-600 transition-colors">отправку и обработку персональных данных</a></span>
                        </label>
                    </div>
                 </form>
             </div>
        </div>
      )}

      {/* Callback Popup */}
      {showCallbackPopup && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowCallbackPopup(false)}></div>
          <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowCallbackPopup(false)} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1 bg-gray-100 rounded-full">
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-600">
                <PhoneCall size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Перезвоните мне</h3>
              <p className="text-gray-600 leading-snug">Оставьте номер — менеджер перезвонит в течение 15 минут.</p>
            </div>
            <form onSubmit={handleCallbackSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Ваше имя"
                maxLength={50}
                value={callbackName}
                onChange={e => setCallbackName(e.target.value.slice(0, 50))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                required
              />
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                placeholder="+7 (___) ___-__-__"
                maxLength={18}
                pattern="[\d\s+\-()]{10,18}"
                value={callbackPhone}
                onChange={e => setCallbackPhone(e.target.value.replace(/[^\d\s+\-()]/g, '').slice(0, 18))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-100 transition-all"
                required
              />
              <button className="w-full bg-brand-600 text-white font-bold text-lg py-3 rounded-xl hover:bg-brand-700 shadow-lg shadow-brand-200 transition-all active:scale-[0.98]">
                Жду звонка
              </button>
              <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-600">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded accent-brand-600 cursor-pointer shrink-0" />
                <span>Оставляя заявку, вы соглашаетесь на{' '}<a href="/privacy" className="underline text-gray-700 hover:text-brand-600 transition-colors">отправку и обработку персональных данных</a></span>
              </label>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

const App: React.FC = () => {
  if (typeof window !== 'undefined') {
    if (window.location.pathname === '/blog' || window.location.search.includes('blog')) {
      return <Blog />;
    }
    if (window.location.pathname === '/privacy' || window.location.search.includes('privacy')) {
      return <PrivacyPolicy />;
    }
    if (window.location.search.includes('thanks') || window.location.hash === '#thanks') {
      return <ThankYou />;
    }
    if (window.location.search.includes('payment') || window.location.hash === '#payment') {
      return <PaymentPolicy />;
    }
    if (window.location.search.includes('agreement') || window.location.hash === '#agreement') {
      return <UserAgreement />;
    }
  }
  return <MainApp />;
};

export default App;