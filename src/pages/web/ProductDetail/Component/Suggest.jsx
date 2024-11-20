import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const data = {
  products: [
    {
      id: '1',
      name: 'Nike Airforce 1',
      brand: 'Nike',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/AIR+FORCE+1+%2707.png',
      ],
      price: '200',
    },
    {
      id: '2',
      name: 'Adidas Ultraboost 21',
      brand: 'Adidas',
      images: [
        'https://assets.adidas.com/images/w_600,f_auto,q_auto/6e40bbf29b7f4025b94eac66014846ed_9366/Ultraboost_21_Shoes_White_FY0377_01_standard.jpg',
        'https://assets.adidas.com/images/w_600,f_auto,q_auto/15c34f8ec02f4be19267ac66014853d8_9366/Ultraboost_21_Shoes_White_FY0377_02_standard.jpg',
      ],
      price: '180',
    },
    {
      id: '3',
      name: 'Puma RS-X',
      brand: 'Puma',
      images: [
        'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/373236/01/sv01/fnd/IND/fmt/png/RS-X-Reinvention-Sneakers',
        'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa/global/373236/02/sv01/fnd/IND/fmt/png/RS-X-Reinvention-Sneakers',
      ],
      price: '150',
    },
    {
      id: '4',
      name: 'Converse Chuck Taylor All Star',
      brand: 'Converse',
      images: [
        'https://www.converse.com/on/demandware.static/-/Sites-masterCatalog/default/dwb7b77c2f/images/a_107/M7650C_A_107X1.jpg',
        'https://www.converse.com/on/demandware.static/-/Sites-masterCatalog/default/dw4e50913e/images/h_107/M7650C_H_107X1.jpg',
      ],
      price: '70',
    },
  ],
};

export const Suggest = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        textAlign="center"
        justifyContent="center"
        width="100%"
      >
        <Typography variant="h4" fontWeight="500" mb={4}>
          RECOMMENDATIONS FOR YOU
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          justifyContent="center"
          width="100%"
        >
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
            style={{ width: '100%', height: '300px' }}
          >
            {data.products.map((product, index) => (
              <SwiperSlide key={index}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <img
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                    }}
                    src={product.images[0]}
                    alt={`Product Image ${index}`}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    textAlign="center"
                    mt={2}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="semibold"
                      color="primary"
                    >
                      {product.brand}
                    </Typography>
                    <Typography variant="body2" fontWeight="semibold" mt={1}>
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="semibold"
                      mt={1}
                      color="secondary"
                    >
                      {product.price} €
                    </Typography>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </>
  );
};
export default Suggest;
