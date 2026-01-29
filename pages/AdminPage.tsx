
import React, { useState } from 'react';
import { GalleryImage, HomeSettings } from '../types';

interface AdminPageProps {
  images: GalleryImage[];
  onAdd: (img: Omit<GalleryImage, 'id'>) => void;
  onDelete: (id: string) => void;
  settings: HomeSettings;
  onUpdateSettings: (newSettings: HomeSettings) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ images, onAdd, onDelete, settings, onUpdateSettings }) => {
  const [pass, setPass] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [newImg, setNewImg] = useState({ title: '', url: '', year: '2025', category: 'Training' });
  const [tempSettings, setTempSettings] = useState<HomeSettings>(settings);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === (process.env.ADMIN_PASSWORD || 'TBC-ADMIN-2025')) {
      setIsAuth(true);
    } else {
      alert('Pogrešna lozinka!');
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newImg.title && newImg.url) {
      onAdd(newImg);
      setNewImg({ title: '', url: '', year: '2025', category: 'Training' });
      alert('Slika dodata u galeriju!');
    }
  };

  const handleUpdateHome = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(tempSettings);
    alert('Početna strana ažurirana!');
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border-2 border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 border border-white/20">
              <i className="fas fa-user-shield text-2xl"></i>
            </div>
            <h1 className="text-2xl font-oswald font-bold text-white uppercase tracking-tight">TBC Admin Panel</h1>
            <p className="text-zinc-500 text-xs mt-2 font-black tracking-widest uppercase">Admin Terminal Access</p>
          </div>
          <div className="space-y-4">
            <input
              autoFocus
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Enter Password"
              className="w-full bg-black border-2 border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-orange-500 font-mono tracking-widest shadow-inner"
            />
            <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all border border-white/10 shadow-lg">
              PRIJAVI SE
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 border-b border-white/10 pb-8 gap-6">
          <h1 className="text-4xl font-oswald font-black text-white uppercase tracking-tighter">
            ADMIN <span className="text-orange-500">CONTROL</span>
          </h1>
          <button
            onClick={() => setIsAuth(false)}
            className="px-6 py-2 border-2 border-white/20 rounded-lg text-zinc-500 font-black uppercase text-xs hover:text-white hover:bg-red-600/20 transition-all"
          >
            Odjavi se
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* SEKCIJA 1: GALERIJA */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-xl blur-texture">
              <h3 className="text-xl font-oswald font-black text-white uppercase mb-6 flex items-center">
                <i className="fas fa-plus-circle text-orange-500 mr-3"></i> DODAJ U GALERIJU
              </h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 block">Naslov Slike</label>
                  <input
                    required
                    value={newImg.title}
                    onChange={e => setNewImg({ ...newImg, title: e.target.value })}
                    type="text"
                    placeholder="npr. Trening Kamp Istanbul"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 block">Link Slike (URL)</label>
                  <input
                    required
                    value={newImg.url}
                    onChange={e => setNewImg({ ...newImg, url: e.target.value })}
                    type="text"
                    placeholder="https://..."
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-orange-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 block">Godina</label>
                    <select
                      value={newImg.year}
                      onChange={e => setNewImg({ ...newImg, year: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-orange-500 outline-none"
                    >
                      {['2025', '2024', '2023', '2022', '2021', '2020'].map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1 block">Kategorija</label>
                    <select
                      value={newImg.category}
                      onChange={e => setNewImg({ ...newImg, category: e.target.value })}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-orange-500 outline-none"
                    >
                      <option value="Training">Training</option>
                      <option value="Games">Games</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all mt-4 border border-white/20 shadow-lg">
                  OBJAVI SLIKU
                </button>
              </form>
            </div>

            {/* PREGLED POSTOJEĆIH */}
            <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-xl blur-texture">
              <h3 className="text-xl font-oswald font-black text-white uppercase mb-6">BRISANJE SLIKA</h3>
              <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {images.map(img => (
                  <div key={img.id} className="flex gap-4 p-3 bg-black border border-white/10 rounded-xl items-center">
                    <img src={img.url} alt="" className="w-12 h-12 rounded object-cover border border-white/10" />
                    <div className="flex-grow min-w-0">
                      <h4 className="text-white font-bold truncate text-xs uppercase tracking-tight">{img.title}</h4>
                      <p className="text-zinc-500 text-[8px] uppercase font-black">{img.year}</p>
                    </div>
                    <button onClick={() => { if (confirm('Obrisati?')) onDelete(img.id) }} className="text-red-500 hover:text-red-400 p-2"><i className="fas fa-trash"></i></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SEKCIJA 2: HOME SETTINGS */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-8 rounded-2xl border border-white/10 shadow-xl blur-texture">
              <h3 className="text-xl font-oswald font-black text-white uppercase mb-6 flex items-center">
                <i className="fas fa-home text-orange-500 mr-3"></i> HOME PAGE SLIKE (CMS)
              </h3>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6">Promijenite linkove za ključne slike na početnoj strani</p>

              <form onSubmit={handleUpdateHome} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Logo URL</label>
                  <input
                    value={tempSettings.logoUrl}
                    onChange={e => setTempSettings({ ...tempSettings, logoUrl: e.target.value })}
                    type="text"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-orange-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Hero Background</label>
                  <input
                    value={tempSettings.heroImage}
                    onChange={e => setTempSettings({ ...tempSettings, heroImage: e.target.value })}
                    type="text"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-orange-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Scholarship Image</label>
                  <input
                    value={tempSettings.scholarshipImage}
                    onChange={e => setTempSettings({ ...tempSettings, scholarshipImage: e.target.value })}
                    type="text"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:border-orange-500 outline-none"
                  />
                </div>
                <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all mt-4 border border-white/10 shadow-lg">
                  SAČUVAJ IZMJENE
                </button>
              </form>
            </div>

            <div className="p-6 bg-zinc-900 border border-orange-600/20 rounded-2xl blur-texture">
              <h4 className="text-white font-oswald font-black uppercase mb-3 text-sm">Brzi Info</h4>
              <ul className="text-zinc-500 text-[10px] font-bold space-y-2 uppercase tracking-wider">
                <li><i className="fas fa-link text-orange-500 mr-2"></i> Koristite direktne linkove na slike</li>
                <li><i className="fas fa-save text-orange-500 mr-2"></i> Podaci se čuvaju u browseru (Local Storage)</li>
                <li><i className="fas fa-map-marker-alt text-orange-500 mr-2"></i> Mapa je fiksna za Bayrampaša lokaciju</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPage;
