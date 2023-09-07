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
        color: isActive ? '#fff' : '#fff',
      })}
    />
  );
};

type Props = {
  showDrawer: boolean;
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  account: ResultAccount | null;
};

const DrawerHeader: FC<Props> = ({ showDrawer, setShowDrawer }) => {
  const [t] = useTranslation();
  return (
    <Drawer
      placement="left"
      onClose={() => setShowDrawer(false)}
      visible={showDrawer}
      closable={true}
      width={269}
      zIndex={100}
      className="repon_drawer"
      bodyStyle={{ padding: '64px 16px 16px 16px' }}
    >
      <Space size={24} align="start" direction="vertical">
        <NavLinkDrawer to={'/'} className="nav_main">
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
        <NavLinkDrawer to={'/apply'} className="nav_main">
          {t(common.apply)}
        </NavLinkDrawer>
      </Space>
    </Drawer>
  );
};

export default DrawerHeader;
