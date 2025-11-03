import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if user is logged in (you can modify this based on your auth logic)
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;