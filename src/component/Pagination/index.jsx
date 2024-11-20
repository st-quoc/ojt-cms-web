export const Pagination = ({
  filteredProducts,
  currentPage,
  indexOfFirstItem,
  indexOfLastItem,
  totalPages,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <div>
        Showing {indexOfFirstItem + 1} to{' '}
        {indexOfLastItem < filteredProducts.length
          ? indexOfLastItem
          : filteredProducts.length}{' '}
        of {filteredProducts.length} products
      </div>
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`px-3 py-2 rounded ${
              currentPage === index + 1
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
