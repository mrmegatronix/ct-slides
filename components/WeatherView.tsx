import React, { useMemo } from 'react';
import { GlassSun, GlassCloud, GlassRain, GlassPartlyCloudy } from './GlassIcons';
import { WeatherForecast } from '../types';

// Mock Data Generator for Christchurch
const getMockForecast = (): WeatherForecast[] => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  
  const forecasts: WeatherForecast[] = [];
  
  for (let i = 0; i < 7; i++) {
    const dayIndex = (today + i) % 7;
    // Simulate typical NZ weather variation
    const r = Math.random();
    let condition: WeatherForecast['condition'] = 'sunny';
    if (r > 0.8) condition = 'rain';
    else if (r > 0.6) condition = 'cloudy';
    else if (r > 0.4) condition = 'partly-cloudy';

    forecasts.push({
      day: i === 0 ? 'Today' : days[dayIndex],
      temp: Math.floor(Math.random() * (24 - 14) + 14), // 14-24 degrees C
      condition
    });
  }
  return forecasts;
};

const WeatherIcon: React.FC<{ condition: string; size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ condition, size }) => {
  switch (condition) {
    case 'rain': return <GlassRain size={size} />;
    case 'cloudy': return <GlassCloud size={size} />;
    case 'partly-cloudy': return <GlassPartlyCloudy size={size} />;
    default: return <GlassSun size={size} />;
  }
};

const WeatherView: React.FC = () => {
  const forecast = useMemo(() => getMockForecast(), []);
  const current = forecast[0];

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white flex flex-col items-center justify-center p-8">
      
      {/* Subtle Background Textures */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Deep Glows */}
      <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[10%] w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[150px]"></div>

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-10 pt-8">
          <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-blue-200/60 mb-3">Live Weather</h2>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-xl">
            Christchurch
          </h1>
        </div>

        {/* Main Display */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 mb-12">
          
          {/* Main Icon - Increased Size */}
          <div className="scale-125 md:scale-150 p-4 drop-shadow-2xl">
             <WeatherIcon condition={current.condition} size="xl" />
          </div>
          
          {/* Main Temp Box */}
          <div className="flex flex-col items-start p-10 rounded-[3rem] backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)] min-w-[300px]">
            <span className="text-9xl font-black tracking-tighter drop-shadow-lg text-white">
              {current.temp}°
            </span>
            <span className="text-4xl font-light capitalize text-blue-100/80 mt-2 tracking-wide">
              {current.condition.replace('-', ' ')}
            </span>
            <div className="w-full h-px bg-white/20 my-6"></div>
            <div className="flex w-full justify-between text-lg font-medium text-blue-200/70">
              <div className="flex flex-col">
                 <span className="text-xs uppercase tracking-widest opacity-60">High</span>
                 <span>{current.temp + 2}°</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs uppercase tracking-widest opacity-60">Low</span>
                 <span>{current.temp - 4}°</span>
              </div>
              <div className="flex flex-col text-right">
                 <span className="text-xs uppercase tracking-widest opacity-60">Wind</span>
                 <span>12<span className="text-xs">km/h</span></span>
              </div>
            </div>
          </div>
        </div>

        {/* 7 Day Forecast Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 w-full">
          {forecast.slice(1).map((day, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center justify-between p-4 py-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md shadow-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-lg font-semibold tracking-wide text-blue-100/90 group-hover:text-white">{day.day}</span>
              <div className="my-6 transform scale-90 group-hover:scale-110 transition-transform duration-500">
                <WeatherIcon condition={day.condition} size="sm" />
              </div>
              <span className="text-3xl font-bold text-white/90 group-hover:text-white">{day.temp}°</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WeatherView;