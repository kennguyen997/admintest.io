import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, NavLinkProps } from 'react-router-dom';
import { common } from 'app/trans';
import { Avatar, Button, Drawer, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ResultAccount } from 'app/Models';
import store from 'app/redux/store';
import { changeLanguageRedux } from 'app/redux/Slices/AccountsSlice';

const NavLinkDrawer: FC<NavLinkProps> = (props) => {
  return (
    <NavLink
      {...props}
      style={({ isActive }) => ({
        color: isActive ? '#fff' : '#888F95',
      })}
    />
  );
};

type Props = {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  account: ResultAccount | null;
};

const DrawerHeader: FC<Props> = ({ account, showDrawer, setShowDrawer }) => {
  const [t] = useTranslation();

  const inforUser = () => {
    if (!account) {
      return (
        <Link to={'/login-method'}>
          <div className="name">{t(common.login_is_required)}</div>
          <div className="mypage_edit">{t(common.login_is_required)}</div>
        </Link>
      );
    } else {
      return (
        <>
          <div className="name">{account.userName}</div>
          <Link to={'/mypage'} className="mypage">
            {t(common.my_page)}
          </Link>
        </>
      );
    }
  };

  return (
    <Drawer
      placement="left"
      onClose={() => setShowDrawer(false)}
      visible={showDrawer}
      closable={true}
      width={269}
      zIndex={100}
      className="repon_drawer"
      // drawerStyle={{ backgroundColor: '#131A20' }}
      bodyStyle={{ padding: '64px 16px 16px 16px' }}
    >
      <Space size={24} align="start" direction="vertical">
        <Space size={6}>
          <Avatar size={60} src={`${account?.avatar}`} icon={<UserOutlined />} />
          <Space size={4} align="start" direction="vertical">
            {inforUser()}
          </Space>
        </Space>
        <NavLinkDrawer to={'/home'} className="nav_main">
          {t(common.home)}
        </NavLinkDrawer>
        <NavLinkDrawer to={'/crowdfunding'} className="nav_main">
          {t(common.crowdfunding)}
        </NavLinkDrawer>
        <NavLinkDrawer to={'/streaming'} className="nav_main">
          {t(common.streaming)}
        </NavLinkDrawer>
        <NavLinkDrawer to={'/events'} className="nav_main">
          {t(common.events)}
        </NavLinkDrawer>
        <a href="https://www.teraftyblog.com" className="nav_main" style={{color: '#888F95'}}>{t(common.blog)}</a>
        <a href="https://teraftykorea.com" className="nav_main" style={{color: '#888F95'}}>{t(common.store)}</a>
        <NavLinkDrawer to={'/apply'} className="nav_main">
          {t(common.apply)}
        </NavLinkDrawer>
        {localStorage.getItem('lang') == 'korean' ? (
          <Button
            type="text"
            className="p-0 w-100 sign_out"
            onClick={() => {
              store.dispatch(changeLanguageRedux('english'));
            }}
          >
            <Space>
              <div className="american_flag"></div>
              <div style={{ color: '#fff' }}>{'ENG'}</div>
            </Space>
          </Button>
        ) : (
          <Button
            type="text"
            className="p-0 w-100 sign_out"
            onClick={() => {
              store.dispatch(changeLanguageRedux('korean'));
            }}
          >
            <Space>
              <div className="korean_flag"></div>
              <div style={{ color: '#fff' }}>{'한국어'}</div>
            </Space>
          </Button>
        )}
      </Space>
    </Drawer>
  );
};

export default DrawerHeader;
