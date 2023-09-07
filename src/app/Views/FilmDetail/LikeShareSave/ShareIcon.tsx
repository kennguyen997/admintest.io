import React from 'react';

const ShareIcon = ({ fill, width }: { fill: any; width: number }) => {
  return (
    <svg
      width={width <= 768 ? '6.4vw' : '1.67vw'}
      height={width <= 768 ? '5.8vw' : '1.67vw'}
      viewBox="0 0 32 32"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3333 10.6667C25.1743 10.6667 26.6667 9.17427 26.6667 7.33333C26.6667 5.49239 25.1743 4 23.3333 4C21.4924 4 20 5.49239 20 7.33333C20 9.17427 21.4924 10.6667 23.3333 10.6667Z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.66683 19.3327C10.5078 19.3327 12.0002 17.8403 12.0002 15.9993C12.0002 14.1584 10.5078 12.666 8.66683 12.666C6.8259 12.666 5.3335 14.1584 5.3335 15.9993C5.3335 17.8403 6.8259 19.3327 8.66683 19.3327Z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19.9998 9.04883L11.5591 14.1628"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5591 17.709L20.4527 22.9643"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.3333 21.334C25.1743 21.334 26.6667 22.8264 26.6667 24.6673C26.6667 26.5083 25.1743 28.0007 23.3333 28.0007C21.4924 28.0007 20 26.5083 20 24.6673C20 22.8264 21.4924 21.334 23.3333 21.334Z"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default ShareIcon;
