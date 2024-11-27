import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export const ProductsListFilter = ({ onFilterApply }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterChange = (name, value) => {
    setValue(name, value);
  };

  const applyFilters = data => {
    const newActiveFilters = [];

    if (data.search) newActiveFilters.push(`Search: ${data.search}`);
    if (data.category) newActiveFilters.push(`Category: ${data.category}`);
    if (data.priceMin || data.priceMax)
      newActiveFilters.push(
        `Price: ${data.priceMin || 0} - ${data.priceMax || '∞'}`,
      );
    if (data.color) newActiveFilters.push(`Color: ${data.color}`);
    if (data.size) newActiveFilters.push(`Size: ${data.size}`);
    if (data.stockValue)
      newActiveFilters.push(`Stock: ${data.stockCondition} ${data.stockValue}`);

    setActiveFilters(newActiveFilters);
    onFilterApply(data);
  };

  const removeFilter = filterText => {
    setActiveFilters(prev => prev.filter(f => f !== filterText));
    if (filterText.startsWith('Search')) setValue('search', '');
    if (filterText.startsWith('Category')) setValue('category', '');
    if (filterText.startsWith('Price')) {
      setValue('priceMin', '');
      setValue('priceMax', '');
    }
    if (filterText.startsWith('Color')) setValue('color', '');
    if (filterText.startsWith('Size')) setValue('size', '');
    if (filterText.startsWith('Stock')) {
      setValue('stockCondition', '>');
      setValue('stockValue', '');
    }
  };

  return (
    <Box className="p-3">
      <Stack spacing={2} sx={{ width: 300 }}>
        <Stack spacing={1}>
          <Typography>Search name product:</Typography>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ m: 0 }} fullWidth variant="outlined">
                <InputLabel size="small">Search product...</InputLabel>
                <OutlinedInput
                  {...field}
                  size="small"
                  label="Search product..."
                  endAdornment={
                    field.value && (
                      <InputAdornment
                        position="end"
                        onClick={() => handleFilterChange('search', '')}
                        className="cursor-pointer"
                      >
                        <ClearIcon />
                      </InputAdornment>
                    )
                  }
                />
              </FormControl>
            )}
          />
        </Stack>

        <Stack spacing={1}>
          <Typography>Filters products:</Typography>

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small" margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  {...field}
                  label="Category"
                  onChange={e => handleFilterChange('category', e.target.value)}
                >
                  <MenuItem value="Electronics">Electronics</MenuItem>
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Home">Home</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Stack direction="row" spacing={2}>
            <Controller
              name="priceMin"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Min Price"
                  type="number"
                  size="small"
                  onChange={e => handleFilterChange('priceMin', e.target.value)}
                />
              )}
            />
            <Controller
              name="priceMax"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Max Price"
                  type="number"
                  size="small"
                  onChange={e => handleFilterChange('priceMax', e.target.value)}
                />
              )}
            />
          </Stack>

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small" margin="normal">
                <InputLabel>Color</InputLabel>
                <Select
                  {...field}
                  label="Color"
                  onChange={e => handleFilterChange('color', e.target.value)}
                >
                  <MenuItem value="Red">Red</MenuItem>
                  <MenuItem value="Blue">Blue</MenuItem>
                  <MenuItem value="Green">Green</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small" margin="normal">
                <InputLabel>Size</InputLabel>
                <Select
                  {...field}
                  label="Size"
                  onChange={e => handleFilterChange('size', e.target.value)}
                >
                  <MenuItem value="S">S</MenuItem>
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                </Select>
              </FormControl>
            )}
          />

          <Stack direction="row" spacing={2}>
            <Controller
              name="stockCondition"
              control={control}
              render={({ field }) => (
                <FormControl size="small">
                  <Select
                    {...field}
                    onChange={e =>
                      handleFilterChange('stockCondition', e.target.value)
                    }
                  >
                    <MenuItem value=">">{'>'}</MenuItem>
                    <MenuItem value="<">{'<'}</MenuItem>
                    <MenuItem value="=">{'='}</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="stockValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stock"
                  type="number"
                  size="small"
                  onChange={e =>
                    handleFilterChange('stockValue', e.target.value)
                  }
                />
              )}
            />
          </Stack>

          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="outlined" onClick={() => handleFilterChange('')}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleSubmit(applyFilters)}>
              Apply
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        mt={activeFilters.length > 0 ? 2 : 0}
        flexWrap="wrap"
      >
        {activeFilters.map((filter, index) => (
          <Chip
            key={index}
            label={filter}
            onDelete={() => removeFilter(filter)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Stack>
    </Box>
  );
};
