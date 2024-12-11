import { useState } from 'react';
import {
  Dialog,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPopup = ({ open, onClose, onLogin, setRegisterOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    onLogin({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiPaper-root': {
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          minHeight: isMobile ? 'auto' : '400px',
          borderRadius: '16px',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          textAlign: 'center',
          p: isMobile ? 2 : 0,
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} fontWeight="bold">
          STEP INTO STYLE LIFE
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: isMobile ? 'wrap' : 'nowrap',
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '10% 30% 20% 90%',
              width: isMobile ? '40px' : 'auto',
            }}
          >
            S
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '30%',
              width: isMobile ? '40px' : 'auto',
            }}
          >
            t i e r
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '30% 10% 90% 20%',
              width: isMobile ? '40px' : 'auto',
            }}
          >
            S
          </Button>
        </Box>
        <Typography variant={isMobile ? 'h7' : 'h8'} fontWeight="normal">
          Join us today!
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          p: isMobile ? 2 : 3,
        }}
      >
        <TextField
          label="Username"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleLogin}
          sx={{
            width: '100%',
            backgroundColor: '#000',
            color: '#fff',
          }}
        >
          Login
        </Button>
        <Box>
          <Typography variant="body2">
            Don&apos;t have an account? &nbsp;
            <i
              style={{ cursor: 'pointer', color: '#1976d2' }}
              onClick={() => {
                onClose();
                setRegisterOpen(true);
              }}
            >
              Register
            </i>
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginPopup;
