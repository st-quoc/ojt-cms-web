import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Paper,
  Stack,
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Editor } from '../../../component/Editor';
import CloudinaryMultipleUploader from '../../../component/CloudinaryMultipleUploader';
import { ProductVariantsForm } from './ProductVariantsForm';
import ModalCreateColor from './modal/color';
import ModalCreateSize from './modal/size';
import { rules } from './validator';
import { API_ROOT } from '../../../constants';
import axiosClient from '../../../config/axios';

export const ProductForm = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const [colorOptions, setColorOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openColorModal, setOpenColorModal] = useState(false);
  const [openSizeModal, setOpenSizeModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sizeResponse = await axiosClient.get(
          `${API_ROOT}/admin/size/list`,
        );
        setSizeOptions(sizeResponse.data);

        const colorResponse = await axiosClient.get(
          `${API_ROOT}/admin/color/list`,
        );
        setColorOptions(colorResponse.data);

        const categoryResponse = await axiosClient.get(
          `${API_ROOT}/admin/category/list`,
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleAddColor = newColor => {
    setColorOptions(prev => [...prev, newColor]);
  };

  const handleAddSize = newSize => {
    setSizeOptions(prev => [...prev, newSize]);
  };

  return (
    <Box className="max-w-[1000px] mx-auto">
      <ModalCreateColor
        open={openColorModal}
        onClose={() => setOpenColorModal(false)}
        onCreate={handleAddColor}
      />
      <ModalCreateSize
        open={openSizeModal}
        onClose={() => setOpenSizeModal(false)}
        onCreate={handleAddSize}
      />
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <Paper className="p-4 mb-4" elevation={3}>
          <Stack spacing={2}>
            <Typography variant="body1">
              <strong>Information:</strong>
            </Typography>
            <Controller
              name="name"
              control={control}
              rules={rules.name}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Tên sản phẩm"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <FormControl fullWidth>
              <InputLabel>Categories</InputLabel>
              <Controller
                name="categories"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    input={<OutlinedInput label="Categories" />}
                    fullWidth
                    error={!!errors.categories}
                  >
                    {categories.map(cate => (
                      <MenuItem key={cate.id} value={cate.id}>
                        {cate.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.categories && (
                <Typography color="error" variant="caption">
                  {errors.categories?.message}
                </Typography>
              )}
            </FormControl>
          </Stack>
        </Paper>

        <ProductVariantsForm
          variants={defaultValues.variants}
          rules={rules.variants}
          control={control}
          errors={errors}
          colorOptions={colorOptions}
          sizeOptions={sizeOptions}
          openColorModal={openColorModal}
          openSizeModal={openSizeModal}
          onCreateNewColor={() => setOpenColorModal(true)}
          onCreateNewSize={() => setOpenSizeModal(true)}
        />

        <Paper className="p-4 mb-4" elevation={3}>
          <FormControl fullWidth>
            <Stack spacing={2}>
              <Typography variant="body1">
                <strong>Images:</strong>
              </Typography>
              <Controller
                name="images"
                control={control}
                rules={rules.images}
                defaultValue={[]}
                render={({ field }) => (
                  <CloudinaryMultipleUploader
                    images={field.value || []}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.images && (
                <Typography color="error" variant="caption">
                  {errors.images?.message}
                </Typography>
              )}
            </Stack>
          </FormControl>
        </Paper>

        <Paper className="p-4 mb-4" elevation={3}>
          <Stack spacing={2}>
            <Typography variant="body1">
              <strong>Short Description:</strong>
            </Typography>
            <Controller
              name="sortDesc"
              control={control}
              rules={rules.sortDesc}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Short Description"
                  multiline
                  error={!!errors.sortDesc}
                  helperText={errors.sortDesc?.message}
                />
              )}
            />
            <Typography variant="body1">
              <strong>Full Description:</strong>
            </Typography>
            <Controller
              name="fullDesc"
              control={control}
              rules={rules.fullDesc}
              render={({ field }) => (
                <Editor
                  initialData={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.fullDesc && (
              <Typography color="error" variant="caption">
                {errors.fullDesc?.message}
              </Typography>
            )}
          </Stack>
        </Paper>

        <Stack spacing={2} direction="row">
          <Box>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Box>
          <Box>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};
