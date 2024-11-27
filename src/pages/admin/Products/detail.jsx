import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Fragment, useState, useEffect } from 'react';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ROOT } from '../../../constants';
import axiosClient from '../../../config/axios';

export const DetailProductAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductDetail = async () => {
    try {
      const response = await axiosClient.get(
        `${API_ROOT}/admin/product/detail/${id}`,
      );
      setProduct(response.data.product);
      setLoading(false);
    } catch (err) {
      console.log('🚀  err  🚀', err);
      setError('Failed to load product details');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  const handleEditProduct = () => {
    navigate(`/admin/product/edit/${product.id}`, { state: { product } });
  };

  const groupByColor = variants => {
    return variants.reduce((acc, variant) => {
      const { color } = variant;
      if (!acc[color.name]) {
        acc[color.name] = [];
      }
      acc[color.name].push(variant);
      return acc;
    }, {});
  };

  const groupedByColor = groupByColor(product.variants);

  return (
    <Box className="p-4">
      <AdminPageHeader
        breadcrumbs={[
          { label: 'Admin', path: '/admin' },
          { label: 'Products', path: '/admin/products' },
          { label: product.name, path: `/admin/product/detail/${id}` },
        ]}
        buttons={[
          {
            label: 'Edit Product',
            onClick: handleEditProduct,
            variant: 'contained',
            color: 'primary',
          },
        ]}
      />
      <Divider textAlign="center" className="py-4">
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
      </Divider>

      <Paper className="p-4 mb-4" elevation={3}>
        <Typography variant="body1">
          <strong>Images:</strong>
        </Typography>
        <Box className="flex flex-wrap gap-4">
          {product.images.map((image, index) => (
            <Box item key={index} size={3}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                className="w-[150px]"
              />
            </Box>
          ))}
        </Box>
      </Paper>

      <Paper className="p-4 mb-4" elevation={3}>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          <strong>Variants:</strong>
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Color</strong>
                </TableCell>
                <TableCell>
                  <strong>Size</strong>
                </TableCell>
                <TableCell>
                  <strong>Stock</strong>
                </TableCell>
                <TableCell>
                  <strong>Price</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(groupedByColor).map((color, index) => (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <strong>{color}</strong>
                    </TableCell>
                  </TableRow>
                  {groupedByColor[color].map((variant, idx) => (
                    <TableRow key={idx}>
                      <TableCell></TableCell>
                      <TableCell>{variant.size.name}</TableCell>
                      <TableCell>{variant.stock}</TableCell>
                      <TableCell>${variant.price}</TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper className="p-4" elevation={3}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1">
              <strong>Category:</strong>
            </Typography>
            <Stack direction="row">
              <Chip
                label={product.categories.join(', ')}
                className="cursor-pointer"
              />
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">
              <strong>Short Description:</strong>
            </Typography>
            <Box>{product.sortDesc}</Box>
          </Stack>
          <Stack spacing={1}>
            <Typography variant="body1">
              <strong>Description:</strong>
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: product.description }} />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
