import { useState, useEffect } from 'react';
import axios from 'axios';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Header } from '../../../component/Header';
import { ProductListContainer } from '../../../component/ProductGrid';
import PaginationBase from '../../../component/Pagination';
import { Sort } from '../../../component/Sort';
import { Show } from '../../../component/Show';
import { API_ROOT } from '../../../constants';
import { Stack } from '@mui/material';
import { ProductsListFilter } from './ProductListFilter';

export const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState(
    localStorage.getItem('viewMode') ?? 'grid',
  );
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: '',
    priceMax: '',
    color: '',
    size: '',
    stockCondition: '>',
    stockValue: '',
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
        },
      });
      const { products, pagination } = response.data;
      setProducts(products);
      setTotalItems(pagination.totalProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = newFilters => {
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [currentPage, itemsPerPage, filters]);

  const handleSortChange = event => setSortBy(event.target.value);
  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  const handlePageChange = (_, pageNumber) => setCurrentPage(pageNumber);
  const handleViewToggle = mode => {
    localStorage.setItem('viewMode', mode);
    setViewMode(mode);
  };

  return (
    <Box>
      <Header />
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
            <ProductsListFilter onFilterApply={handleFilterApply} />
            <Stack spacing={3} flex={1}>
              <Box className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
                <Box className="flex space-x-2">
                  <Button
                    onClick={() => handleViewToggle('grid')}
                    className={`px-3 py-2 rounded-md ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                    variant="outlined"
                  >
                    <GridViewIcon />
                  </Button>
                  <Button
                    onClick={() => handleViewToggle('list')}
                    className={`px-3 py-2 rounded-md ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                    variant="outlined"
                  >
                    <FormatListBulletedIcon />
                  </Button>
                </Box>

                <Box className="">
                  {/* Sorting and Items per Page */}
                  <Sort sortBy={sortBy} handleSortChange={handleSortChange} />
                  <Show
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                  />
                </Box>
              </Box>
              <Box>
                {loading ? (
                  <Box className="text-center py-10">Loading...</Box>
                ) : (
                  <ProductListContainer
                    products={products}
                    viewMode={viewMode}
                  />
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
