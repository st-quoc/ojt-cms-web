import 'animate.css';
import TrackVisibility from 'react-on-screen';
import useFetchProducts from '../../../../hooks/useFetchProducts';
import { CircularProgress, Box, Typography } from '@mui/material';
import { ProductCard } from '../../../../component/Product/ProductCard';

const PopularProducts = () => {
  const { products, loading, error } = useFetchProducts(null, 1, 4);

  return (
    <section id="products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-purple-900">Popular</span> Products
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value.
        </p>
      </div>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" color="error">
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We couldn&apos;t load the products. Please try again later.
          </Typography>
        </Box>
      ) : products.length === 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Typography variant="h4" color="textPrimary">
            404 - No Products Found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            It seems there are no popular products available at the moment.
          </Typography>
        </Box>
      ) : (
        <TrackVisibility partialVisibility once>
          {({ isVisible }) => (
            <div
              className={`mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14 ${
                isVisible
                  ? 'animate__animated animate__fadeIn animate__slow'
                  : ''
              }`}
            >
              {products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          )}
        </TrackVisibility>
      )}
    </section>
  );
};

export default PopularProducts;
