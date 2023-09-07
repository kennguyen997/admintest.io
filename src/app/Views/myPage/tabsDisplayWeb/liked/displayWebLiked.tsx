import React, { FC } from 'react';
import 'assets/style/Views/streaming.scss';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Button, Pagination, Space } from 'antd';
import FilmList from 'components/displayFilm/FilmList';
import { propertyLang } from 'assets/propertyLang';
import i18n from 'app/trans/i18n';
// import { useNavigate } from 'react-router-dom';
type Prop = {
  width: number;
  dataFilm: any;
  limitPageSize: number;
  setCurrentPage: any;
  category: string;
  setCategory: any;
  currentPage: number;
};

const DisplayWebLiked: FC<Prop> = ({
  width,
  dataFilm,
  limitPageSize,
  setCurrentPage,
  category,
  setCategory,
  currentPage,
}) => {
  const [t] = useTranslation();

  return (
    <div>
      <Space size={8}>
        <Button
          type={category == 'all' ? 'primary' : 'default'}
          onClick={() => {
            setCategory('all');
          }}
        >
          {t(common.allStreaming)}
        </Button>
        <Button
          type={category == 'webDrama' ? 'primary' : 'default'}
          onClick={() => {
            setCategory('webDrama');
          }}
        >
          {t(common.webDrama)}
        </Button>
        <Button
          type={category == 'shortMovies' ? 'primary' : 'default'}
          onClick={() => {
            setCategory('shortMovies');
          }}
        >
          {t(common.shortMovies)}
        </Button>
        <Button
          type={category == 'musicVideos' ? 'primary' : 'default'}
          onClick={() => {
            setCategory('musicVideos');
          }}
        >
          {t(common.musicVideos)}
        </Button>
      </Space>

      <div style={{ paddingTop: 20 }}>
        <ul className="list-film">
          {dataFilm.docs.map((el: any) => {
            return (
              <li className="item" key={el._id}>
                <FilmList
                  idFilm={el.streamingID?._id}
                  width={width}
                  src={
                    el.streamingID[
                      i18n.language == 'korean'
                        ? 'thumbnailImageWebDomestic'
                        : 'thumbnailImageWebOversea'
                    ]
                  }
                  name={propertyLang(el.streamingID, 'title')}
                />
              </li>
            );
          })}
        </ul>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20 }}
          className="pagination"
        >
          <Pagination
            defaultCurrent={currentPage}
            pageSize={limitPageSize}
            total={dataFilm.totalDocs}
            showSizeChanger={false}
            onChange={(e) => {
              setCurrentPage(e);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayWebLiked;
