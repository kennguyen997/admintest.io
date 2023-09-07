import React, { FC } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import Logo from 'assets/Terafty.png';

const LazyImage: FC<LazyLoadImageProps> = ({ src, ...props }) => {
  return (
    <LazyLoadImage
      {...props}
      key={src}
      src={src}
      onError={(e) => {
        e.currentTarget.src = Logo;
        e.currentTarget.className += ' errorImg';
      }}
      effect="black-and-white"
      wrapperClassName="w-100"
    />
  );
};
export default LazyImage;
