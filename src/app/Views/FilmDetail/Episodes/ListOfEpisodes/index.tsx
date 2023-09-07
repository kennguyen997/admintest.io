/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'app/redux/Slices';
import { CombinedState } from 'redux';
import ModalNeedLogInBeforeDoThat from 'components/modal/ModalNeedLogInBeforeDoThat';
import { ResultAccount } from 'app/Models';
import moment from 'moment';
import { calculatorView } from 'app/Services/calculator';
import { common } from 'app/trans';
import { propertyLang } from 'assets/propertyLang';
import i18n from 'app/trans/i18n';
import { useTranslation } from 'react-i18next';
import LazyImage from 'components/lazyLoadImage';
import { DetailStreamingType } from 'app/Models';

type Props = {
  idFilm: string;
  seasonSelect: number;
  selectEpsiodeFilm: number;
  setSelectEpsiodeFilm: any;
  width: number;
  account: ResultAccount | null;
  dataAllEpisodesAndSeasonOfFilm: Array<any>;
  playVideo: boolean;
  setPlayVideo: any;
  filmDetail: DetailStreamingType;
};

function ListOfEpisodes({
  idFilm,
  seasonSelect,
  setSelectEpsiodeFilm,
  selectEpsiodeFilm,
  dataAllEpisodesAndSeasonOfFilm,
  account,
  playVideo,
  setPlayVideo,
  filmDetail,
}: Props) {
  const [t] = useTranslation();
  //   const navigate = useNavigate();
  const isWebSeries : boolean = filmDetail?.category?.name_eng && ["short movie", "music video"].indexOf(filmDetail.category.name_eng) < 0 ? true : false;
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="describe_episode_scroll">
      {dataAllEpisodesAndSeasonOfFilm
        .filter((e) => e.numberSeason == seasonSelect)
        ?.reverse()
        ?.map((el: any) => {
          if (selectEpsiodeFilm == el.number) {
            console.log(el);

            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <div
                key={el._id}
                className="describe_each_episode"
                onClick={() => {
                  setSelectEpsiodeFilm(el.number);
                }}
              >
                <div className="container ">
                  <LazyImage
                    src={
                      i18n.language == 'korean'
                        ? el.thumbnailImageDomesticEpisodes
                        : el.thumbnailImageOverseaEpisodes
                    }
                    style={{ height: 'height: calc(50% * 112 / 184)' }}
                    alt="image_film"
                    className="img"
                  />
                  <div className="overlay"></div>
                </div>
                <div className="describe_each_episode_content">
                  <div className="describe_each_episode_content_episodes" style={{display: !isWebSeries?"none":""}}>
                    {' '}
                    {i18n.language == 'korean' ? `${el.number}화` : `Epsiode ${el.number}`}
                  </div>
                  <div className="describe_each_episode_content_information">
                    <div>
                      {i18n.language == 'korean'
                        ? `${moment(el.createdAt).locale('ko').format('MMMM Do')} 공개`
                        : `${moment(el.createdAt).locale('en').format('MMMM Do')} open`}
                    </div>

                    <div style={{ paddingTop: 10 }}>
                      <Button
                        type="primary"
                        onClick={() => {
                          if (!account) {
                            setOpenModal(true);
                            return;
                          }
                          if (!playVideo) {
                            const idSeason: any = dataAllEpisodesAndSeasonOfFilm?.filter(
                              (el) => el.numberSeason == seasonSelect,
                            )[0]?.seasonID;
                            const idSelectedEpsiodeFilm: any =
                              dataAllEpisodesAndSeasonOfFilm?.filter(
                                (el) =>
                                  el.number == selectEpsiodeFilm && el.numberSeason == seasonSelect,
                              )[0]?._id;
                            calculatorView({
                              streamingID: idFilm,
                              seasonID: idSeason,
                              streamingEpisodesID: idSelectedEpsiodeFilm,
                            });
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
                    </div>
                    <ModalNeedLogInBeforeDoThat openModal={openModal} setOpenModal={setOpenModal} />
                  </div>
                </div>
              </div>
            );
          }
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              key={el._id}
              className="describe_each_episode"
              onClick={() => {
                setSelectEpsiodeFilm(el.number);
              }}
            >
              <div className="container ">
                <LazyImage
                  src={
                    i18n.language == 'korean'
                      ? el.thumbnailImageDomesticEpisodes
                      : el.thumbnailImageOverseaEpisodes
                  }
                  alt="image_film"
                  className="img"
                />
                <div className="overlay"></div>
              </div>
              <div className="describe_each_episode_content">
                <div className="describe_each_episode_content_episodes" style={{display: !isWebSeries?"none":""}}>
                  {i18n.language == 'korean' ? `${el.number}화` : `Epsiode ${el.number}`}
                </div>
                <div className="describe_each_episode_content_information">
                  <div>{el.time}</div>
                  {/* <div
                    className="overtext_episode_content_information"
                    data-text={propertyLang(el, 'storyEpisode')}
                  >
                    {propertyLang(el, 'storyEpisode')}
                  </div> */}
                  <Tooltip
                    className="overtext_episode_content_information"
                    placement="bottom"
                    overlayInnerStyle={{ color: 'black', backgroundColor: 'white' }}
                    title={propertyLang(el, 'storyEpisode')}
                  >
                    {propertyLang(el, 'storyEpisode')}
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
const mapStateToProps = (state: CombinedState<{ accounts: null }>) => ({
  account: selectors.account.select(state),
});
export default connect(mapStateToProps)(ListOfEpisodes);
