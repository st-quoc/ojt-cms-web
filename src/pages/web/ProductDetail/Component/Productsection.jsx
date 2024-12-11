import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography, Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import 'swiper/css';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../../context/CartContext';

export const Product = ({ product }) => {
  const defaultVariant = product?.variants?.[0] || {};
  const defaultColor = defaultVariant?.color?.name || '';
  const defaultSize = defaultVariant?.size?.name || '';
  const { productId } = useParams();
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const [price, setPrice] = useState(null);
  const [listColor, setListColor] = useState([]);
  const { addToCart } = useCart();

  const handleColorClick = color => {
    setSelectedColor(color);
    setPrice(0);

    const variant = product.variants.find(
      variant => variant.color.name === color,
    );
    if (variant) {
      setPrice(variant.price);
    }
  };

  const handleSizeClick = size => {
    setSelectedSize(size);

    const variant = product.variants.find(
      variant =>
        variant.color.name === selectedColor && variant.size.name === size,
    );
    if (variant) {
      setPrice(variant.price);
    }
  };

  const handleAddToCart = async () => {
    const variants = product.variants;
    const findSize = variants.find(item => item.size.name === selectedSize);
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    const data = {
      name: product?.name,
      productId,
      price,
      quantity: 1,
      colorId: findSize?.color._id,
      sizeId: findSize?.size._id,
      userId: storedUserInfo.id,
    };
    addToCart({
      productId: productId,
      ...data,
    });
  };

  useEffect(() => {
    if (product?.variants) {
      const uniqueColors = Array.from(
        new Set(product.variants.map(variant => variant.color.name)),
      );
      setListColor(uniqueColors);
    }
  }, [product?.variants]);

  useEffect(() => {
    setSelectedColor(defaultColor);
    setSelectedSize(defaultSize);

    const variant = product?.variants?.find(
      variant =>
        variant.color.name === defaultColor &&
        variant.size.name === defaultSize,
    );
    if (variant) {
      setPrice(variant.price);
    }
  }, [product, defaultColor, defaultSize]);

  const isValidColor = color => {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const formattedPrice = Number(price)?.toLocaleString('vi-VN');
  return (
    <Box
      sx={{ px: 1, py: 6 }}
      width="100%"
      maxWidth="1440px"
      margin="0 auto"
      padding="0px 52px"
    >
      <Grid container gap={4} justifyContent="center" width="100%">
        <Grid
          item
          xs={12}
          md={6}
          width="63%"
          height="600px"
          sx={{ width: { xs: '100%', lg: '63%' } }}
        >
          <Box
            display="flex"
            alignItems="center"
            width="100%"
            justifyContent="center"
          >
            <Slider {...settings} style={{ width: '100%', height: 'auto' }}>
              {product?.images.map((image, index) => (
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
          sx={{ width: { xs: '100%', lg: '34%' } }}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          pl={1}
        >
          <Typography variant="h5" fontWeight="bold">
            {product?.categories
              ?.slice(0, 1)
              .map(item => item.name)
              .join(', ') || 'No categories available'}
          </Typography>
          <Typography variant="subtitle" color="text.secondary" mt={1}>
            {product?.name}
          </Typography>
          <Typography variant="h6" fontWeight="bold" mt={2}>
            {formattedPrice} VND
          </Typography>

          <Box mb={4}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              COLOR: {selectedColor || 'Select a color'}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={2}>
              {listColor?.map((colorObj, index) => {
                const colors = colorObj.split('-');
                return (
                  <Box
                    key={index}
                    onClick={() => handleColorClick(colorObj)}
                    sx={{
                      ...(colors.length === 2
                        ? {
                            background: `linear-gradient(45deg, ${colors[0].toLowerCase()} 50%, ${colors[1].toLowerCase()} 50%)`,
                          }
                        : {
                            bgcolor: isValidColor(colorObj)
                              ? colorObj.toLowerCase()
                              : 'transparent',
                            background: isValidColor(colorObj)
                              ? undefined
                              : `linear-gradient(
                  135deg,
                  #e5e4e2,   
                  #c8c8c8,   
                  #d3d3d3,   
                  #e5e4e2    
                )`,
                          }),
                      height: '50px',
                      width: '50px',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      border:
                        selectedColor === colorObj
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
              {product?.variants
                .filter(variant => variant.color.name === selectedColor)
                .map(variant => variant.size.name)
                .map(size => (
                  <Grid item key={size}>
                    <Button
                      onClick={() => handleSizeClick(size)}
                      variant={selectedSize === size ? 'contained' : 'outlined'}
                      sx={{
                        py: 1,
                        px: 2,
                        borderColor: 'black',
                        color: selectedSize === size ? 'white' : 'black',
                        bgcolor:
                          selectedSize === size ? 'black' : 'transparent',
                        '&:hover': {
                          bgcolor: 'black',
                          color: 'white',
                        },
                      }}
                    >
                      {size}
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
            onClick={() => handleAddToCart()}
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
          sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
        >
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="65%"
            sx={{ width: { xs: '100%', lg: '65%' } }}
            pr={{ xs: 0, lg: 3 }}
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
              dangerouslySetInnerHTML={{ __html: product?.fullDesc }}
            ></Typography>
          </Grid>

          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="35%"
            sx={{ width: { xs: '100%', lg: '35%' } }}
            pl={{ xs: 0, lg: 2 }}
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
              { label: 'Brand:', value: product?.categories?.[0]?.name },
              { label: 'Colors:', value: listColor.join(', ') },
              {
                label: 'Category:',
                value: product?.categories
                  ?.slice(1)
                  .map(item => item.name)
                  .join(', '),
              },
              {
                label: 'Sizes:',
                value: product?.variants
                  .filter(variant => variant.color.name === selectedColor)
                  .map(variant => variant.size.name)
                  .map(size => size)
                  .join(', '),
              },
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
