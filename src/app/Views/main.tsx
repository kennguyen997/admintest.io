import React, { FC } from 'react';
import 'assets/style/Views/mainPage.scss';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';

const Main: FC = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  const nagivateToLogin = () => {
    if (width > 768) {
      return navigate('/login');
    } else {
      return navigate('/login-method');
    }
  };

  return (
    <div className="view center main_page">
      {/* <div className="logoBig">Terafty</div> */}
      <img alt="logo" className="logoBig" src={`${window.location.origin}/Terafty_Logo.png`} />
      <div className="subtit">{t(common.main_subtit)}</div>
      <div className="introduce">{t(common.main_introduce)}</div>
      <div className="font_main">
        <Button
          type="primary"
          className="button_ant_ct big_ant w-100 "
          onClick={() => nagivateToLogin()}
        >
          {t(common.signin)}
        </Button>
        <Button
          style={{ marginTop: 10 }}
          className="button_ant_ct big_ant w-100"
          onClick={() => navigate('/home')}
        >
          {t(common.skip)}
        </Button>
      </div>
    </div>
  );
};

export default Main;
