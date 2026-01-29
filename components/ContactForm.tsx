
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const subject = encodeURIComponent(`TBC Upit: ${formData.name}`);
    const body = encodeURIComponent(`Ime: ${formData.name}\nEmail: ${formData.email}\n\nPoruka:\n${formData.message}`);
    
    setTimeout(() => {
      setStatus('success');
      window.location.href = `mailto:pavlemaster2@gmail.com?subject=${subject}&body=${body}`;
      setFormData(prev => ({ ...prev, message: '' }));
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-12 lg:py-20 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 text-center lg:text-left">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-oswald font-black uppercase mb-4 lg:mb-6 leading-none text-white">
                KONTAKTIRAJTE <br/><span className="text-orange-500">NAS</span>
              </h2>
              <p className="text-zinc-400 text-sm md:text-lg mb-8 lg:mb-10 max-w-md font-medium mx-auto lg:mx-0">
                Pronađite svoje mjesto u timu. Javite se direktno ili popunite formu ispod.
              </p>
              
              <div className="space-y-4 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center space-x-4 blur-texture p-4 lg:p-6 rounded-xl border border-white/10">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shrink-0">
                    <i className="fas fa-envelope text-sm lg:text-base"></i>
                  </div>
                  <div className="text-left">
                    <span className="text-zinc-500 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] block">Email Adresa</span>
                    <p className="text-white font-bold text-sm lg:text-lg select-all">pavlemaster2@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal stagger-1 mt-8 lg:mt-0">
              <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4 p-6 lg:p-8 bg-zinc-900/50 border border-white/10 shadow-2xl rounded-2xl text-left">
                <div className="space-y-1">
                  <label className="text-[8px] lg:text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Vaše Ime</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ime i prezime" 
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-orange-500 transition-all outline-none rounded-lg text-xs lg:text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] lg:text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Vaš Email</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@example.com" 
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-orange-500 transition-all outline-none rounded-lg text-xs lg:text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] lg:text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Poruka</label>
                  <textarea 
                    required 
                    rows={3} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Napišite nešto..." 
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-orange-500 transition-all outline-none resize-none rounded-lg text-xs lg:text-sm"
                  ></textarea>
                </div>
                <button 
                  disabled={status !== 'idle'}
                  className={`w-full py-3 lg:py-4 font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden flex items-center justify-center rounded-lg border border-white/10 text-[10px] lg:text-xs ${
                    status === 'success' ? 'bg-green-600 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white active:scale-[0.98]'
                  }`}
                >
                  {status === 'idle' && <>POŠALJI UPIT <i className="fas fa-chevron-right ml-2 lg:ml-3"></i></>}
                  {status === 'sending' && <i className="fas fa-circle-notch fa-spin"></i>}
                  {status === 'success' && <>POSLATO!</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
