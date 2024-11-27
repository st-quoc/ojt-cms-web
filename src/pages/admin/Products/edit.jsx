import { Typography, Divider, Box } from '@mui/material';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductForm } from './form';
import axiosClient from '../../../config/axios';
import { API_ROOT } from '../../../constants';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ProductEditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      const res = await axiosClient.put(
        `${API_ROOT}/admin/product/edit/${id}`,
        productData,
      );
      console.log('🚀 ', res);

      toast.success(`Edited successfully!`);

      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);
    } catch (error) {
      console.log('🚀  error  🚀', error);
      toast.error('Error editting product!' + error);
    }
  };

  const fetchProductDetail = async () => {
    try {
      const response = await axiosClient.get(
        `${API_ROOT}/admin/product/detail/${id}`,
      );
      const product = response.data.product;
      const formattedProduct = {
        ...product,
        categories: product.categories.map(c => c._id),
      };
      setProduct(formattedProduct);
      setLoading(false);
    } catch (err) {
      console.log('🚀  err  🚀', err);
      setError('Failed to load product details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Box className="p-4">
      <ToastContainer position="top-right" autoClose={5000} />
      <AdminPageHeader
        breadcrumbs={[
          { label: 'Admin', path: '/admin' },
          { label: 'Products', path: '/admin/products' },
          { label: 'Edit product', path: `/admin/product/edit/${id}` },
        ]}
      />
      <Divider textAlign="center" className="py-4">
        <Typography variant="h4" gutterBottom>
          Edit product
        </Typography>
      </Divider>

      <ProductForm
        isEdit
        onSubmit={onSubmit}
        defaultValues={{
          id: product.id,
          name: product.name,
          images: product.images,
          sortDesc: product.sortDesc,
          fullDesc: product.fullDesc,
          categories: product.categories,
          variants: product.variants,
        }}
      />
    </Box>
  );
};
