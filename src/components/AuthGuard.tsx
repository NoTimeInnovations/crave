import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface AuthGuardProps {
  children: React.ReactNode;
  requireRole?: 'hotel';
}

export function AuthGuard({ children, requireRole }: AuthGuardProps) {
  const { user, userData, loading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (requireRole && userData?.role !== requireRole) {
        navigate('/');
      }
    }
  }, [user, userData, loading, navigate, requireRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user || (requireRole && userData?.role !== requireRole)) {
    return null;
  }

  return <>{children}</>;
}