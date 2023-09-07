import { Button, Modal, Space } from 'antd';
import React from 'react';
import ShareIcon from './ShareIcon';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import KakaoShareButton from './ShareButton/KakaoShareButton';
import FacebookShareButtonIcon from './ShareButton/FacebookShareButton';
import CopyLinkShareButton from './ShareButton/CopyLinkShareButton';

type props = {
  sharing: boolean;
  setSharing: any;
  width: number;
};

const ModalShare = ({ sharing, setSharing, width }: props) => {
  const [visible, setVisible] = React.useState(false);
  const [t] = useTranslation();
  const location = window.location.href;
  const showModal = () => {
    setVisible(true);
    setSharing(!sharing);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
    setSharing(!sharing);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="text"
        icon={<ShareIcon fill={sharing ? '#fff' : 'none'} width={width} />}
      >
        {/* <ShareIcon fill={sharing ? '#fff' : 'none'} width={width} /> */}
      </Button>
      <Modal centered visible={visible} onCancel={handleCancel} footer={null}>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>{t(common.share)}</h1>
        <Space size={12} style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
          <KakaoShareButton />
          <FacebookShareButtonIcon location={location} />
          <CopyLinkShareButton location={location} />
        </Space>
      </Modal>
    </>
  );
};
export default ModalShare;
