import React, { useState, useEffect } from 'react';

interface IPriceRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const PriceRangeSlider: React.FC<IPriceRangeSliderProps> = ({
  minPrice,
  maxPrice,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}) => {
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const getMinPercentage = () => {
    return ((minValue - minPrice) / (maxPrice - minPrice)) * 100;
  };

  const getMaxPercentage = () => {
    return ((maxValue - minPrice) / (maxPrice - minPrice)) * 100;
  };

  const handleThumbMouseDown = (thumbType: 'min' | 'max') => {
    setIsDragging(thumbType);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const sliderTrack = e.currentTarget;
    const rect = sliderTrack.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );

    const newValue = Math.round(
      (percentage * (maxPrice - minPrice)) / 100 + minPrice
    );

    if (isDragging === 'min') {
      const validatedValue = Math.max(
        minPrice,
        Math.min(newValue, maxValue - 1)
      );
      onMinChange(validatedValue);
    } else {
      const validatedValue = Math.min(
        maxPrice,
        Math.max(newValue, minValue + 1)
      );
      onMaxChange(validatedValue);
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        const sliderTrack = document.getElementById('slider-track');
        if (!sliderTrack) return;

        const rect = sliderTrack.getBoundingClientRect();
        const percentage = Math.max(
          0,
          Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
        );

        const newValue = Math.round(
          (percentage * (maxPrice - minPrice)) / 100 + minPrice
        );

        if (isDragging === 'min') {
          const validatedValue = Math.max(
            minPrice,
            Math.min(newValue, maxValue - 1)
          );
          onMinChange(validatedValue);
        } else {
          const validatedValue = Math.min(
            maxPrice,
            Math.max(newValue, minValue + 1)
          );
          onMaxChange(validatedValue);
        }
      };

      const handleGlobalMouseUp = () => {
        setIsDragging(null);
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [
    isDragging,
    minValue,
    maxValue,
    minPrice,
    maxPrice,
    onMinChange,
    onMaxChange,
  ]);

  return (
    <div className="relative h-10 ">
      <div
        id="slider-track"
        className="absolute top-1/2 left-4 w-11/12 h-1 bg-gray-300 rounded transform -translate-y-1/2 "
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickPos = ((e.clientX - rect.left) / rect.width) * 100;
          const minPos = getMinPercentage();
          const maxPos = getMaxPercentage();

          if (Math.abs(clickPos - minPos) <= Math.abs(clickPos - maxPos)) {
            setIsDragging('min');
          } else {
            setIsDragging('max');
          }

          handleMouseMove(e);
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="absolute h-full bg-blue-500 rounded"
          style={{
            left: `${getMinPercentage()}%`,
            width: `${getMaxPercentage() - getMinPercentage()}%`,
          }}
        ></div>

        <div
          className="absolute z-10 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${getMinPercentage()}%`,
            top: '50%',
            zIndex: isDragging === 'min' ? 2 : 1,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleThumbMouseDown('min');
          }}
        ></div>

        <div
          className="absolute z-10 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${getMaxPercentage()}%`,
            top: '50%',
            zIndex: isDragging === 'max' ? 2 : 1,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            handleThumbMouseDown('max');
          }}
        ></div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
