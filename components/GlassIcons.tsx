import React from 'react';

interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Updated Glass Style: Cleaner, sharper, deeper
const glassStyle = "backdrop-blur-xl bg-gradient-to-br from-white/40 to-white/10 border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]";

export const GlassSun: React.FC<IconProps> = ({ size = 'lg' }) => {
  const dim = size === 'xl' ? 'w-56 h-56' : size === 'lg' ? 'w-40 h-40' : 'w-20 h-20';
  
  return (
    <div className={`relative ${dim} flex items-center justify-center`}>
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
      
      {/* Rays */}
      <div className={`absolute inset-0 rounded-full border-[6px] border-dashed border-yellow-200/40 animate-spin-slow`} />
      
      {/* Core Sun */}
      <div className={`w-3/5 h-3/5 rounded-full bg-gradient-to-tr from-amber-300 to-orange-500 shadow-[0_0_50px_rgba(245,158,11,0.5)] animate-float border border-white/30 flex items-center justify-center relative overflow-hidden`}>
        {/* Shine */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white/20 rotate-45 transform translate-y-full"></div>
        <div className="absolute top-2 right-4 w-4 h-4 rounded-full bg-white/50 blur-[2px]"></div>
      </div>
    </div>
  );
};

export const GlassCloud: React.FC<IconProps> = ({ size = 'lg' }) => {
  const dim = size === 'xl' ? 'w-56 h-56' : size === 'lg' ? 'w-40 h-40' : 'w-20 h-20';
  
  return (
    <div className={`relative ${dim} flex items-center justify-center animate-float`}>
       {/* Shadow Blob */}
       <div className="absolute bottom-4 w-3/4 h-8 bg-black/20 blur-xl rounded-full"></div>

       {/* Cloud Parts - Using Glass Morphism */}
      <div className={`absolute w-[70%] h-[45%] bottom-[20%] rounded-[40px] ${glassStyle} z-20`} />
      <div className={`absolute w-[45%] h-[45%] top-[15%] left-[15%] rounded-full ${glassStyle} z-10`} />
      <div className={`absolute w-[40%] h-[40%] top-[20%] right-[15%] rounded-full ${glassStyle} z-10`} />
      
      {/* Highlights */}
      <div className="absolute w-[60%] h-[20%] bottom-[30%] left-[20%] bg-white/10 rounded-full blur-md z-30"></div>
    </div>
  );
};

export const GlassRain: React.FC<IconProps> = ({ size = 'lg' }) => {
  const dim = size === 'xl' ? 'w-56 h-56' : size === 'lg' ? 'w-40 h-40' : 'w-20 h-20';
  
  return (
    <div className={`relative ${dim} flex items-center justify-center`}>
      {/* Cloud Base */}
      <div className="absolute inset-0 z-20">
          <GlassCloud size={size} />
      </div>
      
      {/* Rain Drops - Blue/Cyan Gradients */}
      <div className="absolute -bottom-2 left-[35%] w-1.5 h-8 bg-gradient-to-b from-blue-300 to-cyan-500 rounded-full animate-rain z-10 shadow-[0_0_10px_rgba(6,182,212,0.6)]" style={{ animationDelay: '0.1s' }} />
      <div className="absolute -bottom-6 left-[50%] w-1.5 h-10 bg-gradient-to-b from-blue-300 to-cyan-500 rounded-full animate-rain z-10 shadow-[0_0_10px_rgba(6,182,212,0.6)]" style={{ animationDelay: '0.3s' }} />
      <div className="absolute -bottom-4 right-[35%] w-1.5 h-7 bg-gradient-to-b from-blue-300 to-cyan-500 rounded-full animate-rain z-10 shadow-[0_0_10px_rgba(6,182,212,0.6)]" style={{ animationDelay: '0.5s' }} />

      <style>{`
        @keyframes rain {
          0% { transform: translateY(-10px); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(40px); opacity: 0; }
        }
        .animate-rain {
          animation: rain 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export const GlassPartlyCloudy: React.FC<IconProps> = ({ size = 'lg' }) => {
  const dim = size === 'xl' ? 'w-56 h-56' : size === 'lg' ? 'w-40 h-40' : 'w-20 h-20';
  
  return (
    <div className={`relative ${dim} flex items-center justify-center`}>
      <div className="absolute top-[-10%] right-[-10%] z-0 transform scale-75">
        <GlassSun size={size} />
      </div>
      <div className="absolute bottom-0 left-0 z-10 transform scale-90">
        <GlassCloud size={size} />
      </div>
    </div>
  );
};