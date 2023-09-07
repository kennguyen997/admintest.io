import { Pagination } from 'antd';
import { propertyImgLang, propertyLang } from 'assets/propertyLang';
import React, { FC } from 'react';
// import { common } from 'app/trans';
// import { useTranslation } from 'react-i18next';
import FilmList from '../../../../../components/displayFilm/FilmList';
// import { useNavigate } from 'react-router-dom';
type Prop = {
  width: number;
  dataFilm: any;
  limitPageSize: number;
  setCurrentPage: any;
  currentPage: number;
};

const DisplayMobileShortMovies: FC<Prop> = ({
  width,
  dataFilm,
  limitPageSize,
  setCurrentPage,
  currentPage,
}) => {
  // const [t] = useTranslation();
  // const navigate = useNavigate();

  return (
    <div>
      <ul className="list-film">
        {dataFilm &&
          dataFilm.docs.map(
            (
              el: { thumbnailImageMobileDomestic: string; _id: string },
              index: React.Key | null | undefined,
            ) => {
              return (
                <li className="item" key={index}>
                  <FilmList
                    idFilm={el._id}
                    width={width}
                    src={propertyImgLang(el, 'thumbnailImageMobile')}
                    name={propertyLang(el, 'title')}
                  />
                </li>
              );
            },
          )}
      </ul>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="pagination">
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
  );
};

export default DisplayMobileShortMovies;
