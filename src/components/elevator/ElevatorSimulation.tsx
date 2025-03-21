'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ElevatorCar from './ElevatorCar';
import FloorPanel from './FloorPanel';
import ElevatorControls from './ElevatorControls';

interface Floor {
  number: number;
  isSelected: boolean;
  isCalled: boolean;
}

export default function ElevatorSimulation() {
  const t = useTranslations('Elevator');
  const [floors, setFloors] = useState<Floor[]>(
    Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      isSelected: false,
      isCalled: false,
    }))
  );
  const [currentFloor, setCurrentFloor] = useState(1);
  const [isMoving, setIsMoving] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const [selectedFloors, setSelectedFloors] = useState<number[]>([]);

  const playSound = useCallback((sound: string) => {
    const audio = new Audio(`/sounds/${sound}.mp3`);
    audio.play().catch(console.error);
  }, []);

  const handleFloorCall = useCallback((floorNumber: number) => {
    if (isMoving || isDoorOpen) return;
    
    setFloors(prev => 
      prev.map(floor => 
        floor.number === floorNumber 
          ? { ...floor, isCalled: true }
          : floor
      )
    );
    
    setSelectedFloors(prev => [...prev, floorNumber]);
    playSound('button-press');
  }, [isMoving, isDoorOpen, playSound]);

  const handleFloorSelect = useCallback((floorNumber: number) => {
    if (isMoving || isDoorOpen) return;
    
    setFloors(prev => 
      prev.map(floor => 
        floor.number === floorNumber 
          ? { ...floor, isSelected: true }
          : floor
      )
    );
    
    setSelectedFloors(prev => [...prev, floorNumber]);
    playSound('button-press');
  }, [isMoving, isDoorOpen, playSound]);

  const moveElevator = useCallback(() => {
    if (selectedFloors.length === 0) return;

    const nextFloor = selectedFloors[0];
    const newDirection = nextFloor > currentFloor ? 'up' : 'down';
    
    setDirection(newDirection);
    setIsMoving(true);
    playSound('elevator-moving');

    const moveInterval = setInterval(() => {
      setCurrentFloor(prev => {
        const newFloor = newDirection === 'up' ? prev + 1 : prev - 1;
        if (newFloor === nextFloor) {
          clearInterval(moveInterval);
          setIsMoving(false);
          setDirection(null);
          setIsDoorOpen(true);
          playSound('door-open');
          
          setTimeout(() => {
            setIsDoorOpen(false);
            playSound('door-close');
          }, 3000);

          setSelectedFloors(prev => prev.slice(1));
          setFloors(prev => 
            prev.map(floor => 
              floor.number === nextFloor 
                ? { ...floor, isSelected: false, isCalled: false }
                : floor
            )
          );
          return newFloor;
        }
        return newFloor;
      });
    }, 1000);
  }, [currentFloor, selectedFloors, playSound]);

  useEffect(() => {
    if (!isMoving && selectedFloors.length > 0) {
      moveElevator();
    }
  }, [isMoving, selectedFloors, moveElevator]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          {/* Building and Elevator Car */}
          <div className="relative w-full max-w-md h-[700px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <ElevatorCar
              currentFloor={currentFloor}
              isMoving={isMoving}
              direction={direction}
              isDoorOpen={isDoorOpen}
            />
          </div>

          {/* Controls Section */}
          <div className="flex flex-col gap-8 w-full max-w-md">
            {/* Floor Panel */}
            <FloorPanel
              floors={floors}
              currentFloor={currentFloor}
              onFloorCall={handleFloorCall}
              isMoving={isMoving}
              isDoorOpen={isDoorOpen}
            />

            {/* Elevator Controls */}
            <ElevatorControls
              floors={floors}
              currentFloor={currentFloor}
              onFloorSelect={handleFloorSelect}
              isMoving={isMoving}
              isDoorOpen={isDoorOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 