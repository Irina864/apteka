'use client';
import { SORTER_VALUES } from '@/constants';
import { ISorter } from '@/interfaces';
import { updateSorter } from '@/store/filterSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState, useEffect, useRef } from 'react';

const FormSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const sorterState: number = useAppSelector(
    (state) => state.filter.sorterState
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayedValue, setDisplayedValue] = useState<string>('');
  const selectWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    SORTER_VALUES.forEach((item: ISorter) => {
      if (item.id === sorterState) setDisplayedValue(item.value);
    });
  }, []);

  const handleChange = (selectedItem: ISorter) => {
    setDisplayedValue(selectedItem.value);
    dispatch(updateSorter({ sorter: selectedItem.id }));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectWrapperRef.current &&
        !selectWrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectWrapperRef]);

  return (
    <div
      ref={selectWrapperRef}
      className="flex items-center justify-center gap-1 bg-gray-300 rounded-md px-3 py-2 relative"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <div className="text-sm">{displayedValue}</div>
      {isOpen ? (
        <div className="w-52 flex flex-col gap-2 absolute top-14 -right-4  py-2 px-3 bg-white shadow-xl rounded-lg z-30">
          {SORTER_VALUES.map((item: ISorter, index: number) => (
            <div
              key={index}
              className="text-sm rounded-lg py-2 px-3 hover:bg-gray-200 hover:cursor-pointer"
              onClick={() => handleChange(item)}
            >
              {item.value}
            </div>
          ))}
        </div>
      ) : null}
      <div className={`${isOpen && 'transform rotate-180'}`}>
        <img src="/arrow.svg" alt="arrow" />
      </div>
    </div>
  );
};

export default FormSelect;
