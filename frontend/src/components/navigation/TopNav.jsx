import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Get Quote', href: '/quote' },
  ];

  const authLinks = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ];

  return (
    <nav className="bg-industrial-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-3 group"
            >
              {/* Optional: Add a small logo/icon */}
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center shadow-md group-hover:bg-brand-600 transition-colors">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl">D-Rock</span>
                <span className="text-brand-300 text-xs">Construction LLC</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-brand-600 text-white'
                      : 'text-gray-200 hover:bg-industrial-700 hover:text-white'
                  } px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Links */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-2">
              {authLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.name === 'Register'
                      ? 'bg-accent-500 hover:bg-accent-600 text-white shadow-md'
                      : 'text-gray-200 hover:bg-industrial-700 hover:text-white'
                  } px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-industrial-700 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div
        className={`${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } md:hidden absolute w-full bg-industrial-800 shadow-lg transition-all duration-300 ease-in-out transform`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-200 hover:bg-industrial-700 hover:text-white'
              } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Auth Links with special styling */}
          <div className="pt-4 border-t border-industrial-700">
            {authLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  item.name === 'Register'
                    ? 'bg-accent-500 hover:bg-accent-600 text-white'
                    : 'text-gray-200 hover:bg-industrial-700 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mb-1`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
