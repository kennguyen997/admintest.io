import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Space } from 'antd';

interface listLinkType {
  to: string;
  name: string;
  notOwnLink?: boolean;
  isActive?: boolean;
  selfExternal?: boolean;
}

interface Prop {
  listLink: listLinkType[];
}

const NavLinkCustom: FC<listLinkType> = ({ to, name, isActive, selfExternal }) => {
  if (selfExternal) {
    return (
      <a
        href={to}
        className="nav_main"
        style={{
          color: isActive ? '#fff' : '#888F95',
        }}
      >
        {name}
      </a>
    );
  }
  return (
    <Link
      key={to}
      to={to}
      className="nav_main"
      style={{
        color: isActive ? '#fff' : '#888F95',
      }}
    >
      {name}
    </Link>
  );
};

const ListNavLink: FC<Prop> = ({ listLink }) => {
  const location = useLocation();
  const [isActiveAll, setIsActiveAll] = useState<boolean>(false);

  useEffect(() => {
    const found = listLink.find((data) => location.pathname.includes(data.to));
    if (!found) setIsActiveAll(true);
    else setIsActiveAll(false);
  }, [location, listLink]);

  const renderListLink = () => {
    return listLink.map(({ name, to, selfExternal }) => {
      return (
        <NavLinkCustom
          key={to}
          to={to}
          name={name}
          selfExternal={selfExternal}
          isActive={isActiveAll ? isActiveAll : location.pathname.includes(to)}
        />
      );
    });
  };

  return <Space className="space_nav">{renderListLink()}</Space>;
};

export default ListNavLink;
