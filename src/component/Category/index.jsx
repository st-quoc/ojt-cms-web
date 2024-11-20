import { useState } from 'react';
import mockProduct from '../../pages/web/ProductsList/mockProduct';

const categories = mockProduct.reduce((acc, product) => {
  const { BrandName, BrandStyle } = product.brand;
  let category = acc.find(c => c.name === BrandName);
  if (!category) {
    category = { name: BrandName, subCategories: [] };
    acc.push(category);
  }
  let subCategory = category.subCategories.find(sc => sc.name === BrandStyle);
  if (!subCategory) {
    subCategory = { name: BrandStyle, count: 0 };
    category.subCategories.push(subCategory);
  }
  subCategory.count++;
  return acc;
}, []);

export const Category = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
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
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-[10%]">
      {/* Sidebar */}
      <aside className="md:w-1/4">
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
                        onClick={() => handleSubCategoryClick(subCategory.name)}
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
      </aside>
    </div>
  );
};
