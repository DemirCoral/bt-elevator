'use client';

import { useTranslations } from 'next-intl';

interface Floor {
  number: number;
  isSelected: boolean;
  isCalled: boolean;
}

interface ElevatorControlsProps {
  floors: Floor[];
  currentFloor: number;
  onFloorSelect: (floorNumber: number) => void;
  isMoving: boolean;
  isDoorOpen: boolean;
}

export default function ElevatorControls({
  floors,
  currentFloor,
  onFloorSelect,
  isMoving,
  isDoorOpen,
}: ElevatorControlsProps) {
  const t = useTranslations('Elevator');

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-6 text-gray-800">{t('elevatorControls')}</h3>
      <div className="grid grid-cols-5 gap-3">
        {[...floors].reverse().map((floor) => (
          <button
            key={floor.number}
            onClick={() => onFloorSelect(floor.number)}
            disabled={isMoving || isDoorOpen || floor.isSelected}
            className={`aspect-square rounded-xl font-bold text-lg shadow-sm transition-all duration-200 ${
              floor.isSelected
                ? 'bg-green-500 text-white shadow-green-200'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200 disabled:bg-gray-300 disabled:shadow-none'
            }`}
          >
            {floor.number}
          </button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <div className="inline-block bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-lg font-semibold text-gray-700">
            {t('currentFloor', { number: currentFloor })}
          </span>
        </div>
      </div>
    </div>
  );
} 