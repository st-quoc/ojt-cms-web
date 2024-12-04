import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography, Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import 'swiper/css';
const data = {
  product: {
    id: '1',
    name: 'Nike Airforce 1',
    brand: 'Nike',
    details:
      'The adidas Campus is a true classic when it comes to streetwear. Originally designed for the basketball court, it soon became a favorite of the most diverse subcultures. These Campus 00s play with proportions and give the legendary silhouette a stylish makeover with their college-style colorway. It comes with a high-quality suede upper in grey, black contrasts in the 3 stripes, the logo details and the heel as well as a classic midsole in off-white.',
    images: [
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/AIR+FORCE+1+%2707.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a0a300da-2e16-4483-ba64-9815cf0598ac/AIR+FORCE+1+%2707.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/82aa97ed-98bf-4b6f-9d0b-31a9f907077b/AIR+FORCE+1+%2707.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ef92df87-6098-4fa5-bc88-7107492febcf/AIR+FORCE+1+%2707.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/120a31b0-efa7-41c7-9a84-87b1e56ab9c3/AIR+FORCE+1+%2707.png',
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1c1e5f55-99c2-4522-b398-2352e01ba566/AIR+FORCE+1+%2707.png',
    ],
    color: [
      {
        red: [
          { size: '35', quantity: 5 },
          { size: '36', quantity: 5 },
          { size: '37', quantity: 5 },
          { size: '38', quantity: 5 },
          { size: '39', quantity: 5 },
          { size: '40', quantity: 5 },
          { size: '41', quantity: 5 },
          { size: '42', quantity: 5 },
        ],
      },
      {
        white: [
          { size: '38', quantity: 5 },
          { size: '39', quantity: 5 },
          { size: '40', quantity: 5 },
          { size: '41', quantity: 5 },
          { size: '42', quantity: 5 },
          { size: '43', quantity: 5 },
          { size: '44', quantity: 5 },
          { size: '45', quantity: 5 },
          { size: '46', quantity: 5 },
          { size: '47', quantity: 5 },
        ],
      },
    ],
    price: '200',
    releaseDate: '2023-09-15',
    category: 'Sneakers',
  },
};
export const Product = () => {
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedSize, setSelectedSize] = useState(null);
  const handleColorClick = color => {
    setSelectedColor(color);
    setSelectedSize(null);
  };
  const handleSizeClick = size => {
    setSelectedSize(size);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Box
      sx={{ px: 1, py: 6 }}
      width="100%"
      maxWidth="1440px"
      margin="0 auto"
      padding="0px 52px"
    >
      <Grid container gap={4} justifyContent="center" width="100%">
        <Grid item xs={12} md={6} width="63%" height="600px">
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            justifyContent="center"
          >
            <Slider {...settings} style={{ width: '100%', height: 'auto' }}>
              {data.product.images.map((image, index) => (
                <Box key={index}>
                  <Box
                    component="img"
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      maxHeight: '550px',
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          width="34%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          pl={1}
        >
          <Typography variant="h5" fontWeight="bold">
            {data.product.brand}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={1}>
            {data.product.name}
          </Typography>
          <Typography variant="h6" fontWeight="bold" mt={2}>
            {data.product.price} €
          </Typography>

          <Box mb={4}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              COLOR: {selectedColor || 'Select a color'}
            </Typography>
            <Box display="flex" gap={2}>
              {data.product.color.map((colorObj, index) => {
                const colorName = Object.keys(colorObj)[0];
                return (
                  <Box
                    key={index}
                    onClick={() => handleColorClick(colorName)}
                    sx={{
                      bgcolor: colorName.toLowerCase(),
                      height: '50px',
                      width: '50px',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border:
                        selectedColor === colorName
                          ? '2px solid black'
                          : '1px solid grey',
                    }}
                  />
                );
              })}
            </Box>
          </Box>

          <Box mb={6}>
            <Typography
              variant="body2"
              fontWeight="bold"
              color="text.primary"
              mb={2}
            >
              SIZE
            </Typography>
            <Grid container spacing={1}>
              {selectedColor &&
                data.product.color
                  .find(colorObj => colorObj[selectedColor])
                  [selectedColor].map(sizeObj => (
                    <Grid item key={sizeObj.size}>
                      <Button
                        onClick={() => handleSizeClick(sizeObj.size)}
                        variant={
                          selectedSize === sizeObj.size
                            ? 'contained'
                            : 'outlined'
                        }
                        sx={{
                          py: 1,
                          px: 2,
                          borderColor: 'black',
                          color:
                            selectedSize === sizeObj.size ? 'white' : 'black',
                          bgcolor:
                            selectedSize === sizeObj.size
                              ? 'black'
                              : 'transparent',
                          '&:hover': {
                            bgcolor: 'black',
                            color: 'white',
                          },
                        }}
                      >
                        {sizeObj.size}
                      </Button>
                    </Grid>
                  ))}
            </Grid>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: 'black',
              color: 'white',
              py: 2,
              px: 4,
              width: '100%',
              border: '2px solid black',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              mb: 6,
              '&:hover': {
                bgcolor: 'white',
                color: 'black',
              },
            }}
          >
            ADD TO CART
          </Button>

          <Divider sx={{ borderColor: 'black', mt: 6 }} />
        </Grid>
      </Grid>

      <Grid container gap={4} justifyContent="center" width="100%">
        <Grid
          item
          xs={12}
          md={7}
          display="flex"
          flexDirection="row"
          alignItems="flex-start"
          width="100%"
        >
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="65%"
            pr={3}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="left">
              DETAILS
            </Typography>
            <Divider
              sx={{
                borderColor: 'black',
                borderWidth: '1.5px',
                mb: 2,
                width: '100%',
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'justify' }}
            >
              {data.product.details}
            </Typography>
          </Grid>

          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="35%"
            pl={2}
          >
            <Typography variant="h6" fontWeight="bold" textAlign="left">
              FACTS
            </Typography>
            <Divider
              sx={{
                borderColor: 'black',
                borderWidth: '1.5px',
                mb: 2,
                width: '100%',
              }}
            />
            {[
              { label: 'Brand:', value: data.product.brand },
              { label: 'Manufacturer ID:', value: data.product.id },
              { label: 'Color:', value: selectedColor },
              { label: 'Category:', value: data.product.category },
              { label: 'Release Date:', value: data.product.releaseDate },
            ].map((fact, index) => (
              <Box
                display="flex"
                width="100%"
                mb={1}
                key={index}
                alignItems="flex-start"
              >
                <Box
                  sx={{
                    minWidth: '180px',
                    marginRight: '20px',
                    textAlign: 'left',
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {fact.label}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body2" color="text.secondary">
                    {fact.value}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
