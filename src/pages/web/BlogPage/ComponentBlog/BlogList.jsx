import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useFetchBlogs from '../../../../hooks/useFetchBlogs';
import { useNavigate } from 'react-router-dom';
import PaginationBase from '../../../../component/Pagination';
import { Loading } from '../../../../component/Loading';
import { formatDate } from '../../../../utils';

export const BlogList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { blogs, loading, total, fetchBlogs } = useFetchBlogs({
    search,
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalItems = total;

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchBlogs({ search, page: currentPage, limit: itemsPerPage });
  }, [search, currentPage, fetchBlogs]);

  return (
    <>
      <section className="py-20 bg-hero bg-cover bg-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-8">
            Our blogs
          </h2>
          <div className="flex items-center space-x-2 justify-end">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[250px]"
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
              onClick={() =>
                fetchBlogs({ search, page: currentPage, limit: itemsPerPage })
              }
            >
              <SearchIcon />
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : blogs.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
              {blogs.map((blog, index) => (
                <div
                  className="group w-full max-lg:max-w-xl  border border-gray-300 rounded-2xl"
                  key={blog._id}
                  style={{
                    backgroundImage: `linear-gradient(360deg, rgba(0, 9, 225, 0.5) 6.79%, rgba(0, 0, 0, 0) 61.34%), url(${blog.thumbnail})`,
                    height: '400px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'flex-end',
                    marginTop: index % 2 === 0 ? '0px' : '30px',
                  }}
                >
                  <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl  ">
                    <h4
                      className="text-xl font-medium leading-8 "
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '20px',
                      }}
                    >
                      {blog.title}
                    </h4>
                    <span
                      className="font-medium  block"
                      style={{ color: 'white' }}
                    >
                      {formatDate(blog.createdAt)}
                    </span>
                    <p className="text-white leading-6 mb-10">
                      {blog.sortDesc}
                    </p>
                    <a
                      href="javascript:;"
                      className="cursor-pointer text-lg font-semibold"
                      onClick={() => navigate(`/blog/${blog._id}`)}
                      style={{
                        background: 'rgba(255,255,255,1)',
                        padding: '5px 15px',
                        borderRadius: '50px',
                        color: 'rgba(0,0,0,0.8)',
                        fontWeight: '300',
                        fontSize: '14px',
                      }}
                    >
                      Read more..
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            'No Results'
          )}

          <PaginationBase
            totalItems={totalItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};
