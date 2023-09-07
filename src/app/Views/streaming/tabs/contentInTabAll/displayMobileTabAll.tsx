import React, { FC } from 'react';

import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import FilmList from '../../../../../components/displayFilm/FilmList';
import Loading from 'components/loading';
import { Space } from 'antd';
import { propertyImgLang, propertyLang } from 'assets/propertyLang';
// import { useNavigate } from 'react-router-dom';

type Prop = {
  setSelected: any;
  width: number;
  dataFilmWebDrama: any;
  dataFilmMusicVideos: any;
  dataFilmShortMovies: any;
  loadingWebDrama: boolean;
  loadingShortMovies: boolean;
  loadingMusicVideos: boolean;
};
const DisplayMobileTabAll: FC<Prop> = ({
  setSelected,
  width,
  dataFilmWebDrama,
  dataFilmMusicVideos,
  dataFilmShortMovies,
  loadingMusicVideos,
  loadingShortMovies,
  loadingWebDrama,
}) => {
  const [t] = useTranslation();
  // const navigate = useNavigate();
console.log(dataFilmWebDrama);
  return (
    <Space direction="vertical" size={30} className="content-in-tab-all">
      <div className="flex_column">
        <div className="flex_row jc-sb ai-c ">
          <div
            className="fs-20 fw-700"
            onClick={() => {
              setSelected('webDrama');
            }}
            aria-hidden="true"
          >
            {t(common.webDrama)}
          </div>
        </div>
        <div className="flex_row" style={{ marginTop: 12 }}>
          {!loadingWebDrama && <Loading />}
          <ul className={`list-film-for-mobile ${!loadingWebDrama && ' loading'}`}>
            {dataFilmWebDrama &&
              dataFilmWebDrama.map(
                (
                  el: { thumbnailImageMobileDomestic: string; _id: string },
                  index: React.Key | null | undefined,
                ) => {
                  return (
                    <li className={width > 768 ? 'item' : 'item-for-mobile '} key={index}>
                      <FilmList
                        idFilm={el._id}
                        width={width}
                        src={propertyImgLang(el, 'representativeImageMobile')}
                        name={propertyLang(el, 'title')}
                      />
                    </li>
                  );
                },
              )}
          </ul>
        </div>
      </div>
      <div className="flex_column">
        <div className="flex_row jc-sb ai-c">
          <div
            className="fs-20 fw-700"
            onClick={() => {
              setSelected('shortMovies');
            }}
            aria-hidden="true"
          >
            {t(common.shortMovies)}
          </div>
        </div>
        <div>
          <div className="flex_row" style={{ marginTop: 12 }}>
            {!loadingShortMovies && <Loading />}

            <ul className={`list-film-for-mobile ${!loadingShortMovies && ' loading'}`}>
              {dataFilmShortMovies &&
                dataFilmShortMovies.map(
                  (
                    el: { thumbnailImageMobileDomestic: string; _id: string },
                    index: React.Key | null | undefined,
                  ) => {
                    return (
                      <li className={width > 768 ? 'item' : 'item-for-mobile '} key={index}>
                        <FilmList
                          idFilm={el._id}
                          width={width}
                          src={propertyImgLang(el, 'representativeImageMobile')}
                          name={propertyLang(el, 'title')}
                        />
                      </li>
                    );
                  },
                )}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex_column">
        <div className="flex_row jc-sb ai-c">
          <div
            className="fs-20 fw-700"
            onClick={() => {
              setSelected('musicVideos');
            }}
            aria-hidden="true"
          >
            {t(common.musicVideos)}
          </div>
        </div>
        <div>
          <div className="flex_row" style={{ marginTop: 12 }}>
            {!loadingMusicVideos && <Loading />}

            <ul className={`list-film-for-mobile ${!loadingMusicVideos && ' loading'}`}>
              {dataFilmMusicVideos &&
                dataFilmMusicVideos.map(
                  (
                    el: { thumbnailImageMobileDomestic: string; _id: string },
                    index: React.Key | null | undefined,
                  ) => {
                    return (
                      <li className={width > 768 ? 'item' : 'item-for-mobile '} key={index}>
                        <FilmList
                          idFilm={el._id}
                          width={width}
                          src={propertyImgLang(el, 'representativeImageMobile')}
                          name={propertyLang(el, 'title')}
                        />
                      </li>
                    );
                  },
                )}
            </ul>
          </div>
        </div>
      </div>
    </Space>
  );
};

export default DisplayMobileTabAll;
