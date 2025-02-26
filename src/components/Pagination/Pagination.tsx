interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  setPage: (page: number) => void;
  setNextPage: () => void;
  setBackPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  setPage,
  setNextPage,
  setBackPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers: (number | string)[] = [];

  if (totalPages > 1 && currentPage !== 1) {
    pageNumbers.push(1);
  }

  if (currentPage > 3) {
    pageNumbers.push('...');
  }

  if (currentPage > 2) {
    pageNumbers.push(currentPage - 1);
  }

  pageNumbers.push(currentPage);

  if (currentPage < totalPages - 1) {
    pageNumbers.push(currentPage + 1);
  }

  if (currentPage < totalPages - 2) {
    pageNumbers.push('...');
  }

  if (totalPages > 1 && currentPage !== totalPages) {
    pageNumbers.push(totalPages);
  }

  return (
    <nav className="flex gap-4">
      {currentPage !== 1 && (
        <div
          onClick={setBackPage}
          className="w-9 h-9 bg-gray-300 rounded-full active:text-blue-400 focus:text-blue-400 flex items-center justify-center hover:cursor-pointer"
        >
          <img className="transition rotate-90" src="/arrow.svg" alt="back" />
        </div>
      )}
      <ul className="flex gap-4">
        {pageNumbers.map((page, index) => (
          <li
            key={index}
            className={`w-9 h-9 flex items-center justify-center rounded-full ${
              typeof page === 'number' ? 'hover:bg-slate-300' : ''
            }`}
          >
            {typeof page === 'number' ? (
              <a
                onClick={() => setPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-300 text-black font-semibold hover:cursor-pointer ${
                  currentPage === page ? 'bg-blue-400 text-white' : ''
                }`}
              >
                {page}
              </a>
            ) : (
              <span className="text-black font-semibold">{page}</span>
            )}
          </li>
        ))}
      </ul>
      {currentPage !== totalPages && (
        <div
          onClick={setNextPage}
          className="w-9 h-9 bg-gray-300 rounded-full active:text-blue-400 focus:text-blue-400 flex items-center justify-center hover:cursor-pointer"
        >
          <img className="transition -rotate-90" src="/arrow.svg" alt="next" />
        </div>
      )}
    </nav>
  );
};

export default Pagination;
