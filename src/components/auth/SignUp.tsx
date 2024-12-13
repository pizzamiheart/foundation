import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '../../lib/services/auth';
import { sendVerificationEmail } from '../../lib/services/verification';
import WelcomeModal from '../../WelcomeModal';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await signUp(email, password, firstName);
      await sendVerificationEmail(user);
      setShowWelcomeModal(true);
    } catch (err: any) {
      console.error('SignUp Error:', err);
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-[#ffffe8] dark:bg-black rounded-lg border-2 border-black/20 dark:border-white/20 p-8">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Create Account</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black/80 dark:text-white/80 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white/50 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/20 dark:border-white/20 rounded-md text-black dark:text-white transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-black/60 dark:text-white/60">
            Already have an account?{' '}
            <Link to="/signin" className="text-black dark:text-white hover:text-red-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <WelcomeModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcome}
        email={email}
        requireVerification={true}
      />
    </div>
  );
}