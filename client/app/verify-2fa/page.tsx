'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';

function Verify2FAContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError('User ID not found');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await authApi.verify2FA({
        userId: parseInt(userId),
        code,
      });

      // Save token and redirect to dashboard
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <button
          onClick={() => router.push('/login')}
          className="mb-6 text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
        >
          ← Back to login
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-scale-in">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold mb-2">Verify 2FA</h1>
            <p className="text-gray-600">Enter your 2FA code to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm font-semibold mb-1 text-blue-900">💡 Tip</p>
            <p className="text-sm text-blue-700">Enter the 6-digit code that was shown during registration.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                2FA Code
              </label>
              <input
                id="code"
                type="text"
                className="w-full px-4 py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-center text-3xl tracking-widest font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                required
                maxLength={6}
                placeholder="000000"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3 text-base mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                'Verify & Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Verify2FA() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    }>
      <Verify2FAContent />
    </Suspense>
  );
}
