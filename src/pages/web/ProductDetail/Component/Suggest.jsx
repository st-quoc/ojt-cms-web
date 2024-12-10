import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';
import Slider from 'react-slick';
import useFetchProducts from '../../../../hooks/useFetchProducts';
import { useNavigate } from 'react-router-dom';

const ProductCarousel = () => {
  const { products } = useFetchProducts(null, 1, 4);
  const navigate = useNavigate();
  console.log(products);
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
      width="100%"
      margin="0 auto"
      maxWidth="1440px"
    >
      <Typography variant="h4" fontWeight="500" mb={4}>
        RECOMMENDATIONS FOR YOU
      </Typography>
      <Slider {...settings} style={{ width: '100%' }}>
        {products?.map(product => (
          <Box
            key={product.id}
            px={{ xs: 0.5, sm: 1 }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Card
              sx={{
                maxWidth: { xs: 260, sm: 200, md: 240 },
                margin: '10px auto',
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 240, width: 240, objectFit: 'cover' }}
                image={product.images[0]}
                alt={product.name}
              />
              <CardContent sx={{ height: '130px' }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  fontSize={{ xs: 12, sm: 14 }}
                >
                  {product?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Brand: {product?.categories?.[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {product?.variants?.[0]?.price} €
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
