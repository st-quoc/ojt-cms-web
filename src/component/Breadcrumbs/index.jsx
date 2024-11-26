import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Breadcrumbs = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link underline="hover" color="inherit" href="/">
        MUI
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/material-ui/getting-started/installation/"
      >
        Core
      </Link>
      <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
    </Breadcrumbs>
  );
};
