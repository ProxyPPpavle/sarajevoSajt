
// Mock helper instead of real Supabase for now
export const uploadFile = async (file: File) => {
    console.log('Mock upload:', file.name);
    alert('Supabase nije konfigurisan. Slika će se koristiti kao lokalni URL (blob) samo u ovoj sesiji.');
    return URL.createObjectURL(file);
};

export const supabase = null;
