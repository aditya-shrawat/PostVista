import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Loading from '../Pages/Loading';

const RequireAuth = ({ children }) => {
  const [auth, setAuth] = useState({ status: 'checking', user: null });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_backendURL}/api/auth/check-auth`, {
          withCredentials: true
        });
        setAuth({ status: 'authenticated', user: res.data.user });
      } catch (error) {
        if (error.response && error.response.status === 401) {
            setAuth({ status: 'unauthenticated', user: null });
        } else {
            setAuth({ status: 'unauthenticated', user: null });
        }
      }
    };
    checkAuth();
  }, []);

  if (auth.status === 'checking') return <Loading />;
  if (auth.status === 'unauthenticated') return <Navigate to="/user/signin" />;
  return children;
};

export default RequireAuth;
