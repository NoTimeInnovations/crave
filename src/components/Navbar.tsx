import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { Button } from './ui/button';

export function Navbar() {
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/offers', label: 'Offers' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <UtensilsCrossed className="h-6 w-6 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">Crave</span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}