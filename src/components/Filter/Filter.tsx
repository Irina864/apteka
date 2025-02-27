import { addFilterItems, cleanFilter, IFilterItem } from '@/store/filterSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { IMedicine } from '@/store/productsSlice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FILTER_TITLES } from '@/constants';
import FilterItemField from '@/components/ui/FilterItemField/FilterItemField';
import FilterItemPrice from '../ui/FilterItemPrice/FilterItemPrice';

interface ICharacteristic {
  country?: string;
  brand?: string;
  dossage?: string;
  releaseForm?: string;
  storageTemperature?: string;
  quantityPerPackage?: number;
  expirationDate?: string;
  isByPrescription?: boolean;
  manufacturer?: string;
}

const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const medicinesList = useAppSelector(
    (state) => state.medicines.medicinesList
  );
  const isLoading = useAppSelector((state) => state.medicines.isLoading);
  const filterItems: IFilterItem[] = useAppSelector(
    (state) => state.filter.filterItems
  );

  useEffect(() => {
    let newFilterItems: IFilterItem[] = [];
    newFilterItems.push({
      id: 'price',
      title: 'Цена',
      items: [],
    });
    const uniqueKeys = new Set<string>();
    medicinesList.forEach((product: IMedicine) => {
      const keys = Object.keys(product.characteristics);
      keys.forEach((key) => {
        uniqueKeys.add(key);
      });
    });
    uniqueKeys.forEach((key) => {
      newFilterItems.push({
        id: key,
        title: FILTER_TITLES[key],
        items: [],
      });
    });
    medicinesList.forEach((product: IMedicine) => {
      const characteristics: ICharacteristic = product.characteristics;
      const price: number = product.price;
      if (price && !newFilterItems[0].items.includes(price)) {
        newFilterItems[0].items.push(price);
      }
      newFilterItems.forEach((filterItem: IFilterItem) => {
        const value: string | number | boolean | undefined =
          characteristics[filterItem.id as keyof ICharacteristic];
        if (value && !filterItem.items.includes(value)) {
          filterItem.items.push(value);
        }
      });
    });

    newFilterItems.forEach((filterItem) => {
      filterItem.items.sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return a - b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
          return a.localeCompare(b);
        }
        return 0;
      });
    });

    dispatch(addFilterItems({ filterItem: newFilterItems }));
  }, [medicinesList, isLoading]);

  return (
    <div className="flex flex-col gap-3 bg-white w-1/4 h-fit rounded-xl p-4">
      <Link
        href="/"
        className="bg-indigo-100 w-full h-fit rounded-lg flex items-center gap-1 px-2 py-3"
      >
        <img
          src="/arrow.svg"
          alt="back"
          className="block transform rotate-90"
        />
        <span className="text-[14px] font-semibold leading-[130%] break-words">
          Антибактериальные средства
        </span>
      </Link>
      {filterItems.map(
        (filterItem: IFilterItem) =>
          filterItem.items.length > 0 &&
          (filterItem.id === 'price' ? (
            <FilterItemPrice key={filterItem.id} filter={filterItem} />
          ) : (
            <FilterItemField key={filterItem.id} filter={filterItem} />
          ))
      )}
      <button
        type="button"
        onClick={() => {
          dispatch(cleanFilter());
        }}
        className="w-full h-fit rounded-md flex items-center justify-center gap-1 p-2 px-auto bg-indigo-100"
      >
        Очистить фильтр
      </button>
    </div>
  );
};
export default Filter;
