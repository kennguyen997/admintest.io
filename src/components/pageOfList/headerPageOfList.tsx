import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import React, { FC, ReactElement } from 'react';

interface Props {
  title: string | HTMLDivElement;
  tabs: ReactElement<any, any>;
  rightCustom: ReactElement<any, any>;
  tabsMobile?: ReactElement<any, any>;
}

const HeaderPageOfList: FC<Props> = ({ title, tabs, rightCustom, tabsMobile }) => {
  const { width } = useWindowDimensions();
  if (width > 768) {
    return (
      <div className="header_page_of_list">
        <div className="title">{title}</div>
        <div className="flex_row jc-sb">
          <div className="tab_in_header">{tabs}</div>
          <div className="flex_row" style={{ alignItems: 'center' }}>
            {rightCustom}
          </div>
        </div>
      </div>
    );
  } else if (tabsMobile) {
    return <div className="tab_in_header_mobile">{tabsMobile}</div>;
  }
  return <></>;
};

export default HeaderPageOfList;
