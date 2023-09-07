import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { common, errorMessage } from 'app/trans';
import { Button, Input } from 'antd';
import ListComment from './ListComment';
import ModalNeedLogInBeforeDoThat from 'components/modal/ModalNeedLogInBeforeDoThat';
import { connect } from 'react-redux';
import { RootState, selectors } from 'app/redux/Slices';
import { ResultAccount } from 'app/Models';
import { useParams } from 'react-router-dom';
import { handleCreateComment } from 'app/Services/streaming';
import Toastconfig from 'assets/toast';

const { TextArea } = Input;

const Comment = function ({
  account,
  selectEpsiodeFilm,
  dataAllEpisodesAndSeasonOfFilm,
  seasonSelect,
}: {
  account: ResultAccount | null;
  selectEpsiodeFilm: number;
  seasonSelect: number;
  dataAllEpisodesAndSeasonOfFilm: any;
}) {
  const params = useParams();
  const idFilm = params.id;
  const [t] = useTranslation();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contentComment, setContentComment] = useState<string>('');
  const [loadingCmt, setLoadingCmt] = useState<boolean>(false);
  const [createdNewCmt, setCreatedNewCmt] = useState<boolean>(false);

  const handleCreateCmt = async () => {
    setLoadingCmt(true);
    if (!contentComment.trim()) {
      setLoadingCmt(false);
      return;
    }
    const dataSent = {
      streamingID: idFilm,
      streamingEpisodesID: dataAllEpisodesAndSeasonOfFilm?.filter(
        (el: any) => el.number == selectEpsiodeFilm && el.numberSeason == seasonSelect,
      )[0]?._id,
      content: contentComment,
    };

    const response = await handleCreateComment(dataSent);
    if (response?.data?.status == true) {
      setContentComment('');
      setCreatedNewCmt(true);
      setLoadingCmt(false);
    } else {
      Toastconfig.error(t(errorMessage.comment_failed));
      setLoadingCmt(false);
    }
  };

  return (
    <div className="comment_in_vote">
      <div className="area_input_comment">
        <TextArea
          value={contentComment}
          placeholder={t(common.writeAComment)}
          autoSize={{ minRows: 1, maxRows: 6 }}
          onChange={(e) => {
            setContentComment(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (!account) {
              setOpenModal(true);
              return;
            }
            handleCreateCmt();
          }}
          loading={loadingCmt}
          disabled={!contentComment.trim()}
        >
          {t(common.comment)}
        </Button>
        <ModalNeedLogInBeforeDoThat openModal={openModal} setOpenModal={setOpenModal} />
      </div>

      <ListComment
        createdNewCmt={createdNewCmt}
        setCreatedNewCmt={setCreatedNewCmt}
        account={account}
        selectEpsiodeFilm={selectEpsiodeFilm}
        seasonSelect={seasonSelect}
        dataAllEpisodesAndSeasonOfFilm={dataAllEpisodesAndSeasonOfFilm}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(Comment);
