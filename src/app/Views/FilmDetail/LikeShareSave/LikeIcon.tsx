import React from 'react';
import { Button } from 'antd';

const LikeIcon = ({ fill, width }: { fill: any; width: number }) => {
  return (
    <Button>
      <svg
        width={width <= 768 ? '5.3vw' : '1.4vw'}
        height={width <= 768 ? '4.8vw' : '1.4vw'}
        viewBox="0 0 27 26"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 25V11.8L11.8 1C13.7882 1 15.4 2.61177 15.4 4.6V9.4H22.6C23.3041 9.392 23.9762 9.69367 24.4382 10.225C24.9003 10.7564 25.1057 11.4638 25 12.16L23.344 22.96C23.1645 24.1433 22.1407 25.0135 20.944 25H7ZM7 25L3.796 24.9997C2.39021 25.0246 1.18847 23.9931 1 22.5997V14.1997C1.18847 12.8064 2.39021 11.6419 3.796 11.6668H7V25Z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};
export default LikeIcon;
