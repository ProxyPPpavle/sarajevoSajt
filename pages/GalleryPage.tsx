
import React, { useState, useEffect } from 'react';
import { GalleryImage, Language } from '../types';
import { useLocation } from 'react-router-dom';

interface GalleryPageProps {
  lang: Language;
  images: GalleryImage[];
}

const GalleryPage: React.FC<GalleryPageProps> = ({ images }) => {
  const location = useLocation();
  // Uvijek default na ALL
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Korisnik i dalje može filtrirati ako klikne sa Home strane, ali prompt kaže "nemoj odma da applayas filter"
  // Pa ćemo samo ostaviti opciju u filterima istaknutu ali prikazati ALL ili dozvoliti ALL default.
  // Korisnik je rekao "baci ga na ALL pa nek sortira ako oce"
  useEffect(() => {
    // Čak i ako dobijemo state, ostavljamo ALL kao primarni
    setActiveFilter('ALL');
  }, [location.state]);

  const years = Array.from(new Set(images.map(img => img.year)))
    .filter(y => y !== 'ALL' && !isNaN(parseInt(y as string)))
    .sort((a, b) => parseInt(b as string) - parseInt(a as string));
  const filters = ['ALL', ...years];

  const filteredImages = activeFilter === 'ALL'
    ? images
    : images.filter(img => img.year === activeFilter);

  return (
    <div className="min-h-screen bg-black py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <h1 className="text-5xl md:text-8xl font-oswald font-black uppercase mb-4 tracking-tighter">Naša <span className="text-orange-500">Arhiva</span></h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg uppercase tracking-widest text-xs font-bold">Kroz objektiv šampiona.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 reveal" style={{ transitionDelay: '0.2s' }}>
          {filters.map(f => (
            <button
              key={f as string}
              onClick={() => setActiveFilter(f as string)}
              className={`px-6 py-2 rounded font-black uppercase tracking-widest transition-all text-[10px] border-2 ${activeFilter === f
                  ? 'bg-orange-600 border-orange-500 text-white shadow-xl'
                  : 'border-white/20 text-zinc-500 hover:border-zinc-400'
                }`}
            >
              {f as string}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="reveal group relative aspect-square overflow-hidden rounded bg-zinc-900 border-2 border-white/20 cursor-pointer shadow-lg hover:border-orange-600 transition-all"
              style={{ transitionDelay: `${(i % 8) * 0.05}s` }}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-orange-500 font-black uppercase tracking-widest text-[8px] mb-1">{img.year}</p>
                <h3 className="text-white font-oswald font-black text-sm uppercase leading-tight truncate">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-40 text-zinc-600 reveal">
            <i className="fas fa-camera text-7xl mb-6 opacity-20"></i>
            <p className="text-2xl font-oswald font-bold uppercase tracking-widest">Prazna arhiva</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-6xl w-full bg-zinc-950 rounded overflow-hidden relative shadow-2xl border-2 border-white/20"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 bg-zinc-900 flex items-center justify-between border-b-2 border-white/10">
              <div>
                <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest block mb-1">{selectedImage.year}</span>
                <h3 className="text-white font-oswald font-black text-xl uppercase tracking-tight">{selectedImage.title}</h3>
              </div>
              <button onClick={() => setSelectedImage(null)} className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center text-white"><i className="fas fa-times"></i></button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black min-h-[50vh]">
              <img src={selectedImage.url} alt={selectedImage.title} className="max-h-[70vh] w-auto object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
