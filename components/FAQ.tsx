import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'С какого возраста подходят ваши праздники?',
    answer: 'Наши программы рассчитаны на детей от 7 лет. Программу подбираем индивидуально под именинника и его гостей — возраст, интересы и характер компании учитываем при каждом бронировании. Подробности уточняйте у менеджера.',
  },
  {
    question: 'Сколько детей может участвовать?',
    answer: 'Базовые пакеты рассчитаны на 8 детей. Каждый дополнительный гость — +1 900 ₽. Для компаний от 12 детей рекомендуем формат Among Us — он вмещает больше участников и подходит для больших групп.',
  },
  {
    question: 'Входят ли взрослые в стоимость?',
    answer: 'Взрослые сопровождающие проходят бесплатно. Пока дети веселятся на квесте — вы можете спокойно отдыхать за столом и общаться с другими родителями.',
  },
  {
    question: 'Можно ли принести свой торт?',
    answer: 'Да! Вы можете привезти торт от любого кондитера. Мы также можем помочь с заказом — уточните у менеджера при бронировании, и мы подберём подходящий вариант.',
  },
  {
    question: 'Что если ребёнок испугается во время квеста?',
    answer: 'Наши актёры — профессионалы, которые чутко следят за настроением каждого ребёнка. Уровень интенсивности настраивается под вашу компанию ещё до начала. Выйти из игры можно в любой момент — никакого давления.',
  },
  {
    question: 'Как происходит оплата?',
    answer: 'Для подтверждения брони нужна предоплата 10% (минимум 2 000 ₽). Оставшуюся сумму оплачиваете в день праздника — наличными или картой.',
  },
  {
    question: 'Есть ли парковка рядом с площадками?',
    answer: 'Да, у всех трёх наших локаций есть удобная парковка для гостей. Точное место для парковки менеджер пришлёт вместе с подтверждением бронирования.',
  },
  {
    question: 'Можно ли выбрать тему или персонажей праздника?',
    answer: 'Конечно! Мы адаптируем программу под любимых героев именинника. Расскажите менеджеру об интересах ребёнка — придумаем персонализированный сценарий.',
  },
];

interface FAQProps {
  onOpenManager?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenManager }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" aria-label="Часто задаваемые вопросы" className="py-20 md:py-28 px-4 max-w-4xl mx-auto border-t border-gray-100">
      <div className="text-center mb-16">
        <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block">FAQ</span>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Отвечаем на частые вопросы
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Если не нашли ответ — напишите нам, ответим быстро.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              openIndex === idx
                ? 'bg-brand-50/50 border-brand-200 shadow-md shadow-brand-100/40'
                : 'bg-white border-gray-100 shadow-sm hover:border-brand-200 hover:shadow-md'
            }`}
          >
            <button
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
              aria-expanded={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-sm transition-all ${
                    openIndex === idx
                      ? 'bg-brand-500 text-white shadow-sm shadow-brand-200'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="font-bold text-gray-900 text-base md:text-lg leading-snug">
                  {item.question}
                </span>
              </div>
              <div
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === idx ? 'bg-brand-100 text-brand-600 rotate-180' : 'bg-gray-100 text-gray-400'
                }`}
              >
                <ChevronDown size={18} />
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 pb-6 text-gray-600 leading-relaxed pl-[4.5rem]">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {onOpenManager && (
        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-4">Не нашли ответ на свой вопрос?</p>
          <button
            onClick={onOpenManager}
            className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 border border-brand-200 font-bold px-6 py-3 rounded-xl hover:bg-brand-100 transition-colors"
          >
            <MessageCircle size={20} />
            Задать вопрос менеджеру
          </button>
        </div>
      )}
    </section>
  );
};
