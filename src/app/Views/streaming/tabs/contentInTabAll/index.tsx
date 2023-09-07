import React, { FC, useEffect, useState } from 'react';
import 'assets/style/Views/streaming.scss';

import DisplayWebTabAll from './displayWebTabAll';
import DisplayMobileTabAll from './displayMobileTabAll';
import { getAllListStreaming } from 'app/Services/streaming';
// import { useNavigate } from 'react-router-dom';

type Prop = {
  setSelected: any;
  width: number;
  selectCategory: string | number;
  selectFilmList: string | number;
};
const ContentInTabAll: FC<Prop> = ({ setSelected, width, selectCategory, selectFilmList }) => {
  const [dataFilmWebDrama, setDataFilmWebDrama] = useState(null);
  const [dataFilmShortMovies, setDataFilmShortMovies] = useState(null);
  const [dataFilmMusicVideos, setDataFilmMusicVideos] = useState(null);
  const [loadingWebDrama, setLoadingWebDrama] = useState(false);
  const [loadingShortMovies, setLoadingShortMovies] = useState(false);
  const [loadingMusicVideos, setLoadingMusicVideos] = useState(false);

  useEffect(() => {
    setLoadingWebDrama(false);
    setLoadingShortMovies(false);
    setLoadingMusicVideos(false);
    const fetchDataFilmWebDramaInTabAll = async () => {
      const response: any = await getAllListStreaming({
        limit: 10,
        keySort: selectFilmList,
        category: '623a7f7ae82bfa0304f421f6',
        categoryGenre: selectCategory == 'all' ? null : selectCategory,
      });
      if (response.status == 200) {
        setLoadingWebDrama(true);
        setDataFilmWebDrama(response.data.data);
      }
    };

    const fetchDataFilmShortMoviesInTabAll = async () => {
      const response: any = await getAllListStreaming({
        limit: 10,
        keySort: selectFilmList,
        category: '623a7f7ae82bfa0304f421f7',
        categoryGenre: selectCategory == 'all' ? null : selectCategory,
      });
      if (response.status == 200) {
        setLoadingShortMovies(true);
        setDataFilmShortMovies(response.data.data);
      }
    };

    const fetchDataFilmMusicVideosInTabAll = async () => {
      const response: any = await getAllListStreaming({
        limit: 10,
        keySort: selectFilmList,
        category: '623a7f7ae82bfa0304f421f8',
        categoryGenre: selectCategory == 'all' ? null : selectCategory,
      });
      if (response.status == 200) {
        setLoadingMusicVideos(true);
        setDataFilmMusicVideos(response.data.data);
      }
    };

    fetchDataFilmWebDramaInTabAll();
    fetchDataFilmShortMoviesInTabAll();
    fetchDataFilmMusicVideosInTabAll();
  }, [selectCategory, selectFilmList]);

  return (
    <div>
      {width > 768 && (
        <DisplayWebTabAll
          setSelected={setSelected}
          width={width}
          dataFilmWebDrama={dataFilmWebDrama}
          dataFilmMusicVideos={dataFilmMusicVideos}
          dataFilmShortMovies={dataFilmShortMovies}
          loadingMusicVideos={loadingMusicVideos}
          loadingShortMovies={loadingShortMovies}
          loadingWebDrama={loadingWebDrama}
        />
      )}
      {width <= 768 && (
        <DisplayMobileTabAll
          setSelected={setSelected}
          width={width}
          dataFilmWebDrama={dataFilmWebDrama}
          dataFilmMusicVideos={dataFilmMusicVideos}
          dataFilmShortMovies={dataFilmShortMovies}
          loadingMusicVideos={loadingMusicVideos}
          loadingShortMovies={loadingShortMovies}
          loadingWebDrama={loadingWebDrama}
        />
      )}
    </div>
  );
};

export default ContentInTabAll;
