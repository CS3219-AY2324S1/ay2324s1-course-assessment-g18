import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";


const api = axios.create();
// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const user = JSON.parse(localStorage.getItem('userInfo')!);
          const userRefreshToken = user['refreshToken'];
          console.log(refreshToken);
          console.log(userRefreshToken);
          const response = await axios.post('http://localhost:3000/auth/refresh', {
              // baseURL: import.meta.env.VITE_BASE_AUTH_URL,
              headers: {
                  Authorization: `Bearer ${refreshToken}`,
              },     
              userRefreshToken
          });
          console.log("Refreshed Access token");
          console.log(response);
          const { accessToken } = response.data;
  
          localStorage.setItem('accessToken', accessToken);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error) {
          // Handle refresh token error or redirect to login
        //   navigate('/login');
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api