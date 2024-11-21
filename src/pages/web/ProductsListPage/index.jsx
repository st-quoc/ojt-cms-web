import { useState, useMemo } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Header } from '../../../component/Header';
import { Category } from '../../../component/Category';
import { Product } from '../../../component/Product';
import PaginationBase from '../../../component/Pagination';
import { Sort } from '../../../component/Sort';
import { Show } from '../../../component/Show';
import mockProduct from './mockProduct';

export const ProductsListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleSortChange = event => setSortBy(event.target.value);
  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  const handlePageChange = (_, pageNumber) => setCurrentPage(pageNumber);
  const handleViewToggle = mode => setViewMode(mode);

  const filteredProducts = useMemo(() => {
    const products = selectedSubCategory
      ? mockProduct.filter(
          product => product.brand.BrandStyle === selectedSubCategory,
        )
      : mockProduct;

    return products.sort((a, b) => {
      if (sortBy === 'lowToHigh') return a.price1 - b.price1;
      if (sortBy === 'highToLow') return b.price1 - a.price1;
      if (sortBy === 'newest') return b.id - a.id;
      return 0;
    });
  }, [selectedSubCategory, sortBy]);

  const totalItems = filteredProducts.length;
  const currentItems = useMemo(() => {
    return filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <Box>
      <Header />
      <Container maxWidth="xl" className="py-8">
        <Box className="flex flex-col md:flex-row gap-4 mx-auto">
          <Category
            setSelectedSubCategory={setSelectedSubCategory}
            selectedBrandStyle={selectedSubCategory}
          />
          <main className="w-full">
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

            <Box className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
              <Box className="flex space-x-2">
                <Button
                  onClick={() => handleViewToggle('grid')}
                  className={`px-3 py-2 rounded-md ${
                    viewMode === 'grid'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-black'
                  } hover:bg-orange-400`}
                  variant="outlined"
                >
                  <GridViewIcon />
                </Button>
                <Button
                  onClick={() => handleViewToggle('list')}
                  className={`px-3 py-2 rounded-md ${
                    viewMode === 'list'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-black'
                  } hover:bg-orange-400`}
                  variant="outlined"
                >
                  <FormatListBulletedIcon />
                </Button>
              </Box>

              <Box className="flex items-center space-x-4">
                <Sort sortBy={sortBy} handleSortChange={handleSortChange} />
                <Show
                  itemsPerPage={itemsPerPage}
                  handleItemsPerPageChange={handleItemsPerPageChange}
                />
              </Box>
            </Box>

            <Product products={currentItems} viewMode={viewMode} />

            <PaginationBase
              totalItems={totalItems}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              handlePageChange={handlePageChange}
            />
          </main>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsListPage;
