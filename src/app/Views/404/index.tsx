import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './404.scss';

export const Error404: FC = () => {
  return (
    <div className="err404">
      <div className="error mx-auto" data-text="404">
        404
      </div>
      <p className="lead text-gray-800 mb-5">Page Not Found</p>
      <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
      <Link to={'/'}> &larr; Back to Dashboard</Link>
    </div>
  );
};

export default Error404;
