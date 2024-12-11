import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import Banner from './Component/Banner';
import Product from './Component/Productsection';
import Suggest from './Component/Suggest';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../../config/axios';
import { API_ROOT } from '../../../constants';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductDetail = async () => {
    try {
      const response = await axiosClient.get(
        `${API_ROOT}/user/product/detail/${productId}`,
      );
      setProduct(response.data.product);
    } catch (err) {
      console.log('🚀  err  🚀', err);
    }
  };
  useEffect(() => {
    fetchProductDetail();
  }, [productId]);

  return (
    <Box>
      <Banner name={product?.name} />
      <Product product={product} />
      <Suggest />
    </Box>
  );
};

export { ProductDetailPage };
