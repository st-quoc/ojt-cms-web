import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosClient from '../../../../config/axios';
import { API_ROOT } from '../../../../constants';

const ModalCreateColor = ({ open, onClose, onCreate }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      colorName: '',
    },
  });

  const handleCreate = async data => {
    try {
      const response = await axiosClient.post(
        `${API_ROOT}/admin/color/create`,
        {
          name: data.colorName.trim(),
        },
      );
      const newColor = response.data;
      toast.success('Color created successfully!');

      onCreate(newColor);
      reset();
      onClose();
    } catch (error) {
      console.log('🚀  error  🚀', error);
      toast.error('Failed to create color!');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          padding: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Create New Color
        </Typography>

        <form onSubmit={handleSubmit(handleCreate)}>
          <Controller
            name="colorName"
            control={control}
            rules={{ required: 'Color name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Color Name"
                fullWidth
                sx={{ mb: 2 }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Color
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCreateColor;
