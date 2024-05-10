import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks.js'; // Update the path as needed

const PrivateRoute = ({ children }) => {
  const { login, authToken } = useAuth();
  const location = useLocation();

  if (!login) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;