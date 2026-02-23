import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CreditCard, RefreshCw, Lock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const PaymentPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative">

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40"></div>
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
          <div className="inline-flex items-center gap-2.5 bg-white border border-brand-100 rounded-full pl-3 pr-5 py-1.5 text-sm font-bold text-gray-800 mb-8 shadow-sm">
            <ShieldCheck size={18} className="text-brand-500" />
            <span>Ваши данные надёжно защищены</span>
          </div>

          <div className="w-24 h-24 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-brand-100">
            <Lock size={44} className="text-brand-600" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Оплата и защита <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange">
              ваших данных
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Мы заботимся о безопасности каждой транзакции и{' '}
            <span className="text-gray-900 font-semibold underline decoration-brand-300 decoration-2 underline-offset-2">не передаём ваши данные третьим лицам</span>.
            Ниже — всё, что стоит знать перед оплатой.
          </p>
        </section>

        {/* Payment Methods */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 shrink-0">
              <CreditCard size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Способы оплаты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Sberbank card */}
            <div className="bg-white/80 backdrop-blur-sm p-7 rounded-3xl shadow-sm border border-white hover:border-brand-200 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50/60 rounded-full -mr-8 -mt-8 blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <CreditCard size={26} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Банковская карта</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Принимаем карты Visa, Mastercard и МИР. Платежи проходят через защищённый шлюз{' '}
                  <strong className="text-gray-800">ПАО Сбербанк</strong> — данные карты шифруются по стандарту TLS и не попадают на наши серверы.
                </p>
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={14} />
                  Безопасное соединение SSL
                </div>
              </div>
            </div>

            {/* Prepayment */}
            <div className="bg-white/80 backdrop-blur-sm p-7 rounded-3xl shadow-sm border border-white hover:border-amber-200 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/60 rounded-full -mr-8 -mt-8 blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck size={26} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Предоплата 10%</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  При бронировании вносится предоплата — <strong className="text-gray-800">от 2 000 ₽</strong>, не более 10% от стоимости пакета. Остаток оплачивается в день праздника наличными или картой.
                </p>
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={14} />
                  Без скрытых комиссий
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Refund Guarantee */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-100/40 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-orange/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                <RefreshCw size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">Гарантия возврата средств</h2>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-4">
                  Максим Фролов, основатель Obrazwill Kids, лично гарантирует: если праздник не оправдал ожиданий или возникла проблема при оплате — мы <strong className="text-brand-700">вернём деньги в полном объёме</strong>. Без бюрократии и лишних вопросов.
                </p>
                <p className="text-sm text-gray-500">
                  Для инициирования возврата свяжитесь с нами по телефону{' '}
                  <a href="tel:+78412500523" className="text-brand-600 font-bold hover:underline">+7 (8412) 50-05-23</a>{' '}
                  или по email{' '}
                  <a href="mailto:obraz.strah@yandex.ru" className="text-brand-600 font-bold hover:underline">obraz.strah@yandex.ru</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decline Reasons */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex items-start gap-5">
            <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-xl mb-3">Почему платёж может не пройти?</h3>
              <p className="text-sm text-amber-800 leading-relaxed mb-4">
                В редких случаях банк может отклонить транзакцию. Самые частые причины:
              </p>
              <ul className="space-y-2">
                {[
                  'Недостаточно средств на счёте',
                  'Истёк срок действия карты',
                  'Ошибка при вводе реквизитов — проверьте номер, дату и CVV',
                  'Банк заблокировал онлайн-платежи — уточните в службе поддержки вашего банка',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-amber-800">
                    <span className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-amber-700 font-bold text-[10px]">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-amber-800 mt-4">
                Если проблема не решается — позвоните нам, предложим альтернативный способ оплаты.
              </p>
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 shrink-0">
              <Lock size={22} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">Конфиденциальность данных</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {[
              {
                icon: <ShieldCheck size={20} />,
                color: 'bg-brand-100 text-brand-700',
                title: 'Шифрование при передаче',
                text: 'Имя, телефон, email и платёжные реквизиты передаются исключительно по протоколу HTTPS. Соединение защищено современным TLS-шифрованием.',
              },
              {
                icon: <RefreshCw size={20} />,
                color: 'bg-green-100 text-green-700',
                title: 'Данные не хранятся после оплаты',
                text: 'Номер карты и CVV-код не сохраняются на серверах Obrazwill Kids — после завершения транзакции они немедленно удаляются из системы.',
              },
              {
                icon: <Lock size={20} />,
                color: 'bg-purple-100 text-purple-700',
                title: 'Никакой передачи третьим лицам',
                text: 'Ваши персональные данные используются только для подтверждения бронирования и связи с вами. Продажа или передача данных третьим лицам исключена.',
              },
              {
                icon: <CheckCircle2 size={20} />,
                color: 'bg-amber-100 text-amber-700',
                title: 'Соответствие законодательству РФ',
                text: 'Мы работаем в соответствии с Федеральным законом №152-ФЗ «О персональных данных». Вы вправе запросить удаление своих данных в любой момент.',
              },
            ].map((item, i) => (
              <div key={i} className={`flex items-start gap-5 p-6 ${i < 3 ? 'border-b border-gray-100' : ''}`}>
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="bg-brand-900 rounded-[2rem] p-8 md:p-10 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -ml-16 -mb-16"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-3">Остались вопросы по оплате?</h2>
              <p className="text-brand-100 mb-8 max-w-xl mx-auto leading-relaxed">
                Наш менеджер объяснит всё лично и подберёт удобный для вас способ расчёта.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+78412500523"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-brand-900 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  +7 (8412) 50-05-23
                </a>
                <a
                  href="mailto:obraz.strah@yandex.ru"
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-700/50 border border-brand-500/30 text-white font-bold rounded-xl hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  obraz.strah@yandex.ru
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Last updated + back */}
        <section className="py-10 px-4 text-center max-w-2xl mx-auto">
          <p className="text-xs text-gray-400 mb-4">
            Последнее обновление: 25.02.2026 · ИП Фролов Максим Вячеславович
          </p>
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
                ОГРН: 322583500036950
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
            <div className="mt-8 text-xs text-gray-600">
              © {new Date().getFullYear()} Obrazwill. Все права защищены.
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
