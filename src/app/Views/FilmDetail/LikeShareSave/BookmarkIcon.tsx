import React from 'react';
import { Button } from 'antd';

const Bookmark = ({ fill, width }: { fill: any; width: number }) => {
  return (
    <Button>
      <svg
        width={width <= 768 ? '5.3vw' : '1.4vw'}
        height={width <= 768 ? '4.8vw' : '1.4vw'}
        viewBox="0 0 20 26"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 25L9.99907 20L1 25V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H18C18.2652 1 18.5196 1.10536 18.7071 1.29289C18.8946 1.48043 19 1.73478 19 2V25Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};
export default Bookmark;
