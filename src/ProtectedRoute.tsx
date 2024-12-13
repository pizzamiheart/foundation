import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import WelcomeModal from './WelcomeModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, isVerified } = useAuth();
  const location = useLocation();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  if (loading) return null;
  
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  if (!isVerified) {
    return (
      <>
        <Navigate to="/" replace />
        <WelcomeModal
          isOpen={true}
          onClose={() => setShowVerificationModal(false)}
          email={user.email || ''}
          requireVerification={true}
        />
      </>
    );
  }
  
  return <>{children}</>;
}