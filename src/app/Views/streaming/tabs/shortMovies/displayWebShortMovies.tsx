import { Pagination } from 'antd';
import ListFilm from 'components/displayFilm/listFilm';
import React, { FC } from 'react';
// import { common } from 'app/trans';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';
type Prop = {
  width: number;
  dataFilm: any;
  limitPageSize: number;
  setCurrentPage: any;
  currentPage: number;
};

const DisplayWebShortMovies: FC<Prop> = ({
  dataFilm,
  limitPageSize,
  setCurrentPage,
  currentPage,
}) => {
  // const [t] = useTranslation();
  // const navigate = useNavigate();

  return (
    <div>
      <ListFilm
        rowClass="row-20"
        col={{ md: 5, xs: 12 }}
        type="streaming"
        loading={dataFilm}
        dataFilm={dataFilm.docs}
        disableUpdateAt
      />
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

export default DisplayWebShortMovies;
