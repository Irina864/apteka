'use client';
import { addFilter, IFilterItem, removeFilter } from '@/store/filterSlice';
import { useEffect, useState } from 'react';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider/PriceRangeSlider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface IPriceRange {
  price_min: number;
  price_max: number;
}
interface IFilterItemPriceProps {
  filter: IFilterItem;
}

const FilterItemPrice: React.FC<IFilterItemPriceProps> = ({ filter }) => {
  const dispatch = useAppDispatch();
  const [isOpenFilterItem, setIsOpenFilterItem] = useState<boolean>(true);
  const filterList = useAppSelector((state) => state.filter.filterList);
  const [priceRange, setPriceRange] = useState<IPriceRange>({
    price_min: Number(filter.items[0]),
    price_max: Number(filter.items[filter.items.length - 1]),
  });

  const [minPriceInput, setMinPriceInput] = useState<string | number>(
    priceRange.price_min
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string | number>(
    priceRange.price_max
  );

  useEffect(() => {
    setMinPriceInput(priceRange.price_min);
    setMaxPriceInput(priceRange.price_max);
  }, [priceRange]);

  useEffect(() => {
    if (!filterList.find((item) => item.id === 'price_min')) {
      setMinPriceInput(priceRange.price_min);
    }
    if (!filterList.find((item) => item.id === 'price_max')) {
      setMaxPriceInput(priceRange.price_max);
    }
  }, [filterList]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setMinPriceInput('');
      return;
    }

    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    setMinPriceInput(numValue);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setMaxPriceInput('');
      return;
    }

    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    setMaxPriceInput(numValue);
  };

  const updateMinPriceFilter = (value: number) => {
    if (value > priceRange.price_min) {
      dispatch(
        addFilter({
          filter: {
            id: 'price_min',
            field: 'price_min',
            value: `от ${value} р.`,
          },
        })
      );
    } else {
      dispatch(removeFilter({ filter: 'price_min' }));
    }
  };

  const updateMaxPriceFilter = (value: number) => {
    if (value < priceRange.price_max) {
      dispatch(
        addFilter({
          filter: {
            id: 'price_max',
            field: 'price_max',
            value: `до ${value} р.`,
          },
        })
      );
    } else {
      dispatch(removeFilter({ filter: 'price_max' }));
    }
  };

  const handleMinPriceBlur = () => {
    let validatedValue: number;

    if (typeof minPriceInput === 'string' && minPriceInput === '') {
      validatedValue = priceRange.price_min;
    } else {
      const numValue = Number(minPriceInput);
      validatedValue = Math.max(
        priceRange.price_min,
        Math.min(numValue, Number(maxPriceInput) - 1)
      );
    }

    setMinPriceInput(validatedValue);
    updateMinPriceFilter(validatedValue);
  };

  const handleMaxPriceBlur = () => {
    let validatedValue: number;

    if (typeof maxPriceInput === 'string' && maxPriceInput === '') {
      validatedValue = priceRange.price_max;
    } else {
      const numValue = Number(maxPriceInput);
      validatedValue = Math.min(
        priceRange.price_max,
        Math.max(numValue, Number(minPriceInput) + 1)
      );
    }

    setMaxPriceInput(validatedValue);
    updateMaxPriceFilter(validatedValue);
  };

  const handleSliderMinChange = (newMinValue: number) => {
    setMinPriceInput(newMinValue);
    updateMinPriceFilter(newMinValue);
  };

  const handleSliderMaxChange = (newMaxValue: number) => {
    setMaxPriceInput(newMaxValue);
    updateMaxPriceFilter(newMaxValue);
  };
  return (
    <div className="h-fit">
      <button
        type="button"
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => {
          setIsOpenFilterItem(!isOpenFilterItem);
        }}
      >
        <label className="text-[14px] font-semibold leading-[130%]">
          {filter.title}
        </label>
        <div className="flex justify-between items-center">
          <img
            src="/arrow.svg"
            alt="toggle"
            className={`block transition ${
              isOpenFilterItem ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </div>
      </button>
      {isOpenFilterItem && (
        <div className="my-4 overflow-y-auto max-h-44 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <input
              className="w-full rounded-lg bg-indigo-100 outline-none py-2 px-5"
              type="number"
              name="price_min_input"
              value={minPriceInput}
              onChange={handleMinPriceChange}
              onBlur={handleMinPriceBlur}
              min={priceRange.price_min}
              max={priceRange.price_max}
              id={`filter-item-price_min_input`}
              placeholder={`от ${priceRange.price_min}`}
            />
            <input
              className="w-full rounded-lg bg-indigo-100 outline-none py-2 px-5"
              type="number"
              name="price_max_input"
              value={maxPriceInput}
              onChange={handleMaxPriceChange}
              onBlur={handleMaxPriceBlur}
              min={priceRange.price_min}
              max={priceRange.price_max}
              id={`filter-item-price_max_input`}
              placeholder={`до ${priceRange.price_max}`}
            />
          </div>
          <PriceRangeSlider
            minPrice={priceRange.price_min}
            maxPrice={priceRange.price_max}
            minValue={Number(minPriceInput)}
            maxValue={Number(maxPriceInput)}
            onMinChange={handleSliderMinChange}
            onMaxChange={handleSliderMaxChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterItemPrice;
