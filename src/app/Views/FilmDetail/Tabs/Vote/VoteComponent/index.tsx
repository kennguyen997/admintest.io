import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { common, errorMessage } from 'app/trans';
import { Button, Image, Space } from 'antd';
import VoteIcon from './VoteIcon';
import LinearWithValueLabel from 'components/Slider/LinearWithValueLabel';
import PeopleIcon from './PeopleIcon';

import { connect } from 'react-redux';
import { RootState, selectors } from 'app/redux/Slices';
import ModalNeedLogInBeforeDoThat from 'components/modal/ModalNeedLogInBeforeDoThat';
import { ResultAccount } from 'app/Models';
import Toastconfig from 'assets/toast';
import { handleChooseVote } from 'app/Services/streaming';
import { DataVoteType } from 'app/Models/Voted';
import { propertyLang } from 'assets/propertyLang';
import moment from 'moment';

type Props = {
  width: number;
  account?: ResultAccount | null;
  dataVote: DataVoteType;
  setDataVote: React.Dispatch<React.SetStateAction<null>>;
  //   selectEpsiodeFilm: number;
};

const upperCaseAlp = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const VoteComponent = function ({ width, account, dataVote, setDataVote }: Props) {
  const [filled, setFilled] = useState<any[]>([]);
  const [t] = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [singleChoice, setSingleChoice] = useState<boolean>(false);

  useEffect(() => {
    if (dataVote.vote?.method?._id == '623bdfd8798991010f784665') {
      setSingleChoice(true);
    }
  }, [dataVote]);

  const handleVote = async () => {
    setLoading(true);
    if (!account) {
      setLoading(false);
      setOpenModal(true);
      return;
    }
    if (filled.length == 0) {
      Toastconfig.error(t(errorMessage.please_choose));
      setLoading(false);
      return;
    }
    const dataSent = {
      streamingID: dataVote.vote.streamingID,
      seasonID: dataVote.voteOption[0].seasonID,
      streamingEpisodesID: dataVote.vote.streamingEpisodesID,
      voteID: dataVote.vote._id,
      voteOptionArray: filled,
    };
    // console.log('dataSent', dataSent);
    const response = await handleChooseVote(dataSent);
    console.log('response', response);

    if (response?.data?.status == true) {
      setDataVote({ isVote: true, ...response?.data?.data });
      setLoading(false);
    } else {
      Toastconfig.error(t(errorMessage.voting_failed));
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="desciption_vote_title">
          {dataVote?.vote ? propertyLang(dataVote?.vote, 'title') : null}
        </div>
        <div className="desciption_vote_describe">
          {dataVote?.vote ? propertyLang(dataVote?.vote, 'content') : null}
        </div>
      </div>
      <div style={{ paddingTop: 24, paddingBottom: 10 }} className="period_vote">
        {`${t(common.period)}:   ${
          dataVote?.vote?.startDate ? moment(dataVote?.vote?.startDate).format('YYYY.MM.DD') : '...'
        } ~ ${
          dataVote?.vote?.endDate ? moment(dataVote?.vote?.endDate).format('YYYY.MM.DD') : '...'
        }`}
      </div>
      <Space size={8} direction="vertical" className="w-100">
        {dataVote?.voteOption?.map((el: any, index: number) => {
          return (
            <div className="image_vote_product" key={el._id}>
              <div className="unvoted_show">
                <Image src={el.image} className="vote_img" alt="productImage" />
                <div className="detailVote">
                  <div className="name_product">
                    {`${upperCaseAlp[index]}. `}
                    {propertyLang(el, 'data')}
                  </div>
                  {dataVote.isVote && (
                    <div className="voting_results">
                      <div className="text_voted_average">{`${
                        el.quantity == dataVote.vote.quantity
                          ? 100
                          : ((el.quantity / dataVote.vote.quantity) * 100).toFixed(0)
                      }%`}</div>
                      <div>
                        <LinearWithValueLabel
                          color="#FE9738"
                          number={Number(
                            el.quantity == dataVote.vote.quantity
                              ? 100
                              : ((el.quantity / dataVote.vote.quantity) * 100).toFixed(0),
                          )}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="button_before_voted">
                <Button
                  onClick={() => {
                    if (singleChoice) {
                      if (filled.indexOf(el._id) >= 0) {
                        filled.splice(filled.indexOf(el._id), 1);
                        setFilled([...filled]);
                        return;
                      }
                      filled[0] = el._id;
                      setFilled([...filled]);
                      return;
                    }
                    if (filled.indexOf(el._id) >= 0) {
                      filled.splice(filled.indexOf(el._id), 1);
                      setFilled([...filled]);
                      return;
                    }
                    filled.push(el._id);
                    setFilled([...filled]);
                  }}
                  shape="circle"
                  disabled={dataVote.isVote}
                >
                  <VoteIcon
                    fill={filled.indexOf(el._id) >= 0 || el.isChoosen ? '#0E7EE4' : 'white'}
                    width={width}
                  />
                </Button>
              </div>
            </div>
          );
        })}
        <div className="vote_participants">
          <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
            <PeopleIcon width={width} />
            <div className="participants">{`${
              dataVote?.vote?.quantity || dataVote.vote.quantity
            } ${t(common.participants)}`}</div>
          </div>
          <div>
            <Button
              type="primary"
              className="button_vote"
              onClick={handleVote}
              loading={loading}
              disabled={dataVote.isVote}
            >
              {t(common.vote2)}
            </Button>
            <ModalNeedLogInBeforeDoThat openModal={openModal} setOpenModal={setOpenModal} />
          </div>
        </div>
      </Space>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(VoteComponent);
