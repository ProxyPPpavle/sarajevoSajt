
import React from 'react';
import { Language } from '../types';
import { CONTENT } from '../constants';

interface StatsProps {
  lang: Language;
}

const Stats: React.FC<StatsProps> = ({ lang }) => {
  const c = CONTENT[lang].stats;

  const statsData = [
    { value: '12', label: c.yearsLabel, icon: 'fa-calendar-check' },
    { value: '22', label: c.campsLabel, icon: 'fa-trophy' },
    { value: '7000', label: c.playersLabel, icon: 'fa-users' },
  ];

  return (
    <section className="bg-zinc-900 py-12 lg:py-20 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center">
          {statsData.map((stat, idx) => (
            <div key={idx} className="reveal group cursor-default">
              <div className="mb-3 lg:mb-4 inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-orange-600/10 text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                <i className={`fas ${stat.icon} text-xl lg:text-3xl`}></i>
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-oswald font-bold text-white mb-1">
                {stat.value}<span className="text-orange-500">+</span>
              </h3>
              <p className="text-zinc-500 uppercase tracking-widest font-bold text-[9px] lg:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
