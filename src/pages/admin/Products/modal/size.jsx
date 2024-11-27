import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosClient from '../../../../config/axios';
import { API_ROOT } from '../../../../constants';

const ModalCreateSize = ({ open, onClose, onCreate }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      sizeName: '',
    },
  });

  const handleCreate = async data => {
    try {
      const res = await axiosClient.post(`${API_ROOT}/admin/size/create`, {
        name: data.sizeName.trim(),
      });

      const newSize = res.data;
      toast.success('Size created successfully!');

      onCreate(newSize);
      reset();
      onClose();
    } catch (error) {
      console.log('🚀  error  🚀', error);
      toast.error('Failed to create size!');
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
          Create New Size
        </Typography>

        <form onSubmit={handleSubmit(handleCreate)}>
          <Controller
            name="sizeName"
            control={control}
            rules={{ required: 'Size name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Size Name"
                fullWidth
                sx={{ mb: 2 }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Size
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCreateSize;
