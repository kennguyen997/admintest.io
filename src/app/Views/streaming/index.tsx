import React, { FC, useEffect, useState } from 'react';
import 'assets/style/Views/streaming.scss';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import TabsStreaming from './tabs';
import ContentInTabAll from './tabs/contentInTabAll';
import ShortMovies from './tabs/shortMovies';
import MusicVideos from './tabs/musicVideos';
import SelectCategory from './selectInTabs/selectCategory';
import SelectFilmList from './selectInTabs/selectFilmList';

import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import DrawerChooseCategory from './streamingMobile/drawerChooseCategory';
import DrawerChooseByGenre from './streamingMobile/drawerChooseByGenre';
import { getListCategoriesGenre } from 'app/Services/streaming';
import WebDrama from './tabs/webDrama';
import { Space } from 'antd';
import SEO from 'components/seo';
// import { useNavigate } from 'react-router-dom';

const Streaming: FC = () => {
  const [t] = useTranslation();
  // const navigate = useNavigate();
  const [selected, setSelected] = useState('all');
  const [optionSelectCategory, setOptionSelectCategory] = useState([
    { _id: 'all', name_kr: '전체', name_eng: 'All' },
  ]);
  const [selectCategory, setSelectCategory] = useState('all');
  const [selectFilmList, setSelectFilmList] = useState('view');

  console.log('selectCategoryselectCategory', selectCategory);

  const handeChangeSelectCategory = (e: any) => {
    setSelectCategory(e);
  };

  const handeChangeSelectFilmList = (e: any) => {
    setSelectFilmList(e);
  };

  const { height, width } = useWindowDimensions();
  console.log(height, width);

  useEffect(() => {
    const fetch = async () => {
      const response: any = await getListCategoriesGenre();
      if (response.status == 200 || response.status == 201) {
        const arrayoption = [...optionSelectCategory, ...response.data.data];
        setOptionSelectCategory(arrayoption);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <SEO title={t(common.streaming)} />
      {width > 768 && (
        <div className="view ">
          <div className="padding-10vh bg-1B242D">
            <div className="fs-50 fw-700 color-white mb-40 pt-40">{t(common.streaming)}</div>
            <div className="flex_row jc-sb header-streaming">
              <TabsStreaming selected={selected} setSelected={setSelected} />
              <Space size={16} className="flex_row" style={{ alignItems: 'center' }}>
                <SelectCategory
                  selectCategory={selectCategory}
                  optionSelectCategory={optionSelectCategory}
                  setSelectCategory={setSelectCategory}
                  handleChange={handeChangeSelectCategory}
                />
                <SelectFilmList
                  selectFilmList={selectFilmList}
                  handleChange={handeChangeSelectFilmList}
                />
              </Space>
            </div>
          </div>
          <div className="contain-streaming padding-10vh">
            {'all' == selected && (
              <ContentInTabAll
                setSelected={setSelected}
                width={width}
                selectCategory={selectCategory}
                selectFilmList={selectFilmList}
              />
            )}
            {'webDrama' == selected && (
              <div>
                <WebDrama
                  width={width}
                  selectCategory={selectCategory}
                  selectFilmList={selectFilmList}
                />
              </div>
            )}
            {'shortMovies' == selected && (
              <div>
                <ShortMovies
                  width={width}
                  selectCategory={selectCategory}
                  selectFilmList={selectFilmList}
                />
              </div>
            )}
            {'musicVideos' == selected && (
              <div>
                <MusicVideos
                  width={width}
                  selectCategory={selectCategory}
                  selectFilmList={selectFilmList}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {width <= 768 && (
        <div className="contain_streaming_mobile">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space className="area_choose d-flex">
              <div className="area_choose_category_film">
                <DrawerChooseCategory selected={selected} setSelected={setSelected} />
                <div className="area_choose_category_film_icon_dropdown">
                  {selected == 'all' && <div className="icon_drop_down"></div>}
                  {selected !== 'all' && (
                    <div
                      onClick={() => {
                        setSelected('all');
                      }}
                      aria-hidden="true"
                      style={{ cursor: 'pointer' }}
                      className="close_button"
                    ></div>
                  )}
                </div>
              </div>
              <div className="area_choose_category_film">
                <DrawerChooseByGenre
                  selectCategory={selectCategory}
                  setSelectCategory={setSelectCategory}
                  optionSelectCategory={optionSelectCategory}
                />
                <div className="area_choose_category_film_icon_dropdown">
                  {selectCategory == 'all' && <div className="icon_drop_down"></div>}
                  {selectCategory !== 'all' && (
                    <div
                      onClick={() => {
                        setSelectCategory('all');
                      }}
                      aria-hidden="true"
                      style={{ cursor: 'pointer' }}
                      className="close_button"
                    ></div>
                  )}
                </div>
              </div>
            </Space>
            <SelectFilmList
              selectFilmList={selectFilmList}
              handleChange={handeChangeSelectFilmList}
            />
          </div>
          <div>
            {'all' == selected && (
              <ContentInTabAll
                setSelected={setSelected}
                width={width}
                selectCategory={selectCategory}
                selectFilmList={selectFilmList}
              />
            )}
            {'webDrama' == selected && (
              <div>
                <WebDrama
                  width={width}
                  selectCategory={selectCategory}
                  selectFilmList={selectFilmList}
                />
              </div>
            )}
            {'shortMovies' == selected && (
              <div>
                <ShortMovies
                  width={width}
                  selectCategory={selectCategory}
                  selectFilmList={selectFilmList}
                />
              </div>
            )}
            {'musicVideos' == selected && (
              <div>
                <MusicVideos
                  width={width}
                  selectCategory={selectCategory}
                  selectFilmList={selectFilmList}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Streaming;
