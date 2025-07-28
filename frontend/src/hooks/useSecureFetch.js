// import { authToken, refreshAccessToken, logout } from '../context/AuthContext';

// export const secureFetch = async (url, options = {}, attempt = 1) => {
// //   const token = localStorage.getItem('accessToken');
//   const { authToken, refreshAccessToken, logout } = useAuth();

//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       ...(options.headers || {}),
//       Authorization: `Bearer ${authToken}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.status === 401 && attempt === 1) {
//     const newToken = await refreshAccessToken();
//     if (newToken) {
//       return secureFetch(url, options, 2);  // retry once
//     }else {
//       logout();  
//     }
//   }

//   return response;
// };
// src/hooks/useSecureFetch.js
import { useAuth } from '../context/AuthContext';

const useSecureFetch = () => {
  const { authToken, refreshAccessToken, logout } = useAuth();

  const secureFetch = async (url, options = {}, attempt = 1) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401 && attempt === 1) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return secureFetch(url, options, 2); // Retry once
      } else {
        logout();
      }
    }

    return response;
  };

  return secureFetch;
};

export default useSecureFetch;
