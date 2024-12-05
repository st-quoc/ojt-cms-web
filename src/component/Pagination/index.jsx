import { Box, Pagination } from '@mui/material';

const PaginationBase = ({
  totalItems = 0,
  currentPage = 1,
  itemsPerPage = 8,
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

export default PaginationBase;
