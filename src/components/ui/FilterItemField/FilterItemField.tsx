'use client';
import { addFilter, IFilterItem, removeFilter } from '@/store/filterSlice';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
interface IFilterItemFieldProps {
  filter: IFilterItem;
}

const FilterItemField: React.FC<IFilterItemFieldProps> = ({ filter }) => {
  const dispatch = useAppDispatch();
  const filterList = useAppSelector((state) => state.filter.filterList);
  const [isOpenFilterItem, setIsOpenFilterItem] = useState<boolean>(true);

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
            {filter.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 cursor-pointer"
              >
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
                  className="ml-[2px] mr-[8px] text-gray-400 cursor-pointer"
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

export default FilterItemField;
