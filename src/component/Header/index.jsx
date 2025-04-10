import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import LoginPopup from '../../pages/login/Login';
import RegisterPopup from '../../pages/login/Register';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ROOT } from '../../constants';
import logo from '../../assets/logo.png';
import { useUser } from '../../context/UserProvider';

export const Header = () => {
  const { user, fetchUser, setUser } = useUser();
  const [isScrolled, setScrolled] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { getTotalItems, fetchCart, clearCart } = useCart();
  const cartQuantity = getTotalItems();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      setDrawerOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLogin = () => setLoginOpen(true);
  const handleCloseLogin = () => setLoginOpen(false);

  const handleCloseRegister = () => setRegisterOpen(false);

  const handleLogin = async data => {
    try {
      const res = await axios.post(`${API_ROOT}/user/login`, {
        email: data.email,
        password: data.password,
      });
      const userInfo = {
        id: res.data.id,
        email: res.data.email,
        avatar: res.data.avatar,
      };

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      fetchCart();
      fetchUser();
      setLoginOpen(false);
      setOpenUserMenu(false);
      navigate('/');
    } catch {
      toast.error('Login failed!');
    }
  };

  const handleRegister = async data => {
    try {
      await axios.post(`${API_ROOT}/user/register`, {
        ...data,
      });
      toast.success('Registration successful! Please log in.');
      setRegisterOpen(false);
      setLoginOpen(true);
    } catch {
      toast.error('Registration failed!');
    }
  };

  const handleNavigate = path => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearCart();
    setUser(null);
    navigate('/');
  };

  const toggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  const handleMenuClick = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const handleCartClick = () => {
    if (!user) {
      handleOpenLogin();
    } else {
      handleNavigate('/cart');
    }
  };

  const MENU = [
    { label: 'HOME', path: '/' },
    { label: 'SHOP', path: '/products' },
    { label: 'ABOUT US', path: '/about-us' },
    { label: 'BLOGS', path: '/blogs' },
  ];

  return (
    <>
      <LoginPopup
        open={isLoginOpen}
        onClose={handleCloseLogin}
        onLogin={handleLogin}
        setRegisterOpen={setRegisterOpen}
      />
      <RegisterPopup
        open={isRegisterOpen}
        onClose={handleCloseRegister}
        onRegister={handleRegister}
      />

      <AppBar
        position="sticky"
        color="default"
        sx={{
          boxShadow: 0,
          transition: 'box-shadow 0.3s',
          background: 'transparent',
          py: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: isScrolled ? '#eceeff' : 'transparent',
              borderRadius: 15,
              boxShadow: isScrolled ? 2 : 0,
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between', height: '100%' }}>
              <Box>
                <img
                  src={logo}
                  alt="S-TIER"
                  style={{ height: 90, cursor: 'pointer' }}
                />
              </Box>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                {MENU.map((menu, index) => (
                  <Button
                    key={index}
                    onClick={() => handleNavigate(menu.path)}
                    sx={{ color: 'inherit' }}
                  >
                    {menu.label}
                  </Button>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={handleCartClick}>
                  <Badge badgeContent={cartQuantity} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                {user ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      position: 'relative',
                    }}
                  >
                    <IconButton onClick={handleMenuClick}>
                      <Avatar
                        alt={user.email}
                        src={user.avatar || '/default-avatar.png'}
                        sx={{ width: 40, height: 40 }}
                      />
                    </IconButton>
                    <List
                      sx={{
                        position: 'absolute',
                        background: '#fff',
                        top: 60,
                        right: 0,
                        height: openUserMenu ? 'unset' : 0,
                        overflow: 'hidden',
                        borderRadius: 2,
                        boxShadow: 4,
                        p: 0,
                        width: '200px',
                        minWidth: '150px',
                        transition: 'width 0.3s ease',
                      }}
                    >
                      <ListItem>
                        <ListItemButton
                          onClick={() => {
                            setOpenUserMenu(false);
                            handleNavigate('/profile');
                          }}
                        >
                          Profile
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton
                          onClick={() => {
                            setOpenUserMenu(false);
                            handleNavigate('/order');
                          }}
                        >
                          My Order
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton onClick={handleLogout}>
                          Logout
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                ) : (
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={handleOpenLogin}
                    sx={{ textTransform: 'none' }}
                  >
                    Login / Register
                  </Button>
                )}
                <IconButton
                  sx={{ display: { xs: 'block', md: 'none' } }}
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Box>
        </Container>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          position: 'fixed',
          top: '100px',
          left: 0,
          right: 0,
          display: { xs: 'block', md: 'none' },
          backgroundColor: 'transparent',
          transition: 'all 0.3s ease-in-out',
          height: isDrawerOpen ? 'unset' : 0,
          overflow: 'hidden',
          zIndex: 9999999999,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: 5,
            p: 3,
            m: 2,
            boxShadow: 2,
          }}
        >
          <List>
            {MENU.map((menu, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleNavigate(menu.path);
                    toggleDrawer();
                  }}
                >
                  <ListItemText primary={menu.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
};

export default Header;
