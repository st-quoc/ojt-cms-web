import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ProductListContainer } from '../../../component/ProductGrid';
import PaginationBase from '../../../component/Pagination';
import { Sort } from '../../../component/Sort';
import { Show } from '../../../component/Show';
import {
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleCloseDrawer = () => setDrawerOpen(false);

  if (error) return <Navigate to={'/404'} />;

  return (
    <Box className="bg-hero bg-cover bg-center">
      <Container maxWidth="xl" className="py-8">
        <Box>
          <Box className="p-10 rounded-2xl mb-6 flex items-center justify-center border-white border-8">
            <Box className="text-center">
              <Box className="text-gray-500">Save up to 25% off</Box>
              <h1 className="text-xl font-bold">Geographic Map Compass</h1>
              <br />
              <Button variant="contained" color="success">
                Shop Now
              </Button>
            </Box>
          </Box>

          {isMobile && (
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: 'fixed',
                bottom: '50%',
                right: 16,
                transform: 'translateY(50%)',
                backgroundColor: 'primary.main',
                color: 'white',
                zIndex: 1000,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <FilterListIcon />
            </IconButton>
          )}

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={handleCloseDrawer}
            PaperProps={{
              sx: {
                width: '90%',
                maxWidth: '500px',
              },
            }}
          >
            <Box p={2}>
              <Button
                variant="text"
                onClick={handleCloseDrawer}
                sx={{
                  display: 'block',
                  marginBottom: 2,
                  color: 'primary.main',
                }}
              >
                Cancel
              </Button>
              <ProductsListFilter
                filters={filters}
                setFilters={newFilters => {
                  setFilters(newFilters);
                  handleCloseDrawer();
                }}
              />
            </Box>
          </Drawer>

          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
            {!isMobile && (
              <ProductsListFilter filters={filters} setFilters={setFilters} />
            )}

            <Stack spacing={3} flex={1}>
              <Box
                className="flex justify-between items-center bg-white p-4 rounded-lg mb-4"
                sx={{
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? 2 : 0,
                }}
              >
                <Box className="flex space-x-2"></Box>
                <Stack
                  direction={isMobile ? 'column' : 'row'}
                  spacing={3}
                  alignItems={isMobile ? 'flex-start' : 'center'}
                >
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
