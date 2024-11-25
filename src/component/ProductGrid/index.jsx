import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

export const ProductGrid = ({ products }) => {
  const navigate = useNavigate();

  const handleProductDetailClick = productId => {
    navigate(`/product/${productId}`);
  };

  const handleCartClick = e => {
    e.stopPropagation();
    navigate(`/cart`);
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={4} className="px-4 py-6">
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card
            onClick={() => handleProductDetailClick(product.id)}
            className="bg-gray-50 border rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            <CardMedia
              component="img"
              alt={product.name}
              image={product.image}
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto object-cover"
            />
            <CardContent className="text-center">
              <Typography
                variant="h6"
                className="text-lg sm:text-xl md:text-2xl font-semibold"
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className="text-gray-500 text-sm md:text-lg"
              >
                ${product.price1.toFixed(2)} - ${product.price2.toFixed(2)}
              </Typography>
              <div className="mt-4 space-y-2">
                <Button
                  variant="outlined"
                  fullWidth
                  className="border-2 border-slate-300 bg-zinc-200 hover:bg-zinc-700 hover:text-gray-100 transition"
                  onClick={e => handleCartClick(e, product.id)}
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
