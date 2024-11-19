import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
    id: 1,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiLPcMp0kKtvIMio1uLkk24WNd_zWcTTppcw&s',
    name: 'Antique Radio',
    price1: 1.0,
    price2: 10.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 2,
    image:
      'https://product.hstatic.net/1000341630/product/1_8e57b543785d4e8095dc102ec0a202f8_master.jpg',
    name: 'Antique Radio',
    price1: 10.0,
    price2: 122.0,
    brand: {
      BrandName: 'Nike',
      BrandStyle: 'Nike Hunter',
    },
  },
  {
    id: 3,
    image:
      'https://www.vascara.com/uploads/cms_productmedia/2023/February/3/snk-0061-wht--4-__68226__1675395238-medium.jpg',
    name: 'Antique Radio',
    price1: 20.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Dream',
    },
  },
  {
    id: 4,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiLPcMp0kKtvIMio1uLkk24WNd_zWcTTppcw&s',
    name: 'Antique Radio',
    price1: 30.0,
    price2: 122.0,
    brand: {
      BrandName: 'Hunter',
      BrandStyle: 'Hunter Ababass',
    },
  },
  {
    id: 5,
    image:
      'https://www.vascara.com/uploads/cms_productmedia/2023/February/3/snk-0061-wht--4-__68226__1675395238-medium.jpg',
    name: 'Antique Radio',
    price1: 40.0,
    price2: 122.0,
    brand: {
      BrandName: 'Abibas',
      BrandStyle: 'Abibas Hunter',
    },
  },
  {
    id: 6,
    image:
      'https://product.hstatic.net/1000341630/product/1_8e57b543785d4e8095dc102ec0a202f8_master.jpg',
    name: 'Antique Radio',
    price1: 50.0,
    price2: 122.0,
    brand: {
      BrandName: 'Nike',
      BrandStyle: 'Nike Hunter',
    },
  },
  {
    id: 7,
    image:
      'https://product.hstatic.net/1000341630/product/thunder_bird6507_6_d952334c020a487597adbd77c0b0bdd5_master.jpg',
    name: 'Antique Radio',
    price1: 60.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 8,
    image:
      'https://bizweb.dktcdn.net/thumb/1024x1024/100/449/472/products/2af86fae-39f3-42ab-a563-5953cbe696ec.jpg?v=1655566986927',
    name: 'Antique Radio',
    price1: 70.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 9,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqGHjn7_HEireoE6NBSymnKVSuCEYkdalrwA&s',
    name: 'Antique Radio',
    price1: 80.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 10,
    image:
      'https://bizweb.dktcdn.net/100/405/002/products/130.png?v=1692952475837',
    name: 'Antique Radio',
    price1: 90.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 11,
    image:
      'https://bizweb.dktcdn.net/thumb/1024x1024/100/415/445/products/370031-black-1.jpg',
    name: 'Antique Radio',
    price1: 100.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 12,
    image:
      'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg',
    name: 'Antique Radio',
    price1: 110.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 13,
    image:
      'https://bizweb.dktcdn.net/100/405/002/products/130.png?v=1692952475837',
    name: 'Antique Radio',
    price1: 120.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 14,
    image:
      'https://bizweb.dktcdn.net/thumb/1024x1024/100/415/445/products/370031-black-1.jpg',
    name: 'Antique Radio',
    price1: 130.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 15,
    image:
      'https://product.hstatic.net/1000150581/product/1124a7790-2__1_-2_5cc708555e894a9f8ab32abbeeff8a6c_1024x1024.jpg',
    name: 'Antique Radio',
    price1: 140.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 16,
    image:
      'https://www.vascara.com/uploads/cms_productmedia/2023/February/3/snk-0061-wht--4-__68226__1675395238-medium.jpg',
    name: 'Antique Radio',
    price1: 150.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 17,
    image:
      'https://product.hstatic.net/1000341630/product/1_8e57b543785d4e8095dc102ec0a202f8_master.jpg',
    name: 'Antique Radio',
    price1: 160.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 18,
    image:
      'https://product.hstatic.net/1000341630/product/thunder_bird6507_6_d952334c020a487597adbd77c0b0bdd5_master.jpg',
    name: 'Antique Radio',
    price1: 170.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 19,
    image:
      'https://product.hstatic.net/1000341630/product/thunder_bird6507_6_d952334c020a487597adbd77c0b0bdd5_master.jpg',
    name: 'Antique Radio',
    price1: 170.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
  {
    id: 20,
    image:
      'https://product.hstatic.net/1000341630/product/thunder_bird6507_6_d952334c020a487597adbd77c0b0bdd5_master.jpg',
    name: 'Antique Radio',
    price1: 170.0,
    price2: 122.0,
    brand: {
      BrandName: 'Adidas',
      BrandStyle: 'Adidas Hunter',
    },
  },
];

const categories = [];

// Group products by BrandName and BrandStyle
const brandCount = {};

products.forEach(product => {
  const { BrandName, BrandStyle } = product.brand;

  if (!brandCount[BrandName]) {
    brandCount[BrandName] = {};
  }

  if (!brandCount[BrandName][BrandStyle]) {
    brandCount[BrandName][BrandStyle] = 0;
  }

  brandCount[BrandName][BrandStyle]++;
});

// Convert brandCount object to categories array
for (let BrandName in brandCount) {
  const subCategories = [];
  for (let BrandStyle in brandCount[BrandName]) {
    subCategories.push({
      name: BrandStyle,
      count: brandCount[BrandName][BrandStyle],
    });
  }

  categories.push({
    name: BrandName,
    subCategories: subCategories,
  });
}

// const bestSellers = [
//   { name: 'Bell Telephone', price1: 98.0, price2: 122.0 },
//   { name: 'Trimline Telephone', price1: 302.0, price2: 337.99 },
// ];

// const priceFilters = [{ label: '$150 - $350' }, { label: '$49 - $149' }];

export const ProductsListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(9); // Default to 9 items per page
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategoryToggle = categoryName => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleSubCategoryClick = subCategoryName => {
    setSelectedSubCategory(prev =>
      prev === subCategoryName ? null : subCategoryName,
    );
    setCurrentPage(1); // Reset pagination when subcategory changes
  };

  const handleSortChange = event => {
    setSortBy(event.target.value);
  };

  const handleItemsPerPageChange = event => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset pagination when items per page changes
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleViewToggle = mode => {
    setViewMode(mode);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price1 - b.price1;
    if (sortBy === 'highToLow') return b.price1 - a.price1;
    if (sortBy === 'newest') return b.id - a.id;
    return 0; // Default sorting
  });

  const filteredProducts = selectedSubCategory
    ? sortedProducts.filter(
        product => product.brand.BrandStyle === selectedSubCategory,
      )
    : sortedProducts;

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <aside className="ml-[5%] md:w-1/4">
          {/* Categories */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <div className="flex justify-between">
                    <span
                      className="text-gray-700 text-sm cursor-pointer"
                      onClick={() => handleCategoryToggle(category.name)}
                    >
                      {category.name}
                    </span>
                    <span
                      className="cursor-pointer text-gray-500 text-lg font-bold mr-[10%]"
                      onClick={() => handleCategoryToggle(category.name)}
                    >
                      {expandedCategories[category.name] ? '-' : '+'}
                    </span>
                  </div>
                  {expandedCategories[category.name] && (
                    <ul className="pl-4 text-gray-500">
                      {category.subCategories.map((subCategory, subIndex) => (
                        <li
                          key={subIndex}
                          onClick={() =>
                            handleSubCategoryClick(subCategory.name)
                          }
                          className={`cursor-pointer hover:text-gray-700 ${
                            selectedSubCategory === subCategory.name
                              ? 'font-semibold text-gray-900'
                              : ''
                          }`}
                        >
                          {subCategory.name} ({subCategory.count})
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Best Sellers */}
          {/* <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Best Sellers</h2>
            <div className="space-y-4">
              {bestSellers.map((item, index) => (
                <div key={index}>
                  <p>{item.name}</p>
                  <p className="text-red-600">
                    ${item.price1.toFixed(2)}{' '}
                    <span className="line-through text-gray-500">
                      ${item.price2.toFixed(2)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Refine Search */}
          {/* <div>
            <h2 className="text-lg font-semibold mb-4">Refine Search</h2>
            {priceFilters.map((filter, index) => (
              <label key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox text-orange-600"
                />
                <span>{filter.label}</span>
              </label>
            ))}

          </div> */}
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-3/4 mr-[5%]">
          <div className="bg-gray-100 p-10 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Save up to 25% off</p>
              <h1 className="text-xl font-bold">Geographic Map Compass</h1>
              <button className="mt-2 px-8 py-2 bg-black text-white">
                Shop Now
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-4">
            {/* View Mode */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewToggle('grid')}
                className={`px-3 py-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faTh} />
              </button>
              <button
                onClick={() => handleViewToggle('list')}
                className={`px-3 py-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                <FontAwesomeIcon icon={faList} />
              </button>
            </div>

            {/* Sorting */}
            <div className="flex items-center space-x-4">
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

          {/* Products */}
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
                : 'space-y-4'
            }
          >
            {currentItems.map(product => (
              <div
                key={product.id}
                className={`border rounded-lg overflow-hidden ${viewMode === 'list' ? 'flex items-center' : ''}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className={
                    viewMode === 'list'
                      ? 'w-32 h-32 object-cover mr-4'
                      : 'w-full h-64 object-cover'
                  }
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-500">{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-semibold">${product.price1}</p>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div>
              Showing {indexOfFirstItem + 1} to{' '}
              {indexOfLastItem < filteredProducts.length
                ? indexOfLastItem
                : filteredProducts.length}{' '}
              of {filteredProducts.length} products
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-3 py-2 rounded ${
                    currentPage === index + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
