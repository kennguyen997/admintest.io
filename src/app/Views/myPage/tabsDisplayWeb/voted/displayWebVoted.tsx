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

const DisplayWebVoted: FC<Prop> = ({
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
      <div style={{ paddingTop: 20 }}>
        <ul className="list-film">
          {dataVoted.map((el: VotedType | any, index: React.Key | null | undefined) => {
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
            style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 20 }}
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
    </div>
  );
};

export default DisplayWebVoted;
