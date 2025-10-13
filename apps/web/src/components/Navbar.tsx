import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { Button } from './Button';

export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-black border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="text-gold text-3xl">🏠</div>
              <div>
                <span className="text-2xl font-bold text-gold tracking-wider">TOP CHOICE</span>
                <div className="text-xs text-gold/80 tracking-widest">REALTY LLC</div>
              </div>
            </Link>
            <div className="hidden md:flex ml-12 space-x-8">
              <Link to="/" className="text-gray-300 hover:text-gold px-3 py-2 text-sm font-medium transition-colors">
                HOME
              </Link>
              <Link to="/listings" className="text-gray-300 hover:text-gold px-3 py-2 text-sm font-medium transition-colors">
                LISTINGS
              </Link>
              <Link to="/agents" className="text-gray-300 hover:text-gold px-3 py-2 text-sm font-medium transition-colors">
                AGENTS
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-300">Hello, {user?.name}</span>
                <Link to="/dashboard">
                  <Button size="sm" variant="outline">
                    📊 Dashboard
                  </Button>
                </Link>
                <Link to="/customers">
                  <Button size="sm" variant="outline">
                    👥 Customers
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button size="sm" variant="outline">
                    👤 Profile
                  </Button>
                </Link>
                <Button size="sm" variant="secondary" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm">Agent Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

