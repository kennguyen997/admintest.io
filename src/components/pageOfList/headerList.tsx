import React, { FC } from 'react';
import { Button } from 'antd';
interface Props {
  title: string | HTMLDivElement;
  customBtn: {
    name: string;
    onClick: () => any;
  };
}

const HeaderList: FC<Props> = ({ title, customBtn }) => {
  return (
    <div className="header_of_list">
      <div className="title">{title}</div>
      <Button type="ghost" onClick={() => customBtn.onClick()}>
        {customBtn.name}
      </Button>
    </div>
  );
};

export default HeaderList;
