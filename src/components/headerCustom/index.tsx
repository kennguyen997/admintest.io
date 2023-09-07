import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { common } from 'app/trans';
import { RootState, selectors } from 'app/redux/Slices';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { SearchHeaderType, SearchHeaderYup } from 'app/Models/SearchHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import { ReactComponent as HamburgerSVG } from 'assets/icons/hamburger.svg';
import { ReactComponent as BackSVG } from 'assets/icons/backHeader.svg';
import InputForm from 'components/coreCustom/inputForm';
import DrawerHeader from './drawerHeader';
import SearchButtonMobile from './searchButtonForMobile';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import ListNavLink from './listNavLink';
export interface PropsHeader {
  unNavBar?: boolean;
  //for reponsive
  unHeaderRepon?: boolean;
  leftButton?: 'back' | 'navBar';
  rightButton?: 'search';
  customleftButton?: React.ReactElement;
  customrightButton?: React.ReactElement;
  title?: string;
  titleStyle?: React.CSSProperties;
}

type Props = PropsHeader & ReturnType<typeof mapStateToProps>;

const Header: FC<Props> = ({
  account,
  unNavBar,
  title,
  customleftButton,
  customrightButton,
  leftButton,
  rightButton,
  unHeaderRepon,
  titleStyle,
}) => {
  const [t] = useTranslation();
  const navigator = useNavigate();
  const location = useLocation();
  const { width } = useWindowDimensions();
  const { control, handleSubmit } = useForm<SearchHeaderType>({
    resolver: yupResolver(SearchHeaderYup),
  });
  const [headerColor, setHeaderColor] = useState<'black' | 'white'>('white');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      setHeaderColor('black');
    } else {
      setHeaderColor('white');
    }
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    !unHeaderRepon && window.addEventListener('scroll', listenScrollEvent);
  }, [unHeaderRepon]);

  useEffect(() => {
    setShowDrawer(false);
  }, [location]);

  const onSubmit = async (dataForm: SearchHeaderType) => {
    if (!dataForm.key || dataForm.key === '') {
      handleSearchClick();
    }
    dataForm.key &&
      navigator({ pathname: '/search', search: `?${createSearchParams({ ...dataForm })}` });
  };

  const leftHeader = () => {
    if (customleftButton) {
      return customleftButton;
    }
    switch (leftButton) {
      case 'back':
        return (
          <Button
            className="menubtn"
            type="ghost"
            shape="circle"
            icon={<BackSVG height={24} width={24} />}
            onClick={() => navigator(-1)}
          ></Button>
        );
      case 'navBar':
        return (
          <>
            <Button
              className="menubtn"
              type="ghost"
              shape="circle"
              icon={<HamburgerSVG />}
              onClick={() => setShowDrawer(true)}
            ></Button>
            <div className="logo">
              <Link to={'/home'}>
                <img alt="logo" src={`${window.location.origin}/Terafty_Logo.png`} />
              </Link>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  const rightHeader = () => {
    if (customrightButton) return <div className="iconCustom">{customrightButton}</div>;
    else if (rightButton === 'search') return <SearchButtonMobile />;
    else if (leftButton === 'back')
      return (
        <Button
          className="menubtn hiden"
          type="ghost"
          shape="circle"
          icon={<BackSVG height={24} width={24} />}
          onClick={() => navigator(-1)}
        ></Button>
      );
    return <></>;
  };

  if (width > 768) {
    return (
      <div className={`header headerColor ${headerColor}`}>
        <div className="logo">
          <Link to={'/home'}>
            <img alt="logo" src={`${window.location.origin}/Terafty_Logo.png`} />
          </Link>
        </div>
        {!unNavBar && (
          <div className="nav_header">
            <ListNavLink
              listLink={[
                {
                  to: '/crowdfunding',
                  name: t(common.crowdfunding),
                },
                {
                  to: '/streaming',
                  name: t(common.streaming),
                },
                {
                  to: '/events',
                  name: t(common.events),
                },
                {
                  to: 'https://www.teraftyblog.com',
                  name: t(common.blog),
                  selfExternal: true,
                },
                {
                  to: 'https://teraftykorea.com',
                  name: t(common.store),
                  selfExternal: true,
                },
                {
                  to: '/apply',
                  name: t(common.apply),
                },
              ]}
            />
            <div className="header_right">
              <form onSubmit={handleSubmit(onSubmit)} className="d-flex ai-c">
                <Controller
                  control={control}
                  name="key"
                  render={({ field: { onChange, name, value } }) => (
                    <InputForm
                      value={value}
                      name={name}
                      onChange={onChange}
                      className={`w-100 input_search ${!showSearch && 'unactive'}`}
                    />
                  )}
                />
                <Button type="text" className="p-0" htmlType="submit">
                  <div className="searchIcon" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`header header_reponsive headerColor ${headerColor}`}>
      {leftHeader()}
      {(title || title === '') && (
        <div
          className={`title text-overflow-1 ${leftButton === 'back' ? ' text-center' : ''}`}
          style={titleStyle}
        >
          {title}
        </div>
      )}
      {rightHeader()}
      <DrawerHeader showDrawer={showDrawer} setShowDrawer={setShowDrawer} account={account} />
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(Header);
