'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/lib/api';

function Setup2FAContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      router.push('/register');
      return;
    }

    const setup = async () => {
      try {
        const response = await authApi.setup2FA(parseInt(userId));
        const twoFactorCode = response.data.secret;
        setCode(twoFactorCode);

        // Log 2FA code to browser console
        console.log('========================================');
        console.log('🔐 2FA SETUP COMPLETE');
        console.log('========================================');
        console.log('Your 2FA Code:', twoFactorCode);
        console.log('========================================');
        console.log('⚠️ IMPORTANT: Save this code! You will need it to log in.');
        console.log('========================================');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to setup 2FA');
      } finally {
        setLoading(false);
      }
    };

    setup();
  }, [userId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-700">Setting up two-factor authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-scale-in">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold mb-2">2FA Enabled</h1>
            <p className="text-gray-600">Two-factor authentication is now active</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {code && (
            <>
              <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <p className="text-sm font-semibold mb-1 text-blue-900">💡 Important</p>
                <p className="text-sm text-blue-700">Check your browser console (F12) to see your 2FA code. You'll need this code when you log in.</p>
              </div>

              <div className="mb-6 bg-gray-50 rounded-lg p-6 border-2 border-gray-300">
                <p className="text-sm text-gray-600 mb-2 text-center font-semibold">Your 2FA Code:</p>
                <div className="text-4xl font-mono font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-widest">
                  {code}
                </div>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm font-semibold mb-1 text-amber-900">⚠️ Save This Code!</p>
                <p className="text-sm text-amber-700">You'll need it every time you log in. The code is also displayed in the browser console.</p>
              </div>

              <button
                onClick={() => router.push('/login')}
                className="btn btn-primary w-full py-3 text-base"
              >
                Continue to Login →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Setup2FA() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    }>
      <Setup2FAContent />
    </Suspense>
  );
}
