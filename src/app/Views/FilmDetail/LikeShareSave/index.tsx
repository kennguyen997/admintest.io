import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import Bookmark from './BookmarkIcon';
import ModalShare from './ModalShare';
import LikeIcon from './LikeIcon';
import { connect } from 'react-redux';
import { selectors } from 'app/redux/Slices';
import { CombinedState } from 'redux';
import ModalNeedLogInBeforeDoThat from 'components/modal/ModalNeedLogInBeforeDoThat';
import { DetailStreamingType, ResultAccount } from 'app/Models';
import { Space } from 'antd';
import { handleBookmarkOrUnBookmarkFilm, handleLikeOrUnlikeFilm } from 'app/Services/streaming';

const LikeShareSave = function ({
  width,
  account,
  dataDetailFilm,
  fetchDetail
}: {
  dataDetailFilm: DetailStreamingType;
  width: number;
  account: ResultAccount | null;
  fetchDetail: () => void;
}) {
  const [t] = useTranslation();
  const [liked, setLiked] = useState<boolean>(dataDetailFilm.isLike);
  const [saved, setSaved] = useState<boolean>(dataDetailFilm.isbookmark);
  const [sharing, setSharing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  console.log(dataDetailFilm.isbookmark);

  useEffect(() => {
    setLiked(dataDetailFilm.isLike);
    setSaved(dataDetailFilm.isbookmark);
  }, [dataDetailFilm]);
  return (
    <Space size={width > 768 ? 20 : 45} className="like_share_save">
      <div className="like">
        <div
          onClick={async () => {
            if (!account) {
              setOpenModal(true);
              return;
            }
            const response = await handleLikeOrUnlikeFilm({
              streamingID: dataDetailFilm._id,
            });
            if (response.status == 200) {
              //setLiked(response.data.data.isLike);
              fetchDetail();
            }
          }}
          aria-hidden="true"
        >
          <LikeIcon fill={liked ? '#fff' : 'none'} width={width} />
        </div>
        <div className="text_like">
          {!liked && t(common.like)}
          {liked && t(common.cancelLiked)}
          <br/><span>{dataDetailFilm?.like ? dataDetailFilm.like : 0}</span>
        </div>
      </div>
      <div className="like">
        <div
          onClick={async () => {
            if (!account) {
              setOpenModal(true);
              return;
            }
            const response = await handleBookmarkOrUnBookmarkFilm({
              streamingID: dataDetailFilm._id,
            });
            if (response.status == 200) {
              //setSaved(!saved);
              fetchDetail();
            }
          }}
          aria-hidden="true"
        >
          <Bookmark fill={saved ? '#fff' : 'none'} width={width} />
        </div>
        <div className="text_like">
          {!saved && t(common.save)}
          {saved && t(common.saved)}
          <br/><span>{dataDetailFilm?.bookmark ? dataDetailFilm.bookmark : 0}</span>
        </div>
      </div>
      <div className="like">
        <ModalShare sharing={sharing} setSharing={setSharing} width={width} />
        <div className="text_like">{t(common.share)}</div>
        <br/>
      </div>
      <ModalNeedLogInBeforeDoThat openModal={openModal} setOpenModal={setOpenModal} />
    </Space>
  );
};
const mapStateToProps = (state: CombinedState<{ accounts: null }>) => ({
  account: selectors.account.select(state),
});
export default connect(mapStateToProps)(LikeShareSave);
