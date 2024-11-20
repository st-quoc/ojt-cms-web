import { Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import BookIcon from '@mui/icons-material/Book';
import DescriptionIcon from '@mui/icons-material/Description';
import Chip from '@mui/material/Chip';
import LayersIcon from '@mui/icons-material/Layers';
import BarChart from '../../component/Chart/BarChart';

export const getPageContent = pathname => {
  switch (pathname) {
    case '/admin/dashboard':
      return <BarChart />;

    case '/admin/orders':
      return <Typography>Here are the Orders</Typography>;

    case '/admin/blogs':
      return <Typography>List of Blogs</Typography>;

    case '/admin/products/create':
      return <Typography>Create Product</Typography>;

    case '/admin/products/list':
      return <Typography>List Products</Typography>;

    case '/admin/reports/sales':
      return <Typography>Sales Reports</Typography>;

    case '/admin/reports/traffic':
      return <Typography>Traffic Reports</Typography>;

    case '/admin/accounts/profile':
      return <Typography>Your Profile</Typography>;

    case '/admin/accounts/changePassword':
      return <Typography>Change Your Password</Typography>;

    case '/admin/settings':
      return <Typography>Settings Page</Typography>;

    default:
      return <Typography>Page not found</Typography>;
  }
};

export const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'admin/dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'admin/orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    action: <Chip label={7} color="primary" size="small" />,
  },
  {
    segment: 'admin/products',
    title: 'Products',
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: 'list',
        title: 'Products list',
        icon: <BookIcon />,
      },
      {
        segment: 'create',
        title: 'Create new product',
        icon: <BookIcon />,
      },
    ],
  },
  {
    segment: 'admin/blogs',
    title: 'Blogs',
    icon: <BookIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'admin/reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    kind: 'header',
    title: 'Accounts',
  },
  {
    segment: 'admin/accounts',
    title: 'Accounts',
    icon: <LayersIcon />,
    children: [
      {
        segment: 'profile',
        title: 'Profile',
        icon: <LayersIcon />,
      },
      {
        segment: 'changePassword',
        title: 'Change Password',
        icon: <LayersIcon />,
      },
    ],
  },
];
