import { Navigate, Outlet, Route } from 'react-router-dom';
import { postVerifyId } from '../../../api/auth';
import { ROUTES_PATH } from '../../../constants';
import { useUserSelector } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { setId } from '../../../redux/user/user.slice';

const PrivateRoute = ({ role }: { role: string }) => {
  const { id, role: userRole } = useUserSelector();
  const [idExists, setIdExists] = useState(false);

  useEffect(() => {
    (async () => setIdExists(await postVerifyId({ id })))();
  }, [idExists]);

  return idExists && userRole === role ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES_PATH.SIGN_IN} />
  );
};

export default PrivateRoute;
