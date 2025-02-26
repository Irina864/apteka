import React, { useState, useCallback, useEffect } from 'react';

interface PriceRangeProps {
  min: number;
  max: number;
  onChange?: (values: { min: number; max: number }) => void;
}

const PriceRangeSlider: React.FC<PriceRangeProps> = ({
  min,
  max,
  onChange,
}) => {
  const [range, setRange] = useState({ min, max });
  console.log(range);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getValue = (percentage: number) => {
    return Math.round(((max - min) * percentage) / 100 + min);
  };

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return;

      const slider = document.getElementById('price-range-track');
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      let percentage = ((event.clientX - rect.left) / rect.width) * 100;

      percentage = Math.min(100, Math.max(0, percentage));

      const value = getValue(percentage);

      setRange((prev) => {
        if (isDragging === 'min') {
          const newMin = Math.min(value, prev.max - 1);
          return { ...prev, min: newMin };
        } else {
          const newMax = Math.max(value, prev.min + 1);
          return { ...prev, max: newMax };
        }
      });
    },
    [isDragging, min, max]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMove, handleMouseUp]);

  useEffect(() => {
    onChange?.(range);
  }, [range, onChange]);

  return (
    <div className="w-full max-w-2xl px-4 py-8">
      <div id="price-range-track" className="relative h-2 w-full">
        <div className="absolute h-full w-full bg-blue-200 rounded-full" />

        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: `${getPercentage(range.min)}%`,
            right: `${100 - getPercentage(range.max)}%`,
          }}
        />

        <button
          className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${getPercentage(range.min)}%` }}
          onMouseDown={() => setIsDragging('min')}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={range.max}
          aria-valuenow={range.min}
        />

        <button
          className="absolute w-6 h-6 bg-white border-2 border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 -translate-x-1/2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${getPercentage(range.max)}%` }}
          onMouseDown={() => setIsDragging('max')}
          role="slider"
          aria-valuemin={range.min}
          aria-valuemax={max}
          aria-valuenow={range.max}
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;
