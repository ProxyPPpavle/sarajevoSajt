
import React, { useState } from 'react';
import { Language, GalleryImage, HomeSettings } from '../types';
import { CONTENT } from '../constants';
import Stats from '../components/Stats';
import ContactForm from '../components/ContactForm';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  lang: Language;
  images: GalleryImage[];
  settings: HomeSettings;
  isAdmin?: boolean;
  onUpdateSettings?: (settings: HomeSettings) => void;
}

const Home: React.FC<HomeProps> = ({ lang, images, settings, isAdmin, onUpdateSettings }) => {
  const c = CONTENT[lang];
  const navigate = useNavigate();
  const [historyPage, setHistoryPage] = useState(0);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [editingImage, setEditingImage] = useState<{ field: keyof HomeSettings, url: string } | null>(null);

  const handleEditClick = (field: keyof HomeSettings, currentUrl: string) => {
    setEditingImage({ field, url: currentUrl });
  };

  const handleSaveEdit = () => {
    if (editingImage && onUpdateSettings) {
      onUpdateSettings({ ...settings, [editingImage.field]: editingImage.url });
      setEditingImage(null);
    }
  };

  const allYears = Array.from(new Set(images.map(img => img.year)))
    .filter(year => year !== 'ALL' && !isNaN(parseInt(year as string)))
    .sort((a, b) => parseInt(b as string) - parseInt(a as string));
  const pageSize = 3;
  const totalPages = Math.ceil(allYears.length / pageSize);
  const visibleYears = allYears.slice(historyPage * pageSize, (historyPage + 1) * pageSize);

  const getYearThumbnail = (year: string) => {
    const yearImg = images.find(img => img.year === year);
    return yearImg ? yearImg.url : `/${year}Slika1.jpg`;
  };

  const handleJoinNow = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage === historyPage) return;
    setIsChangingPage(true);
    // Use a very short timeout to swap data while parent container keeps layout
    setTimeout(() => {
      setHistoryPage(newPage);
      setIsChangingPage(false);
    }, 100);
  };

  const navigateToGalleryWithYear = (year: string) => {
    navigate('/gallery', { state: { year } });
    window.scrollTo(0, 0);
  };

  const renderHeroTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length <= 2) return title;
    // Identify the target word to be orange. For "UNAPRIJEDI SVOJU IGRU", it's index 1.
    // Generally targeting the second or second-to-last word for impact.
    return (
      <>
        {words[0]}{' '}
        <span className="text-orange-500">{words[1]}</span>{' '}
        {words.slice(2).join(' ')}
      </>
    );
  };

  return (
    <div className="pt-16 lg:pt-20 overflow-hidden">
      {/* Hero Section - Balanced Shifted Layout */}
      <section id="hero" className="relative h-[75vh] lg:min-h-[85vh] lg:h-auto flex items-center justify-center bg-black py-0 lg:py-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroImage}
            alt="Hero"
            className="w-full h-full object-cover opacity-60 md:opacity-75 brightness-[0.5] md:brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80 lg:opacity-100"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          {isAdmin && (
            <button
              onClick={() => handleEditClick('heroImage', settings.heroImage)}
              className="absolute top-24 right-8 z-30 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shadow-2xl border border-white/20 hover:scale-110 transition-transform"
            >
              <i className="fas fa-camera text-xl"></i>
            </button>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 lg:ml-8 xl:ml-16 text-center lg:text-left reveal flex flex-col items-center lg:items-start pt-8 lg:pt-0">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-oswald font-black uppercase tracking-tight text-white mb-6 lg:mb-8 leading-[0.9] drop-shadow-2xl">
                {renderHeroTitle(c.hero.title)}
              </h1>
              <p className="text-zinc-300 text-sm md:text-xl lg:text-2xl max-w-xs md:max-w-2xl mb-8 lg:mb-12 font-medium leading-relaxed drop-shadow-lg opacity-90">
                {c.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full">
                <button
                  onClick={handleJoinNow}
                  className="group relative overflow-hidden px-8 py-4 lg:px-12 lg:py-5 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-md transition-all shadow-[0_0_20px_rgba(234,88,12,0.5)] border border-white/10 text-xs lg:text-base active:scale-95 transform hover:-translate-y-1 w-auto min-w-[200px]"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {c.hero.cta}
                    <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Massive Logo with Roll In Animation */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
              <img
                src={settings.logoUrl}
                alt="Logo"
                className="max-w-[400px] xl:max-w-[600px] w-full h-auto drop-shadow-[0_0_30px_rgba(234,88,12,0.4)] animate-logo-enter"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-4 inset-x-0 flex justify-center items-center animate-bounce cursor-pointer z-20 pb-safe"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <i className="fas fa-chevron-down text-orange-500 text-3xl drop-shadow-lg p-4"></i>
        </div>
      </section>

      {/* O Nama Section - Less Bulky */}
      <section id="about" className="py-12 lg:py-20 bg-zinc-950 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center reveal">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-oswald font-black uppercase mb-3 text-white">
              {c.about.title} <span className="text-orange-600">TBC</span>
            </h2>
            <div className="w-10 h-1 bg-orange-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-sm md:text-lg lg:text-xl text-zinc-400 leading-relaxed font-light px-2 sm:px-0">
              {c.about.text}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats lang={lang} />

      {/* Istorija / Sezone - Smooth transitions & Small on mobile */}
      <section className="py-12 lg:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4 reveal">
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-oswald font-black uppercase mb-1 text-white leading-tight">Naša <span className="text-orange-600">Istorija</span></h2>
              <p className="text-zinc-500 uppercase tracking-[0.2em] text-[8px] lg:text-[10px] font-bold">Arhiva pobjeda i uspjeha kroz godine.</p>
            </div>
            <div className="flex gap-3 mx-auto md:mx-0">
              <button
                onClick={() => handlePageChange(Math.max(0, historyPage - 1))}
                className={`w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all ${historyPage === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-orange-600 hover:border-orange-600 active:scale-90'}`}
              >
                <i className="fas fa-chevron-left text-xs"></i>
              </button>
              <button
                onClick={() => handlePageChange(Math.min(totalPages - 1, historyPage + 1))}
                className={`w-9 h-9 rounded-full border border-white/10 flex items-center justify-center transition-all ${historyPage === totalPages - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-orange-600 hover:border-orange-600 active:scale-90'}`}
              >
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px]">
            <div
              key={`${historyPage}`}
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 ${isChangingPage ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100 animate-history-smooth'}`}
            >
              {visibleYears.map((year, i) => (
                <div
                  key={`${year}`}
                  className="group relative overflow-hidden rounded-lg bg-zinc-900 border border-white/10 cursor-pointer aspect-[16/9] md:aspect-[3/4] shadow-xl hover:border-orange-500/50 transition-all duration-500"
                  onClick={() => navigateToGalleryWithYear(year as string)}
                >
                  <img
                    src={getYearThumbnail(year as string)}
                    alt={year as string}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

                  <div className="absolute bottom-3 left-3 pointer-events-none">
                    <span className="year-outline absolute bottom-0 left-0 -mb-2 -ml-1 opacity-10 scale-[0.35] origin-bottom-left text-6xl">
                      {year}
                    </span>
                    <div className="relative z-10">
                      <span className="text-lg lg:text-2xl font-oswald font-black text-white">{year}</span>
                      <p className="text-orange-500 font-black uppercase text-[7px] lg:text-[9px] tracking-[0.2em] mt-1 transition-transform group-hover:translate-x-1">
                        POGLEDAJ <i className="fas fa-chevron-right ml-1"></i>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scholarship Section - Compact & Subtle */}
      <section id="scholarship" className="py-12 lg:py-20 bg-zinc-950 border-y border-white/10 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center text-center lg:text-left">
            <div className="reveal order-2 lg:order-1">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-oswald font-black uppercase mb-4 leading-tight text-white">
                STIPENDIJA <span className="text-orange-600">USA</span>
              </h2>
              <p className="text-zinc-400 text-[11px] md:text-base mb-6 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Vaš put do američkih koledža počinje ovdje. Pružamo kompletnu podršku u pripremi, izradi video portfolija i povezivanju sa trenerima.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-8 max-w-md mx-auto lg:mx-0">
                {[
                  'Video portoflio',
                  'Direktan kontakt',
                  'Akademski savjeti',
                  'USA Mentorstvo'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2 blur-texture p-2 rounded-lg border border-white/10">
                    <i className="fas fa-check text-orange-500 text-[8px]"></i>
                    <span className="text-white font-bold uppercase text-[7px] lg:text-[9px] tracking-wider">{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleJoinNow} className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase text-[9px] lg:text-xs tracking-widest rounded-md transition-all shadow-lg border border-white/10 active:scale-95">
                POŠALJI UPIT
              </button>
            </div>
            <div className="reveal order-1 lg:order-2 relative group" style={{ transitionDelay: '0.2s' }}>
              <div className="aspect-[4/3] sm:aspect-square max-w-full lg:max-w-lg mx-auto bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border border-white/20 p-1">
                <img src={settings.scholarshipImage} className="w-full h-full object-cover" alt="USA Scholarship" />
                {isAdmin && (
                  <button
                    onClick={() => handleEditClick('scholarshipImage', settings.scholarshipImage)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lokacije & Mapa - Compact */}
      <section id="camps" className="py-12 lg:py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div className="reveal space-y-4 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-oswald font-black uppercase mb-3 leading-none text-white">GDJE <span className="text-orange-600">SMO</span></h2>
              <div className="space-y-3 max-w-lg mx-auto lg:mx-0">
                <div className="p-4 lg:p-6 rounded-xl bg-zinc-900 border border-white/10 blur-texture shadow-xl text-left">
                  <h4 className="text-base lg:text-xl font-oswald font-bold text-white uppercase tracking-tight">Bayrampaša Arena</h4>
                  <p className="text-orange-500 text-[9px] lg:text-[11px] font-black tracking-[0.2em] mt-1 lg:mt-2 uppercase">Istanbul, Turska</p>
                  <p className="text-zinc-500 text-[10px] lg:text-xs mt-2 lg:mt-3 leading-relaxed">Naša baza u Istanbulu pruža idealne uslove za intenzivan napredak.</p>
                </div>
                <div className="p-3 lg:p-4 rounded-xl border border-dashed border-white/5 opacity-40 flex items-center justify-center">
                  <p className="text-[7px] lg:text-[9px] text-zinc-600 font-black tracking-[0.4em] uppercase">Nove lokacije uskoro</p>
                </div>
              </div>
            </div>

            <div className="reveal min-h-[300px] lg:h-auto rounded-xl border border-white/10 overflow-hidden shadow-2xl mt-4 lg:mt-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54574.780417712514!2d28.87737697211303!3d41.03241190003859!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caba81ed5c68f9%3A0xfbbec749f5fd7e0c!2zQmF5cmFtcGHFn2EvxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1769719486616!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />

      {/* Inline Edit Modal */}
      {editingImage && (
        <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setEditingImage(null)}>
          <div className="w-full max-w-lg bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-2xl font-oswald font-black text-white uppercase mb-6">Izmjena slike</h3>

            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-600">
                <i className="fas fa-link text-[10px]"></i>
              </div>
              <input
                autoFocus
                type="text"
                value={editingImage.url}
                onChange={(e) => setEditingImage({ ...editingImage, url: e.target.value })}
                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:border-orange-500 outline-none"
                placeholder="Zalijepi URL slike (npr. Imgur link)..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingImage(null)}
                className="flex-1 px-6 py-4 bg-zinc-800 text-white font-bold rounded-xl uppercase text-[10px] hover:bg-zinc-700 transition-colors"
              >
                Poništi
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-6 py-4 bg-orange-600 text-white font-black rounded-xl uppercase text-[10px] hover:bg-orange-500 shadow-xl shadow-orange-900/20 active:scale-95 transition-all flex items-center justify-center"
              >
                Sačuvaj izmjenuna
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
