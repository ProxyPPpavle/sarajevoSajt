
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-orange-600 rounded flex items-center justify-center font-oswald text-2xl font-black italic">TBC</div>
              <span className="font-oswald text-2xl font-bold tracking-tighter text-white uppercase leading-none">THE BEST <span className="text-orange-600 block text-sm tracking-[0.2em] -mt-1 font-black">CAMP</span></span>
            </Link>
            <p className="text-zinc-500 max-w-sm mb-10 text-lg leading-relaxed font-light">
              Lideri u razvoju mladih sportista od 2012. godine. Pridružite se pobjedničkom timu.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all shadow-lg"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="w-12 h-12 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-zinc-400 hover:bg-green-600 hover:text-white transition-all shadow-lg"><i className="fab fa-whatsapp text-xl"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-oswald font-black uppercase mb-8 tracking-widest text-sm">Navigacija</h4>
            <ul className="space-y-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
              <li><Link to="/" className="hover:text-orange-600 transition-colors">Početna</Link></li>
              <li><Link to="/gallery" className="hover:text-orange-600 transition-colors">Galerija</Link></li>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-orange-600 transition-colors text-left uppercase">O Nama</button></li>
              <li><button onClick={() => document.getElementById('camps')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-orange-600 transition-colors text-left uppercase">Naši Kampovi</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-oswald font-black uppercase mb-8 tracking-widest text-sm">Podrška</h4>
            <ul className="space-y-4 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
              <li><a href="#" className="hover:text-orange-600 transition-colors">Pravila kampa</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Česta pitanja</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Prijavni list</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
          <p>© 2024 THE BEST CAMP. SVA PRAVA PRIDRŽANA.</p>
          <div className="mt-6 md:mt-0 flex items-center space-x-2">
            <span>DESIGNED BY</span>
            <span className="text-orange-600">PAVLE PROLOVIC</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
