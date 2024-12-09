import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import Banner from './Component/Banner';
import Product from './Component/Productsection';
import Suggest from './Component/Suggest';
import { Comment } from './Component/Comment';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../../config/axios';
import { API_ROOT } from '../../../constants';
import { Question } from './Component/Question';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  console.log(product);
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
      <Comment />
      <Question />
    </Box>
  );
};

export { ProductDetailPage };
