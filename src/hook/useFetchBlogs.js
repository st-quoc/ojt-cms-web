import { useState, useEffect, useCallback } from 'react';
import { API_ROOT } from '../constants';
import axios from 'axios';

const useFetchBlogs = ({ search, page, limit }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROOT}/user/blog/list`, {
        params: { search, page, limit },
      });
      setBlogs(response.data.items);
      setTotal(response.data.total);
    } catch (err) {
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return { blogs, loading, error, total, fetchBlogs };
};

export default useFetchBlogs;
