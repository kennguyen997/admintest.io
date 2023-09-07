import { DataVoteType } from 'app/Models/Voted';
import Loading from 'components/loading';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';

import Comment from './Comment';
import VoteComponent from './VoteComponent';

type Props = {
  width: number;
  dataVote: DataVoteType;
  setDataVote: React.Dispatch<React.SetStateAction<null>>;
  selectEpsiodeFilm: number;
  seasonSelect: number;
  dataAllEpisodesAndSeasonOfFilm: any;
};

const Vote = function ({
  width,
  dataVote,
  setDataVote,
  selectEpsiodeFilm,
  seasonSelect,

  dataAllEpisodesAndSeasonOfFilm,
}: Props) {
  const [t] = useTranslation();

  return (
    <div>
      <div className="desciption_vote ">
        {!dataVote && (
          <div className="loading_waiting_data_film">
            <Loading />
          </div>
        )}
        {dataVote && dataVote?.voteOption?.length > 0 && (
          <VoteComponent dataVote={dataVote} setDataVote={setDataVote} width={width} />
        )}
        {dataVote && dataVote?.voteOption?.length == 0 && <div>{t(common.haveNoVote)}</div>}
        <Comment
          selectEpsiodeFilm={selectEpsiodeFilm}
          seasonSelect={seasonSelect}
          dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
        />
      </div>
    </div>
  );
};

export default Vote;
