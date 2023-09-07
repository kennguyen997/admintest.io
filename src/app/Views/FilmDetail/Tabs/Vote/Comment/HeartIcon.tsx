import { Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { HeartFilled } from '@ant-design/icons';
import ModalNeedLogInBeforeDoThat from 'components/modal/ModalNeedLogInBeforeDoThat';
import { ResultAccount } from 'app/Models';
import { useParams } from 'react-router-dom';
import { handleHeartAndUnheart } from 'app/Services/streaming';

const HeartIcon = ({
  isliked,
  numberLike,
  account,
  commentID,
  streamingEpisodesID,
}: {
  streamingEpisodesID: string;
  commentID: string;
  isliked: boolean;
  numberLike: number;
  account: ResultAccount | null;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const idFilm = params.id;
  const [dataAfterLike, setDataAfterLike] = useState<any>(null);
  const [isLiked, setIsLiked] = useState(isliked);
  const [numberLiked, setNumberLiked] = useState<number>(numberLike);

  useEffect(() => {
    if (dataAfterLike) {
      setNumberLiked(dataAfterLike?.quantityHeart);
      if (dataAfterLike?.isHeart) {
        setIsLiked(true);
        return;
      }
      setIsLiked(false);
    }
    return () => {
      setIsLiked(isLiked);
      setNumberLiked(numberLike);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAfterLike]);
  return (
    <Space size={5} align="center" className="like_number">
      <Button
        onClick={async () => {
          if (!account) {
            setOpenModal(true);
            return;
          }
          const response = await handleHeartAndUnheart({
            streamingID: idFilm,
            streamingEpisodesID: streamingEpisodesID,
            commentID: commentID,
          });
          if (response.status == 200) {
            setDataAfterLike(response.data.data);
            setIsLiked(!isLiked);
          }
        }}
      >
        {isLiked && <HeartFilled style={{ color: '#BDC5CB' }} />}
        {!isLiked && (
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="#eb2f96"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.99982 1.06406C6.27343 0.396127 5.32263 0.0254217 4.33582 0.0253906C3.81352 0.0259344 3.29647 0.129764 2.81445 0.330903C2.33242 0.532042 1.89493 0.82652 1.52716 1.19739C-0.041509 2.77272 -0.0408424 5.23672 1.52849 6.80539L6.41649 11.6934C6.52982 11.8927 6.74849 12.0214 6.99982 12.0214C7.10302 12.0204 7.20455 11.9952 7.29625 11.9478C7.38795 11.9005 7.46726 11.8323 7.52782 11.7487L12.4712 6.80539C14.0405 5.23606 14.0405 2.77272 12.4698 1.19472C12.1022 0.824535 11.6651 0.530655 11.1835 0.329979C10.702 0.129304 10.1855 0.0257904 9.66383 0.0253906C8.67704 0.0255519 7.72629 0.396239 6.99982 1.06406ZM11.5272 2.13739C12.5692 3.18472 12.5698 4.82072 11.5285 5.86272L6.99982 10.3914L2.47116 5.86272C1.42982 4.82072 1.43049 3.18472 2.46982 2.14006C2.97649 1.63606 3.63916 1.35872 4.33582 1.35872C5.03249 1.35872 5.69249 1.63606 6.19516 2.13872L6.52849 2.47206C6.59035 2.53402 6.66382 2.58318 6.7447 2.61672C6.82557 2.65026 6.91227 2.66752 6.99982 2.66752C7.08738 2.66752 7.17408 2.65026 7.25495 2.61672C7.33583 2.58318 7.4093 2.53402 7.47116 2.47206L7.80449 2.13872C8.81249 1.13272 10.5205 1.13539 11.5272 2.13739Z"
              fill="#BDC5CB"
            />
          </svg>
        )}
      </Button>
      <ModalNeedLogInBeforeDoThat openModal={openModal} setOpenModal={setOpenModal} />

      <div>{numberLiked}</div>
    </Space>
  );
};
export default HeartIcon;
