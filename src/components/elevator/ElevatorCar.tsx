'use client';

import { useTranslations } from 'next-intl';

interface ElevatorCarProps {
  currentFloor: number;
  isMoving: boolean;
  direction: 'up' | 'down' | null;
  isDoorOpen: boolean;
}

export default function ElevatorCar({
  currentFloor,
  isMoving,
  direction,
  isDoorOpen,
}: ElevatorCarProps) {
  const t = useTranslations('Elevator');

  return (
    <div className="relative w-full h-full">
      {/* Building Shaft */}
      <div className="absolute inset-0 bg-gray-100">
        {/* Floor Lines */}
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-gray-300"
            style={{ top: `${(i + 1) * 10}%` }}
          />
        ))}
      </div>

      {/* Elevator Car */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-40 h-32 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg shadow-2xl transition-all duration-1000 border-2 border-gray-600"
        style={{
          bottom: `${currentFloor * 10}%`,
          transform: `translateX(-50%) translateY(0)`,
        }}
      >
        {/* Door Frame */}
        <div className="absolute inset-0 bg-gray-600 rounded-lg opacity-20" />

        {/* Door */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg transition-transform duration-500 ${
            isDoorOpen ? 'translate-x-1/2' : 'translate-x-0'
          }`}
        >
          {/* Door Handle */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-gray-400 rounded-full" />
          
          {/* Door Panel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-500" />
          </div>
        </div>

        {/* Floor Display */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1.5 rounded-lg text-lg font-mono border-2 border-gray-600 shadow-lg">
          {currentFloor}
        </div>

        {/* Direction Indicator */}
        {direction && (
          <div className="absolute -top-10 right-4 text-white text-xl font-bold">
            {direction === 'up' ? '↑' : '↓'}
          </div>
        )}

        {/* Elevator Interior */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-500" />
        </div>
      </div>
    </div>
  );
} 