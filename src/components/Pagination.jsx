import React from 'react';

const Pagination = ({ currentPage, totalPages, itemsPerPage, onPageChange }) => {
  const handleNextPage = () => onPageChange(Math.min(currentPage + 1, totalPages));
  const handlePrevPage = () => onPageChange(Math.max(currentPage - 1, 1));

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200  sm:px-6 sm:rounded-b-lg">
      <div className="flex-1 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;