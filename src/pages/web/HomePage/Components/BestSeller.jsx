import { Title } from 'chart.js';
import cailoaImage from '../../../../assets/cailoa.png';
import { Product } from '../../../../component/Product';

const products = [
  { id: 1, name: 'Historical', image: cailoaImage, items: 10 },
  {
    id: 2,
    name: 'Crafts',
    image:
      'https://shopvnb.com//uploads/gallery/giay-cau-long-yonex-atlas-wt-nb-chinh-hang_1705611473.webp',
    items: 15,
  },
  {
    id: 3,
    name: 'Kettle',
    image:
      'https://product.hstatic.net/1000312752/product/3q7a8272_copy_f203320e0ec641418afb3713c3087266_grande.jpg',
    items: 10,
  },
  {
    id: 4,
    name: 'Vintage Clock',
    image:
      'https://product.hstatic.net/1000312752/product/3q7a8335_copy_b5a4803847db4b0984fde8024177463a_grande.jpg',
    items: 8,
  },
];

export const BestSeller = () => {
  return (
    <section id="bestseller" className="py-16 bg-white text-center">
      <Title title="MOST VINTAGE CATEGORY" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 max-w-6xl mx-auto">
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
