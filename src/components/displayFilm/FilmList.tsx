import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from 'components/lazyLoadImage';

type Prop = {
  src: string;
  name: string;
  width: number;
  idFilm: string;
};

const FilmList: FC<Prop> = ({ src, name, width, idFilm }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex_column"
      onClick={() => {
        navigate(`/detail-film/${idFilm}`);
      }}
      aria-hidden="true"
    >
      <LazyImage
        src={src}
        alt={name}
        style={
          width > 768
            ? { width: '100%', height: 176, objectFit: 'cover', borderRadius: 5 }
            : { width: '29vw', height: '39vw', borderRadius: 8 }
        }
      />
      <div
        className={width > 768 ? 'fs-16 fw-400 text-overflow-1' : 'fs-14 fw-400 text-overflow-1'}
        style={{ width: width > 768 ? '100%' : '27vw' }}
      >
        {name}
      </div>
    </div>
  );
};

export default FilmList;
