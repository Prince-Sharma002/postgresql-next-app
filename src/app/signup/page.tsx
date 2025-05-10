// SignupPage.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    // Redirect to home or dashboard after signup
    router.push('/'); // or any route
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <span className="text-blue-500">Grocery</span>List
        </div>
        <Link 
          href="/signin" 
          className="px-6 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300"
        >
          Sign In
        </Link>
      </nav>
      
      {/* Form Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Form Header */}
        <div className="bg-blue-500 py-6 px-8">
          <h1 className="text-2xl font-bold text-white text-center">Create Account</h1>
          <p className="text-blue-100 text-center mt-2">Join us today and get started</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">We&apos;ll send a magic link to this email</p>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              Create Account
            </button>
          </form>
          
          {/* Additional Options */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-500 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <p className="mt-8 text-center text-sm text-gray-500">
        By signing up, you agree to our{' '}
        <a href="#" className="text-blue-500 hover:text-blue-700">
          Terms
        </a>{' '}
        and{' '}
        <a href="#" className="text-blue-500 hover:text-blue-700">
          Privacy Policy
        </a>
      </p>
    </main>
  );
}