import { getListStreamingForEachCategory } from 'app/Services/streaming';
import Loading from 'components/loading';
import React, { FC, useEffect, useState } from 'react';
import DisplayMobileMusicVideos from './displayMobileMusicVideos';
// import { common } from 'app/trans';
// import { useTranslation } from 'react-i18next';

import DisplayWebMusicVideos from './displayWebMusicVideos';
// import { useNavigate } from 'react-router-dom';
type Prop = {
  width: number;
  selectCategory: string | number;
  selectFilmList: string | number;
};

const MusicVideos: FC<Prop> = ({ width, selectCategory, selectFilmList }) => {
  // const [t] = useTranslation();
  // const navigate = useNavigate();
  const [dataFilm, setDataFilm] = useState(null);
  const [loading, setLoading] = useState(false);
  const limitPageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const response: any = await getListStreamingForEachCategory({
        limit: limitPageSize,
        page: currentPage,
        keySort: selectFilmList,
        category: '623a7f7ae82bfa0304f421f8',
        categoryGenre: selectCategory == 'all' ? null : selectCategory,
      });
      if (response.status == 200) {
        setLoading(true);
        setDataFilm(response.data.data);
      }
    };
    fetch();
  }, [currentPage, selectCategory, selectFilmList]);
  return (
    <div>
      {!loading && <Loading />}
      {width > 768 && dataFilm && (
        <DisplayWebMusicVideos
          dataFilm={dataFilm}
          width={width}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          limitPageSize={limitPageSize}
        />
      )}
      {width <= 768 && dataFilm && (
        <DisplayMobileMusicVideos
          dataFilm={dataFilm}
          width={width}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          limitPageSize={limitPageSize}
        />
      )}
    </div>
  );
};

export default MusicVideos;
