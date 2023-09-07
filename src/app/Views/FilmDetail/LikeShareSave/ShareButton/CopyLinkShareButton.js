import { message } from 'antd';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// eslint-disable-next-line react/prop-types
const CopyLinkShareButton = ({ location }) => {
  const key = 'updatable';
  return (
    <CopyToClipboard text={location}>
      <div
        onClick={() => {
          if (!location) return;
          message.loading({ content: 'Loading...', key });
          setTimeout(() => {
            message.success({ content: 'Copied!', key, duration: 2 });
          }, 1000);
        }}
        aria-hidden="true"
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="52" height="52" rx="4" fill="#2A343D" />
          <path
            d="M26.5 16L29.3762 13.1078C30.0082 12.4398 30.7588 11.9098 31.5848 11.5481C32.4109 11.1865 33.2964 11.0002 34.1907 11C35.0849 10.9998 35.9705 11.1856 36.7967 11.5469C37.623 11.9081 38.3737 12.4377 39.0061 13.1054C39.6384 13.7731 40.14 14.5658 40.4821 15.4383C40.8242 16.3107 41.0002 17.2458 41 18.1901C40.9998 19.1343 40.8234 20.0693 40.4809 20.9416C40.1384 21.8138 39.6365 22.6063 39.0038 23.2737L34.6276 27.8946C33.9955 28.5621 33.245 29.0916 32.419 29.4528C31.5931 29.8141 30.7078 30 29.8138 30C28.9198 30 28.0345 29.8141 27.2086 29.4528C26.3826 29.0916 25.6322 28.5621 25 27.8946"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.6871 34.6576L23.6238 37.8922C22.9918 38.5602 22.2412 39.0902 21.4152 39.4519C20.5891 39.8135 19.7036 39.9998 18.8093 40C17.9151 40.0002 17.0295 39.8144 16.2033 39.4531C15.377 39.0919 14.6263 38.5623 13.9939 37.8946C13.3616 37.2269 12.86 36.4342 12.5179 35.5617C12.1758 34.6893 11.9998 33.7542 12 32.8099C12.0002 31.8657 12.1766 30.9307 12.5191 30.0584C12.8616 29.1862 13.3635 28.3937 13.9962 27.7263L18.3724 23.1054C19.0045 22.4379 19.755 21.9084 20.581 21.5472C21.4069 21.1859 22.2922 21 23.1862 21C24.0802 21 24.9654 21.1859 25.7914 21.5472C26.6174 21.9084 27.3678 22.4379 28 23.1054"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </CopyToClipboard>
  );
};

export default CopyLinkShareButton;
