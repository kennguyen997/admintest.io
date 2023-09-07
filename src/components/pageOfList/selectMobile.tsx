import React, { FC, useState } from 'react';
import { Button, Drawer } from 'antd';
import { ReactComponent as DownSVG } from 'assets/icons/downW.svg';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import { dataType } from 'app/Models';
import { propertyLang } from 'assets/propertyLang';

interface Prop {
  value: dataType;
  onChange: React.Dispatch<React.SetStateAction<dataType>>;
  listOption: dataType[];
  disabled?: boolean;
}

const SelectMobile: FC<Prop> = ({ value, onChange, listOption }) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [valueSelect, setValueSelect] = useState<dataType>(value);
  const { t } = useTranslation();
  const renderSelectItem = () => {
    return listOption.map((data) => {
      return (
        <Button
          key={data._id}
          type="text"
          className={data._id === valueSelect._id ? 'qactive' : ''}
          onClick={() => setValueSelect(data)}
        >
          {propertyLang(data, 'name')}
        </Button>
      );
    });
  };

  const selectValue = () => {
    onChange(valueSelect);
    setVisible(false);
  };

  return (
    <div className="select_mobile">
      <Button className="btnSelect" type="text" onClick={() => setVisible(true)} icon={<DownSVG />}>
        {propertyLang(value, 'name')}
      </Button>
      <Drawer
        className="drawer_select"
        title="Multi-level drawer"
        height={'348px'}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        placement={'bottom'}
        headerStyle={{ display: 'none' }}
        bodyStyle={{ borderRadius: '40px' }}
        style={{ borderRadius: '40px' }}
      >
        <div className="select_aria">{renderSelectItem()}</div>
        <Button type="primary" className="button_ant_ct" onClick={() => selectValue()}>
          {t(common.select)}
        </Button>
      </Drawer>
    </div>
  );
};
export default SelectMobile;
