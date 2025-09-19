import React, { useState } from 'react';
import { Building2, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);

      // Check if email is from mihomes.com domain
      if (!email.toLowerCase().endsWith('@mihomes.com')) {
        setError('User doesn\'t exist. Please contact your administrator.');
        return;
      }

      // Move to OTP step
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);

      // Check if OTP is correct
      if (otp !== '111111') {
        setError('Invalid OTP. Please try again.');
        return;
      }

      // Success - login
      onLogin(email);
    }, 800);
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Building2 className="h-12 w-12 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SystemHause</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Builder Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-8">
          {step === 'email' ? (
            <>
              {/* Email Step */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
                <p className="text-gray-600 dark:text-gray-400">Enter your email to continue</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email"
                      required
                      autoComplete="email"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-lg font-medium rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 min-h-[60px] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Account Helper */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                  For demo, try:
                </p>
                <button
                  onClick={() => setEmail('demo@mihomes.com')}
                  className="w-full p-4 text-left bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl transition-colors border border-blue-200 dark:border-blue-800"
                >
                  <div className="font-medium text-blue-900 dark:text-blue-100">Demo Account</div>
                  <div className="text-blue-700 dark:text-blue-300 text-sm">demo@mihomes.com</div>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* OTP Step */}
              <div className="text-center mb-8">
                <button
                  onClick={handleBackToEmail}
                  className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Enter verification code</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We've sent a code to<br />
                  <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                    6-digit code
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        // Only allow numbers and limit to 6 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setOtp(value);
                        setError('');
                      }}
                      className="w-full pl-14 pr-4 py-4 text-xl text-center tracking-[0.5em] font-mono border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="000000"
                      maxLength={6}
                      required
                      autoComplete="one-time-code"
                      autoFocus
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                    <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-lg font-medium rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 min-h-[60px] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </form>

              {/* Resend Helper */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  For demo, use code: <span className="font-mono font-bold text-blue-600">111111</span>
                </p>
                <button
                  onClick={() => setOtp('111111')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  Fill demo code
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            SystemHause Builder Portal
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;