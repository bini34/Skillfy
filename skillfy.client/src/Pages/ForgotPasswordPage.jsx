import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Component/Header/Header';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header color="black" />
      <main className="min-h-screen flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="card w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h1>
          {submitted ? (
            <div className="mt-4">
              <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700">
                If an account with that email exists, you will receive a password reset link shortly.
              </div>
              <Link to="/auth/account/signin" className="btn-outline btn mt-4 w-full text-center block">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="label">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <button type="submit" className="btn-primary btn w-full">
                  Send Reset Link
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-500">
                Remembered your password?{' '}
                <Link to="/auth/account/signin" className="text-primary-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}
