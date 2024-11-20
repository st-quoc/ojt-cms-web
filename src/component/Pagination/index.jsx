import { Pagination } from '@mui/material';

const PaginationBase = ({
  totalItems,
  currentPage,
  itemsPerPage,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center mt-6">
      <div>
        Showing {startItem} to {endItem} of {totalItems} products
      </div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        color="primary"
      />
    </div>
  );
};

export default PaginationBase;
