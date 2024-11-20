import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import Banner from './Component/Banner';
import Product from './Component/Productsection';
import Suggest from './Component/Suggest';
import Header from '../../../component/Header';

const ProductDetailPage = () => {
  return (
    <div>
      <Header />
      <Banner />
      <Product />
      <Suggest />
    </div>
  );
};

export { ProductDetailPage };
