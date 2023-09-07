import React, { FC } from 'react';
import 'assets/style/pageOfList.scss';

const PageOfList: FC = ({ children }) => {
  return <div className="page_of_list view">{children}</div>;
};

export default PageOfList;
