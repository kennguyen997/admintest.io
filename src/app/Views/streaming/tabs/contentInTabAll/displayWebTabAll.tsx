import React, { FC } from 'react';

import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Button, Space } from 'antd';
import ListFilm from 'components/displayFilm/listFilm';
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
const DisplayWebTabAll: FC<Prop> = ({
  setSelected,

  dataFilmWebDrama,
  dataFilmMusicVideos,
  dataFilmShortMovies,
  loadingMusicVideos,
  loadingShortMovies,
  loadingWebDrama,
}) => {
  const [t] = useTranslation();
  // const navigate = useNavigate();

  return (
    <Space size={90} direction="vertical" className="content-in-tab-all">
      <div className="flex_column">
        <div className="flex_row jc-sb ai-c ">
          <div className="fs-36 fw-700">{t(common.webDrama)}</div>
          <div className="button-all">
            <Button
              onClick={() => {
                setSelected('webDrama');
              }}
            >
              {t(common.all2)}
            </Button>
          </div>
        </div>
        <div className="flex_row" style={{ gap: '1.3%', marginTop: 20 }}>
          <ListFilm
            rowClass="row-20"
            col={{ md: 5, xs: 12 }}
            type="streaming"
            loading={loadingWebDrama}
            dataFilm={dataFilmWebDrama}
            disableUpdateAt
          />
        </div>
      </div>
      <div className="flex_column">
        <div className="flex_row jc-sb ai-c">
          <div className="fs-36 fw-700">{t(common.shortMovies)}</div>
          <div className="button-all">
            <Button
              onClick={() => {
                setSelected('shortMovies');
              }}
            >
              {t(common.all2)}
            </Button>
          </div>
        </div>
        <div>
          <div className="flex_row" style={{ gap: '1.3%', marginTop: 20 }}>
            <ListFilm
              rowClass="row-20"
              col={{ md: 5, xs: 12 }}
              type="streaming"
              loading={loadingShortMovies}
              dataFilm={dataFilmShortMovies}
              disableUpdateAt
            />
          </div>
        </div>
      </div>
      <div className="flex_column">
        <div className="flex_row jc-sb ai-c">
          <div className="fs-36 fw-700">{t(common.musicVideos)}</div>
          <div className="button-all">
            <Button
              onClick={() => {
                setSelected('musicVideos');
              }}
            >
              {t(common.all2)}
            </Button>
          </div>
        </div>
        <div>
          <div className="flex_row" style={{ gap: '1.3%', marginTop: 20 }}>
            <ListFilm
              rowClass="row-20"
              col={{ md: 5, xs: 12 }}
              type="streaming"
              loading={loadingMusicVideos}
              dataFilm={dataFilmMusicVideos}
              disableUpdateAt
            />
          </div>
        </div>
      </div>
    </Space>
  );
};

export default DisplayWebTabAll;
