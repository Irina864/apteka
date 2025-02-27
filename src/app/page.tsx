'use client';
import CardSection from '@/components/CardSection/CardSection';
import EmptyBox from '@/components/EmptyBox/EmptyBox';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';
import Sorter from '@/components/Sorter/Sorter';
import { sortByField } from '@/helpers/sortByField';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getProducts, IMedicine } from '@/store/productsSlice';
import { useEffect, useState } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const medicinesList = useAppSelector(
    (state) => state.medicines.medicinesList
  );
  const filterList = useAppSelector((state) => state.filter.filterList);
  const sorterState: number = useAppSelector(
    (state) => state.filter.sorterState
  );
  const isLoading = useAppSelector((state) => state.medicines.isLoading);
  const [currentProducts, setCurrentProducts] =
    useState<IMedicine[]>(medicinesList);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 12;
  const totalItems: number = currentProducts.length;
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    setCurrentProducts(medicinesList);
  }, [medicinesList]);

  const checkFilters = () => {
    if (filterList.length === 0) {
      setCurrentProducts(medicinesList);
      return;
    }

    const groupedFilters = filterList.reduce((acc, filter) => {
      if (!acc[filter.field]) {
        acc[filter.field] = [];
      }
      acc[filter.field].push(filter.value);
      return acc;
    }, {} as Record<string, (string | number | boolean)[]>);

    const newProducts: IMedicine[] = medicinesList.filter((product) => {
      return Object.keys(groupedFilters).every((field) => {
        const values = groupedFilters[field];
        const matchesField = values.some((value) => {
          if (field === 'isByPrescription') {
            return value === 'По рецепту'
              ? product.characteristics[
                  field as keyof IMedicine['characteristics']
                ] === true
              : product.characteristics[
                  field as keyof IMedicine['characteristics']
                ] === false;
          } else if (field === 'price_min') {
            if (typeof value === 'string') {
              const minPrice = parseFloat(value.replace(/[^0-9.]/g, ''));
              return product.price > minPrice;
            }
          } else if (field === 'price_max') {
            if (typeof value === 'string') {
              const maxPrice = parseFloat(value.replace(/[^0-9.]/g, ''));
              return product.price < maxPrice;
            }
          } else {
            return (
              product.characteristics[
                field as keyof IMedicine['characteristics']
              ] === value || product[field as keyof IMedicine] === value
            );
          }
        });
        return matchesField;
      });
    });

    setCurrentProducts(newProducts);
  };

  useEffect(() => {
    checkFilters();
  }, [filterList]);

  useEffect(() => {
    let newProducts;
    switch (sorterState) {
      case 0:
        setCurrentProducts(medicinesList);
        checkFilters();
        break;
      case 1:
        newProducts = [...currentProducts].sort(sortByField('price'));
        setCurrentProducts(newProducts);
        break;
      case 2:
        newProducts = [...currentProducts].sort(sortByField('price')).reverse();
        setCurrentProducts(newProducts);
        break;
      default:
        break;
    }
  }, [sorterState]);

  const currentItems: IMedicine[] = currentProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  return isLoading ? (
    <div className="flex items-center">
      <svg className="mr-3 w-5 h-5 text-white animate-spin" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>
  ) : (
    <main className="grid grid-rows-[40px_1fr] flex-col justify-items-center w-full min-h-screen p-8  pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-indigo-100">
      <Sorter />
      <div className="flex items-start justify-start gap-5  w-full ">
        <Filter />
        <div className="flex flex-col items-center justify-center gap-11 w-3/4">
          {currentItems.length > 0 ? (
            <>
              <CardSection currentProducts={currentItems} />
              <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                setPage={handlePage}
                setNextPage={handleNextPage}
                setBackPage={handleBackPage}
              />
            </>
          ) : (
            <EmptyBox />
          )}
        </div>
      </div>
    </main>
  );
}
