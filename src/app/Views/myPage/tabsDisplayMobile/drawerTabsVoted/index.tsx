import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BackSVG } from 'assets/icons/backHeader.svg';
import { getListVoted } from 'app/Services/myPage';
import Loading from 'components/loading';
import DisplayMobileVoted from './displayMobileVoted';

type Prop = {
  width: number;
};

const DrawerTabsVoted: React.FC<Prop> = ({ width }) => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataVoted, setDataVoted] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const limitPageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);

  const showDefaultDrawer = () => {
    setSize('default');
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      setLoading(false);
      const fetchDataVoted = async () => {
        const response: any = await getListVoted({
          limit: limitPageSize,
          page: currentPage,
        });
        if (response.status == 200) {
          setLoading(true);
          setDataVoted(response.data.data);
        }
      };
      fetchDataVoted();
    }
  }, [currentPage, visible]);
  return (
    <>
      <div
        className="name-of-action"
        onClick={() => {
          showDefaultDrawer();
        }}
        aria-hidden="true"
      >
        {t(common.voted)}
      </div>

      <Drawer
        placement="left"
        size={size}
        width={'100%'}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <div style={{ height: '100%' }}>
          <div className="header_drawer_voted_display_mobile">
            <BackSVG width={24} height={24} onClick={onClose} />
            <div style={{ fontSize: 20, fontWeight: 700 }}>{t(common.voted)}</div>
            <div>{''}</div>
          </div>
          <div className="area_select_category">
            <div>{!loading && <Loading />}</div>
            {width <= 768 && dataVoted && loading && (
              <DisplayMobileVoted
                dataVoted={dataVoted?.docs}
                total={dataVoted.totalDocs}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                limitPageSize={limitPageSize}
              />
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerTabsVoted;
