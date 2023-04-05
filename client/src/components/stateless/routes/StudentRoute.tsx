import { Navigate, Outlet, Route } from 'react-router-dom';
import { ROUTES_PATH } from '../../../constants';
import { useUserSelector } from '../../../redux/store';

const StudentRoute = () => {
  const { id, role } = useUserSelector();

  return id !== '' && role === 'student' ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES_PATH.SIGN_IN} />
  );
};

export default StudentRoute;
