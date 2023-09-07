import React, { useCallback, useEffect, useState } from 'react';
import 'assets/style/Views/FilmDetail/_filmDetail.scss';
import { useParams } from 'react-router-dom';
import Episodes from './Episodes/Episodes';
import BasicInfomation from './BasicInfomation';
import TabsUnder from './Tabs';
import LikeShareSave from './LikeShareSave';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import { connect } from 'react-redux';
import { selectors } from 'app/redux/Slices';
import ModalNeedLogInBeforeDoThat from 'components/modal/ModalNeedLogInBeforeDoThat';
import {
  getDataAllEpisodesOfFilm,
  getDataAllSeasonOfFilm,
  getDataDetailFilm,
  getDataDetailFilmHaveAuthen,
  getDataDetailSeason,
  getDataDetailVote,
  getDataDetailVoteNoAuth,
} from 'app/Services/streaming';
import Loading from 'components/loading';
import { calculatorClick, calculatorView } from 'app/Services/calculator';
import ReactPlayer from 'react-player';
import ButtonPlayVideo from './ButtonPlayVideo';
import { Button } from 'antd';
import { propertyImgLang, propertyLang } from 'assets/propertyLang';

import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import SEO from 'components/seo';

// eslint-disable-next-line react/prop-types
function FilmDetail({ account }) {
  const [t] = useTranslation();

  const params = useParams();
  const idFilm = params.id;

  const [selectEpsiodeFilm, setSelectEpsiodeFilm] = useState(null);
  const [seasonSelect, setSeasonSelect] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dataDetailFilm, setDataDetailFilm] = useState(null);
  const [dataAllSeasonOfFilm, setDataAllSeasonOfFilm] = useState(null);
  const [noData, setNoData] = useState(false);

  const [dataAllEpisodesAndSeasonOfFilm, setDataAllEpisodesAndSeasonOfFilm] = useState(null);
  const [dataDetailSeason, setDataDetailSeason] = useState(null);
  const [dataVote, setDataVote] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const { width } = useWindowDimensions();

  const fecthDataDetailFilmByIdFilm = useCallback(async () => {
    if (!account) {
      const response = await getDataDetailFilm(idFilm);
      if (response.status == 200) {
        setDataDetailFilm(response.data?.data);
      }
    } else {
      const response = await getDataDetailFilmHaveAuthen(idFilm);
      if (response.status == 200) {
        setDataDetailFilm(response.data?.data);
      }
    }
  }, [idFilm, account]);

  const fecthDataAllEpisodesOfFilm = useCallback(async () => {
    const response = await getDataAllEpisodesOfFilm({ streamingID: idFilm });
    if (response.status == 200) {
      setDataAllEpisodesAndSeasonOfFilm(response.data?.data);
    }
  }, [idFilm]);

  const fecthDataAllSeasonOfFilm = useCallback(async () => {
    const response = await getDataAllSeasonOfFilm({ streamingID: idFilm });
    if (response.status == 200) {
      setDataAllSeasonOfFilm(response.data?.data);
    }
  }, [idFilm]);

  // get data film by idFilm
  useEffect(() => {
    setDataDetailFilm(null);
    fecthDataDetailFilmByIdFilm();
    fecthDataAllEpisodesOfFilm();
    fecthDataAllSeasonOfFilm();
  }, [idFilm, account, fecthDataDetailFilmByIdFilm, fecthDataAllEpisodesOfFilm, fecthDataAllSeasonOfFilm]);

  //get data detail season
  useEffect(() => {
    setDataDetailSeason(null);
    if (dataAllSeasonOfFilm && seasonSelect) {
      let idSeason = dataAllSeasonOfFilm.filter((el) => el.number == seasonSelect)[0]?._id;
      const fetchDataDetailSeason = async () => {
        const response = await getDataDetailSeason(idSeason);
        if (response.status == 200) {
          setDataDetailSeason(response.data?.data);
        }
      };
      fetchDataDetailSeason();
    }
  }, [dataAllSeasonOfFilm, seasonSelect]);

  //get data vote
  useEffect(() => {
    setDataVote(null);
    if (!dataAllEpisodesAndSeasonOfFilm) return;
    let idSeason = dataAllEpisodesAndSeasonOfFilm.filter((el) => el.numberSeason == seasonSelect)[0]
      ?.seasonID;
    let idSelectedEpsiodeFilm = dataAllEpisodesAndSeasonOfFilm?.filter(
      (el) => el.number == selectEpsiodeFilm && el.numberSeason == seasonSelect,
    )[0]?._id;

    //add +1 Click
    if (idSeason && idSelectedEpsiodeFilm) {
      calculatorClick({
        streamingID: idFilm,
        seasonID: idSeason,
        streamingEpisodesID: idSelectedEpsiodeFilm,
      });

      const fetchDataDetailVote = async () => {
        if (account) {
          const response = await getDataDetailVote({
            streamingID: idFilm,
            seasonID: idSeason,
            streamingEpisodesID: idSelectedEpsiodeFilm,
          });
          if (response.status == 200) {
            setDataVote(response.data?.data);
          }
          return;
        }
        const response = await getDataDetailVoteNoAuth({
          streamingID: idFilm,
          seasonID: idSeason,
          streamingEpisodesID: idSelectedEpsiodeFilm,
        });
        if (response.status == 200) {
          setDataVote(response.data?.data);
        }
        return;
      };
      fetchDataDetailVote();
    }
  }, [dataAllEpisodesAndSeasonOfFilm, idFilm, seasonSelect, selectEpsiodeFilm, account]);

  //handle when select another  season

  //handle when select another  epsiode
  useEffect(() => {
    setPlayVideo(false);
    setNoData(false);
  }, [selectEpsiodeFilm]);

  useEffect(() => {
    if (dataAllSeasonOfFilm) {
      setSeasonSelect(dataAllSeasonOfFilm[0]?.number);
    }
  }, [dataAllSeasonOfFilm]);
  useEffect(() => {
    if (dataAllEpisodesAndSeasonOfFilm) {
      setSelectEpsiodeFilm(
        dataAllEpisodesAndSeasonOfFilm.filter((e) => e.numberSeason == seasonSelect)?.reverse()[0]
          ?.number,
      );
    }
  }, [dataAllEpisodesAndSeasonOfFilm, seasonSelect]);

  return (
    <div>
      <SEO
        title={dataDetailFilm && propertyLang(dataDetailFilm, 'title')}
        description={dataDetailFilm && propertyLang(dataDetailFilm, 'story')}
        metaImage={
          dataDetailFilm &&
          propertyImgLang(
            dataDetailFilm,
            width > 768 ? 'representativeImageWeb' : 'representativeImageMobile',
          )
        }
      />
      <div>
        <div className="main_film_detail">
          <div className="show_video_and_basic_infomation_episodes">
            {!dataDetailFilm && (
              <div className="loading_waiting_data_film">
                <Loading />
              </div>
            )}
            {dataDetailFilm && (
              <div className="show_video_and_basic_infomation">
                <div
                  className={`show_video none_button `}
                  onClick={() => {
                    if (!account) {
                      setOpenModal(true);
                      return;
                    }
                    if (!playVideo) {
                      let idSeason = dataAllEpisodesAndSeasonOfFilm?.filter(
                        (el) => el.numberSeason == seasonSelect,
                      )[0]?.seasonID;
                      let idSelectedEpsiodeFilm = dataAllEpisodesAndSeasonOfFilm?.filter(
                        (el) => el.number == selectEpsiodeFilm && el.numberSeason == seasonSelect,
                      )[0]?._id;
                      if (!idSelectedEpsiodeFilm) setNoData(true);
                      if (idSeason && idSelectedEpsiodeFilm) {
                        calculatorView({
                          streamingID: idFilm,
                          seasonID: idSeason,
                          streamingEpisodesID: idSelectedEpsiodeFilm,
                        });
                      }
                    }
                    setPlayVideo(true);
                  }}
                  aria-hidden="true"
                >
                  {!playVideo && (
                    <div className="button_play">
                      <div className="play_button_video">
                        <ButtonPlayVideo />
                      </div>
                    </div>
                  )}
                  {noData && (
                    <div className="button_play">
                      <div className="play_button_video">{t(common.haveNoData)}</div>
                    </div>
                  )}
                  <ReactPlayer
                    width="100%"
                    playing={playVideo}
                    controls={true}
                    height={width > 768 ? (((width * 558) / 994) * 2) / 4 : (width * 8) / 11}
                    light={
                      !playVideo
                        ? propertyImgLang(
                            dataDetailFilm,
                            width > 768 ? 'thumbnailImageWeb' : 'thumbnailImageMobile',
                          ).replaceAll(" ", "%20")
                        : false
                    }
                    url={
                      dataAllEpisodesAndSeasonOfFilm?.filter(
                        (el) => el.number == selectEpsiodeFilm && el.numberSeason == seasonSelect,
                      )[0]?.url
                    }
                  />
                </div>
                <ModalNeedLogInBeforeDoThat openModal={openModal} setOpenModal={setOpenModal} />
                <div style={{ position: 'relative' }}>
                  <BasicInfomation
                    filmDetail={dataDetailFilm}
                    seasonSelect={seasonSelect}
                    selectEpsiodeFilm={selectEpsiodeFilm}
                  />
                  <div style={width > 768 ? { position: 'absolute', top: 0, right: 0 } : {}}>
                    <LikeShareSave width={width} dataDetailFilm={dataDetailFilm} fetchDetail={fecthDataDetailFilmByIdFilm} />
                  </div>
                </div>
              </div>
            )}
            {width > 768 && (
              <div className="episodes">
                <Episodes
                  idFilm={idFilm}
                  width={width}
                  dataAllSeasonOfFilm={dataAllSeasonOfFilm}
                  filmDetail={dataDetailFilm}
                  dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
                  seasonSelect={seasonSelect}
                  setSeasonSelect={setSeasonSelect}
                  selectEpsiodeFilm={selectEpsiodeFilm}
                  setSelectEpsiodeFilm={setSelectEpsiodeFilm}
                  playVideo={playVideo}
                  setPlayVideo={setPlayVideo}
                />
              </div>
            )}
          </div>
        </div>
        {width <= 768 ? (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '10px 0',
                position: 'relative',
              }}
            >
              <Button
                type="primary"
                style={{
                  width: '86%',
                  height: 56,
                  margin: '0 3% 20px 3%',
                  fontSize: 16,
                  zIndex: 1,
                }}
                onClick={() => {
                  if (!account) {
                    setOpenModal(true);
                    return;
                  }
                  setPlayVideo(true);
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                {t(common.play)}
              </Button>
              <ModalNeedLogInBeforeDoThat openModal={openModal} setOpenModal={setOpenModal} />
            </div>
            <div className="tab_infomation">
              <TabsUnder
                idFilm={idFilm}
                dataAllSeasonOfFilm={dataAllSeasonOfFilm}
                dataVote={dataVote}
                setDataVote={setDataVote}
                dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
                dataDetailSeason={dataDetailSeason}
                filmDetail={dataDetailFilm}
                width={width}
                seasonSelect={seasonSelect}
                setSeasonSelect={setSeasonSelect}
                selectEpsiodeFilm={selectEpsiodeFilm}
                setSelectEpsiodeFilm={setSelectEpsiodeFilm}
                playVideo={playVideo}
                setPlayVideo={setPlayVideo}
              />
            </div>
          </>
        ) : (
          <div className="tab_infomation">
            <TabsUnder
              filmDetail={dataDetailFilm}
              dataVote={dataVote}
              setDataVote={setDataVote}
              width={width}
              seasonSelect={seasonSelect}
              dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
              dataDetailSeason={dataDetailSeason}
              setSeasonSelect={setSeasonSelect}
              selectEpsiodeFilm={selectEpsiodeFilm}
              setSelectEpsiodeFilm={setSelectEpsiodeFilm}
            />
          </div>
        )}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(FilmDetail);
