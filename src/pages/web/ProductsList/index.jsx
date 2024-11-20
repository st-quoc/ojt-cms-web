import { useState, useMemo } from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import classNames from 'classnames';
import { Header } from '../../../component/Header';
import { Category } from '../../../component/Category';
import { Product } from '../../../component/Product';
import Pagination from '../../../component/Pagination';
import mockProduct from './mockProduct';

export const ProductsListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [selectedSubCategory] = useState(null);

  const handleSortChange = event => setSortBy(event.target.value);
  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset pagination on change
  };
  const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);
  const handleViewToggle = mode => setViewMode(mode);

  const sortedProducts = useMemo(() => {
    return [...mockProduct].sort((a, b) => {
      if (sortBy === 'lowToHigh') return a.price1 - b.price1;
      if (sortBy === 'highToLow') return b.price1 - a.price1;
      if (sortBy === 'newest') return b.id - a.id;
      return 0; // Default sorting
    });
  }, [sortBy]);

  const filteredProducts = selectedSubCategory
    ? sortedProducts.filter(
        product => product.brand.BrandStyle === selectedSubCategory,
      )
    : sortedProducts;

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Box>
      <Header />
      <Container maxWidth="xl">
        {' '}
        {/* Thêm Container để căn chỉnh nội dung */}
        <Box className="flex flex-col md:flex-row gap-4 mx-[auto] ">
          <Category />
          {/* Main Content */}
          <main className="w-[100%]">
            <div className="bg-gray-100 p-10 rounded-lg mb-6 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500">Save up to 25% off</p>
                <h1 className="text-xl font-bold">Geographic Map Compass</h1>
                <button className="mt-2 px-8 py-2 bg-black text-white">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Filter and View Mode */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewToggle('grid')}
                  className={classNames('px-3 py-2 rounded', {
                    'bg-orange-500 text-white': viewMode === 'grid',
                    'bg-gray-200': viewMode !== 'grid',
                  })}
                >
                  <GridViewIcon />
                </button>
                <button
                  onClick={() => handleViewToggle('list')}
                  className={classNames('px-3 py-2 rounded', {
                    'bg-orange-500 text-white': viewMode === 'list',
                    'bg-gray-200': viewMode !== 'list',
                  })}
                >
                  <FormatListBulletedIcon />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort By Dropdown */}
                <div className="flex items-center space-x-1">
                  <span>Sort By</span>
                  <select
                    className="border rounded px-2 py-1 cursor-pointer"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option value="default">Default</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>

                {/* Show items per page */}
                <div className="flex items-center space-x-1">
                  <span>Show</span>
                  <select
                    className="border rounded px-2 py-1 cursor-pointer"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                  >
                    <option value={9}>9</option>
                    <option value={15}>15</option>
                    <option value={18}>18</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid/List View */}
            <Product products={currentItems} viewMode={viewMode} />

            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </main>
        </Box>
      </Container>{' '}
      {/* Đóng Container */}
    </Box>
  );
};

export default ProductsListPage;
