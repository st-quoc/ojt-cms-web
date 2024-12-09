import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../constants';

const useFetchBlogDetail = id => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROOT}/user/blog/detail/${id}`);
      setBlog(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch blog details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogDetail();
    }
  }, [id]);

  return { blog, loading, error, fetchBlogDetail };
};

export default useFetchBlogDetail;
