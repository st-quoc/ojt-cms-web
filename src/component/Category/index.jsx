import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Box from '@mui/material/Box';
import mockProduct from '../../pages/web/ProductsListPage/mockProduct';

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
    <Box className="flex md:flex-row gap-4 w-[15%]">
      <Box>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((category, index) => (
            <List key={index}>
              <ListItem
                button
                onClick={() => handleCategoryToggle(category.name)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={category.name}
                  primaryTypographyProps={{
                    className: 'text-gray-700 text-sm',
                  }}
                />
                <IconButton>
                  {expandedCategories[category.name] ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </ListItem>
              <Collapse
                in={expandedCategories[category.name]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {category.subCategories.map((subCategory, subIndex) => (
                    <ListItem
                      key={subIndex}
                      button
                      onClick={() => handleSubCategoryClick(subCategory.name)}
                      sx={{
                        pl: 4,
                        backgroundColor:
                          selectedSubCategory === subCategory.name
                            ? '#f5f5f5'
                            : 'transparent',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                        cursor: 'pointer',
                      }}
                    >
                      <ListItemText
                        primary={`${subCategory.name} (${subCategory.count})`}
                        primaryTypographyProps={{
                          className:
                            selectedSubCategory === subCategory.name
                              ? 'font-semibold'
                              : 'text-gray-500',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          ))}
        </List>
      </Box>
    </Box>
  );
};
