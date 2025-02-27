'use client';
import { addFilter, IFilterItem, removeFilter } from '@/store/filterSlice';
import { useEffect, useState } from 'react';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider/PriceRangeSlider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface IPrice {
  price_min: number;
  price_max: number;
  price_min_input: number | string;
  price_max_input: number | string;
}
interface IFilterItemPriceProps {
  filter: IFilterItem;
}

const FilterItemPrice: React.FC<IFilterItemPriceProps> = ({ filter }) => {
  const dispatch = useAppDispatch();
  const filterList = useAppSelector((state) => state.filter.filterList);
  const priceMinObject = filterList.find((item) => item.id === 'price_min');
  const priceMaxObject = filterList.find((item) => item.id === 'price_max');
  const [isOpenFilterItem, setIsOpenFilterItem] = useState<boolean>(true);
  const [price, setPrice] = useState<IPrice>({
    price_min: Number(filter.items[0]),
    price_max: Number(filter.items[filter.items.length - 1]),
    price_min_input: priceMinObject ? String(priceMinObject.value) : '',
    price_max_input: priceMaxObject ? String(priceMaxObject.value) : '',
  });

  useEffect(() => {
    if (filter.items.length > 0) {
      const prices = filter.items.map(Number).filter((num) => !isNaN(num));
      if (prices.length > 0) {
        const newMin = Math.min(...prices);
        const newMax = Math.max(...prices);
        if (price.price_min !== newMin || price.price_max !== newMax) {
          setPrice({
            price_min: newMin,
            price_max: newMax,
            price_min_input: String(newMin),
            price_max_input: String(newMax),
          });
        }
      }
    }
  }, [filter]);

  useEffect(() => {
    const minPriceInput = Number(price.price_min_input);
    const maxPriceInput = Number(price.price_max_input);

    if (!isNaN(minPriceInput) && minPriceInput > price.price_min) {
      dispatch(
        addFilter({
          filter: {
            id: 'price_min',
            field: 'price_min',
            value: `от ${price.price_min_input} р.`,
          },
        })
      );
    } else {
      dispatch(removeFilter({ filter: 'price_min' }));
    }

    if (!isNaN(maxPriceInput) && maxPriceInput < price.price_max) {
      dispatch(
        addFilter({
          filter: {
            id: 'price_max',
            field: 'price_max',
            value: `до ${price.price_max_input} р.`,
          },
        })
      );
    } else {
      dispatch(removeFilter({ filter: 'price_max' }));
    }
  }, [price, dispatch]);

  const handleChange = (values: { min: number; max: number }) => {
    setPrice((prev) => {
      const newPriceMinInput = String(values.min);
      const newPriceMaxInput = String(values.max);

      if (
        prev.price_min_input !== newPriceMinInput ||
        prev.price_max_input !== newPriceMaxInput
      ) {
        return {
          ...prev,
          price_min_input: newPriceMinInput,
          price_max_input: newPriceMaxInput,
        };
      }
      return prev;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          <div className="flex items-center justify-between gap-3 ">
            <input
              className="w-full rounded-lg bg-indigo-100 outline-none py-2 px-5"
              type="number"
              name="price_min_input"
              value={price.price_min_input}
              onChange={handleInputChange}
              id={`filter-item-price_min_input`}
              placeholder={`от ${price.price_min}`}
              readOnly
            />
            <input
              className="w-full rounded-lg bg-indigo-100 outline-none py-2 px-5"
              type="number"
              name="price_max_input"
              value={price.price_max_input}
              onChange={handleInputChange}
              id={`filter-item-price_max_input`}
              placeholder={`до ${price.price_max}`}
              readOnly
            />
          </div>
          <PriceRangeSlider
            min={price.price_min}
            max={price.price_max}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default FilterItemPrice;
