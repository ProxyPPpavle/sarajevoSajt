
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';
import { Language, GalleryImage, HomeSettings } from './types';
import { INITIAL_GALLERY } from './constants';

const DEFAULT_HOME_SETTINGS: HomeSettings = {
  heroImage: '/heroSlika.jpg',
  aboutImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000',
  scholarshipImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1000',
  locationImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200',
  logoUrl: '/logo.png'
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('BA');
  const [images, setImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('tbc_gallery_v2');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [homeSettings, setHomeSettings] = useState<HomeSettings>(() => {
    const saved = localStorage.getItem('tbc_home_settings_v2');
    return saved ? JSON.parse(saved) : DEFAULT_HOME_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('tbc_gallery_v2', JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem('tbc_home_settings_v2', JSON.stringify(homeSettings));
  }, [homeSettings]);

  const addImage = (img: Omit<GalleryImage, 'id'>) => {
    const newImg = { ...img, id: Math.random().toString(36).substr(2, 9) };
    setImages(prev => [newImg, ...prev]);
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const updateHomeSettings = (newSettings: HomeSettings) => {
    setHomeSettings(newSettings);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header currentLang={lang} setLang={setLang} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home lang={lang} images={images} settings={homeSettings} />} />
            <Route path="/gallery" element={<GalleryPage lang={lang} images={images} />} />
            <Route path="/admin-secret-access" element={<AdminPage images={images} onAdd={addImage} onDelete={deleteImage} settings={homeSettings} onUpdateSettings={updateHomeSettings} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
