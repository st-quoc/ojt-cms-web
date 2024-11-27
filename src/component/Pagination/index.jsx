import { Box, Pagination } from '@mui/material';
import PropTypes from 'prop-types';

const PaginationBase = ({
  totalItems = 0,
  currentPage = 1,
  itemsPerPage = 9,
  handlePageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box className="py-10">
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
