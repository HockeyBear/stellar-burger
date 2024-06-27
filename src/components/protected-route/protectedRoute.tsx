import { Navigate, useLocation } from 'react-router-dom';
import { getAuthChecked, getUser } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedProps = {
  unAuth?: boolean;
  element: JSX.Element;
};

const ProtectedRoute = ({
  unAuth = false,
  element
}: ProtectedProps): JSX.Element => {
  const isAuthenticated = useSelector(getAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <div>Загрузка...</div>;
  }
  if (unAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!unAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  return element;
};

export const Auth = ProtectedRoute;
export const UnAuth = ({ element }: { element: JSX.Element }) => (
  <ProtectedRoute unAuth element={element} />
);
