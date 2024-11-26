import axios from 'axios';
import { Typography, Divider, Box } from '@mui/material';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { toast } from 'react-toastify';
import { ProductForm } from './form';

export const ProductEditAdmin = () => {
  const onSubmit = async data => {
    const productData = {
      name: data.name,
      sortDesc: data.description,
      fullDesc: data.fullDescription,
      categories: data.categories,
      images: data.images,
      variants: data.variants,
    };

    try {
      const response = await axios.post('/api/products', productData);
      console.log('🚀  Product created successfully', response);
      toast.info('Product created successfully!');
    } catch (error) {
      console.log('🚀  error  🚀', error);
      toast.error('Error creating product!');
    }
  };

  return (
    <Box className="p-4">
      <AdminPageHeader
        breadcrumbs={[
          { label: 'Admin', path: '/admin' },
          { label: 'Products', path: '/admin/products' },
          { label: 'Edit product', path: `/admin/product/edit/` },
        ]}
      />
      <Divider textAlign="center" className="py-4">
        <Typography variant="h4" gutterBottom>
          Edit product
        </Typography>
      </Divider>

      <ProductForm
        onSubmit={onSubmit}
        defaultValues={{
          id: 1,
          name: 'Running Shoes',
          images: [
            'https://i5.walmartimages.com/asr/0a34ef4c-d1f5-4627-832f-e4125701d399.14cbe143d89f81352a894ddb0ef5d96a.jpeg',
            'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
            'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
            'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
          ],
          sortDesc: 'Comfortable and durable running shoes.',
          fullDesc:
            'These running shoes are designed for comfort, support, and durability. Perfect for athletes or casual runners.',
          categories: ['men'],
          variants: [
            { size: 'S', color: 'Red', stock: 3, price: 3000 },
            { size: 'S', color: 'Blue', stock: 1, price: 2500 },
            { size: 'M', color: 'Red', stock: 5, price: 3200 },
            { size: 'M', color: 'Blue', stock: 2, price: 2800 },
          ],
        }}
      />
    </Box>
  );
};
