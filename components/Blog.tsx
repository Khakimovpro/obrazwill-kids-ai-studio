import React from 'react';
import { CalendarDays, Clock, ArrowRight, Tag } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  tagColor: string;
  comingSoon: boolean;
}

const ARTICLES: Article[] = [
  {
    slug: 'kak-vybrat-kvest-dlya-rebenka',
    title: 'Как выбрать детский квест: 7 вопросов, которые стоит задать организатору',
    excerpt:
      'Детский квест — это не просто развлечение, это доверие к незнакомым людям и новому пространству. Рассказываем, что проверить перед бронированием, чтобы праздник прошёл без сюрпризов.',
    date: '10 февраля 2026',
    readTime: '5 мин',
    tag: 'Советы мамам',
    tagColor: 'bg-brand-50 text-brand-700 border-brand-200',
    comingSoon: true,
  },
  {
    slug: 'top-tem-dlya-detskogo-dnya-rozhdeniya-2026',
    title: 'Топ-5 тем для детского дня рождения в 2026 году: что в тренде у детей',
    excerpt:
      'Майнкрафт уступает место новым героям. Разбираем самые популярные темы праздников этого года — от аниме до детективных историй — и объясняем, как выбрать тему под вашего ребёнка.',
    date: '18 февраля 2026',
    readTime: '4 мин',
    tag: 'Идеи для праздника',
    tagColor: 'bg-orange-50 text-orange-700 border-orange-200',
    comingSoon: true,
  },
  {
    slug: 'kvest-ili-animator-chto-luchshe',
    title: 'Квест или аниматор: что лучше для детского дня рождения?',
    excerpt:
      'Оба варианта популярны, оба работают — но для разных детей и разных ситуаций. Честное сравнение: цена, вовлечённость детей, нагрузка на родителей и то, что останется в памяти.',
    date: '22 февраля 2026',
    readTime: '6 мин',
    tag: 'Сравнение',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
    comingSoon: true,
  },
];

export const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFE] font-sans text-gray-900">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/80 shadow-[0_1px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-lg font-black text-brand-900 tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-br from-brand-400 to-brand-700 rounded-lg flex items-center justify-center text-white text-sm shadow-md shadow-brand-200">O</span>
            Obrazwill
          </a>
          <a href="/" className="text-sm font-semibold text-gray-600 hover:text-brand-600 hover:bg-brand-50 px-4 py-2 rounded-full transition-all">
            ← На главную
          </a>
        </div>
      </header>

      {/* Hero */}
      <div className="pt-28 pb-16 px-4 text-center max-w-3xl mx-auto">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-600 mb-4 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full">
          Полезно для мам
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Блог Obrazwill
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Советы, идеи и честные ответы на вопросы о детских праздниках — без рекламного глянца.
        </p>
      </div>

      {/* Articles Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden flex flex-col group"
            >
              {/* Placeholder image area */}
              <div className="h-44 bg-gradient-to-br from-brand-50 via-gray-50 to-brand-100 flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-white/80 border border-brand-100 flex items-center justify-center shadow-sm">
                  <span className="text-3xl font-black text-brand-400">O</span>
                </div>
                {article.comingSoon && (
                  <span className="absolute top-3 right-3 bg-gray-900/80 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur">
                    Скоро
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Tag */}
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold border px-2.5 py-1 rounded-full mb-4 w-fit ${article.tagColor}`}>
                  <Tag size={10} />
                  {article.tag}
                </span>

                <h2 className="text-base font-bold text-gray-900 mb-3 leading-snug group-hover:text-brand-700 transition-colors">
                  {article.title}
                </h2>

                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">
                  {article.excerpt}
                </p>

                {/* Meta + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-brand-500 flex items-center gap-1 opacity-50">
                    Читать <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Placeholder notice */}
        <div className="mt-16 text-center bg-brand-50 border border-brand-100 rounded-2xl p-10">
          <p className="text-brand-700 font-semibold text-lg mb-2">Статьи готовятся к публикации</p>
          <p className="text-brand-600/70 text-sm max-w-md mx-auto">
            Пока материалы в работе — подпишитесь на наш{' '}
            <a
              href="https://t.me/+79521990805?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C!%20%D0%AF%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%B2%D0%B0%D0%BC%20%D1%81%20%D1%81%D0%B0%D0%B9%D1%82%D0%B0%20obrazwill-kids.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 font-bold underline underline-offset-2 hover:text-brand-900 transition-colors"
            >
              Telegram
            </a>{' '}
            — будете первыми, кто прочитает.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f0f13] text-gray-500 py-8 px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Obrazwill. Все права защищены.</p>
        <a href="/" className="text-gray-600 hover:text-brand-400 transition-colors mt-2 inline-block">
          ← Вернуться на главную
        </a>
      </footer>

    </div>
  );
};
