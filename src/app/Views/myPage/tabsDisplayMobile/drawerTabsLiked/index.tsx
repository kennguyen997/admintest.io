import React, { useEffect, useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { ReactComponent as BackSVG } from 'assets/icons/backHeader.svg';
import { getListFilmLiked } from 'app/Services/myPage';
import Loading from 'components/loading';
import TrashIcon from 'assets/icons/TrashIcon';
import DisplayMobileLiked from './displayMobileLiked';
import ButtonX from 'assets/icons/ButtonX';
import i18n from 'app/trans/i18n';

type Prop = {
  width: number;
};

const DrawerTabsLiked: React.FC<Prop> = ({ width }) => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState('all');

  const [dataLiked, setDataLiked] = useState<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  const [size, setSize] = useState<DrawerProps['size']>();
  const limitPageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [unliked, setUnliked] = useState(false);
  const showDefaultDrawer = () => {
    setSize('default');
    setVisible(true);
  };

  const onClose = () => {
    setCategory('all');
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      setLoading(false);
      const fetchDataLiked = async () => {
        const response: any = await getListFilmLiked({
          limit: limitPageSize,
          page: currentPage,
          categoriesID:
            (category == 'webDrama' && '623a7f7ae82bfa0304f421f6') ||
            (category == 'shortMovies' && '623a7f7ae82bfa0304f421f7') ||
            (category == 'musicVideos' && '623a7f7ae82bfa0304f421f8') ||
            null,
        });
        if (response.status == 200) {
          setLoading(true);
          setDataLiked(response.data.data);
        }
      };
      fetchDataLiked();
    }
  }, [currentPage, category, visible]);

  useEffect(() => {
    if (visible && unliked) {
      setLoading(false);
      const fetchDataLiked = async () => {
        const response: any = await getListFilmLiked({
          limit: limitPageSize,
          page: currentPage,
          categoriesID:
            (category == 'webDrama' && '623a7f7ae82bfa0304f421f6') ||
            (category == 'shortMovies' && '623a7f7ae82bfa0304f421f7') ||
            (category == 'musicVideos' && '623a7f7ae82bfa0304f421f8') ||
            null,
        });
        if (response.status == 200) {
          setLoading(true);
          setDataLiked(response.data.data);
          setUnliked(false);
        }
      };
      fetchDataLiked();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unliked]);
  return (
    <>
      <div
        className="name-of-action"
        onClick={() => {
          showDefaultDrawer();
        }}
        aria-hidden="true"
      >
        {t(common.likedList)}
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
          {!hideHeader && (
            <div>
              <div className="header_drawer_liked_display_mobile">
                <BackSVG width={24} height={24} onClick={onClose} />
                <div style={{ fontSize: 20, fontWeight: 700 }}>{t(common.likedList)}</div>
                <div
                  onClick={() => {
                    setHideHeader(true);
                  }}
                  aria-hidden="true"
                >
                  <TrashIcon size={24} />
                </div>
              </div>

              <Space
                size={(7 / 375) * width}
                className={
                  i18n.language == 'korean'
                    ? ' tabs_on_header'
                    : ' tabs_on_header no-padding-button '
                }
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Button
                  type={category == 'all' ? 'link' : 'text'}
                  onClick={() => {
                    setCategory('all');
                  }}
                >
                  {t(common.allStreaming)}
                </Button>
                <Button
                  type={category == 'webDrama' ? 'link' : 'text'}
                  onClick={() => {
                    setCategory('webDrama');
                  }}
                >
                  {t(common.webDrama)}
                </Button>
                <Button
                  type={category == 'shortMovies' ? 'link' : 'text'}
                  onClick={() => {
                    setCategory('shortMovies');
                  }}
                >
                  {t(common.shortMovies)}
                </Button>
                <Button
                  type={category == 'musicVideos' ? 'link' : 'text'}
                  onClick={() => {
                    setCategory('musicVideos');
                  }}
                >
                  {t(common.musicVideos)}
                </Button>
              </Space>
            </div>
          )}
          {hideHeader && (
            <div
              onClick={() => {
                setHideHeader(false);
              }}
              aria-hidden="true"
            >
              <ButtonX size={24} />
            </div>
          )}
          <div className="area_select_category">
            <div>{!loading && <Loading />}</div>
            {width <= 768 && dataLiked && loading && (
              <DisplayMobileLiked
                hideHeader={hideHeader}
                setUnliked={setUnliked}
                width={width}
                setHideHeader={setHideHeader}
                dataLiked={dataLiked?.docs}
                total={dataLiked.totalDocs}
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

export default DrawerTabsLiked;
