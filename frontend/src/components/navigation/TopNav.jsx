import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const TopNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

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
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 sm:h-20">
            {/* Logo/Brand - Optimized for mobile */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center space-x-2 sm:space-x-4"
                onClick={() => setIsOpen(false)}
              >
                <img
                  src="/D_Rock_Logo.jpg"
                  alt="D-Rock Construction"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 font-bold text-lg sm:text-xl tracking-tight">D-Rock</span>
                  <span className="text-gray-500 text-xs sm:text-sm font-medium">Construction LLC</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    } px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="ml-4 flex items-center space-x-2">
                {authLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.name === 'Register'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    } px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button - Improved touch target */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-all"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
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

        {/* Mobile menu - Full screen overlay */}
        <div
          className={`${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } md:hidden fixed inset-0 bg-white z-40 transition-opacity duration-300 ease-in-out`}
          style={{ top: '64px' }} // Height of the header
        >
          <div className="px-4 pt-2 pb-3 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  } block px-3 py-4 rounded-lg text-base font-medium transition-all duration-200 active:bg-gray-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              {authLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    item.name === 'Register'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50'
                  } block px-3 py-4 rounded-lg text-base font-medium transition-all duration-200 mb-2 active:bg-gray-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default TopNav;
