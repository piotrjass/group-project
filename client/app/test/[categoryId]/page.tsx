'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { testsApi } from '@/lib/api';
import { TestQuestion, TestAnswer, TestResult } from '@/types';

export default function Test() {
  const router = useRouter();
  const params = useParams();
  const categoryId = parseInt(params.categoryId as string);

  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchTest = async () => {
      try {
        const response = await testsApi.generateTest(categoryId);
        setQuestions(response.data);
      } catch (err) {
        console.error('Failed to fetch test:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [categoryId, router]);

  const handleAnswerSelect = (flashcardId: number, optionIndex: number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(flashcardId, optionIndex);
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.size !== questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    setLoading(true);

    try {
      const testAnswers: TestAnswer[] = Array.from(answers.entries()).map(
        ([flashcardId, selectedOptionIndex]) => ({
          flashcardId,
          selectedOptionIndex,
        })
      );

      const response = await testsApi.submitTest({
        categoryId,
        answers: testAnswers,
      });

      setResult(response.data);
    } catch (err) {
      console.error('Failed to submit test:', err);
      alert('Failed to submit test');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-3xl p-8 shadow-2xl flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-700 font-medium">Loading test...</p>
        </div>
      </div>
    );
  }

  if (result) {
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

        {/* Results Content */}
        <main className="pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-12 animate-scale-in">
              <div className="text-7xl mb-4">🎉</div>
              <h1 className="text-5xl font-black mb-4 text-gradient">Test Complete!</h1>

              {/* Score Circle */}
              <div className="inline-flex items-center justify-center w-40 h-40 glass rounded-full border-4 border-indigo-200 mb-6 shadow-2xl">
                <div className="text-center">
                  <div className="text-5xl font-black text-gradient">{result.percentage}%</div>
                </div>
              </div>

              <p className="text-xl text-slate-600">
                You got <span className="font-bold text-gradient">{result.correctAnswers}</span> out of{' '}
                <span className="font-bold text-gradient">{result.totalQuestions}</span> correct
              </p>
            </div>

            {/* Review Section */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 text-gradient">📝 Review Your Answers</h2>
              <div className="space-y-4">
                {result.details.map((detail, index) => (
                  <div
                    key={detail.flashcardId}
                    className={`card transition-all duration-300 ${
                      detail.isCorrect
                        ? 'border-2 border-emerald-300 bg-emerald-50/50'
                        : 'border-2 border-red-300 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="badge bg-gradient-to-r from-slate-600 to-slate-700">
                        Question {index + 1}
                      </span>
                      <span
                        className={`badge ${
                          detail.isCorrect
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                            : 'bg-gradient-to-r from-red-500 to-rose-500'
                        }`}
                      >
                        {detail.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-slate-800 mb-4">{detail.question}</p>
                    <div className="space-y-2">
                      <p className="text-slate-700">
                        <span className="font-semibold">Your answer:</span>{' '}
                        <span className={detail.isCorrect ? 'text-emerald-700' : 'text-red-700'}>
                          {detail.userAnswer}
                        </span>
                      </p>
                      {!detail.isCorrect && (
                        <p className="text-slate-700">
                          <span className="font-semibold">Correct answer:</span>{' '}
                          <span className="text-emerald-700">{detail.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center animate-fade-in">
              <button onClick={() => router.push('/dashboard')} className="btn btn-primary px-8">
                🏠 Back to Dashboard
              </button>
              <button onClick={() => router.push('/test-history')} className="btn btn-secondary px-8">
                📊 View History
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => router.push('/dashboard')} className="btn btn-secondary">
            ← Back
          </button>
          <h2 className="text-xl font-bold text-gradient">✅ Test</h2>
          <div className="w-24"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Test Info Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-black mb-4 text-gradient">Answer All Questions</h1>
            <span className="badge text-lg px-6 py-2">
              {answers.size} of {questions.length} answered
            </span>
          </div>

          {/* Questions */}
          <div className="space-y-6 mb-12 animate-slide-up">
            {questions.map((question, index) => (
              <div
                key={question.flashcardId}
                className="card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">
                  <span className="badge bg-gradient-to-r from-indigo-600 to-purple-600">
                    Question {index + 1}
                  </span>
                </div>
                <p className="text-xl font-semibold text-slate-800 mb-6">{question.question}</p>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        answers.get(question.flashcardId) === optionIndex
                          ? 'border-indigo-500 bg-indigo-50/50 shadow-lg scale-105'
                          : 'border-slate-200 bg-white/50 hover:border-indigo-300 hover:bg-indigo-50/30 hover:scale-102'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.flashcardId}`}
                        checked={answers.get(question.flashcardId) === optionIndex}
                        onChange={() => handleAnswerSelect(question.flashcardId, optionIndex)}
                        className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 focus:ring-2 mr-4"
                      />
                      <span className="text-slate-700 font-medium flex-1">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="text-center animate-fade-in">
            <button
              onClick={handleSubmit}
              className={`btn btn-primary text-xl px-12 py-4 ${
                answers.size !== questions.length ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={answers.size !== questions.length || loading}
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                '🎯 Submit Test'
              )}
            </button>
            {answers.size !== questions.length && (
              <p className="text-sm text-slate-500 mt-4">
                Please answer all questions before submitting
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
