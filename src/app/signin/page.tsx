// SigninPage.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SigninPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    router.push('/dashboard'); // Redirect after successful sign-in
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <span className="text-green-500">Grocery</span>List
        </div>
        <Link 
          href="/signup" 
          className="px-6 py-2 text-sm font-medium text-green-500 border border-green-500 rounded-full hover:bg-green-500 hover:text-white transition-colors duration-300"
        >
          Create Account
        </Link>
      </nav>
      
      {/* Form Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-green-500 py-6 px-8">
          <h1 className="text-2xl font-bold text-white text-center">Welcome Back</h1>
          <p className="text-green-100 text-center mt-2">Sign in to continue to your account</p>
        </div>
        
        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative text-black">
                <input
                  id="email"
                  type="email"
                  placeholder="yourname@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
            >
              Sign In
            </button>
          </form>
          
          {/* Additional Options */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="text-green-500 hover:text-green-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
          
          
        </div>
      </div>
      
      {/* Footer */}
      <p className="mt-8 text-center text-sm text-gray-500">
        By signing in, you agree to our{' '}
        <a href="#" className="text-green-500 hover:text-green-700">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-green-500 hover:text-green-700">
          Privacy Policy
        </a>
      </p>
    </main>
  );
}