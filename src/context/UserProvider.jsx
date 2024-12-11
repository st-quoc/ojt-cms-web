import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../constants';
import axiosClient from '../config/axios';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = newUserData => {
    setUser(newUserData);
  };

  const changeProfile = async updatedUserInfo => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        `${API_ROOT}/auth/change-profile`,
        updatedUserInfo,
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully');
        fetchUser();
        return response.data;
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      toast.error('Failed to update profile');
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, updateUser, changeProfile, fetchUser, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
