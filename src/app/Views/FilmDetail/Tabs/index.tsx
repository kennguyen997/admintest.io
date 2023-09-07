import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import { Tabs } from 'antd';
// import Cast from './description/Cast';
import Vote from './Vote';
import redPoint from '../../../../assets/icons/redPoint.png';
import Episodes from '../Episodes/Episodes';
import Cast from './description/Cast';
import { DetailStreamingType } from 'app/Models';
const { TabPane } = Tabs;

type Props = {
  idFilm: string;
  filmDetail: DetailStreamingType;
  width: number;
  seasonSelect: number;
  setSeasonSelect: any;
  dataAllSeasonOfFilm: any;
  selectEpsiodeFilm: number;
  setSelectEpsiodeFilm: any;
  player: any;
  showModal: () => any;
  dataAllEpisodesAndSeasonOfFilm: any;
  dataDetailSeason: any;
  dataVote: any;
  setDataVote: React.Dispatch<React.SetStateAction<null>>;
  playVideo: boolean;
  setPlayVideo: any;
};

function getEpisodesTitle(isWebSeries: boolean, filmDetail: DetailStreamingType, t: any) {
  if(isWebSeries || !filmDetail?.category) {
    
    return t(common.episodesTitle);
  }
  const typeIdx = ["short movie", "music video"].indexOf(filmDetail.category.name_eng);
  if(typeIdx === 0) {

    return t(common.shortMovie);
  }

  return t(common.musicVideo);
}

const TabsUnder = function ({
  idFilm,
  dataAllSeasonOfFilm,
  filmDetail,
  width,
  seasonSelect,
  setSeasonSelect,
  selectEpsiodeFilm,
  setSelectEpsiodeFilm,
  dataDetailSeason,
  dataAllEpisodesAndSeasonOfFilm,
  dataVote,
  setDataVote,
  playVideo,
  setPlayVideo,
}: Props) {
  const [t] = useTranslation();
  const [selected, setSelected] = useState('1');
  const callback = (key: any) => {
    console.log(key);

    setSelected(key);
  };

  const isWebSeries : boolean = filmDetail?.category?.name_eng && ["short movie", "music video"].indexOf(filmDetail.category.name_eng) < 0 ? true : false;
  const episodeTitle = getEpisodesTitle(isWebSeries, filmDetail, t);

  return (
    <div>
      {width > 768 && (
        <Tabs defaultActiveKey={selected} onChange={callback}>
          <TabPane tab={t(common.details)} key="1">
            <Cast width={width} dataDetailSeason={dataDetailSeason} />
          </TabPane>
          <TabPane
            tab={
              <div style={{ position: 'relative' }}>
                <div style={{ color: selected == '3' ? '#fff' : '#bdc5cb' }}>{t(common.vote)}</div>
                {dataVote && !dataVote?.isVote && dataVote?.voteOption?.length > 0 && (
                  <img
                    src={redPoint}
                    alt="redpoint"
                    style={{ position: 'absolute', top: 0, right: 0, width: 4 }}
                  />
                )}
              </div>
            }
            key="3"
          >
            {selectEpsiodeFilm && (
              <Vote
                dataVote={dataVote}
                setDataVote={setDataVote}
                width={width}
                seasonSelect={seasonSelect}
                selectEpsiodeFilm={selectEpsiodeFilm}
                dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
              />
            )}
          </TabPane>
        </Tabs>
      )}
      {width <= 768 && (
        <Tabs defaultActiveKey={selected} onChange={callback}>
          <TabPane tab={episodeTitle} key="1">
            <Episodes
              idFilm={idFilm}
              dataAllSeasonOfFilm={dataAllSeasonOfFilm}
              width={width}
              dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
              filmDetail={filmDetail}
              seasonSelect={seasonSelect}
              setSeasonSelect={setSeasonSelect}
              selectEpsiodeFilm={selectEpsiodeFilm}
              setSelectEpsiodeFilm={setSelectEpsiodeFilm}
              setPlayVideo={setPlayVideo}
              playVideo={playVideo}
            />
          </TabPane>
          <TabPane tab={t(common.description)} key="2">
            <Cast width={width} dataDetailSeason={dataDetailSeason} />
          </TabPane>
          <TabPane
            tab={
              <div style={{ position: 'relative' }}>
                <div style={{ color: selected == '3' ? '#fff' : '#bdc5cb' }}>{t(common.vote)}</div>
                {dataVote && !dataVote?.isVote && (
                  <img
                    src={redPoint}
                    alt="redpoint"
                    style={{ position: 'absolute', top: 0, right: 0, width: 4 }}
                  />
                )}
              </div>
            }
            key="3"
          >
            {selectEpsiodeFilm && (
              <Vote
                dataVote={dataVote}
                setDataVote={setDataVote}
                width={width}
                seasonSelect={seasonSelect}
                selectEpsiodeFilm={selectEpsiodeFilm}
                dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
              />
            )}
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default React.memo(TabsUnder);
