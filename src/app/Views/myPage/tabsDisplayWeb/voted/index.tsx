import React, { FC, useEffect, useState } from 'react';
// import { common } from 'app/trans';
// import { useTranslation } from 'react-i18next';
import Loading from 'components/loading';

import DisplayWebVoted from './displayWebVoted';
import { getListVoted } from 'app/Services/myPage';
// import { useNavigate } from 'react-router-dom';
type Prop = {
  width: number;
};

const Voted: FC<Prop> = ({ width }) => {
  const [dataVoted, setDataVoted] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const limitPageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(false);
    const fetchDataVoted = async () => {
      const response: any = await getListVoted({
        limit: limitPageSize,
        page: currentPage,
      });
      if (response.status == 200) {
        setLoading(true);
        setDataVoted(response.data.data);
      }
    };
    fetchDataVoted();
  }, [currentPage]);

  console.log('dataVoted', dataVoted);

  return (
    <div>
      <div>{!loading && <Loading />}</div>
      {width > 768 && dataVoted && (
        <DisplayWebVoted
          dataVoted={dataVoted?.docs}
          total={dataVoted.totalDocs}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limitPageSize={limitPageSize}
        />
      )}
    </div>
  );
};

export default Voted;
