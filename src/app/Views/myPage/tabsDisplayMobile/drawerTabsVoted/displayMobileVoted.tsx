import React, { FC } from 'react';
import 'assets/style/Views/streaming.scss';

// import { useTranslation } from 'react-i18next';
import { Pagination } from 'antd';
import ItemVotedList from './itemVotedList';
import { VotedType } from 'app/Models/Voted';
import { useNavigate } from 'react-router-dom';
import i18n from 'app/trans/i18n';
type Prop = {
  dataVoted: Array<VotedType>[];
  limitPageSize: number;
  setCurrentPage: any;
  total: number;
  currentPage: number;
};

const DisplayMobileVoted: FC<Prop> = ({
  dataVoted,
  limitPageSize,
  setCurrentPage,
  total,
  currentPage,
}) => {
  // const [t] = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <ul className="list-film">
        {dataVoted.map((el: any, index: React.Key | null | undefined) => {
          return (
            <li
              className="item-voted-list"
              key={index}
              onClick={() => {
                navigate(`/detail-film/${el.streamingID}`);
              }}
              aria-hidden="true"
            >
              <ItemVotedList
                data={el.voteID}
                votedOption={el.voteOptionID}
                src={
                  i18n.language == 'korean'
                    ? el.streamingEpisodesID.thumbnailImageDomesticEpisodes
                    : el.streamingEpisodesID.thumbnailImageOverseaEpisodes
                }
              />
            </li>
          );
        })}
      </ul>
      {total > 0 && (
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0 50px 0' }}
          className="pagination"
        >
          <Pagination
            defaultCurrent={currentPage}
            pageSize={limitPageSize}
            total={total}
            showSizeChanger={false}
            onChange={(e) => {
              setCurrentPage(e);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DisplayMobileVoted;
