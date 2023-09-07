import { Modal, Space } from 'antd';
import React, { useEffect } from 'react';
import './customModal.scss';
import { useNavigate } from 'react-router-dom';

import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
type Props = {
  openModal: boolean;
  setOpenModal: any;
};

const ModalNeedLogInBeforeDoThat = ({ openModal, setOpenModal }: Props) => {
  const [visible, setVisible] = React.useState(false);
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal == true) {
      showModal();
    } else {
      setVisible(false);
    }
  }, [openModal]);
  return (
    <>
      <Modal
        className="fix-footer-modal"
        centered
        visible={visible}
        onCancel={handleCancel}
        footer={
          <Space className="flex_row footer-content">
            <div
              onClick={() => {
                handleCancel();
              }}
              aria-hidden="true"
              className="button_cancel"
            >
              {t(common.cancel)}
            </div>
            <div
              className="button_confirm"
              onClick={() => {
                width > 768 ? navigate('/login') : navigate('/login-method');
              }}
              aria-hidden="true"
            >
              {t(common.confirm)}
            </div>
          </Space>
        }
      >
        <h1 style={{ display: 'flex', justifyContent: 'center', fontWeight: 700 }}>
          {t(common.sign_in_required)}
        </h1>
        <div
          className="flex_column "
          style={{ justifyContent: 'center', alignItems: 'center', fontSize: 16 }}
        >
          <div>{t(common.login_is_required)}</div>
          <div>{t(common.do_you_want_login)} </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalNeedLogInBeforeDoThat;
