
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { CONTENT, LANGUAGES } from '../constants';

interface HeaderProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ currentLang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const c = CONTENT[currentLang];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavItem = ({ label, id, to }: { label: string, id?: string, to?: string }) => {
    if (to) {
      const isActive = location.pathname === to;
      return (
        <Link
          to={to}
          onClick={() => setIsOpen(false)}
          className={`px-3 py-2 text-sm font-bold transition-all duration-300 uppercase tracking-wider ${isActive ? 'text-orange-500' : 'text-white hover:text-orange-400'
            }`}
        >
          {label}
        </Link>
      );
    }
    return (
      <button
        onClick={() => id ? handleScrollTo(id) : null}
        className="px-3 py-2 text-sm font-bold text-white hover:text-orange-400 transition-all duration-300 uppercase tracking-wider text-left"
      >
        {label}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-black/95 border-b border-white/5 h-16 lg:h-20 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" onClick={() => { setIsOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center space-x-2 group">
          <img src="/logo.png" alt="TBC Logo" className="w-12 h-12 lg:w-16 lg:h-16 object-contain group-hover:scale-105 transition-transform" />
          <span className="font-oswald text-lg lg:text-2xl font-bold tracking-tighter text-white hidden sm:block">
            THE BEST <span className="text-orange-500">CAMP</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center space-x-2">
          <NavItem label={c.nav.home} id="hero" />
          <NavItem label={c.nav.about} id="about" />
          <NavItem label={c.nav.camps} id="camps" />
          <NavItem label={c.nav.scholarship} id="scholarship" />
          <NavItem label={c.nav.gallery} to="/gallery" />
          <NavItem label={c.nav.contact} id="contact" />
        </nav>

        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className="flex items-center space-x-1 bg-zinc-900 p-1 rounded-md border border-white/5">
            {LANGUAGES.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Language)}
                className={`px-2 py-0.5 text-[8px] lg:text-[10px] font-black rounded uppercase transition-all ${currentLang === l.code ? 'bg-orange-600 text-white' : 'text-zinc-600 hover:text-white'
                  }`}
              >
                {l.code}
              </button>
            ))}
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white p-2 active:scale-90 transition-transform">
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Optimized Subtle Mobile Dropdown */}
      {isOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full mobile-menu-blur border-b border-white/10 py-6 px-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3">
            {[
              { label: c.nav.home, id: 'hero' },
              { label: c.nav.about, id: 'about' },
              { label: c.nav.camps, id: 'camps' },
              { label: c.nav.scholarship, id: 'scholarship' },
              { label: c.nav.gallery, to: '/gallery' },
              { label: c.nav.contact, id: 'contact' }
            ].map((item, idx) => (
              item.to ? (
                <Link
                  key={idx}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-oswald font-bold uppercase text-white hover:text-orange-500 active:translate-x-1 transition-all"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={idx}
                  onClick={() => handleScrollTo(item.id!)}
                  className="text-lg font-oswald font-bold uppercase text-white hover:text-orange-500 text-left active:translate-x-1 transition-all"
                >
                  {item.label}
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
