import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import { ProductsFilter } from './filter';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  Alert,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Stack,
  Tooltip,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { API_ROOT } from '../../../constants';
import axiosClient from '../../../config/axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

function Row(props) {
  const navigate = useNavigate();
  const { row, handleOpenDialog } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          <img
            src={row.images[0]}
            alt={row.name}
            className="w-[50px] h-[50px] object-cover"
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left">
          {row.categories?.map((cate, index) => (
            <Chip key={index} label={cate} />
          ))}
        </TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1} className="justify-center">
            <Tooltip title="Delete">
              <IconButton onClick={() => handleOpenDialog(row.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => navigate(`/admin/product/edit/${row.id}`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Detail">
              <IconButton
                onClick={() => navigate(`/admin/product/detail/${row.id}`)}
              >
                <InfoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change status">
              <IconButton>
                <AutorenewIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <strong>Variants</strong>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">
                      <strong>Color</strong>
                    </TableCell>
                    <TableCell align="left">
                      <strong>Size</strong>
                    </TableCell>
                    <TableCell align="left">
                      <strong>Stock</strong>
                    </TableCell>
                    <TableCell align="left">
                      <strong>Price</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.variants &&
                    row.variants.length > 0 &&
                    row.variants.map((variant, index) => (
                      <TableRow key={index}>
                        <TableCell>{variant.color}</TableCell>
                        <TableCell>{variant.size}</TableCell>
                        <TableCell>{variant.stock}</TableCell>
                        <TableCell>{variant.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export const ProductsListAdmin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    category: [],
    priceMin: 0,
    priceMax: 999999999,
    color: [],
    size: [],
    stockCondition: '>',
    stockValue: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosClient.get(
          `${API_ROOT}/admin/product/list`,
          {
            params: {
              page: page + 1,
              limit: rowsPerPage,
              ...filters,
            },
          },
        );
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
        setPage(0);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage, filters]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = productId => {
    setProductToDelete(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await axiosClient.delete(
          `${API_ROOT}/admin/product/delete/${productToDelete}`,
        );

        const response = await axiosClient.get(
          `${API_ROOT}/admin/product/list`,
          {
            params: {
              page: page + 1,
              limit: rowsPerPage,
            },
          },
        );
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);

        handleCloseDialog();
      } catch (error) {
        setError('Error deleting product. Please try again later.');
        console.error('Error deleting product', error);
      }
    }
  };

  const clearSearch = () => {
    setFilters({
      ...filters,
      search: '',
    });
    setPage(0);
  };

  const handleSearchChange = event => {
    setFilters({
      ...filters,
      search: event.target.value,
    });
    setPage(0);
  };

  return (
    <Box className="p-4">
      <AdminPageHeader
        breadcrumbs={[
          { label: 'Admin', path: '/admin' },
          { label: 'Products', path: '/admin/products' },
        ]}
        buttons={[
          {
            label: 'Add Product',
            onClick: () => navigate('/admin/product/create'),
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
      <Paper elevation={3} className="p-3">
        <Stack direction={'row'} justifyContent="space-between">
          <ProductsFilter filters={filters} setFilters={setFilters} />
          <Box>
            <FormControl sx={{ m: 0, width: '25ch' }} variant="outlined">
              <InputLabel size="small">Search product...</InputLabel>
              <OutlinedInput
                size="small"
                type="text"
                label="Search product..."
                value={filters.search}
                onChange={handleSearchChange}
                endAdornment={
                  filters.search && (
                    <InputAdornment
                      position="end"
                      onClick={clearSearch}
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
      </Paper>
      <Divider textAlign="center" className="py-4">
        PRODUCTS
      </Divider>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="200px"
        >
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <>
          {products.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              No products available.
            </Typography>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>
                        <strong>Images</strong>
                      </TableCell>
                      <TableCell align="left">
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell align="left">
                        <strong>Categories</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Actions</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map(row => (
                      <Row
                        key={row._id}
                        row={row}
                        handleOpenDialog={handleOpenDialog}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalProducts}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
