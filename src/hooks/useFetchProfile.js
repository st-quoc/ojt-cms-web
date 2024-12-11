import { useState, useEffect, useCallback } from 'react';
import axiosClient from '../config/axios';
import { API_ROOT } from '../constants';

const useFetchProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(`${API_ROOT}/auth/profile`);
      setUserInfo(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { userInfo, loading, error, refetch: fetchData };
};

export default useFetchProfile;
