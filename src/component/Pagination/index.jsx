import { Box, Pagination } from '@mui/material';
import PropTypes from 'prop-types';

const PaginationBase = ({
  totalItems = 0,
  currentPage = 1,
  itemsPerPage = 9,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem =
    totalItems > 0 ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <Box className="py-10">
      <Box className="text-gray-600 mb-4">
        {totalItems > 0
          ? `Showing ${startItem} to ${endItem} of ${totalItems} products`
          : 'No products available'}
      </Box>

      <Pagination
        className="flex items-end justify-end"
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        color="primary"
      />
    </Box>
  );
};

PaginationBase.propTypes = {
  totalItems: PropTypes.number,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  handlePageChange: PropTypes.func.isRequired,
};

PaginationBase.defaultProps = {
  totalItems: 0,
  currentPage: 1,
  itemsPerPage: 9,
};

export default PaginationBase;
