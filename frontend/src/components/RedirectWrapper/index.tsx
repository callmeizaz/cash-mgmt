import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, matchPath } from 'react-router-dom';

import routes from '../../constants/routes';
import { selectCurrentUser, selectUserType } from '../../redux/selectors/authentication';
import { AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER } from '../../constants/LocalStoragesKeys';
import { doLogout } from '../../redux/thunks/authentication';
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from '../../constants/AllRoutes';
import { RESTRICTED_PROTECTED_ROUTES } from '../../constants/AccessControls';

// public routes => any user can access like login page
// authenticated routes => only logged in user can access like dashboard page

const RedirectWrapper = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const token = localStorage.getItem(AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER);
  const userType = useSelector(selectUserType);
  const restrictedRoutes = RESTRICTED_PROTECTED_ROUTES[userType || 'employee'];

  const cannotAccess = !!restrictedRoutes.some((loc) => !!matchPath({ path: loc }, pathname));
  const protectedPageChecker = !!PROTECTED_ROUTES.some(
    (loc) => !!matchPath({ path: loc }, pathname),
  );

  useEffect(() => {
    if (!token && currentUser) dispatch(doLogout());
  }, [token, currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (pathname === routes.public.home) {
        navigate(routes.protected.dashboard);
      } else if (cannotAccess) {
        navigate(routes.protected.accessDenied);
      } else if (!cannotAccess && !protectedPageChecker) {
        navigate(routes.protected.pageNotFound);
      }
    } else {
      if (!PUBLIC_ROUTES.some((loc) => matchPath({ path: loc }, pathname)))
        navigate(routes.public.login);
    }

    //eslint-disable-next-line
  }, []);

  return children;
};

export default RedirectWrapper;
