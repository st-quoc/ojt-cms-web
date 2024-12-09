import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../../../component/Header';
import { Banner } from '../ComponentBlog/Banner';
import axios from 'axios';
import { API_ROOT } from '../../../../constants';

export const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetail = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/user/blog/detail/${id}`);
      setPost(response.data.blog);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-500">Blog not found.</div>
    );
  }

  return (
    <div>
      <Header />
      <Banner />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <p className="text-sm text-gray-500 mb-4">
          {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {post.images.length > 0 && (
          <img
            src={post.images[0]}
            alt={post.title}
            className="w-full h-96 object-cover mb-4"
          />
        )}

        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.fullDescription }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
