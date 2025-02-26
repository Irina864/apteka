'use client';
import { addFilter, FilterItem, removeFilter } from '@/store/filterSlice';
import { useEffect, useState } from 'react';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider/PriceRangeSlider';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

interface IPrice {
  price_min: number;
  price_max: number;
  price_min_input: number;
  price_max_input: number;
}

interface FilterItemBoxProps {
  filter: FilterItem;
}

const FilterItemBox: React.FC<FilterItemBoxProps> = ({ filter }) => {
  const dispatch = useAppDispatch();
  const filterList = useAppSelector((state) => state.filter.filterList);
  const [isOpenFilterItem, setIsOpenFilterItem] = useState<boolean>(true);
  const [price, setPrice] = useState<IPrice>({
    price_min: Number(filter.items[0]),
    price_max: Number(filter.items[filter.items.length - 1]),
    price_min_input: Number(filter.items[0]),
    price_max_input: Number(filter.items[filter.items.length - 1]),
  });
  console.log();
  useEffect(() => {
    if (filter.id === 'price' && filter.items.length > 0) {
      setPrice({
        price_min: Number(filter.items[0]),
        price_max: Number(filter.items[filter.items.length - 1]),
        price_min_input: Number(filter.items[0]),
        price_max_input: Number(filter.items[filter.items.length - 1]),
      });
    }
  }, [filter]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    field: string,
    value: string
  ) => {
    e.target.checked
      ? dispatch(addFilter({ filter: { id: id, field: field, value: value } }))
      : dispatch(removeFilter({ filter: id }));
  };

  const isChecked = (id: string, value: string) => {
    return filterList.some((el) => el.id === id && el.value === value);
  };

  if (filter.id === 'price') {
    return (
      <div className="h-fit">
        <div className="flex justify-between items-center">
          <label className="text-[14px] font-semibold leading-[130%]">
            {filter.title}
          </label>
          <button
            type="button"
            onClick={() => {
              setIsOpenFilterItem(!isOpenFilterItem);
            }}
          >
            <img
              src="/arrow.svg"
              alt="toggle"
              className={`block transition ${
                isOpenFilterItem ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </button>
        </div>
        {isOpenFilterItem && (
          <div className="my-4 overflow-y-auto max-h-44 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 ">
              <input
                className="w-full  rounded-lg bg-indigo-100 focus:border-blue-600 outline-blue-600 p-2"
                type="number"
                name="price_min"
                // value={filter.items[0] || ''}
                id={`filter-item-${filter.id}`}
                placeholder={`от ${price.price_min}`}
              />
              <input
                className="w-full rounded-lg bg-indigo-100 focus:border-blue-600 outline-blue-600 p-2"
                type="number"
                name="price_max"
                // value={filter.items[filter.items.length - 1] || ''}
                id={`filter-item-${filter.id}-2`}
                placeholder={`до ${price.price_max}`}
              />
            </div>
            <PriceRangeSlider
              min={price.price_min}
              max={price.price_max}
              // onChange={}
            />
          </div>
        )}
      </div>
    );
  }

  if (filter.id === 'isByPrescription') {
    return (
      <div className="h-fit">
        <div className="flex justify-between items-center">
          <label className="text-[14px] font-semibold leading-[130%]">
            {filter.title}
          </label>
          <button
            type="button"
            onClick={() => {
              setIsOpenFilterItem(!isOpenFilterItem);
            }}
          >
            <img
              src="/arrow.svg"
              alt="toggle"
              className={`block transition ${
                isOpenFilterItem ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </button>
        </div>
        {isOpenFilterItem && (
          <div className="my-4 overflow-y-auto max-h-44 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <input
                className="w-4 h-4"
                type="checkbox"
                value="По рецепту"
                id={`filter-item-${filter.id}-1`}
                onChange={(e) =>
                  handleChange(
                    e,
                    `filter-item-${filter.id}-1`,
                    filter.id,
                    'По рецепту'
                  )
                }
                checked={isChecked(`filter-item-${filter.id}-1`, 'По рецепту')}
              />
              <label
                className="ml-[2px] mr-[8px] text-gray-400"
                htmlFor={`filter-item-${filter.id}-1`}
              >
                По рецепту
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                className="w-4 h-4"
                type="checkbox"
                value="Без рецепта"
                id={`filter-item-${filter.id}-2`}
                onChange={(e) =>
                  handleChange(
                    e,
                    `filter-item-${filter.id}-2`,
                    filter.id,
                    'Без рецепта'
                  )
                }
                checked={isChecked(`filter-item-${filter.id}-2`, 'Без рецепта')}
              />
              <label
                className="ml-[2px] mr-[8px] text-gray-400"
                htmlFor={`filter-item-${filter.id}-2`}
              >
                Без рецепта
              </label>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    filter.id !== 'isByPrescription' &&
    filter.id !== 'price' && (
      <div className="h-fit">
        <div className="flex justify-between items-center">
          <label className="text-[14px] font-semibold leading-[130%]">
            {filter.title}
          </label>
          <button
            type="button"
            onClick={() => {
              setIsOpenFilterItem(!isOpenFilterItem);
            }}
          >
            <img
              src="/arrow.svg"
              alt="toggle"
              className={`block transition ${
                isOpenFilterItem ? 'rotate-0' : 'rotate-180'
              }`}
            />
          </button>
        </div>
        {isOpenFilterItem && (
          <div className="my-4 overflow-y-auto max-h-44 flex flex-col gap-3">
            {filter.items.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  onChange={(e) =>
                    handleChange(
                      e,
                      `filter-item-${filter.id}-${index}`,
                      filter.id,
                      String(item)
                    )
                  }
                  className="w-4 h-4 text-gray-100"
                  type="checkbox"
                  checked={isChecked(
                    `filter-item-${filter.id}-${index}`,
                    String(item)
                  )}
                  value={typeof item === 'boolean' ? String(item) : item}
                  id={`filter-item-${filter.id}-${index}`}
                />
                <label
                  className="ml-[2px] mr-[8px] text-gray-400"
                  htmlFor={`filter-item-${filter.id}-${index}`}
                >
                  {filter.id === 'quantityPerPackage'
                    ? `${item} шт.`
                    : String(item)}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  );
};

export default FilterItemBox;
