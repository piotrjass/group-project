'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { testsApi } from '@/lib/api';
import { TestHistory } from '@/types';

export default function TestHistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<TestHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const response = await testsApi.getHistory();
        setHistory(response.data);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'from-emerald-500 to-teal-500';
    if (percentage >= 60) return 'from-amber-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const getScoreBg = (percentage: number) => {
    if (percentage >= 80) return 'bg-emerald-50/50 border-emerald-300';
    if (percentage >= 60) return 'bg-amber-50/50 border-amber-300';
    return 'bg-red-50/50 border-red-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-3xl p-8 shadow-2xl flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-700 font-medium">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button onClick={() => router.push('/dashboard')} className="btn btn-secondary">
            ← Back to Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="text-6xl mb-4">📊</div>
            <h1 className="text-5xl font-black mb-4 text-gradient">Test History</h1>
            <p className="text-xl text-slate-600">Review your past test results</p>
          </div>

          {/* History Content */}
          {history.length === 0 ? (
            <div className="text-center animate-scale-in">
              <div className="card max-w-md mx-auto">
                <div className="text-6xl mb-4">📭</div>
                <h2 className="text-2xl font-bold text-gradient mb-2">No Test History</h2>
                <p className="text-slate-600 mb-6">Take a test to get started!</p>
                <button onClick={() => router.push('/dashboard')} className="btn btn-primary">
                  🏠 Go to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-slide-up">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  className={`card border-2 ${getScoreBg(item.percentage)} transition-all duration-300`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gradient mb-1">{item.categoryName}</h3>
                      <p className="text-sm text-slate-600">📅 {formatDate(item.completedAt)}</p>
                    </div>
                    <div className={`badge text-2xl px-6 py-3 bg-gradient-to-r ${getScoreColor(item.percentage)}`}>
                      {item.percentage}%
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center glass rounded-xl p-3">
                      <p className="text-sm text-slate-600 mb-1">Questions</p>
                      <p className="text-2xl font-bold text-gradient">{item.totalQuestions}</p>
                    </div>
                    <div className="text-center glass rounded-xl p-3">
                      <p className="text-sm text-slate-600 mb-1">Correct</p>
                      <p className="text-2xl font-bold text-emerald-600">{item.correctAnswers}</p>
                    </div>
                    <div className="text-center glass rounded-xl p-3">
                      <p className="text-sm text-slate-600 mb-1">Incorrect</p>
                      <p className="text-2xl font-bold text-red-600">
                        {item.totalQuestions - item.correctAnswers}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getScoreColor(item.percentage)} transition-all duration-500 shadow-lg`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
