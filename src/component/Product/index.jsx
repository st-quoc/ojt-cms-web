import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';

export const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleProductDetailClick = () => {
    navigate(`/product/${product.id}`);
  };

  const addToCart = productId => {
    console.log('ᥫᩣ:rocket:  productId  :rocket:ᥫᩣ ', productId);
  };

  return (
    <Card className="p-4 bg-gray-50 border rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
      <CardMedia
        component="img"
        image={product.image}
        alt={product.name}
        className="mx-auto mb-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
      />
      <CardContent>
        <Typography
          variant="h6"
          className="text-lg sm:text-xl md:text-2xl font-semibold text-center"
        >
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="text-gray-500 text-sm md:text-lg text-center"
        >
          {product.items} items
        </Typography>
      </CardContent>
      <CardActions className="flex flex-col space-y-2">
        <Button
          onClick={() => addToCart(product.id)}
          variant="outlined"
          className="w-full border-2 border-slate-300 bg-zinc-200 hover:bg-zinc-700 hover:text-gray-100 transition"
        >
          Add to Cart
        </Button>
        <Button
          onClick={handleProductDetailClick}
          variant="contained"
          className="w-full bg-blue-500 text-white hover:bg-blue-700 transition"
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
