import React, { useState } from 'react';
import { REVIEWS } from '../data';
import { Review } from '../types';
import { Star, CheckCircle, X } from 'lucide-react';

const ReviewCard: React.FC<{ review: Review; onOpen: (review: Review) => void }> = ({ review, onOpen }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col h-full relative group hover:border-brand-200 transition-colors">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-50 border border-brand-100 shrink-0">
           {/* Generating a consistent female avatar based on ID */}
           <img 
             src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${review.id}&top=longHairStraight,longHairCurvy,longHairMiaWallace&accessories=prevent&facialHair=prevent&clothing=collarAndSweater&mouth=smile`} 
             alt={review.author}
             className="w-full h-full object-cover"
           />
        </div>
        <div>
          <div className="font-bold text-gray-900 leading-tight text-lg">{review.author}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{review.source}</span>
            <span>{review.date}</span>
            {review.verified && (
              <span className="flex items-center gap-1 text-green-600 font-medium" title="Отзыв подтвержден">
                <CheckCircle size={12} fill="currentColor" className="text-white" />
                <span className="hidden sm:inline">Подтвержден</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Content Preview */}
      <div className="relative flex-grow">
        <p className="text-gray-600 leading-relaxed line-clamp-4">
            {review.text}
        </p>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => onOpen(review)}
        className="mt-4 text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors self-start focus:outline-none"
      >
        Читать полностью
      </button>
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
    <section className="py-20 md:py-28 px-4 max-w-7xl mx-auto border-t border-gray-100">
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
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-50 border border-brand-100 shrink-0">
                        <img 
                            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${selectedReview.id}&top=longHairStraight,longHairCurvy,longHairMiaWallace&accessories=prevent&facialHair=prevent&clothing=collarAndSweater&mouth=smile`} 
                            alt={selectedReview.author}
                            className="w-full h-full object-cover"
                        />
                    </div>
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