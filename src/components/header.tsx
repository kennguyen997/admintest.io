import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { common } from 'app/trans';
import { RootState, selectors } from 'app/redux/Slices';
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { SearchHeaderType, SearchHeaderYup } from 'app/Models/SearchHeader';
import { yupResolver } from '@hookform/resolvers/yup';
import InputForm from './coreCustom/inputForm';
import { Avatar, Button, ButtonProps, Dropdown, Space } from 'antd';
import { ReactComponent as DownSVG } from 'assets/icons/downW.svg';
import { accountService } from 'app/Services';

interface ExpandMoreProps extends ButtonProps {
  expand: boolean;
}

const ExpandMore = (props: ExpandMoreProps) => {
  const { expand, ...order } = props;
  return (
    <Button
      {...order}
      type="text"
      style={{
        marginLeft: 'auto',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <DownSVG />
    </Button>
  );
};

type Props = ReturnType<typeof mapStateToProps>;

const Header: FC<Props> = ({ account }) => {
  const Loc = useLocation();
  const [t] = useTranslation();
  const navigator = useNavigate();
  const { control, handleSubmit } = useForm<SearchHeaderType>({
    resolver: yupResolver(SearchHeaderYup),
  });
  const [headerColor, setHeaderColor] = useState<'black' | 'white'>('white');
  const [expanded, setExpanded] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);

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
    window.addEventListener('scroll', listenScrollEvent);
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const checkDisableNavHeader = () => {
    if (
      Loc.pathname === '/' ||
      Loc.pathname === '/login' ||
      Loc.pathname.includes('/sign-up') ||
      Loc.pathname.includes('/forgot-password')
    ) {
      return 'disable';
    }
    return '';
  };

  const onSubmit = async (dataForm: SearchHeaderType) => {
    if (!dataForm.key || dataForm.key === '') {
      handleSearchClick();
    }
    dataForm.key &&
      navigator({ pathname: '/search', search: `?${createSearchParams({ ...dataForm })}` });
  };

  const signOut = async () => {
    await accountService.logout();
    return;
  };

  const getMenu = () => (
    <Space direction="vertical" className="w-100">
      <Button type="text" className="p-0 w-100 my_page">
        {t(common.my_page)}
      </Button>
      <Button type="text" className="p-0 w-100 sign_out" onClick={() => signOut()}>
        {t(common.sign_out)}
      </Button>
    </Space>
  );

  if (Loc.pathname === '/' || Loc.pathname.includes('/oauth/kakao/callback')) return <></>;

  return (
    <div className={`header headerColor ${headerColor}`}>
      <div className="logo">
        <Link to={'/home'}>Terafty</Link>
      </div>
      <div className={`nav_header ${checkDisableNavHeader()}`}>
        <div>
          <Link to={'/streaming'} className="nav_main">
            {t(common.streaming)}
          </Link>
          <Link to={'/crowdfunding'} className="nav_main">
            {t(common.crowdfunding)}
          </Link>
          <Link to={'/events'} className="nav_main">
            {t(common.events)}
          </Link>
          <Link to={'/apply'} className="nav_main">
            {t(common.apply)}
          </Link>
        </div>
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
          <Avatar size={28} src={`${account?.avatar}`} />
          <Dropdown
            overlay={getMenu()}
            trigger={['click']}
            className="p-0 ml-8"
            visible={expanded}
            placement="bottomRight"
            onVisibleChange={() => handleExpandClick()}
            overlayClassName="collapse_user"
            getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
          >
            <ExpandMore expand={expanded} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  account: selectors.account.select(state),
});

export default connect(mapStateToProps)(Header);
