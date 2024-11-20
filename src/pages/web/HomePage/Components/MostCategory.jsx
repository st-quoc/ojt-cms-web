import cailoaImage from '../../../../assets/cailoa.png';

const BestProducts = [
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
  { id: 5, name: 'Historical', image: cailoaImage, items: 10 },
];

export const MostCategory = () => {
  return (
    <section id="trending" className="py-12 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">TRENDING PRODUCTS</h2>
      <div className="flex justify-center space-x-8 mb-4">
        <button className="text-sm text-gray-700 border-b-2 border-black px-4">
          LATEST PRODUCTS
        </button>
        <button className="text-sm text-gray-500 px-4">
          BESTSELLER PRODUCTS
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 md:px-8">
        {BestProducts.map(product => (
          <div
            key={product.id}
            className="text-center bg-gray-50 border transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg p-6 rounded-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto mb-6 w-24 h-24 md:w-32 md:h-32 object-cover"
            />
            <h3 className="text-lg md:text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm md:text-lg">
              {product.items} items
            </p>
            <button className="border-2 border-slate-300 mt-4 px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-700 hover:text-gray-100 transition">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MostCategory;
