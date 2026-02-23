import React, { useState } from 'react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { Star, CheckCircle, X } from 'lucide-react';

const AVATAR_GRADIENTS = [
  'from-brand-400 to-brand-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-rose-500',
];

const getInitials = (name: string) =>
  name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

const Avatar: React.FC<{ name: string; id: number; size?: 'sm' | 'lg' }> = ({ name, id, size = 'sm' }) => (
  <div className={`${size === 'lg' ? 'w-16 h-16 text-lg' : 'w-12 h-12 text-sm'} rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[id % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white font-black shrink-0 shadow-sm`}>
    {getInitials(name)}
  </div>
);

const ReviewCard: React.FC<{ review: Review; onOpen: (review: Review) => void }> = ({ review, onOpen }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full relative group hover:border-brand-200 hover:shadow-lg hover:shadow-brand-50 hover:-translate-y-1 transition-all duration-300">

      {/* Decorative quote */}
      <div className="absolute top-5 right-6 text-[5rem] leading-none font-black text-brand-100 select-none pointer-events-none group-hover:text-brand-200 transition-colors">
        "
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={15} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content Preview */}
      <div className="relative flex-grow mb-5">
        <p className="text-gray-600 leading-relaxed line-clamp-4 text-[15px]">
            {review.text}
        </p>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => onOpen(review)}
        className="text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors self-start focus:outline-none mb-5"
      >
        Читать полностью →
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-4" />

      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar name={review.author} id={review.id} />
        <div>
          <div className="font-bold text-gray-900 leading-tight">{review.author}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5 flex-wrap">
            <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-semibold border border-brand-100">{review.source}</span>
            <span>{review.date}</span>
            {review.verified && (
              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <CheckCircle size={12} fill="currentColor" className="text-green-500" />
                <span className="hidden sm:inline">Подтвержден</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // Prevent scrolling when modal is open
  React.useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedReview]);

  return (
    <section aria-label="Отзывы клиентов" className="py-20 md:py-28 px-4 bg-gradient-to-b from-white via-brand-50/30 to-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-brand-600 font-bold tracking-wider uppercase text-sm mb-3 block">Отзывы</span>
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Что говорят родители
        </h2>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          Мы гордимся тем, что 98% клиентов рекомендуют нас своим друзьям. Вот последние отзывы с независимых площадок.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} review={review} onOpen={setSelectedReview} />
        ))}
      </div>
      
      </div>

      {/* Modal Overlay */}
      {selectedReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             {/* Backdrop */}
             <div 
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={() => setSelectedReview(null)}
             ></div>
             
             {/* Modal Content */}
             <div className="relative bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto flex flex-col">
                 <button 
                    onClick={() => setSelectedReview(null)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                 >
                     <X size={24} />
                 </button>

                 <div className="flex items-center gap-4 mb-6 pr-8">
                    <Avatar name={selectedReview.author} id={selectedReview.id} size="lg" />
                    <div>
                        <div className="font-bold text-gray-900 text-xl">{selectedReview.author}</div>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{selectedReview.source}</span>
                            <span>{selectedReview.date}</span>
                        </div>
                    </div>
                 </div>

                 <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                 </div>

                 <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg overflow-y-auto pr-2">
                    {selectedReview.text}
                 </div>

                 <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                     <button 
                        onClick={() => setSelectedReview(null)}
                        className="text-brand-600 font-bold hover:bg-brand-50 px-6 py-2 rounded-xl transition-colors"
                     >
                        Закрыть
                     </button>
                 </div>
             </div>
        </div>
      )}

    </section>
  );
};