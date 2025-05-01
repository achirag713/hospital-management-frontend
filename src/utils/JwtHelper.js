// JWT Helper functions

// Store JWT in local storage
export const setToken = (token) => {
  localStorage.setItem('jwt_token', token);
};

// Get JWT from local storage
export const getToken = () => {
  return localStorage.getItem('jwt_token');
};

// Remove JWT from local storage
export const removeToken = () => {
  localStorage.removeItem('jwt_token');
};

// Check if user is authenticated (has a token)
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Parse JWT payload (without validation - frontend only)
export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// Get user info from token
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  const decoded = parseJwt(token);
  return decoded;
};