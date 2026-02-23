import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle2, PartyPopper, Star, MessageCircle, Users, ArrowRight, Sparkles, Heart, AlertCircle } from 'lucide-react';

export const ThankYou: React.FC = () => {
  const [isBusinessHours, setIsBusinessHours] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      setIsBusinessHours(minutes >= 570 && minutes < 1200);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative">

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40"></div>
        {/* Floating celebration dots */}
        <div className="absolute top-[10%] left-[15%] w-3 h-3 bg-brand-300/40 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-accent-orange/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-[50%] left-[8%] w-4 h-4 bg-brand-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-[15%] right-[10%] w-2 h-2 bg-green-300/40 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center">
          <a href="/" className="text-xl font-black text-brand-900 tracking-tight flex items-center gap-2">
            <span className="w-7 h-7 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center text-white text-base shadow-md">O</span>
            Obrazwill
          </a>
          <a href="tel:+78412500523" className="group flex items-center gap-2 text-brand-800 font-bold bg-white border border-brand-100 px-3 py-1.5 rounded-full hover:bg-brand-50 hover:border-brand-200 transition-all shadow-sm">
            <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
              <Phone size={14} fill="currentColor" />
            </div>
            <span className="hidden md:inline text-sm">+7 (8412) 50-05-23</span>
          </a>
        </div>
      </header>

      <main className="relative z-10 pt-20 md:pt-24">

        {/* Hero */}
        <section className="pb-12 px-4 text-center max-w-4xl mx-auto pt-12">
          <div className="inline-flex items-center gap-2.5 bg-white border border-green-100 rounded-full pl-3 pr-5 py-1.5 text-sm font-bold text-gray-800 mb-8 shadow-sm">
            <CheckCircle2 size={18} className="text-green-500 fill-green-500" />
            <span>Заявка успешно принята!</span>
          </div>

          {/* Big celebration icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-brand-100 relative">
            <PartyPopper size={44} className="text-brand-600" />
            <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center text-white text-lg shadow-md">🎉</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Спасибо за доверие! <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange">
              Праздник уже близко
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Ваша заявка принята. Совсем скоро{' '}
            <span className="text-gray-900 font-semibold underline decoration-brand-300 decoration-2 underline-offset-2">с вами свяжется наш менеджер</span>,
            чтобы обсудить детали и подтвердить бронирование.
          </p>
        </section>

        {/* Steps / What's next */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-brand-200 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-50/50 rounded-full -mr-6 -mt-6 blur-xl"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-black text-lg mb-4 group-hover:scale-110 transition-transform duration-300">1</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Менеджер позвонит</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isBusinessHours
                    ? 'Мы сейчас онлайн — ожидайте звонка в ближайшие 5–15 минут.'
                    : 'Звонок поступит утром, как только начнётся рабочий день с 09:30.'}
                </p>
                <div className={`mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${isBusinessHours ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isBusinessHours ? 'bg-green-500 animate-pulse' : 'bg-orange-400'}`}></span>
                  {isBusinessHours ? 'Сейчас онлайн' : 'Сейчас не в сети'}
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-amber-200 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50/50 rounded-full -mr-6 -mt-6 blur-xl"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 font-black text-lg mb-4 group-hover:scale-110 transition-transform duration-300">2</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Предоплата 10%</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Для подтверждения бронирования необходима предоплата в размере 10% от стоимости. Менеджер расскажет, как её внести.</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white hover:border-green-200 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-50/50 rounded-full -mr-6 -mt-6 blur-xl"></div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-700 font-black text-lg mb-4 group-hover:scale-110 transition-transform duration-300">3</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Праздник мечты!</h3>
                <p className="text-sm text-gray-600 leading-relaxed">Всё готово — приезжайте и наслаждайтесь незабываемым детским днём рождения вместе с вашим ребёнком.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Important Note: under-16 */}
        <section className="pb-12 px-4 max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <AlertCircle size={22} />
            </div>
            <div>
              <h4 className="font-bold text-amber-900 text-base mb-1">Важно для участников младше 16 лет</h4>
              <p className="text-sm text-amber-800 leading-relaxed">
                Для лиц, не достигших 16-летнего возраста, необходима расписка от родителя или законного представителя. Пожалуйста, уточните этот момент у менеджера при звонке.
              </p>
            </div>
          </div>
        </section>

        {/* Personal message from Maxim */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-100/40 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-orange/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">

              {/* Avatar block */}
              <div className="shrink-0 flex flex-col items-center gap-3 md:items-start">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg shadow-brand-200 border-2 border-brand-100">
                  <img src="/maxim.jpg" alt="Максим Фролов" className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-black text-gray-900 text-base leading-tight">Максим Фролов</p>
                  <p className="text-brand-600 text-xs font-semibold">Основатель OBRAZWILL</p>
                  <div className="flex items-center gap-0.5 mt-1.5 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="inline-flex items-center gap-2 bg-white border border-brand-100 rounded-full px-3 py-1 text-xs font-bold text-brand-700 mb-4 shadow-sm">
                  <Heart size={12} className="fill-brand-400 text-brand-400" />
                  Личное обращение основателя
                </div>
                <blockquote className="text-gray-700 leading-relaxed text-base md:text-lg">
                  Здравствуйте! Меня зовут Максим, и я являюсь одним из основателей компании{' '}
                  <strong className="text-brand-700">OBRAZWILL</strong>. Очень рад, что вы решили подарить своему ребёнку по-настоящему яркий праздник у нас!
                  <br /><br />
                  Я лично гарантирую качество каждого нашего проекта. Если по какой-то причине вам не понравится квест или праздник — я <strong className="text-gray-900">верну деньги в полном размере</strong>. Это не просто слова: за нами стоят сотни счастливых семей в Пензе.
                  <br /><br />
                  Хорошей игры и незабываемого праздника! 🎈
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media CTA */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-2 block">Оставайтесь с нами</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">Акции, конкурсы и новые квесты</h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
              Мы регулярно проводим акции и конкурсы, публикуем интересный контент и делаем анонсы новых квестов. Присоединяйтесь — там особенно интересно!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* VK */}
            <a
              href="https://vk.com/obrazwill"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:border-[#0077FF]/30 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#0077FF]/10 rounded-2xl flex items-center justify-center text-[#0077FF] shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M13.162 18.994c.609 0 1.016-.085 1.232-.249.203-.163.266-.45.266-.879 0-.606-.025-1.32.044-1.587.106-.414.497-.563.894-.156.403.414 1.765 2.566 2.658 2.87.671.228 1.173.067 1.173.067l2.36-.024c.71 0 .695-.376.541-.75-.195-.466-1.302-2.316-1.683-2.736-.37-.406-.514-.57-.096-1.144 0 0 1.956-2.666 2.13-3.486.079-.374-.265-.544-.813-.544l-2.434.017c-.206-.007-.446.064-.582.353-.058.125-.972 2.406-1.353 3.053-.787 1.34-1.106 1.458-1.236 1.267-.282-.416-.208-1.673-.208-2.585 0-2.822.446-4.008-1.047-4.008-1.011 0-1.678.307-2.112.63-.306.226-.538.744-.395.772.179.035.586.166.801.446.28.365.27.913.27 2.916 0 .618-.113 2.218-1.139 2.218-.328 0-1.137-.367-1.928-1.688-1.04-1.745-1.847-3.69-1.847-3.69s-.144-.355-.407-.549c-.214-.158-.512-.209-.512-.209l-2.569.017c-.383 0-.528.174-.528.367 0 .341.42 2.059 2.007 4.195 2.484 3.344 5.345 3.514 5.954 3.514z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-900 text-lg mb-0.5">Вступить в группу ВКонтакте</p>
                <p className="text-sm text-gray-500">Акции, конкурсы и новости квестов</p>
              </div>
              <ArrowRight size={20} className="text-gray-300 group-hover:text-[#0077FF] group-hover:translate-x-1 transition-all" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/obrazwill"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:border-[#2AABEE]/30 hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 bg-[#2AABEE]/10 rounded-2xl flex items-center justify-center text-[#2AABEE] shrink-0 group-hover:scale-110 transition-transform duration-300">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-900 text-lg mb-0.5">Подписаться на Telegram</p>
                <p className="text-sm text-gray-500">Эксклюзивные предложения в канале</p>
              </div>
              <ArrowRight size={20} className="text-gray-300 group-hover:text-[#2AABEE] group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </section>

        {/* Questions banner */}
        <section className="bg-brand-900 py-14 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-700/50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-800/50 rounded-full blur-[100px] -ml-32 -mb-32"></div>
          </div>

          <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 text-brand-300">
              <MessageCircle size={30} />
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">
              Есть дополнительные вопросы?
            </h2>
            <p className="text-brand-100 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Наш менеджер обязательно ответит на все вопросы при звонке. Или напишите нам прямо сейчас в удобном мессенджере.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://vk.com/obrazwill"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-brand-900 font-bold text-base rounded-xl hover:bg-brand-50 transition-colors shadow-xl shadow-brand-900/20 flex items-center justify-center gap-2"
              >
                <Users size={18} />
                Написать в VK
              </a>
              <a
                href="tel:+78412500523"
                className="w-full sm:w-auto px-8 py-4 bg-brand-700/50 backdrop-blur border border-brand-500/30 text-white font-bold text-base rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                +7 (8412) 50-05-23
              </a>
            </div>
          </div>
        </section>

        {/* Back to site */}
        <section className="py-12 px-4 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
            <Sparkles size={16} className="text-brand-400" />
            <span className="text-sm">Хорошей игры и незабываемого праздника!</span>
            <Sparkles size={16} className="text-brand-400" />
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors text-sm underline underline-offset-4 decoration-brand-200 hover:decoration-brand-400"
          >
            ← Вернуться на главную страницу
          </a>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12">

          <div className="md:col-span-5">
            <div className="text-3xl font-black text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center text-white text-lg">O</span>
              Obrazwill
            </div>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed mb-8">
              <p>
                <strong className="text-gray-200">ИП Фролов Максим Вячеславович</strong><br />
                ИНН: 583715087360<br />
                ОГРН: 322583500036950<br />
                <span className="text-gray-500">Юридический адрес:</span> 440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Адреса наших квестов в Пензе:</h4>
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
            <div className="mt-8 text-xs text-gray-600 space-y-1.5">
              <p>© {new Date().getFullYear()} Obrazwill. Все права защищены.</p>
              <a href="/?payment" className="text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block">
                Правила оплаты и защита данных
              </a>
              <a href="/?agreement" className="text-gray-500 hover:text-brand-400 transition-colors underline underline-offset-2 block">
                Пользовательское соглашение
              </a>
            </div>
          </div>

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
            <nav aria-label="Социальные сети" className="mt-8 flex gap-3">
              <a href="https://vk.com/obrazwill" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте Obrazwill" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#0077FF] hover:text-white transition-all text-gray-400 border border-gray-700">
                <span className="font-bold text-[10px]">VK</span>
              </a>
              <a href="https://t.me/obrazwill" target="_blank" rel="noopener noreferrer" aria-label="Telegram Obrazwill" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#2AABEE] hover:text-white transition-all text-gray-400 border border-gray-700">
                <span className="font-bold text-[10px]">TG</span>
              </a>
            </nav>
          </div>

        </div>
      </footer>

    </div>
  );
};
