import React, { FC, Suspense } from 'react';
import Header, { PropsHeader } from './headerCustom';

type Props = PropsHeader;

const MyRouter: FC<Props> = ({ children, ...more }) => {
  return (
    <>
      <Header {...more} />
      <Suspense fallback={<></>}>{children}</Suspense>
    </>
  );
};

export default MyRouter;
