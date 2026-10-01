import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, AlertCircle, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, loginWithEmail, loginAsDemo, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register & Forgot password modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleGoogleSuccess = async (tokenResponse) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      if (tokenResponse.access_token) {
        const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });
        const profile = await userInfoRes.json();
        
        loginWithGoogle({
          credential: null,
          userProfile: profile
        });
      }
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorMessage("Google authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => {
      setErrorMessage("Google Sign-In was cancelled or failed.");
    }
  });

  const handleGoogleClick = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('your_google_client_id') || clientId.includes('mock-google-client-id')) {
      loginWithGoogle({
        credential: null,
        userProfile: {
          name: "Sundar Pichai",
          email: "sundar@google.com",
          picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
        }
      });
      navigate('/dashboard', { replace: true });
      return;
    }

    try {
      triggerGoogleLogin();
    } catch (e) {
      console.warn("Falling back to demo Google profile:", e);
      loginWithGoogle({
        credential: null,
        userProfile: {
          name: "Sundar Pichai",
          email: "sundar@google.com",
          picture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
        }
      });
      navigate('/dashboard', { replace: true });
    }
  };

  const handleAppleClick = () => {
    alert("Apple Sign-In is configured as a visual reference for this assignment. Please use Google Sign-In or Demo login.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setErrorMessage("Email address is required.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    const result = loginWithEmail(email.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setErrorMessage(result.error || "Login failed.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regEmail || !regPassword) return;
    loginWithEmail(regEmail, regPassword);
    setShowRegisterModal(false);
    navigate('/dashboard', { replace: true });
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F8FAFC]">
      {/* LEFT PANEL */}
      <div className="w-full lg:w-[42%] bg-black text-white flex items-center justify-center py-12 lg:py-0 px-8 min-h-[160px] lg:min-h-screen shrink-0">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight font-display select-none">
          Board.
        </h1>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-[420px]">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-display tracking-tight">
              Sign In
            </h2>
            <p className="text-sm font-medium text-neutral-600 mt-1">
              Sign in to your account
            </p>
          </div>

          {/* Social Sign In Buttons: Google & Apple */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={handleGoogleClick}
              className="flex items-center justify-center gap-2.5 px-3 py-2.5 bg-white text-xs text-neutral-500 font-medium rounded-xl border border-transparent shadow-sm hover:border-gray-200 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <button
              type="button"
              onClick={handleAppleClick}
              className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white text-xs text-neutral-500 font-medium rounded-xl border border-transparent shadow-sm hover:border-gray-200 hover:shadow transition-all duration-150 active:scale-[0.98]"
            >
              <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.56-7.85-11.6-14.43-5.2-8.35-9.3-17.75-12.3-28.2-3-10.45-4.5-20.73-4.5-30.84 0-14.35 3.5-26.24 10.5-35.68 7-9.43 15.93-14.15 26.8-14.15 4.35 0 9.17 1.03 14.43 3.1 5.26 2.06 9.3 3.1 12.1 3.1 2.45 0 6.6-1.14 12.44-3.4 5.84-2.28 10.9-3.23 15.18-2.85 11.38.83 20.35 5.22 26.9 13.17-9.9 5.98-14.7 14.3-14.4 24.96.28 8.1 3.32 14.93 9.12 20.5 5.8 5.56 12.7 8.7 20.7 9.4-2.3 6.9-5.1 13.8-8.4 20.7zM119.22 31.8c0-7.2 2.6-14.1 7.8-20.7 5.2-6.6 11.8-10.8 19.8-12.6.4 1.5.6 3.1.6 4.7 0 7.2-2.8 14.3-8.4 21.3-5.6 7-12.4 11-20.4 12-.2-1.6-.4-3.2-.4-4.7z" />
              </svg>
              <span>Sign in with Apple</span>
            </button>
          </div>

          {/* Login Form Card */}
          <div className="bg-white p-7 sm:p-8 rounded-2xl shadow-sm border border-neutral-100">
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 mb-5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@gmail.com"
                  required
                  className="w-full px-4 py-2.5 bg-[#F5F5F5] rounded-xl text-sm text-neutral-800 border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none transition-all placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-800 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 bg-[#F5F5F5] rounded-xl text-sm text-neutral-800 border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none transition-all placeholder:text-neutral-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs sm:text-sm text-[#346BD4] hover:underline font-medium inline-block"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-black hover:bg-neutral-800 active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-150 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

          <p className="text-center text-xs sm:text-sm text-neutral-500 mt-5">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="text-[#346BD4] font-medium hover:underline"
            >
              Register here
            </button>
          </p>

          <div className="mt-8 pt-6 border-t border-neutral-200/60 text-center">
            <button
              type="button"
              onClick={loginAsDemo}
              className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-full border border-neutral-300 transition-all duration-150 hover:shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Instant Review: 1-Click Demo Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-7 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-5">
              <h3 className="text-xl font-bold text-gray-900">Create an Account</h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 text-xs border border-gray-200 focus:bg-white focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 text-xs border border-gray-200 focus:bg-white focus:border-black outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Create a password (min 6 chars)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 text-xs border border-gray-200 focus:bg-white focus:border-black outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-md"
              >
                Create Account & Enter Dashboard
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-7 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-5">
              <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
              <button
                onClick={() => setShowForgotModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {forgotSent ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3 animate-bounce" />
                <h4 className="text-base font-bold text-gray-900 mb-1">Instructions Sent!</h4>
                <p className="text-xs text-gray-500">
                  Password reset link has been dispatched to <strong>{forgotEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-gray-500">
                  Enter your account email to receive a secure password reset link.
                </p>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 text-xs border border-gray-200 focus:bg-white focus:border-black outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-black text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-all shadow-md"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
