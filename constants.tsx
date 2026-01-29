
import { AppContent } from './types';

export const LANGUAGES = [
  { code: 'BA', name: 'Bosanski' },
  { code: 'EN', name: 'English' },
  { code: 'TR', name: 'Türkçe' }
] as const;

export const CONTENT: Record<string, AppContent> = {
  BA: {
    nav: {
      home: 'Početna',
      about: 'O nama',
      camps: 'Naši Kampovi',
      scholarship: 'Sportska stipendija za Ameriku',
      gallery: 'Galerija',
      contact: 'Kontakt'
    },
    hero: {
      title: 'UNAPRIJEDI SVOJU IGRU',
      subtitle: 'Pridruži se elitnom međunarodnom košarkaškom kampu i treniraj kao profesionalac.',
      cta: 'Prijavi se odmah'
    },
    stats: {
      yearsLabel: 'Godina uspjeha',
      campsLabel: 'Organizovanih kampova',
      playersLabel: 'Treniranih igrača'
    },
    about: {
      title: 'O nama',
      text: 'Košarkaški kamp je profesionalni program obuke koji podržava razvoj mladih sportista. Radimo sa međunarodnim trenerima i savremenim objektima.'
    }
  },
  EN: {
    nav: {
      home: 'Home',
      about: 'About Us',
      camps: 'Our Camps',
      scholarship: 'USA Sports Scholarship',
      gallery: 'Gallery',
      contact: 'Contact'
    },
    hero: {
      title: 'LEVEL UP YOUR GAME',
      subtitle: 'Join the elite international basketball camp and train like a pro.',
      cta: 'Join Now'
    },
    stats: {
      yearsLabel: 'Years of Success',
      campsLabel: 'Camps Organized',
      playersLabel: 'Players Trained'
    },
    about: {
      title: 'About Us',
      text: 'The Basketball Camp is a professional training program supporting the development of young athletes. We work with international coaches and modern facilities.'
    }
  },
  TR: {
    nav: {
      home: 'Anasayfa',
      about: 'Hakkımızda',
      camps: 'Kamplarımız',
      scholarship: 'ABD Spor Bursu',
      gallery: 'Galeri',
      contact: 'İletišim'
    },
    hero: {
      title: 'OYUNUNU HEMEN GELİŞTİR',
      subtitle: 'Sečkin uluslararası basketbol kampına katıl ve bir profesyonel gibi antrenman yap.',
      cta: 'Hemen Katıl'
    },
    stats: {
      yearsLabel: 'Yıllık Başarı',
      campsLabel: 'Düzenlenen Kamp',
      playersLabel: 'Eğitilen Oyuncu'
    },
    about: {
      title: 'Hakkımızda',
      text: 'Basketbol kampı, genč sporcuların gelişimini destekleyen profesyonel bir eğitim programıdır. Uluslararası antrenörler ve modern tesislerle čalışıyoruz.'
    }
  }
};

export const INITIAL_GALLERY: any[] = [
  { id: '1', url: '/2025Slika1.jpg', title: 'Summer Camp 2025', year: '2025', category: 'Training' },
  { id: '2', url: '/2025Slika2.jpg', title: 'Elite Training 2025', year: '2025', category: 'Training' },
  { id: '3', url: '/2025Slika3.jpg', title: 'Team 2025', year: '2025', category: 'Games' },
  { id: '4', url: '/2024Slika1.jpg', title: 'Summer Camp 2024', year: '2024', category: 'Event' },
  { id: '5', url: '/2024Slika2.jpg', title: 'Action 2024', year: '2024', category: 'Games' },
  { id: '6', url: '/2023Slika1.jpg', title: 'Camp 2023', year: '2023', category: 'Training' },
  { id: '7', url: '/2022Slika1.jpg', title: 'Camp 2022', year: '2022', category: 'Event' },
  { id: '8', url: '/2022Slika2.jpg', title: 'Training 2022', year: '2022', category: 'Training' },
  { id: '9', url: '/2020Slika1.jpg', title: 'Camp 2020 1', year: '2020', category: 'Games' },
  { id: '10', url: '/2020Slika2.jpg', title: 'Camp 2020 2', year: '2020', category: 'Event' },
  { id: '11', url: '/2020Slika3.jpg', title: 'Camp 2020 3', year: '2020', category: 'Training' },
  { id: '12', url: '/nepoznata.jpg', title: 'Gallery Image 1', year: 'ALL', category: 'ALL' },
  { id: '13', url: '/nepoznata1.jpg', title: 'Gallery Image 2', year: 'ALL', category: 'ALL' },
  { id: '14', url: '/nepznata2.jpg', title: 'Gallery Image 3', year: 'ALL', category: 'ALL' },
  { id: '15', url: '/nepoznata3.jpg', title: 'Gallery Image 4', year: 'ALL', category: 'ALL' },
  { id: '16', url: '/nepoznata4.jpg', title: 'Gallery Image 5', year: 'ALL', category: 'ALL' },
];
