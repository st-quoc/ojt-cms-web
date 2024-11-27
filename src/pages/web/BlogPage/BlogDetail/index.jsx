import { useLocation } from 'react-router-dom';
import Footer from '../../../../component/Footer/Footer';
import { Header } from '../../../../component/Header';
import { Banner } from '../ComponentBlog/Banner';

export const BlogDetail = () => {
  const location = useLocation();
  const { post } = location.state || {};

  if (!post) {
    return <div>Bài viết không tồn tại.</div>;
  }

  return (
    <div>
      <Header />
      <Banner />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{post.date}</p>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-96 object-cover mb-4"
        />
        <p className="text-gray-700">{post.description}</p>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
