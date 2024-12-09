import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useFetchBlogs from '../../../../hook/useFetchBlogs';
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
      <section className="py-20">
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
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {blogs.map(blog => (
                <div
                  className="group w-full max-lg:max-w-xl  border border-gray-300 rounded-2xl"
                  key={blog._id}
                >
                  <div className="flex items-center">
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="rounded-t-2xl w-full object-cover aspect-video"
                    />
                  </div>
                  <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                    <span className="text-indigo-600 font-medium mb-3 block">
                      {formatDate(blog.createdAt)}
                    </span>
                    <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
                      {blog.title}
                    </h4>
                    <p className="text-gray-500 leading-6 mb-10">
                      {blog.sortDesc}
                    </p>
                    <a
                      href="javascript:;"
                      className="cursor-pointer text-lg text-indigo-600 font-semibold"
                      onClick={() => navigate(`/blog/${blog._id}`)}
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
