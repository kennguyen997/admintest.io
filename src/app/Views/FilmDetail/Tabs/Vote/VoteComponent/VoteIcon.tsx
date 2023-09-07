import React from 'react';

const VoteIcon = ({ fill, width }: { fill: any; width: number }) => {
  return (
    <svg
      width={width > 768 ? '36' : '24'}
      height={width > 768 ? '36' : '24'}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 36C27.9412 36 36 27.9412 36 18C36 8.05887 27.9412 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9412 8.05887 36 18 36ZM26.5057 14.1307C27.1647 13.4717 27.1647 12.4033 26.5057 11.7443C25.8467 11.0853 24.7783 11.0853 24.1193 11.7443L15.1875 20.676L11.8807 17.3693C11.2217 16.7103 10.1533 16.7103 9.49426 17.3693C8.83525 18.0283 8.83525 19.0967 9.49426 19.7557L13.9943 24.2557C14.6533 24.9147 15.7217 24.9147 16.3807 24.2557L26.5057 14.1307Z"
        fill={fill}
      />
    </svg>
  );
};
export default VoteIcon;
