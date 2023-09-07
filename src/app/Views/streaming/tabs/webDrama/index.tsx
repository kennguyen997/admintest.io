import React, { FC, useEffect, useState } from 'react';
// import { common } from 'app/trans';
// import { useTranslation } from 'react-i18next';
import Loading from 'components/loading';
import { getListStreamingForEachCategory } from 'app/Services/streaming';
import DisplayWebWebDrama from './displayWebWebDrama';
import DisplayMobileWebDrama from './displayMobileWebDrama';
// import { useNavigate } from 'react-router-dom';
type Prop = {
  width: number;
  selectCategory: string | number;
  selectFilmList: string | number;
};

const WebDrama: FC<Prop> = ({ width, selectCategory, selectFilmList }) => {
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
        category: '623a7f7ae82bfa0304f421f6',
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
        <DisplayWebWebDrama
          width={width}
          dataFilm={dataFilm}
          limitPageSize={limitPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
      {width <= 768 && dataFilm && (
        <DisplayMobileWebDrama
          width={width}
          dataFilm={dataFilm}
          limitPageSize={limitPageSize}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default WebDrama;
