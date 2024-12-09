import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CloseIcon from '@mui/icons-material/Close';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import { useNavigate } from 'react-router-dom';
import { API_ROOT } from '../../../../constants';
import axios from 'axios';

export const BlogList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchDate, setSearchDate] = useState('');
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const openModal = images => {
    setSelectedImage(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROOT}/user/blog/list`);
      console.log('Fetched blogs:', response.data.data);
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    const handleScroll = () => {
      setIsScrollTopVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredBlog = blogs.filter(
    item =>
      item.createdAt?.toLowerCase().includes(searchDate.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchDate.toLowerCase()) ||
      item.sortDesc?.toLowerCase().includes(searchDate.toLowerCase()) ||
      item.fullDesc?.toLowerCase().includes(searchDate.toLowerCase()),
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogDetailClick = post => {
    navigate(`/blog/${post._id}`, { state: { post } });
  };

  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-md max-w-md ml-4 mt-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search blogs..."
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
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <p>Loading blogs...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {filteredBlog.map(item => (
                <div
                  key={item._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden relative group"
                >
                  {item.thumbnail && item.thumbnail[0] ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-64 object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image Available
                    </div>
                  )}

                  <div
                    className="absolute top-2 right-2 bg-white p-2 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() =>
                      openModal(item.thumbnail && item.thumbnail[0])
                    }
                  >
                    <ZoomOutMapIcon />
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-gray-500">{item.createdAt}</p>
                    <h2 className="text-2xl font-bold mt-2 mb-4 group-hover:text-blue-500 transition-colors duration-300">
                      {item.title}
                    </h2>
                    <p className="text-gray-700">{item.sortDesc}</p>
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
          )}
        </div>
      </div>

      {isScrollTopVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300 z-50"
        >
          <ArrowUpwardIcon />
        </button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-0 right-0 m-4 text-white text-2xl"
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
