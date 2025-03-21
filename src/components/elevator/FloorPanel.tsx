'use client';

import { useTranslations } from 'next-intl';

interface Floor {
  number: number;
  isSelected: boolean;
  isCalled: boolean;
}

interface FloorPanelProps {
  floors: Floor[];
  currentFloor: number;
  onFloorCall: (floorNumber: number) => void;
  isMoving: boolean;
  isDoorOpen: boolean;
}

export default function FloorPanel({
  floors,
  currentFloor,
  onFloorCall,
  isMoving,
  isDoorOpen,
}: FloorPanelProps) {
  const t = useTranslations('Elevator');

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
      <h3 className="text-xl font-bold mb-6 text-gray-800">{t('floorPanel')}</h3>
      <div className="space-y-3">
        {[...floors].reverse().map((floor) => (
          <div
            key={floor.number}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-700">{t('floor', { number: floor.number })}</span>
            <button
              onClick={() => onFloorCall(floor.number)}
              disabled={isMoving || isDoorOpen || floor.isCalled}
              className={`px-6 py-2 rounded-lg font-medium shadow-sm transition-all duration-200 ${
                floor.isCalled
                  ? 'bg-green-500 text-white shadow-green-200'
                  : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-200 disabled:bg-gray-300 disabled:shadow-none'
              }`}
            >
              {floor.isCalled ? t('called') : t('call')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 