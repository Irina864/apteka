'use client';
import CardSection from '@/components/CardSection/CardSection';
import Filter from '@/components/Filter/Filter';
import Pagination from '@/components/Pagination/Pagination';
import Sorter from '@/components/Sorter/Sorter';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getProducts, Medicine } from '@/store/productsSlice';
import { useEffect, useState } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const medicinesList = useAppSelector(
    (state) => state.medicines.medicinesList
  );
  const isLoading = useAppSelector((state) => state.medicines.isLoading);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 12;
  const totalItems: number = medicinesList.length;

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: Medicine[] = medicinesList.slice(
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

  return isLoading ? null : (
    <main className="grid grid-rows-[40px_1fr] flex-col justify-items-center min-w-full min-h-screen p-8  pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-blue-100">
      <Sorter />

      <div className="flex items-start justify-start gap-5">
        <Filter />
        <div className="flex flex-col items-center justify-center gap-11">
          <CardSection currentProducts={currentItems} />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            setPage={handlePage}
            setNextPage={handleNextPage}
            setBackPage={handleBackPage}
          />
        </div>
      </div>
    </main>
  );
}
