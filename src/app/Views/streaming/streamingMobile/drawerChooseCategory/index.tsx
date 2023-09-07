/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import arrayCategoryStreaming from 'components/array/arrayCategoryStreaming';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { propertyLang } from 'assets/propertyLang';

type Prop = {
  selected: string;
  setSelected: any;
};

const DrawerChooseCategory: React.FC<Prop> = ({ selected, setSelected }) => {
  const [t] = useTranslation();
  console.log(selected);

  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const [selectInPage, setSelectInpage] = useState(selected || 'all');
  const showDefaultDrawer = () => {
    setSize('default');
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleSelect = () => {
    setSelected(selectInPage);
    onClose();
  };

  useEffect(() => {
    if (selected == 'all') {
      setSelectInpage('all');
      return;
    }
    setSelectInpage(selected);
  }, [selected]);

  return (
    <>
      <Space>
        <Button
          type="primary"
          style={{
            background: selected == 'all' ? '#131a20' : '#0E7EE4',
            border: `1px solid ${selected == 'all' ? '#FFF' : '#0E7EE4'}`,
            padding: '4px 30px 4px 5px',
            whiteSpace: 'normal',
          }}
          onClick={showDefaultDrawer}
        >
          {arrayCategoryStreaming.filter((el) => el.key == selected)[0]
            ? propertyLang(arrayCategoryStreaming.filter((el) => el.key == selected)[0], 'name')
            : null}
        </Button>
      </Space>
      <Drawer
        placement="left"
        className="drawer_streaming"
        size={size}
        width={'100%'}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <>
          <div className="header_drawer">
            <div
              className="button_x"
              onClick={() => {
                onClose();
              }}
              aria-hidden="true"
            />
          </div>
          <div className="area_select_category">
            {arrayCategoryStreaming.map((el, index) => {
              if (el.key == selectInPage) {
                return (
                  <div key={index} className="item_select_category selected">
                    <div className="item_selected">{propertyLang(el, 'name')}</div>
                    <div className="check_icon" />
                  </div>
                );
              }
              return (
                <div key={index} className="item_select_category">
                  <div
                    className="item_select"
                    onClick={() => {
                      setSelectInpage(el.key);
                    }}
                    aria-hidden="true"
                  >
                    {propertyLang(el, 'name')}
                  </div>
                </div>
              );
            })}
          </div>
          <Button
            type="primary"
            style={{ height: 56, fontSize: 16, fontWeight: 700 }}
            onClick={handleSelect}
            className="btn-select-streamming"
          >
            {t(common.select)}
          </Button>
        </>
      </Drawer>
    </>
  );
};

export default DrawerChooseCategory;
