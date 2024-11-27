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
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import { API_ROOT } from '../../../constants';
import axiosClient from '../../../config/axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import InfoIcon from '@mui/icons-material/Info';

function Row(props) {
  const navigate = useNavigate();
  const { row, handleDelete } = props;
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
            alt={row.images[0]}
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
        <TableCell align="left">{row.protein}</TableCell>
        <TableCell align="left">{row.protein}</TableCell>
        <TableCell align="center">
          <Stack direction="row" spacing={1} className="justify-center">
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon onClick={() => handleDelete(row.id)} />
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
                  {row.variants.map((variant, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {variant.color}
                      </TableCell>
                      <TableCell>{variant.size}</TableCell>
                      <TableCell align="left">{variant.stock}</TableCell>
                      <TableCell align="left">{variant.price}</TableCell>
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
            },
          },
        );
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async productId => {
    try {
      await axiosClient.delete(`${API_ROOT}/admin/product/delete/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      setError('Error deleting product. Please try again later.');
      console.error('Error deleting product', error);
    }
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
      <ProductsFilter />
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
                      <TableCell align="left">
                        <strong>Total Quantity Sold</strong>
                      </TableCell>
                      <TableCell align="left">
                        <strong>Total Quantity In Stock</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Actions</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map(row => (
                      <Row
                        key={row.name}
                        row={row}
                        handleDelete={handleDelete}
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
    </Box>
  );
};
