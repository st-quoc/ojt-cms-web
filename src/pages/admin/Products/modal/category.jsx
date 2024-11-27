import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosClient from '../../../../config/axios';
import { API_ROOT } from '../../../../constants';
import CloudinarySingleUploader from '../../../../component/CloudinarySingleUploader';

const ModalCreateCategory = ({ open, onClose, onCreate }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      image: '',
      desc: '',
    },
  });

  const onSubmit = async data => {
    try {
      const response = await axiosClient.post(
        `${API_ROOT}/admin/category/create`,
        {
          name: data.name.trim(),
          desc: data.desc.trim(),
          image: data.image.trim(),
        },
      );

      const newCategory = response.data;
      toast.success('Category created successfully!');

      onCreate(newCategory);

      reset();
      onClose();
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category!');
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
          width: 400,
          padding: 3,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 3 }}>
          Create New Category
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Category Name"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ mb: 2 }}
              />
            )}
          />

          <Controller
            name="desc"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={3}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ mb: 3 }}
              />
            )}
          />

          <Box sx={{ mb: 2 }}>
            <Controller
              name="image"
              control={control}
              rules={{ required: 'Image URL is required' }}
              render={({ field }) => (
                <CloudinarySingleUploader
                  image={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.image && (
              <Typography color="error" variant="caption">
                {errors.image?.message}
              </Typography>
            )}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Stack direction={'row'} spacing={2}>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCreateCategory;
