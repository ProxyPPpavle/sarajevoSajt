
export type Language = 'EN' | 'TR' | 'BA';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  year: string;
  category: string;
}

export interface HomeSettings {
  heroImage: string;
  aboutImage: string;
  scholarshipImage: string;
  locationImage: string;
  logoUrl: string;
}

export interface AppContent {
  nav: {
    home: string;
    about: string;
    camps: string;
    scholarship: string;
    gallery: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  stats: {
    yearsLabel: string;
    campsLabel: string;
    playersLabel: string;
  };
  about: {
    title: string;
    text: string;
  };
}
