import React from 'react';

import 'assets/style/Views/FilmDetail/_episodes.scss';

import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import ListOfEpisodes from './ListOfEpisodes';
import { DetailStreamingType } from 'app/Models';
import Loading from 'components/loading';

type Props = {
  idFilm: string;
  filmDetail: DetailStreamingType;
  seasonSelect: number;
  setSeasonSelect: any;
  dataAllSeasonOfFilm: any;
  selectEpsiodeFilm: number;
  setSelectEpsiodeFilm: any;
  width: number;
  dataAllEpisodesAndSeasonOfFilm: Array<any> | null;
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

function Episodes({
  idFilm,
  dataAllSeasonOfFilm,
  filmDetail,
  seasonSelect,
  setSeasonSelect,
  selectEpsiodeFilm,
  dataAllEpisodesAndSeasonOfFilm,
  setSelectEpsiodeFilm,

  width,
  playVideo,
  setPlayVideo,
}: Props) {

  const [t] = useTranslation();
  const isWebSeries : boolean = filmDetail?.category?.name_eng && ["short movie", "music video"].indexOf(filmDetail.category.name_eng) < 0 ? true : false;
  const episodeTitle = getEpisodesTitle(isWebSeries, filmDetail, t);

  return (
    <div className="episode_contain">
      <div className="episode_title">
        <div className="episode_title_main">{episodeTitle}</div>
        {!filmDetail && <Loading />}
        {filmDetail && seasonSelect && dataAllSeasonOfFilm && isWebSeries && (
          <div className="episode_season">
            <Select
              defaultValue={seasonSelect}
              onChange={(e) => {
                setSeasonSelect(e);
              }}
              style={{ width: '100%', position: 'relative' }}
            >
              {dataAllSeasonOfFilm?.map((el: any, index: number) => {
                return (
                  <Select.Option key={index} value={el.number}>
                    {`${t(common.season)} ${el.number}`}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        )}
      </div>
      <div className="list_of_episodes">
        {!dataAllEpisodesAndSeasonOfFilm && <Loading />}
        {dataAllEpisodesAndSeasonOfFilm && (
          <ListOfEpisodes
            idFilm={idFilm}
            width={width}
            dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
            seasonSelect={seasonSelect}
            setSelectEpsiodeFilm={setSelectEpsiodeFilm}
            selectEpsiodeFilm={selectEpsiodeFilm}
            playVideo={playVideo}
            setPlayVideo={setPlayVideo}
            filmDetail={filmDetail}
          />
        )}
      </div>
    </div>
  );
}

export default Episodes;
