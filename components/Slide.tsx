import React from 'react';
import { SlideData } from '../types';

interface Props {
  data: SlideData;
}

const Slide: React.FC<Props> = ({ data }) => {
  return (
    <div className="relative w-full h-full overflow-hidden font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="w-full h-full object-cover transition-transform duration-[30000ms] ease-linear transform scale-100 hover:scale-110 animate-subtle-zoom" 
          style={{ animation: 'subtleZoom 35s linear infinite alternate' }}
        />
        {/* Stronger overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60"></div>
      </div>

      <style>{`
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(255,255,255,0.4);
        }
        .box-glow {
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1);
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(245,158,11,0.4); }
          50% { box-shadow: 0 0 70px rgba(245,158,11,0.8); }
        }
      `}</style>

      {/* Content Container - Centered */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-8 md:p-16 max-w-[90%] mx-auto text-center space-y-12">
        
        {/* Day Tag with Glow */}
        <div className="animate-slide-down">
            <span 
              className="px-10 py-4 rounded-full text-4xl font-black uppercase tracking-[0.2em] border-2 border-white/40 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              style={{ 
                backgroundColor: `${data.highlightColor}40`, // 25% opacity
                borderColor: data.highlightColor,
                color: '#fff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                boxShadow: `0 0 30px ${data.highlightColor}60`
              }}
            >
              {data.day || 'Special Event'}
            </span>
        </div>

        {/* Main Text Content */}
        <div className="flex flex-col items-center space-y-8 animate-fade-in-up">
          <h1 className="text-7xl md:text-9xl font-serif font-black leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] text-glow tracking-wide">
            {data.title}
          </h1>
          
          <div className="h-2 w-48 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.8)]" style={{ backgroundColor: data.highlightColor || '#f59e0b' }}></div>

          <p className="text-3xl md:text-4xl text-gray-100 font-bold leading-relaxed max-w-6xl drop-shadow-lg opacity-90">
            {data.description}
          </p>

          {/* Price Box with Strong Glow */}
          {data.price && (
            <div className="mt-12 animate-pop-in">
              <div 
                className="relative group rounded-3xl p-[3px] bg-gradient-to-br from-white/80 to-amber-500/50 overflow-hidden"
                style={{ 
                   animation: 'pulse-glow 3s infinite',
                   boxShadow: `0 0 60px ${data.highlightColor || '#f59e0b'}80`
                }}
              >
                 <div className="absolute inset-0 bg-white/20 blur-xl"></div>
                 <div 
                    className="relative px-16 py-8 rounded-[21px] backdrop-blur-xl bg-black/50 border border-white/30 flex flex-col items-center justify-center shadow-inner"
                 >
                   <span 
                    className="text-7xl md:text-8xl font-black text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)]"
                    style={{ fontFamily: "'Roboto', sans-serif" }}
                   >
                     {data.price}
                   </span>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slide;