import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { useNavigate } from 'react-router-dom';

const blogs = [
  {
    id: 1,
    date: '01 July 2024',
    title: 'Consectetur Adipiscing',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image:
      'https://vn.superconshoe.com/uploads/202436123/small/white-women-s-sneakersf43c3aef-ddd3-4a5e-b7be-3dc17f3b3e2a.jpg',
  },
  {
    id: 2,
    date: '01 July 2024',
    title: 'Duis Pulvinar Augue Nisi',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image:
      'https://thienphucsport.com/wp-content/uploads/2023/04/2c73168d-b615-4634-8acf-f5b6b5fba546-jpeg-400x300.webp',
  },
  {
    id: 3,
    date: '01 July 2024',
    title: 'Etiam Ac Aliquet Ex Nec Volutpat',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image:
      'https://cdn.authentic-shoes.com/wp-content/uploads/2023/04/s-l400__16__3125470724b5421580b5771f354905a0.png',
  },
  {
    id: 4,
    date: '01 July 2024',
    title: 'Nam Nec Rhoncus Est',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image: 'https://m.media-amazon.com/images/I/6181cJEEhjL._AC_UY300_.jpg',
  },
  {
    id: 5,
    date: '01 July 2024',
    title: 'Nam Nec Rhoncus Est',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image:
      'https://copsneaker.vn/wp-content/uploads/2023/03/giay-eqt-plus-orange-white-black-rep11-400x300.jpg',
  },
  {
    id: 6,
    date: '01 July 2024',
    title: 'Nam Nec Rhoncus Est',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrR_VvLy3HYbsqzU7IKn8M5CQhguNszaK1pQ&s',
  },
  {
    id: 7,
    date: '01 July 2024',
    title: 'Nam Nec Rhoncus Est',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image: 'https://m.media-amazon.com/images/I/41PuKqHnDqL._AC_UY1000_.jpg',
  },
  {
    id: 8,
    date: '01 July 2024',
    title: 'Nam Nec Rhoncus Est',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image: 'https://m.media-amazon.com/images/I/41PuKqHnDqL._AC_UY1000_.jpg',
  },
  {
    id: 9,
    date: '01 July 2024',
    title: 'Nam Nec Rhoncus Est',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image: 'https://m.media-amazon.com/images/I/41PuKqHnDqL._AC_UY1000_.jpg',
  },
  {
    id: 10,
    date: '01 July 2024',
    title: 'Nam Nec Rhoncus Est',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image: 'https://m.media-amazon.com/images/I/41PuKqHnDqL._AC_UY1000_.jpg',
  },
];

export const BlogList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const navigate = useNavigate();

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const filteredBlog = (blogs || []).filter(
    item =>
      item.date.toLowerCase().includes(searchDate.toLowerCase()) ||
      item.title.toLowerCase().includes(searchDate.toLowerCase()) ||
      item.description.toLowerCase().includes(searchDate.toLowerCase()),
  );

  const handleBlogDetailClick = post => {
    navigate(`/blog/${post.id}`, { state: { post } });
  };

  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-md max-w-md ml-4 mt-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search (e.g. 01 July 2024)"
            value={searchDate}
            onChange={e => setSearchDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="bg-gray-100 py-10">
        <div className="bg-gray-100 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {filteredBlog.map(item => (
                <div
                  key={item.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden relative group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div
                    className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => openModal(item.image)}
                  >
                    <ZoomOutMapIcon />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <h2 className="text-2xl font-bold mt-2 mb-4 group-hover:text-blue-500 transition-colors duration-300">
                      {item.title}
                    </h2>
                    <button
                      onClick={() => handleBlogDetailClick(item)}
                      className="mt-4 text-blue-500 hover:underline"
                    >
                      READ MORE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-0 right-0 m-4 text-black text-2xl"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};
