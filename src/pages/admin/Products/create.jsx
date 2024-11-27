import { Typography, Divider, Box } from '@mui/material';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { toast, ToastContainer } from 'react-toastify';
import { ProductForm } from './form';
import { API_ROOT } from '../../../constants';
import axiosClient from '../../../config/axios';
import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'react-router-dom';

export const ProductCreateAdmin = () => {
  const onSubmit = async data => {
    const productData = {
      name: data.name,
      sortDesc: data.sortDesc,
      fullDesc: data.fullDesc,
      categories: data.categories,
      images: data.images,
      variants: data.variants,
    };

    try {
      // Gửi request tạo sản phẩm
      await axiosClient.post(`${API_ROOT}/admin/product/create`, productData);
      toast.success('Product created successfully!');
      redirect('/admin/products');
    } catch (error) {
      console.error('🚀 Error creating product: ', error);
      toast.error('Error creating product!');
    }
  };

  return (
    <Box className="p-4">
      {/* ToastContainer để hiển thị thông báo */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Tiêu đề trang */}
      <AdminPageHeader
        breadcrumbs={[
          { label: 'Admin', path: '/admin' },
          { label: 'Products', path: '/admin/products' },
          { label: 'Create new product', path: `/admin/product/create` },
        ]}
      />

      <Divider textAlign="center" className="py-4">
        <Typography variant="h4" gutterBottom>
          Create new product
        </Typography>
      </Divider>

      {/* Form sản phẩm */}
      <ProductForm
        onSubmit={onSubmit}
        defaultValues={{
          name: '',
          sortDesc: '',
          fullDesc: '',
          categories: [],
          images: [],
          variants: [
            {
              size: '',
              color: '',
              price: '',
              stock: '',
            },
          ],
        }}
      />
    </Box>
  );
};
