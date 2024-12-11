import {
  Dialog,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const RegisterPopup = ({ open, onClose, onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  const onSubmit = data => {
    onRegister(data);
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
          minHeight: isMobile ? 'auto' : '500px',
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
          CREATE ACCOUNT
        </Typography>
        <Typography variant="body1">Join us today!</Typography>
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
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Full Name is required.' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name *"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            rules={{
              required: 'Phone Number is required.',
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: 'Enter a valid phone number.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number *"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address.',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email *"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required.' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Confirm Password is required.',
              validate: value =>
                value === password || 'Passwords do not match.',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password *"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              width: '100%',
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default RegisterPopup;
