import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export const Banner = ({ name }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleShopClick = () => {
    navigate('/products');
  };

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          backgroundImage:
            'url(https://i.pinimg.com/1200x/e3/24/90/e324906d9c8a3b0439753b2fc958f83c.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px',
        }}
      >
        <Box
          sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0, 0, 0, 0.3)' }}
        />
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'white',
          }}
        >
          <Typography variant="h3" fontWeight="bold">
            SHOP
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <HomeIcon
              onClick={handleHomeClick}
              sx={{ mx: 1, fontSize: 24, color: 'white', cursor: 'pointer' }}
            />
            <Typography
              onClick={handleShopClick}
              sx={{ mx: 1, cursor: 'pointer', color: 'white' }}
            >
              Shop
            </Typography>
            <Typography sx={{ mx: 1 }}>/</Typography>
            <Typography color="orange">{name}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Banner;
