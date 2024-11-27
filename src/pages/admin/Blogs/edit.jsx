import axios from 'axios';
import { Typography, Divider, Box } from '@mui/material';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { toast } from 'react-toastify';
import { BlogForm } from './form';

export const BlogEditAdmin = () => {
  const onSubmit = async data => {
    const blogData = {
      title: data.title,
      thumbnail: data.thumbnail,
      sortDesc: data.description,
      fullDesc: data.fullDesc,
      categories: data.categories,
      status: data.status,
    };

    try {
      await axios.post('/api/blogs', blogData);
      toast.info('Blog created successfully!');
    } catch (error) {
      console.log('🚀  error  🚀', error);
      toast.error('Error creating Blog!');
    }
  };

  return (
    <Box className="p-4">
      <AdminPageHeader
        breadcrumbs={[
          { label: 'Admin', path: '/admin' },
          { label: 'Blogs', path: '/admin/blogs' },
          { label: 'Create new blog', path: `/admin/blog/create` },
        ]}
      />
      <Divider textAlign="center" className="py-4">
        <Typography variant="h4" gutterBottom>
          Create new blog
        </Typography>
      </Divider>

      <BlogForm
        onSubmit={onSubmit}
        defaultValues={{
          title: 'title',
          thumbnail: [
            'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
          ],
          sortDesc:
            'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
          fullDesc:
            'https://giayxshop.vn/wp-content/uploads/2021/12/z5524261544284_e371fd8c4b6f4a28836f0e84ad1ab3b3-600x600.jpg',
          status: 'Draft',
        }}
      />
    </Box>
  );
};
