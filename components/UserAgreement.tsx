import React from 'react';
import { Phone, Mail, MapPin, Clock, FileText, Shield, ArrowRight } from 'lucide-react';

const AGREEMENT_URL = 'https://obrazwill-kids.ru/?agreement';

export const UserAgreement: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFE] font-sans text-gray-900 overflow-x-hidden relative">

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gray-50 rounded-[100%] blur-[100px] opacity-80"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-50/20 rounded-full blur-[80px] opacity-30"></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-gray-100/40 rounded-full blur-[80px] opacity-40"></div>
        <div className="absolute top-[10%] left-[15%] w-3 h-3 bg-brand-300/40 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-accent-orange/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-[50%] left-[8%] w-4 h-4 bg-brand-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
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
            <Shield size={18} className="text-brand-500" />
            <span>Юридическая информация</span>
          </div>

          <div className="w-24 h-24 bg-gradient-to-br from-brand-100 to-brand-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-brand-100">
            <FileText size={44} className="text-brand-600" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight">
            Пользовательское <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-orange">
              соглашение
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Дата последнего обновления: <strong className="text-gray-700">25 февраля 2026 года</strong>
          </p>
        </section>

        {/* Intro block */}
        <section className="pb-8 px-4 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-100/40 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-orange/10 rounded-full -ml-16 -mb-16 blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                Настоящее пользовательское соглашение (далее — Соглашение) определяет порядок и условия использования материалов и сервисов,
                размещённых в сети Интернет по адресу{' '}
                <a href="https://obrazwill-kids.ru/" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-semibold hover:text-brand-700 underline underline-offset-2 decoration-brand-300">
                  https://obrazwill-kids.ru/
                </a>{' '}
                (далее — Сайт) Пользователями данного Сайта. Использование Пользователями Сайта означает, что они безоговорочно принимают и
                обязуются соблюдать все условия настоящего Соглашения.
              </p>
            </div>
          </div>
        </section>

        {/* Agreement content */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="space-y-8">

            {/* Section 1 */}
            <AgreementSection number="1" title="ОБЩИЕ ПОЛОЖЕНИЯ">
              <p className="mb-4">
                <strong>1.1</strong> В настоящем Соглашении, если из текста прямо не вытекает иное, следующие термины имеют указанные ниже значения:
              </p>
              <div className="space-y-4 pl-4 border-l-2 border-brand-100">
                <TermDef term="Администратор">
                  индивидуальный предприниматель Фролов Максим Вячеславович, ИНН: 583715087360, ОГРНИП: 322583500036950,
                  юридический адрес: 440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93, которому принадлежат все
                  соответствующие права на Сайт.
                </TermDef>
                <TermDef term="Акцепт">
                  полное и безоговорочное принятие условий настоящего Соглашения, размещённого на Сайте по адресу{' '}
                  <a href={AGREEMENT_URL} className="text-brand-600 hover:text-brand-700 underline underline-offset-2 decoration-brand-300">
                    {AGREEMENT_URL}
                  </a>
                  , осуществляемое путём совершения Пользователем любых действий по использованию Сайта.
                </TermDef>
                <TermDef term="Пользователь">
                  лицо, осуществляющее доступ к Сайту и использующее материалы и сервисы, размещённые на Сайте.
                </TermDef>
                <TermDef term="Контент">
                  любое информационно значимое наполнение Сайта, включая, но не ограничиваясь, фото, аудио, видео, текст и иные медиаматериалы.
                </TermDef>
                <TermDef term="Личный кабинет">
                  персонализированная часть Сайта, посредством которой обеспечивается обмен информацией и документацией в электронном виде
                  между Пользователем и Сайтом. Доступ к Личному кабинету осуществляется путём ввода Пользователем аутентификационных данных.
                </TermDef>
                <TermDef term="Персональные данные">
                  любая информация, относящаяся к определённому или определяемому физическому лицу (субъекту персональных данных), в том числе
                  его фамилия, имя, отчество, дата и место рождения, адрес, семейное, социальное, имущественное положение, образование,
                  профессия, доходы и иные сведения.
                </TermDef>
                <TermDef term="Обработка персональных данных">
                  любое действие или совокупность действий, совершаемых с использованием средств автоматизации или без них с персональными
                  данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу,
                  обезличивание, блокирование, удаление и уничтожение персональных данных.
                </TermDef>
                <TermDef term="Сайт">
                  ресурс в сети Интернет, представляющий собой совокупность информации и объектов интеллектуальной собственности, доступ
                  к которому обеспечивается с пользовательских устройств, подключённых к сети Интернет, по адресу{' '}
                  <a href="https://obrazwill-kids.ru/" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 underline underline-offset-2">
                    https://obrazwill-kids.ru/
                  </a>
                  .
                </TermDef>
              </div>
              <p className="mt-4">
                <strong>1.2</strong> Все остальные термины и определения толкуются в соответствии с действующим законодательством Российской Федерации.
              </p>
            </AgreementSection>

            {/* Section 2 */}
            <AgreementSection number="2" title="ПРЕДМЕТ СОГЛАШЕНИЯ">
              <div className="space-y-3">
                <p><strong>2.1</strong> В соответствии с настоящим Соглашением Администратор предоставляет любому Пользователю право безвозмездного использования Сайта любым способом и в любой форме в пределах его объявленных функциональных возможностей.</p>
                <p><strong>2.2</strong> Использование Сайта осуществляется в соответствии с принятым в мировой практике принципом «как есть» (as is). Никакие гарантии бесперебойной и безошибочной работы Сайта не прилагаются и не предусматриваются.</p>
                <p><strong>2.3</strong> Пользователь считается присоединившимся к настоящему Соглашению в соответствии с положениями статьи 438 ГК РФ при:</p>
                <ul className="pl-6 space-y-1 list-none">
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span><strong>2.3.1</strong> просмотре материалов, размещённых на Сайте;</span></li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span><strong>2.3.2</strong> использовании сервисов Сайта;</span></li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span><strong>2.3.3</strong> направлении сообщений через онлайн-формы на Сайте;</span></li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span><strong>2.3.4</strong> ином использовании Сайта.</span></li>
                </ul>
                <p><strong>2.4</strong> Используя Сайт, Пользователь подтверждает, что ознакомился с условиями настоящего Соглашения в полном объёме и безоговорочно принимает их.</p>
                <p><strong>2.5</strong> Ни одно из положений Соглашения не может трактоваться как установление агентских отношений, совместной деятельности или иных правоотношений, прямо не предусмотренных Соглашением.</p>
                <p><strong>2.6</strong> Все возможные споры подлежат разрешению в соответствии с законодательством Российской Федерации.</p>
                <p><strong>2.7</strong> Порядок исполнения обязательств по иным договорам между Пользователем и Администратором устанавливается в таких договорах.</p>
              </div>
            </AgreementSection>

            {/* Section 3 */}
            <AgreementSection number="3" title="ПРАВА И ОБЯЗАННОСТИ АДМИНИСТРАТОРА">
              <div className="space-y-3">
                <p><strong>3.1</strong> В целях повышения качества Сайта Администратор вправе осуществлять сбор мнений и отзывов Пользователей. Собранные отзывы могут использоваться для формирования статистических данных и быть опубликованы Администратором.</p>
                <p><strong>3.2</strong> Администратор вправе направлять на адрес электронной почты и (или) абонентский номер Пользователя информационные сообщения, в том числе уведомления, связанные с функционированием Сайта и исполнением договоров.</p>
                <p><strong>3.3</strong> Администратор оставляет за собой право заблокировать Личный кабинет Пользователя в случае нарушения им условий настоящего Соглашения.</p>
                <p><strong>3.4</strong> Сайт или его сервисы могут быть частично или полностью недоступны в период проведения профилактических работ. Администратор вправе производить модификацию программного обеспечения Сайта по личному усмотрению.</p>
                <p><strong>3.5</strong> Администратор не несёт ответственности за ошибки, прерывания, удаление данных, сбои линий связи, несанкционированный доступ к информации Пользователя, размещённой на Сайте.</p>
                <p><strong>3.6</strong> Администратор предпримет все разумные усилия для устранения технических сбоев в приемлемый срок, не гарантируя при этом полного их отсутствия.</p>
                <p><strong>3.7</strong> Пользователю не предоставляются интеллектуальные права на Сайт, его программное обеспечение, дизайн и иные объекты, за исключением прямо предусмотренных настоящим Соглашением.</p>
              </div>
            </AgreementSection>

            {/* Section 4 */}
            <AgreementSection number="4" title="ПРАВА И ОБЯЗАННОСТИ ПОЛЬЗОВАТЕЛЯ">
              <div className="space-y-3">
                <p><strong>4.1</strong> Пользователь обязуется знакомиться с актуальной версией Соглашения при каждом посещении Сайта и соблюдать его условия.</p>
                <p><strong>4.2</strong> Пользователь обязуется предоставлять достоверную и полную информацию при использовании Сайта.</p>
                <p><strong>4.3</strong> Пользователь соглашается не предпринимать действий, нарушающих российское законодательство, международные нормы в сфере интеллектуальной собственности, общепринятые нормы морали, а также не совершать действий, нарушающих нормальную работу Сайта.</p>
                <p><strong>4.4</strong> Использование материалов Сайта без согласия правообладателей не допускается.</p>
                <p><strong>4.5</strong> При цитировании материалов Сайта, включая охраняемые авторские произведения, ссылка на Сайт обязательна.</p>
                <p><strong>4.6</strong> При использовании Сайта Пользователь не вправе нарушать права и законные интересы третьих лиц, а также причинять вред деловой репутации.</p>
                <p><strong>4.7</strong> Пользователь не вправе нарушать нормальную работу Сайта и его отдельных сервисов.</p>
                <p><strong>4.8</strong> Пользователь обязан самостоятельно отслеживать внесение изменений в настоящее Соглашение.</p>
                <p><strong>4.9</strong> Пользователь вправе прекратить доступ к Личному кабинету путём направления соответствующего уведомления Администратору.</p>
              </div>
            </AgreementSection>

            {/* Section 5 */}
            <AgreementSection number="5" title="ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ АДМИНИСТРАТОРА">
              <div className="space-y-3">
                <p><strong>5.1</strong> Администратор гарантирует достоверность только той информации, которую он сам непосредственно разместил на Сайте. Ответственность за информацию, размещённую третьими лицами, Администратор не несёт.</p>
                <p><strong>5.2</strong> Администратор не несёт ответственности за некорректное поведение лиц, использующих Сайт.</p>
                <p><strong>5.3</strong> Администратор не гарантирует, что Сайт будет соответствовать всем требованиям Пользователя, работать непрерывно и без ошибок, а результаты его использования будут точными и надёжными.</p>
                <p><strong>5.4</strong> Администратор не несёт ответственности за потери или убытки, связанные с содержанием Сайта, товарами или услугами, доступными через внешние ресурсы.</p>
                <p><strong>5.5</strong> Администратор не несёт ответственности за полноту и достоверность сведений, предоставляемых Пользователями при регистрации, и не обязан проверять их достоверность.</p>
                <p><strong>5.6</strong> Администратор не возмещает ущерб, включая упущенную выгоду, потерянные данные или иные убытки, возникшие в связи с использованием Сайта, за исключением случаев, прямо предусмотренных Соглашением.</p>
                <p><strong>5.7</strong> Ответственность за правомерность и достоверность персональных данных, переданных через формы Сайта, несёт исключительно Пользователь.</p>
                <p><strong>5.8</strong> Администратор не несёт ответственности за утрату, подмену или порчу данных, возникшие вследствие невыполнения Пользователем условий настоящего Соглашения.</p>
              </div>
            </AgreementSection>

            {/* Section 6 */}
            <AgreementSection number="6" title="ДОСТУП К РЕСУРСАМ ТРЕТЬИХ ЛИЦ">
              <div className="space-y-3">
                <p><strong>6.1</strong> Доступ Пользователя к Сайту может вызвать обращение на интернет-ресурсы третьих лиц и загрузку с них программного кода или графических объектов, используемых в рекламных целях и в целях сбора статистики. Владельцы таких ресурсов самостоятельно определяют условия использования собранной информации.</p>
                <p><strong>6.2</strong> Пользователь вправе заблокировать запросы на графические изображения, размещённые на серверах третьих лиц, путём настройки программного обеспечения. Блокировка может привести к частичной потере функциональности страниц Сайта.</p>
                <p><strong>6.3</strong> При переходе с Сайта на страницы сторонних ресурсов Пользователи самостоятельно определяют допустимые пределы использования своих данных в рамках правил этих ресурсов.</p>
              </div>
            </AgreementSection>

            {/* Section 7 */}
            <AgreementSection number="7" title="ИСПОЛЬЗОВАНИЕ ИНФОРМАЦИИ, ХРАНЯЩЕЙСЯ НА СТОРОНЕ БРАУЗЕРА">
              <div className="space-y-3">
                <p><strong>7.1</strong> Администратор использует информацию, хранящуюся на стороне браузера Пользователя, для:</p>
                <ul className="pl-6 space-y-1 list-none">
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span>поддержки функциональности ресурсов, требующих сохранения состояния сеанса;</span></li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span>измерения размеров аудитории Сайта;</span></li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span>определения информационных предпочтений Пользователей при доступе к различным страницам;</span></li>
                  <li className="flex items-start gap-2"><ArrowRight size={14} className="text-brand-400 mt-1 shrink-0" /><span>исследования корреляции данных о посещаемости с социометрическими показателями.</span></li>
                </ul>
                <p>Пользователь вправе запретить использование подобной информации через настройки браузера, однако это может привести к частичной или полной потере функциональности страниц Сайта.</p>
              </div>
            </AgreementSection>

            {/* Section 8 */}
            <AgreementSection number="8" title="СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ">
              <p>
                <strong>8.1</strong> Обработка персональных данных Пользователей осуществляется Администратором в соответствии с политикой
                конфиденциальности, размещённой по адресу{' '}
                <a href="https://obrazwill-kids.ru/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 underline underline-offset-2 decoration-brand-300">
                  https://obrazwill-kids.ru/privacy
                </a>
                .
              </p>
            </AgreementSection>

            {/* Section 9 */}
            <AgreementSection number="9" title="ИЗМЕНЕНИЕ УСЛОВИЙ И РАСТОРЖЕНИЕ СОГЛАШЕНИЯ">
              <div className="space-y-3">
                <p><strong>9.1</strong> Соглашение может быть расторгнуто в любое время по инициативе любой из сторон. Администратор уведомляет о расторжении путём размещения соответствующего уведомления на Сайте и (или) направления письма на e-mail Пользователя. С момента такого размещения / направления Соглашение считается расторгнутым.</p>
                <p>
                  <strong>9.2</strong> Пользователь может расторгнуть настоящее Соглашение, направив уведомление Администратору по электронной почте:{' '}
                  <a href="mailto:obraz.strah@yandex.ru" className="text-brand-600 hover:text-brand-700 underline underline-offset-2 decoration-brand-300">
                    obraz.strah@yandex.ru
                  </a>
                  .
                </p>
                <p><strong>9.3</strong> Пользователь соглашается, что настоящее Соглашение может быть изменено Администратором в одностороннем порядке путём публикации обновлённого текста. Дальнейшее использование Сайта подтверждает согласие с изменёнными условиями. При несогласии Пользователь обязуется прекратить использование Сайта.</p>
              </div>
            </AgreementSection>

          </div>
        </section>

        {/* Admin info card */}
        <section className="pb-16 px-4 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-10 shadow-sm">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-black text-base">A</span>
              Информация об Администраторе
            </h3>
            <div className="grid sm:grid-cols-2 gap-5 text-sm text-gray-600">
              <div className="space-y-1">
                <p className="font-bold text-gray-900 text-base">ИП Фролов Максим Вячеславович</p>
                <p>ИНН: 583715087360</p>
                <p>ОГРНИП: 322583500036950</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin size={15} className="text-brand-500 shrink-0 mt-0.5" />
                  <p>440034, Россия, Пензенская область, г. Пенза, ул. Ватутина, д. 93</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={15} className="text-brand-500 shrink-0" />
                  <a href="mailto:obraz.strah@yandex.ru" className="text-brand-600 hover:text-brand-700 transition-colors">
                    obraz.strah@yandex.ru
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to site */}
        <section className="py-12 px-4 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
            <Shield size={16} className="text-brand-400" />
            <span className="text-sm">Ваши права надёжно защищены</span>
            <Shield size={16} className="text-brand-400" />
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

// Helper sub-components

const AgreementSection: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white p-7 md:p-8">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700 font-black text-base shrink-0">
        {number}
      </div>
      <h2 className="text-lg md:text-xl font-black text-gray-900 tracking-tight">{title}</h2>
    </div>
    <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const TermDef: React.FC<{ term: string; children: React.ReactNode }> = ({ term, children }) => (
  <div>
    <span className="font-bold text-gray-900">{term}</span>
    {' — '}
    <span>{children}</span>
  </div>
);
