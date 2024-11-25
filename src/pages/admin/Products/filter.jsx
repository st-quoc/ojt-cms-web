import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Popover,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

export const ProductsFilter = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceMin: '',
    priceMax: '',
    color: '',
    size: '',
    stockCondition: '>',
    stockValue: '',
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickFiltersButton = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const newActiveFilters = [];

    if (filters.search) newActiveFilters.push(`Search: ${filters.search}`);
    if (filters.category)
      newActiveFilters.push(`Category: ${filters.category}`);
    if (filters.priceMin || filters.priceMax)
      newActiveFilters.push(
        `Price: ${filters.priceMin || 0} - ${filters.priceMax || '∞'}`,
      );
    if (filters.color) newActiveFilters.push(`Color: ${filters.color}`);
    if (filters.size) newActiveFilters.push(`Size: ${filters.size}`);
    if (filters.stockValue)
      newActiveFilters.push(
        `Stock: ${filters.stockCondition} ${filters.stockValue}`,
      );

    setActiveFilters(newActiveFilters);
    handleClose();
  };

  const removeFilter = filterText => {
    setActiveFilters(prev => prev.filter(f => f !== filterText));

    if (filterText.startsWith('Search')) handleFilterChange('search', '');
    if (filterText.startsWith('Category')) handleFilterChange('category', '');
    if (filterText.startsWith('Price')) {
      handleFilterChange('priceMin', '');
      handleFilterChange('priceMax', '');
    }
    if (filterText.startsWith('Color')) handleFilterChange('color', '');
    if (filterText.startsWith('Size')) handleFilterChange('size', '');
    if (filterText.startsWith('Stock')) {
      handleFilterChange('stockCondition', '>');
      handleFilterChange('stockValue', '');
    }
  };

  const open = Boolean(anchorEl);

  return (
    <Paper elevation={3} className="p-3">
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          onClick={handleClickFiltersButton}
          size="small"
        >
          Filters
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box className="p-4" sx={{ width: 300 }}>
            <FormControl fullWidth size="small" margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={filters.category}
                onChange={e => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Home">Home</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2}>
              <TextField
                label="Min Price"
                type="number"
                size="small"
                value={filters.priceMin}
                onChange={e => handleFilterChange('priceMin', e.target.value)}
              />
              <TextField
                label="Max Price"
                type="number"
                size="small"
                value={filters.priceMax}
                onChange={e => handleFilterChange('priceMax', e.target.value)}
              />
            </Stack>

            <FormControl fullWidth size="small" margin="normal">
              <InputLabel>Color</InputLabel>
              <Select
                value={filters.color}
                onChange={e => handleFilterChange('color', e.target.value)}
              >
                <MenuItem value="Red">Red</MenuItem>
                <MenuItem value="Blue">Blue</MenuItem>
                <MenuItem value="Green">Green</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" margin="normal">
              <InputLabel>Size</InputLabel>
              <Select
                value={filters.size}
                onChange={e => handleFilterChange('size', e.target.value)}
              >
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2}>
              <FormControl size="small">
                <Select
                  value={filters.stockCondition}
                  onChange={e =>
                    handleFilterChange('stockCondition', e.target.value)
                  }
                >
                  <MenuItem value=">">{'>'}</MenuItem>
                  <MenuItem value="<">{'<'}</MenuItem>
                  <MenuItem value="=">{'='}</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Stock"
                type="number"
                size="small"
                value={filters.stockValue}
                onChange={e => handleFilterChange('stockValue', e.target.value)}
              />
            </Stack>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="outlined" onClick={() => setFilters({})}>
                Clear
              </Button>
              <Button variant="contained" onClick={applyFilters}>
                Apply
              </Button>
            </Stack>
          </Box>
        </Popover>

        <Box>
          <FormControl sx={{ m: 0, width: '25ch' }} variant="outlined">
            <InputLabel size="small">Search product...</InputLabel>
            <OutlinedInput
              size="small"
              type="text"
              label="Search product..."
              value={filters.search}
              onChange={e => handleFilterChange('search', e.target.value)}
              endAdornment={
                filters.search && (
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
        </Box>
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
    </Paper>
  );
};
