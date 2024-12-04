import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import Banner from './Component/Banner';
import Product from './Component/Productsection';
import Suggest from './Component/Suggest';
import Header from '../../../component/Header';
import { Comment } from './Component/Comment';
import { Box } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axiosClient from '../../../config/axios';
// import { API_ROOT } from '../../../constants';
import { Footer } from '../../../component/Footer/Footer';

const ProductDetailPage = () => {
  // const { productId } = useParams();
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // const fetchProductDetail = async () => {
  //   try {
  //     const response = await axiosClient.get(
  //       `${API_ROOT}/admin/product/detail/${parseInt(productId)}`,
  //     );
  //     setProduct(response.data.product);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log('🚀  err  🚀', err);
  //     setError('Failed to load product details');
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProductDetail();
  // }, [productId]);

  return (
    <Box>
      <Header />
      <Banner />
      <Product />
      <Suggest />
      <Comment />
      <Footer />
    </Box>
  );
};

export { ProductDetailPage };
