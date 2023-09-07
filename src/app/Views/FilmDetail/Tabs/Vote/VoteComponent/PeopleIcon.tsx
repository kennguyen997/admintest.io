import React from 'react';

const PeopleIcon = ({ width }: { width: number }) => {
  return (
    <svg
      width={width > 768 ? '1.4vw' : '5.3vw'}
      height={width > 768 ? '1.4vw' : '5.3vw'}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 17.5C17.866 17.5 21 14.366 21 10.5C21 6.63401 17.866 3.5 14 3.5C10.134 3.5 7 6.63401 7 10.5C7 14.366 10.134 17.5 14 17.5Z"
        stroke="white"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M3.38867 23.624C4.46444 21.7619 6.01128 20.2158 7.87379 19.1408C9.73631 18.0659 11.8489 17.5 13.9994 17.5C16.1498 17.5 18.2624 18.066 20.1249 19.1409C21.9874 20.2159 23.5342 21.7621 24.61 23.6242"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default PeopleIcon;
