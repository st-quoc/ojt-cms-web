import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { ProductListContainer } from '../../../component/ProductGrid';
import PaginationBase from '../../../component/Pagination';
import { Sort } from '../../../component/Sort';
import { Show } from '../../../component/Show';
import { API_ROOT } from '../../../constants';
import { Stack } from '@mui/material';
import { ProductsListFilter } from './ProductListFilter';
import { Loader } from '../../../component/Loader';

export const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loading, setLoading] = useState(false);
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

  const fetchProducts = async filters => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROOT}/user/product/list`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: filters.search,
          category: filters.category,
          priceMin: filters.priceMin,
          priceMax: filters.priceMax,
          color: filters.color,
          size: filters.size,
          stockCondition: filters.stockCondition,
          stockValue: filters.stockValue,
          sortBy: filters.sortBy,
        },
      });
      const { products, totalProducts } = response.data;
      setProducts(products);
      setTotalItems(totalProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [currentPage, itemsPerPage, filters]);

  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (_, pageNumber) => setCurrentPage(pageNumber);

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
                totalItems={totalItems}
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
