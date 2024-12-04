import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ROOT } from '../../../../constants';

export const BlogList = () => {
  const [searchDate, setSearchDate] = useState('');
  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlogDetailClick = post => {
    navigate(`/blog/${post.id}`, { state: { post } });
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROOT}/user/blog/list`);
      const data = response.data?.data || [];
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error.response || error.message);
      alert(`Failed to fetch blogs: ${error.message}`);
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
      item.shortDescription?.toLowerCase().includes(searchDate.toLowerCase()) ||
      item.fullDescription?.toLowerCase().includes(searchDate.toLowerCase()),
  );

  return (
    <div>
      <div className="p-4 bg-white shadow-md rounded-md max-w-md mx-auto mt-8">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchDate}
            onChange={e => setSearchDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
            <SearchIcon />
          </button>
        </div>
      </div>

      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading blogs...</p>
          ) : filteredBlog.length === 0 ? (
            <p className="text-center text-gray-500">No blogs found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlog.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-transform duration-300"
                  onClick={() => handleBlogDetailClick(item)}
                >
                  <div className="relative">
                    <img
                      src={item.images?.[0] || '/placeholder.jpg'}
                      alt={item.title || 'No Title'}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Unknown date'}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 mt-2 mb-4">
                      {item.title || 'Untitled'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {item.shortDescription
                        ? item.shortDescription.length > 41
                          ? `${item.shortDescription.slice(0, 41)}...`
                          : item.shortDescription
                        : 'No description available'}
                    </p>
                    <button
                      className="mt-4 text-blue-500 hover:underline"
                      onClick={e => {
                        e.stopPropagation();
                        handleBlogDetailClick(item);
                      }}
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
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-md hover:bg-blue-600 transition duration-300"
        >
          <ArrowUpwardIcon />
        </button>
      )}
    </div>
  );
};
