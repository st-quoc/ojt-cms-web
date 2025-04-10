export const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case 'lowToHigh':
      return [...products].sort((a, b) => a.price1 - b.price1);
    case 'highToLow':
      return [...products].sort((a, b) => b.price1 - a.price1);
    case 'newest':
      return [...products].sort((a, b) => b.id - a.id);
    default:
      return products;
  }
};

export const filterProducts = (products, selectedSubCategory) => {
  return selectedSubCategory
    ? products.filter(
        product => product.brand.BrandStyle === selectedSubCategory,
      )
    : products;
};

export const formatCurrencyVND = amount => {
  if (typeof amount !== 'number') return '0 VND';

  return amount.toLocaleString('vi-VN') + ' VND';
};

export const formatDate = dateString => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
