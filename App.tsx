import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Settings, Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { SlideData, SLIDE_DURATION_MS } from './types';
import { INITIAL_SLIDES } from './constants';
import Slide from './components/Slide';
import WeatherView from './components/WeatherView';
import AdminPanel from './components/AdminPanel';

// Key for LocalStorage
const STORAGE_KEY = 'restaurant_slides_v1';

const App: React.FC = () => {
  // --- State ---
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- Initialization ---
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSlides(parsed);
      } catch (e) {
        setSlides(INITIAL_SLIDES);
      }
    } else {
      setSlides(INITIAL_SLIDES);
    }
  }, []);

  // --- Derived State for Playlist ---
  const playlist = React.useMemo(() => {
    const weatherSlide: SlideData = {
      id: 'weather-special',
      type: 'weather',
      title: 'Weather',
      description: '',
      imageUrl: ''
    };
    if (slides.length === 0) return [weatherSlide];
    return [...slides, weatherSlide];
  }, [slides]);

  const currentSlide = playlist[currentIndex] || playlist[0];

  // --- Timer Logic ---
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [playlist.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [playlist.length]);

  useEffect(() => {
    if (!isPlaying || isAdminOpen) return;

    const step = 100; // Update every 100ms
    startTimeRef.current = Date.now() - (progress / 100) * SLIDE_DURATION_MS;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      const newProgress = (elapsed / SLIDE_DURATION_MS) * 100;

      if (newProgress >= 100) {
        nextSlide();
      } else {
        setProgress(newProgress);
      }
    }, step);

    return () => clearInterval(interval);
  }, [isPlaying, isAdminOpen, nextSlide, progress]);

  // --- Handlers ---
  const handleAdminSave = (newSlides: SlideData[]) => {
    setSlides(newSlides);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSlides));
  };

  if (!currentSlide) return <div className="bg-black h-screen w-screen text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden group font-sans">
      
      {/* --- Main Content Area --- */}
      <div className="w-full h-full">
        {currentSlide.type === 'weather' ? (
          <WeatherView />
        ) : (
          <Slide key={currentSlide.id} data={currentSlide} />
        )}
      </div>

      {/* --- Overlay Logo (Top Left) --- */}
      <div className="absolute top-8 left-8 z-[60] pointer-events-none">
        <img 
          src="https://coasterstavern.co.nz/wp-content/uploads/2021/04/Coasters-Logo-Transparency.png" 
          onError={(e) => {
            // Fallback to local image if remote fails
            e.currentTarget.src = 'images/logo.png';
            e.currentTarget.onerror = null; // Prevent infinite loop
          }}
          alt="Coasters Tavern" 
          className="w-48 h-48 object-contain drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
        />
      </div>

      {/* --- Progress Bar (Gold & Glowing) --- */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-black/60 z-40 backdrop-blur-sm border-t border-white/10">
        <div 
          className="h-full bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 shadow-[0_0_25px_rgba(251,191,36,0.8)] transition-all duration-100 ease-linear relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect on bar */}
          <div className="absolute inset-0 bg-white/20 skew-x-12 translate-x-[-100%] animate-shimmer" style={{ animation: 'shimmer 2s infinite' }}></div>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%) skewX(12deg); }
        }
      `}</style>

      {/* --- Controls Overlay (Top Right) --- */}
      <div className="absolute top-8 right-8 z-50 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-2xl">
        <button onClick={prevSlide} className="p-4 bg-white/10 hover:bg-amber-600 rounded-full text-white transition-all">
          <SkipBack className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => setIsPlaying(!isPlaying)} 
          className="p-4 bg-white/10 hover:bg-amber-600 rounded-full text-white transition-all"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        
        <button onClick={nextSlide} className="p-4 bg-white/10 hover:bg-amber-600 rounded-full text-white transition-all">
          <SkipForward className="w-6 h-6" />
        </button>

        <div className="w-px h-8 bg-white/20 mx-2"></div>

        <button 
          onClick={() => setIsAdminOpen(true)}
          className="p-4 bg-white/10 hover:bg-blue-600 rounded-full text-white transition-all"
          title="Admin Settings"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* --- Admin Modal --- */}
      {isAdminOpen && (
        <AdminPanel 
          slides={slides} 
          onSave={handleAdminSave} 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}

    </div>
  );
};

export default App;