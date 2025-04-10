import { useParams } from 'react-router-dom';
import useFetchBlogDetail from '../../../../hooks/useFetchBlogDetail';
import HomeIcon from '@mui/icons-material/Home';

export const BlogDetail = () => {
  const { id } = useParams();
  const { blog, loading } = useFetchBlogDetail(id);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-500">Blog not found.</div>
    );
  }

  return (
    <div>
      <div>
        <div className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2017/06/04/16/32/chilli-2371498_960_720.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-48 object-cover"
          />
          <div className="relative flex justify-center items-center h-48 bg-opacity-60 bg-black">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold">BLOG</h1>
              <div className="flex items-center justify-center space-x-2 mt-2">
                <span className="text-sm">
                  <a
                    href="/"
                    className="hover:underline flex items-center space-x-1"
                  >
                    <HomeIcon fontSize="small" />
                    <span>Home</span>
                  </a>
                </span>
                <span>/</span>
                <a
                  href="/blogs"
                  className="hover:underline flex items-center space-x-1"
                >
                  <span className="text-sm">Blog</span>
                </a>
                <span>/</span>
                <span className="text-sm">Blog Detail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
        <div
          className="bg-cover bg-center text-center overflow-hidden"
          style={{
            minHeight: '500px',
            backgroundImage: `url(${blog.thumbnail})`,
          }}
          title="Woman holding a mug"
        ></div>
        <div className="max-w-3xl mx-auto">
          <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="bg-white relative top-0 -mt-32 p-5 sm:p-10">
              <h1 href="#" className="text-gray-900 font-bold text-3xl mb-2">
                {blog.title}
              </h1>
              <p className="text-gray-700 text-xs mt-2">
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div
                className="text-gray-700 leading-relaxed py-24"
                dangerouslySetInnerHTML={{ __html: blog.fullDesc }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
