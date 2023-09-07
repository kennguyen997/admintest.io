import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { accountService } from 'app/Services';
import useWindowDimensions from './GetWidthHeightWindow/useWindowDimensions';
import store from 'app/redux/store';

type Props = { loading: boolean };

const RequireAuth: FC<Props> = ({ children, loading }) => {
  const { width } = useWindowDimensions();
  const { accounts } = store.getState();
  if (loading) return <></>;
  if (!accounts) {
    return width > 768 ? <Navigate to="/login" replace /> : <Navigate to="/login-method" replace />;
  } else if (
    (accounts.isEmailVerified && window.location.pathname.includes('/email-verification')) ||
    (accounts.survey.length > 0 && window.location.pathname.includes('/inlet-channel'))
  ) {
    return <Navigate to="/home" />;
  } else if (
    !accounts.isEmailVerified &&
    !window.location.pathname.includes('/email-verification')
  ) {
    accountService.resendOTP(accounts.userEmail);
    return <Navigate to="/email-verification" />;
  } else return <>{children}</>;
};

export default RequireAuth;
