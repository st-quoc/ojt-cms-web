import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import Slider from 'react-slick';

const data = {
  products: [
    {
      id: '1',
      name: 'Nike Airforce 1',
      brand: 'Nike',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      ],
      price: '200',
    },
    {
      id: '2',
      name: 'Nike Airforce 1',
      brand: 'Nike',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      ],
      price: '200',
    },
    {
      id: '3',
      name: 'Nike Airforce 1',
      brand: 'Nike',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      ],
      price: '200',
    },
    {
      id: '4',
      name: 'Nike Airforce 1',
      brand: 'Nike',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      ],
      price: '200',
    },
    {
      id: '6',
      name: 'Nike Airforce 1',
      brand: 'Nike',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      ],
      price: '200',
    },
    {
      id: '7',
      name: 'Nike Airforce 1',
      brand: 'Nike',
      images: [
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      ],
      price: '200',
    },
  ],
};

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      width={{ xs: '90%', sm: '85%', md: '80%' }}
      margin="0 auto"
    >
      <Typography variant="h4" fontWeight="500" mb={4}>
        RECOMMENDATIONS FOR YOU
      </Typography>
      <Slider {...settings} style={{ width: '100%' }}>
        {data.products.map(product => (
          <Box key={product.id} px={{ xs: 0.5, sm: 1 }}>
            <Card
              sx={{ maxWidth: { xs: 180, sm: 200, md: 240 }, margin: 'auto' }}
            >
              <CardMedia
                component="img"
                sx={{ height: 240, width: 240, objectFit: 'cover' }}
                image={product.images[0]}
                alt={product.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  fontSize={{ xs: 12, sm: 14 }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {product.brand}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {product.price} €
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
