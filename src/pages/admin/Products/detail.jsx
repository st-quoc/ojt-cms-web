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
import { Fragment } from 'react';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { useNavigate } from 'react-router-dom';

export const DetailProductAdmin = () => {
  const navigate = useNavigate();

  const handleEditProduct = () => {
    navigate(`/admin/product/edit/${product.id}`, { state: { product } });
  };
  const product = {
    id: 1,
    name: 'Running Shoes',
    images: [
      'https://i5.walmartimages.com/asr/0a34ef4c-d1f5-4627-832f-e4125701d399.14cbe143d89f81352a894ddb0ef5d96a.jpeg',
      'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
      'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
      'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
    ],
    sortDesc: 'Comfortable and durable running shoes.',
    description:
      'These running shoes are designed for comfort, support, and durability. Perfect for athletes or casual runners.',
    categories: ['men'],
    variants: [
      { size: 'S', color: 'Red', stock: 3, price: 3000 },
      { size: 'S', color: 'Blue', stock: 1, price: 2500 },
      { size: 'M', color: 'Red', stock: 5, price: 3200 },
      { size: 'M', color: 'Blue', stock: 2, price: 2800 },
    ],
  };

  const groupByColor = variants => {
    return variants.reduce((acc, variant) => {
      const { color } = variant;
      if (!acc[color]) {
        acc[color] = [];
      }
      acc[color].push(variant);
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
          { label: product.name, path: `/admin/product/detail/${product.id}` },
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
                      <TableCell>{variant.size}</TableCell>
                      <TableCell>{variant.stock}</TableCell>
                      <TableCell>${variant.price.toFixed(2)}</TableCell>
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
              <Chip label="Giày Nam" className="cursor-pointer" />
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
