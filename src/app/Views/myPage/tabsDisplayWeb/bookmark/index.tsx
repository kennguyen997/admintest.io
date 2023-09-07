import React, { FC, useEffect, useState } from 'react';
// import { common } from 'app/trans';
// import { useTranslation } from 'react-i18next';
import Loading from 'components/loading';

import DisplayWebBookmark from './displayWebBookmark';
import { getListFilmBookmark } from 'app/Services/myPage';
// import { useNavigate } from 'react-router-dom';
type Prop = {
  width: number;
};

const Bookmark: FC<Prop> = ({ width }) => {
  const [category, setCategory] = useState('all');
  const [dataFilm, setDataFilm] = useState(null);
  const [loading, setLoading] = useState(false);
  const limitPageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const response: any = await getListFilmBookmark({
        limit: limitPageSize,
        page: currentPage,
        categoriesID:
          (category == 'webDrama' && '623a7f7ae82bfa0304f421f6') ||
          (category == 'shortMovies' && '623a7f7ae82bfa0304f421f7') ||
          (category == 'musicVideos' && '623a7f7ae82bfa0304f421f8') ||
          null,
      });
      if (response.status == 200) {
        setLoading(true);
        setDataFilm(response.data.data);
      }
    };
    fetch();
  }, [currentPage, category]);

  return (
    <div>
      <div>{!loading && <Loading />}</div>
      {width > 768 && dataFilm && (
        <DisplayWebBookmark
          dataFilm={dataFilm}
          width={width}
          setCurrentPage={setCurrentPage}
          limitPageSize={limitPageSize}
          category={category}
          currentPage={currentPage}
          setCategory={setCategory}
        />
      )}
    </div>
  );
};

export default Bookmark;
