import React, { FC, useState } from 'react';
import 'assets/style/Views/myPage.scss';
import { Divider, Image, Space } from 'antd';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { selectors } from 'app/redux/Slices';
import { CombinedState } from 'redux';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import { ResultAccount } from 'app/Models';
import TabsPage from './tabsDisplayWeb';
import Liked from './tabsDisplayWeb/liked';
import ModalConfirmSignOut from 'components/modal/modalConfirmSignOut';
import { Link } from 'react-router-dom';
import Bookmark from './tabsDisplayWeb/bookmark';
import Voted from './tabsDisplayWeb/voted';
import SettingIconTsx from 'assets/icons/SettingIconTsx';
import DrawerTabsVoted from './tabsDisplayMobile/drawerTabsVoted';
import DrawerTabsLiked from './tabsDisplayMobile/drawerTabsLiked';
import DrawerTabsBookmark from './tabsDisplayMobile/drawerTabsBookmark';
import SEO from 'components/seo';

// import { useNavigate } from 'react-router-dom';

const MyPage: FC<{ account: ResultAccount | null }> = ({ account }) => {
  const [t] = useTranslation();
  const [selected, setSelected] = useState('liked');

  const [openModal, setOpenModal] = useState(false);

  const { width } = useWindowDimensions();

  return (
    <div>
      <SEO title={t(common.my_page)} />
      {width >= 768 && (
        <div className="view">
          <div className="header-my-page padding-10vh bg-1B242D">
            <div className="intruduce-in-my-page fw-700">
              <Space size="middle" className="image-avatar flex_row">
                <Image
                  preview={false}
                  src={
                    account?.avatar ||
                    'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                  }
                  alt="avatar"
                />
                <div className="user-name">{account?.userName}</div>
              </Space>
            </div>
            <div className="flex_row jc-sb">
              <TabsPage selected={selected} setSelected={setSelected} />
              <Space split={<Divider type="vertical" />} className="flex_row">
                <Link className="flex_row ai-c" to="/mypage_edit" aria-hidden="true">
                  <div className="setting-icon"></div>
                  <div className="text-edit-profile"> {t(common.editProfile)}</div>
                </Link>
                <div
                  className="text-log-out"
                  onClick={() => {
                    setOpenModal(true);
                    return;
                  }}
                  aria-hidden="true"
                >
                  {t(common.sign_out)}
                </div>
              </Space>
              <ModalConfirmSignOut openModal={openModal} setOpenModal={setOpenModal} />
            </div>
          </div>
          <div className="contain-mypage padding-10vh">
            {selected == 'liked' && <Liked width={width} />}
            {selected == 'bookmark' && <Bookmark width={width} />}
            {selected == 'voted' && <Voted width={width} />}
          </div>
        </div>
      )}
      {width <= 768 && (
        <div className="view my-page-mobile">
          <div className="flex_column header-my-page">
            <Image
              preview={false}
              src={
                account?.avatar || 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
              }
              className="avatar-image"
              alt="avatar"
            />
            <div className="name-user">{account?.userName}</div>
            <Link to="/mypage_edit" aria-hidden="true">
              <Space className="edit-profile" direction="horizontal" align="center">
                <SettingIconTsx size={(width * 4.27) / 100} />
                <div style={{ color: '#888f95' }}>{t(common.editProfile)}</div>
              </Space>
            </Link>
          </div>
          <Space size="middle" direction="vertical" className="list-action-my-page">
            <Space size="middle" className="item-my-page">
              <div className="like-icon"></div>
              <DrawerTabsLiked width={width} />
            </Space>
            <Space size="middle" className="item-my-page">
              <div className="bookmarks-icon"></div>
              <DrawerTabsBookmark width={width} />
            </Space>
            <Space size="middle" className="item-my-page">
              <div className="product-voted-icon"></div>
              <DrawerTabsVoted width={width} />
            </Space>
            <Space size="middle" className="item-my-page">
              <div className="sign-out-icon"></div>
              <div
                className="name-of-action"
                onClick={() => {
                  setOpenModal(true);
                  return;
                }}
                aria-hidden="true"
              >
                {t(common.sign_out)}
              </div>
              <ModalConfirmSignOut openModal={openModal} setOpenModal={setOpenModal} />
            </Space>
          </Space>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: CombinedState<{ accounts: null }>) => ({
  account: selectors.account.select(state),
});
export default connect(mapStateToProps)(MyPage);
