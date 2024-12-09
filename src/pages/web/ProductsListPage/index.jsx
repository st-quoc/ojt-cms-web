import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ProductListContainer } from '../../../component/ProductGrid';
import PaginationBase from '../../../component/Pagination';
import { Sort } from '../../../component/Sort';
import { Show } from '../../../component/Show';
import { Stack } from '@mui/material';
import { ProductsListFilter } from './ProductListFilter';
import { Loader } from '../../../component/Loader';
import useFetchProducts from '../../../hooks/useFetchProducts';
import { Navigate } from 'react-router-dom';

export const ProductsListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filters, setFilters] = useState({
    search: '',
    category: [],
    priceMin: 0,
    priceMax: 999999999,
    color: [],
    size: [],
    stockCondition: '>',
    stockValue: 0,
    sortBy: 'default',
  });

  const { products, loading, error, totalPages } = useFetchProducts(
    filters,
    currentPage,
    itemsPerPage,
  );

  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (_, pageNumber) => setCurrentPage(pageNumber);

  if (error) return <Navigate to={'/404'} />;

  return (
    <Box>
      <Container maxWidth="xl" className="py-8">
        <Box>
          <Box className="bg-gray-100 p-10 rounded-lg mb-6 flex items-center justify-center">
            <Box className="text-center">
              <Box className="text-gray-500">Save up to 25% off</Box>
              <h1 className="text-xl font-bold">Geographic Map Compass</h1>
              <Button
                variant="contained"
                className="mt-2 px-8 py-2 bg-black text-white"
              >
                Shop Now
              </Button>
            </Box>
          </Box>
          <Stack direction={'row'} spacing={2}>
            <ProductsListFilter filters={filters} setFilters={setFilters} />
            <Stack spacing={3} flex={1}>
              <Box className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
                <Box className="flex space-x-2"></Box>

                <Stack direction={'row'} spacing={3}>
                  <Sort filters={filters} setFilters={setFilters} />
                  <Show
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                  />
                </Stack>
              </Box>
              <Box>
                {loading ? (
                  <Loader />
                ) : (
                  <ProductListContainer products={products} />
                )}
              </Box>

              <PaginationBase
                totalItems={totalPages}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                handlePageChange={handlePageChange}
              />
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsListPage;
