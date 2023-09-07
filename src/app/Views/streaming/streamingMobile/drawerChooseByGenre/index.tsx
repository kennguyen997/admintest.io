import React, { useEffect, useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { propertyLang } from 'assets/propertyLang';

type Prop = {
  selectCategory: number | string;
  setSelectCategory: any;
  optionSelectCategory: Array<any>;
};

const DrawerChooseByGenre: React.FC<Prop> = ({
  selectCategory,
  setSelectCategory,
  optionSelectCategory,
}) => {
  const [t] = useTranslation();

  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const [selectInPage, setSelectInpage] = useState(selectCategory || 'all');

  const showDefaultDrawer = () => {
    setSize('default');
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleSelect = () => {
    setSelectCategory(selectInPage);
    onClose();
  };

  useEffect(() => {
    if (selectCategory == 'all') {
      setSelectInpage('all');
    }
  }, [selectCategory]);

  return (
    <>
      <Space>
        <Button
          type="primary"
          style={{
            background: selectCategory == 'all' ? '#131a20' : '#0E7EE4',
            border: `1px solid ${selectCategory == 'all' ? '#FFF' : '#0E7EE4'}`,
            padding: '4px 30px 4px 5px',
            whiteSpace: 'normal',
          }}
          onClick={showDefaultDrawer}
        >
          {selectCategory == 'all'
            ? `${t(common.byGenre)}`
            : optionSelectCategory.filter((el) => el._id == selectCategory)[0]
            ? propertyLang(optionSelectCategory.filter((el) => el._id == selectCategory)[0], 'name')
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
            <div style={{ fontSize: 20, fontWeight: 700, paddingRight: '40%' }}>장르</div>
            <div
              className="button_x"
              onClick={() => {
                onClose();
              }}
              aria-hidden="true"
            />
          </div>
          <div className="area_select_category">
            {optionSelectCategory.map((el, index) => {
              if (el._id == selectInPage) {
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
                      setSelectInpage(el._id);
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

export default DrawerChooseByGenre;
