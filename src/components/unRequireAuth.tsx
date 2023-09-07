import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import store from 'app/redux/store';

const UnRequireAuth: FC = ({ children }) => {
  const { accounts } = store.getState();
  if (accounts != null) {
    return <Navigate to="/home" replace />;
  }
  return <>{children}</>;
};

export default UnRequireAuth;
