import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

export const BlogPage = () => {
  const articles = [
    {
      id: 1,
      image: 'https://via.placeholder.com/300x200',
      title: 'Consectetur Adipiscing',
      date: '01 July 2024',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/300x200',
      title: 'Duis Pulvinar Augue Nisi',
      date: '01 July 2024',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/300x200',
      title: 'Duis Pulvinar Augue Nisi',
      date: '01 July 2024',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/300x200',
      title: 'Duis Pulvinar Augue Nisi',
      date: '01 July 2024',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ marginBottom: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <MuiLink underline="hover" color="inherit" href="/">
            <HomeIcon fontSize="small" />
          </MuiLink>
          <Typography color="text.primary">Blog</Typography>
        </Breadcrumbs>
      </Box>

      {/* Blog Grid */}
      <Grid container spacing={4}>
        {articles.map(article => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={article.image}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary">
                  {article.date}
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.description}
                </Typography>
                <Button variant="text" color="primary" sx={{ marginTop: 2 }}>
                  READ MORE
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogPage;
