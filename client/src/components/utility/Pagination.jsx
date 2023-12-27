import { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;
  const safeTotalItems = totalItems > 0 ? totalItems : 0;
  const totalPages = Math.ceil(safeTotalItems / safeItemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    const pageWindow = 3; // Number of pages to show before and after the current page

    if (totalPages <= 1 + (pageWindow * 2)) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let lowerLimit = currentPage - pageWindow;
      let upperLimit = currentPage + pageWindow;

      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= lowerLimit && i <= upperLimit)) {
          pages.push(i);
        } else if (i === lowerLimit - 1 || i === upperLimit + 1) {
          pages.push('...'); // Ellipsis
        }
      }
    }

    return pages;
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  if (totalPages < 1) return null;

  return (
    <div className="pagination flex items-center justify-center gap-1">
      <button
        type='button'
        onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className='text-gray-100 text-xl font-bold cursor-pointer'
      >
        <IoIosArrowBack />
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => page !== '...' && goToPage(page)}
          className={currentPage === page ? 'bg-pink-600 text-lg py-[2px] px-[8px] rounded-md bg-opacity-10 text-pink-600' : 'text-gray-200 hover:bg-pink-600 px-3 text-lg py-1 rounded-md hover:bg-opacity-10 hover:text-pink-600'}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        type='button'
        onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className='text-gray-200 text-xl font-bold cursor-pointer'
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;