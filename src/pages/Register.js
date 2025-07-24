import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Loader2, Mail, Lock } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle'; // Dark mode toggle

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#1E1E2F] text-white relative">
      {/* Toggle Button */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Left branding panel */}
      <div className="md:w-1/2 bg-gradient-to-br from-gray-900 to-rose-700 flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Droply</h1>
          <p className="text-lg text-gray-200">Create your account to get started</p>
          <img
            src="/logo512.png"
            alt="Delivery Logo"
            className="w-50 h-50 mx-auto mt-0 animate-slide"
          />
        </div>
      </div>

      {/* Register form panel */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-center">Create Account</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full pl-10 pr-4 py-2 bg-[#2D2D44] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-2 bg-[#2D2D44] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg font-semibold flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Register'}
            </button>
          </form>

          <p className="text-sm text-center text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-400 hover:underline">Login</a>
          </p>
        </div>
      </div>

      {/* Animation style */}
      <style>
        {`
          @keyframes slide {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(30px);
            }
          }
          .animate-slide {
            animation: slide 3s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Register;
