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
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-blue-900 via-sky-800 to-indigo-900 text-white flex flex-col items-center justify-center p-8">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light tracking-widest uppercase opacity-80 mb-2">Current Weather</h2>
          <h1 className="text-6xl font-serif font-bold">Christchurch, NZ</h1>
        </div>

        {/* Main Display */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-16 mb-16">
          <div className="scale-150 p-10">
             <WeatherIcon condition={current.condition} size="xl" />
          </div>
          
          <div className="flex flex-col items-start glass-panel p-8 rounded-3xl backdrop-blur-md bg-white/5 border border-white/10">
            <span className="text-9xl font-bold tracking-tighter drop-shadow-lg">
              {current.temp}°
            </span>
            <span className="text-4xl font-light capitalize text-sky-200 mt-2">
              {current.condition.replace('-', ' ')}
            </span>
            <div className="flex gap-6 mt-6 text-sm font-semibold opacity-70">
              <span>H: {current.temp + 2}°</span>
              <span>L: {current.temp - 4}°</span>
              <span>Wind: 12km/h NE</span>
            </div>
          </div>
        </div>

        {/* 7 Day Forecast Grid */}
        <div className="grid grid-cols-6 gap-4 w-full">
          {forecast.slice(1).map((day, idx) => (
            <div key={idx} className="flex flex-col items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg hover:bg-white/10 transition-colors">
              <span className="text-lg font-bold tracking-wide">{day.day}</span>
              <div className="my-4 transform scale-75">
                <WeatherIcon condition={day.condition} size="sm" />
              </div>
              <span className="text-2xl font-bold">{day.temp}°</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default WeatherView;
