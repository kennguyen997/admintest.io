import React from 'react';
import { FacebookShareButton } from 'react-share';

// eslint-disable-next-line react/prop-types
const FacebookShareButtonIcon = ({ location }) => {
  return (
    <FacebookShareButton url={`${location}`} hashtag={'#terafty'}>
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="52" height="52" rx="4" fill="#334F8D" />
        <path
          d="M28.16 18.86C28.16 17.46 28.548 16.508 30.552 16.508H33.112V12.192C32.668 12.132 31.152 12 29.384 12C25.696 12 23.172 14.252 23.172 18.384V21.944H19V26.776H23.172V39.168H28.16V26.772H32.32L32.944 21.944H28.16V18.86Z"
          fill="white"
        />
      </svg>
    </FacebookShareButton>
  );
};

export default FacebookShareButtonIcon;
