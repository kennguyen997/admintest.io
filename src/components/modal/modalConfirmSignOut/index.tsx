import React, { FC } from 'react';
import { Modal, Space } from 'antd';
import store from 'app/redux/store';
import { logOut } from 'app/redux/Slices/AccountsSlice';
import './customModal.scss';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalConfirmSignOut: FC<Props> = ({ openModal, setOpenModal }) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    setOpenModal(false);
  };

  const callbackLogout = async () => {
    await setOpenModal(false);
  };

  const logoutMenu = async () => {
    return store.dispatch(logOut(() => callbackLogout()));
  };

  return (
    <Modal
      className="fix-footer-modal"
      centered
      visible={openModal}
      onCancel={handleCancel}
      width={400}
      footer={
        <Space className="flex_row footer-content">
          <div
            className="button_cancel"
            onClick={() => {
              logoutMenu();
            }}
            aria-hidden="true"
          >
            {t(common.confirm)}
          </div>
          <div
            onClick={() => {
              handleCancel();
            }}
            aria-hidden="true"
            className="button_confirm"
          >
            {t(common.cancel)}
          </div>
        </Space>
      }
    >
      <div className="title" style={{ display: 'flex', justifyContent: 'center' }}>
        {t(common.sign_out)}
      </div>
      <div
        className="flex_column"
        style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}
      >
        <div>{t(common.sign_out_question1)}</div>
        <div>{t(common.sign_out_question2)}</div>
      </div>
    </Modal>
  );
};

export default ModalConfirmSignOut;
