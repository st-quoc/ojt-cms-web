import axios from 'axios';
import { Typography, Divider, Box } from '@mui/material';
import { AdminPageHeader } from '../../../component/AdminPageHeader';
import { toast } from 'react-toastify';
import { BlogForm } from './form';

export const BlogCreateAdmin = () => {
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
          title: '',
          thumbnail: [],
          sortDesc: '',
          fullDesc: '',
          status: '',
        }}
      />
    </Box>
  );
};
