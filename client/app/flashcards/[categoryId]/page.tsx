'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { flashcardsApi } from '@/lib/api';
import { Flashcard } from '@/types';

export default function Flashcards() {
  const router = useRouter();
  const params = useParams();
  const categoryId = parseInt(params.categoryId as string);

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchFlashcards = async () => {
      try {
        const response = await flashcardsApi.getFlashcardsByCategory(categoryId);
        setFlashcards(response.data);
      } catch (err) {
        console.error('Failed to fetch flashcards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [categoryId, router]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-3xl p-8 shadow-2xl flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-700 font-medium">Loading flashcards...</p>
        </div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen">
        <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button onClick={() => router.push('/dashboard')} className="btn btn-secondary">
              ← Back to Dashboard
            </button>
          </div>
        </nav>
        <div className="pt-32 px-6 flex items-center justify-center">
          <div className="card text-center max-w-md">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gradient mb-2">No Flashcards Found</h2>
            <p className="text-slate-600 mb-6">This category doesn't have any flashcards yet.</p>
            <button onClick={() => router.push('/dashboard')} className="btn btn-primary">
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push('/dashboard')} className="btn btn-secondary">
            ← Back
          </button>
          <h2 className="text-xl font-bold text-gradient">{currentCard.categoryName}</h2>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full">
          {/* Progress Badge */}
          <div className="text-center mb-8 animate-fade-in">
            <span className="badge text-lg px-6 py-2">
              📝 Card {currentIndex + 1} of {flashcards.length}
            </span>
          </div>

          {/* Flashcard Container */}
          <div
            className="perspective-1000 mb-12 cursor-pointer animate-scale-in"
            onClick={handleFlip}
            style={{ perspective: '1000px' }}
          >
            <div
              className={`relative w-full h-96 transition-all duration-500 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {/* Front of Card */}
              <div
                className="absolute inset-0 glass rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden shadow-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="badge mb-6 bg-gradient-to-r from-blue-500 to-cyan-500">
                  ❓ Question
                </div>
                <div className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
                  {currentCard.question}
                </div>
                <div className="text-sm text-slate-500 animate-pulse">
                  💡 Click to flip
                </div>
              </div>

              {/* Back of Card */}
              <div
                className="absolute inset-0 glass rounded-3xl p-8 flex flex-col items-center justify-center backface-hidden shadow-2xl bg-gradient-to-br from-indigo-50 to-purple-50"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="badge mb-6 bg-gradient-to-r from-emerald-500 to-teal-500">
                  ✅ Answer
                </div>
                <div className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
                  {currentCard.answer}
                </div>
                <div className="text-sm text-slate-500 animate-pulse">
                  🔄 Click to flip back
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4 justify-center animate-fade-in">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              disabled={currentIndex === 0}
              className={`btn ${currentIndex === 0 ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-secondary'} min-w-[140px]`}
            >
              ← Previous
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              disabled={currentIndex === flashcards.length - 1}
              className={`btn ${currentIndex === flashcards.length - 1 ? 'btn-primary opacity-50 cursor-not-allowed' : 'btn-primary'} min-w-[140px]`}
            >
              Next →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
