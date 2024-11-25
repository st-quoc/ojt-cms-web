import { useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Typography,
  Avatar,
} from '@mui/material';

export const ProductList = ({ products }) => {
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
    <List
      onClick={handleProductDetailClick}
      className="space-y-4 cursor-pointer"
    >
      {products.map(product => (
        <ListItem
          key={product.id}
          className="p-4 bg-gray-50 border rounded-lg shadow-md hover:shadow-lg transition"
        >
          <ListItemAvatar>
            <Avatar
              src={product.image}
              alt={product.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
            />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                variant="h6"
                className="text-lg sm:text-xl font-semibold"
              >
                {product.name}
              </Typography>
            }
            secondary={
              <Typography
                variant="body2"
                color="textSecondary"
                className="text-gray-500 text-sm md:text-lg"
              >
                ${product.price1.toFixed(2)} - ${product.price2.toFixed(2)}
              </Typography>
            }
            className="flex-1 ml-4"
          />
          <div className="flex flex-col space-y-2">
            <Button
              variant="outlined"
              className="rounded-lg border-2 border-slate-300 bg-zinc-200 hover:bg-zinc-700 hover:text-gray-100 transition"
              onClick={e => handleCartClick(e, product.id)}
            >
              Add to Cart
            </Button>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default ProductList;
