
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const adminPass = process.env.ADMIN_PASSWORD || 'TBC-ADMIN-2025';
        if (pass === adminPass) {
            onLogin();
            localStorage.setItem('tbc_is_admin', 'true');
            navigate('/');
        } else {
            alert('Pogrešna lozinka!');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="absolute inset-0 z-0 opacity-20">
                <img src="/heroSlika.jpg" className="w-full h-full object-cover" alt="" />
            </div>
            <form onSubmit={handleLogin} className="relative z-10 w-full max-w-md bg-zinc-900/90 backdrop-blur-xl p-10 rounded-2xl border-2 border-orange-500/20 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 border-2 border-white/20 shadow-xl">
                        <i className="fas fa-lock text-3xl"></i>
                    </div>
                    <h1 className="text-3xl font-oswald font-black text-white uppercase tracking-tighter">Admin <span className="text-orange-500">Login</span></h1>
                    <p className="text-zinc-500 text-[10px] mt-2 font-black tracking-widest uppercase">Pristupite alatima za upravljanje</p>
                </div>
                <div className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Lozinka</label>
                        <input
                            autoFocus
                            type="password"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 text-white text-center focus:outline-none focus:border-orange-500 font-mono tracking-widest shadow-inner transition-all"
                        />
                    </div>
                    <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all border border-white/10 shadow-lg active:scale-95">
                        ULAZ NA SAJT KAO ADMIN
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
