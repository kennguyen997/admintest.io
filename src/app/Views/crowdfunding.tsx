import React, { FC, useEffect, useState } from 'react';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Pagination, Tabs } from 'antd';
import PageOfList from 'components/pageOfList';
import HeaderPageOfList from 'components/pageOfList/headerPageOfList';
import ListFilm from 'components/displayFilm/listFilm';
import SelectMobile from 'components/pageOfList/selectMobile';
import SelectForm from 'components/selectForm';
import Loading from 'components/loading';
import { getDataDataCrowdfunding } from 'app/Services/crowdfunding';
import arrayFilmList from 'components/array/arrayFilmList';
import SEO from 'components/seo';

const Crowdfunding: FC = () => {
  const [t] = useTranslation();
  const [selectFilmList, setSelectFilmList] = useState(arrayFilmList[0]);
  const [selectTabs, setSelectTabs] = useState<string>('allCategory');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const limitPageSize = 30;

  const [listPopuler, setListPopular] = useState<any>(null);
  const handeChangeSelectFilmList = (e: any) => {
    const data = arrayFilmList.find((data) => data._id === e);
    data && setSelectFilmList(data);
  };

  const fetchDataCrowdfundingWebDrama = async () => {
    const response: any = await getDataDataCrowdfunding({
      limit: limitPageSize,
      keySort: (selectFilmList._id == 'view' && 'clickCount') || 'createdAt',
      sortType: 'desc',
      categoriesID: '623a7f7ae82bfa0304f421f6',
      page: currentPage,
    });
    if (response.status == 200) {
      setLoading(false);
      setListPopular(response.data.data);
    }
  };
  const fetchDataCrowdfundingShortMovies = async () => {
    const response: any = await getDataDataCrowdfunding({
      limit: limitPageSize,
      keySort: (selectFilmList._id == 'view' && 'clickCount') || 'createdAt',
      categoriesID: '623a7f7ae82bfa0304f421f7',
      sortType: 'desc',
      page: currentPage,
    });
    if (response.status == 200) {
      setLoading(false);
      setListPopular(response.data.data);
    }
  };
  const fetchDataCrowdfundingMusicVideos = async () => {
    const response: any = await getDataDataCrowdfunding({
      limit: limitPageSize,
      keySort: (selectFilmList._id == 'view' && 'clickCount') || 'createdAt',
      sortType: 'desc',
      categoriesID: '623a7f7ae82bfa0304f421f8',
      page: currentPage,
    });
    if (response.status == 200) {
      setLoading(false);
      setListPopular(response.data.data);
    }
  };

  const fetchDataCrowdfundingAll = async () => {
    const response: any = await getDataDataCrowdfunding({
      limit: limitPageSize,
      keySort: (selectFilmList._id == 'view' && 'clickCount') || 'createdAt',
      sortType: 'desc',
      page: currentPage,
    });
    if (response.status == 200) {
      setLoading(false);
      setListPopular(response.data.data);
    }
  };

  useEffect(() => {
    setLoading(true);
    setListPopular(null);
    if (selectTabs == 'webDrama') fetchDataCrowdfundingWebDrama();
    if (selectTabs == 'shortMovies') fetchDataCrowdfundingShortMovies();
    if (selectTabs == 'musicVideos') fetchDataCrowdfundingMusicVideos();
    if (selectTabs == 'allCategory') fetchDataCrowdfundingAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectFilmList, currentPage, selectTabs]);

  return (
    <PageOfList>
      <SEO title={t(common.crowdfunding)} />
      <HeaderPageOfList
        title={t(common.crowdfunding)}
        tabs={
          <Tabs activeKey={selectTabs} onChange={(data) => setSelectTabs(data)}>
            <Tabs.TabPane tab={t(common.allCapital)} key="allCategory"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.webDrama)} key="webDrama"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.shortMovies)} key="shortMovies"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.musicVideos)} key="musicVideos"></Tabs.TabPane>
          </Tabs>
        }
        rightCustom={
          <SelectForm
            dropdownClassName="select_page_of_list"
            option={arrayFilmList}
            selected={selectFilmList._id}
            handleChange={handeChangeSelectFilmList}
          />
        }
        tabsMobile={
          <Tabs activeKey={selectTabs} onChange={(data) => setSelectTabs(data)}>
            <Tabs.TabPane tab={t(common.allStreaming)} key="allCategory"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.webDrama)} key="webDrama"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.shortMovies)} key="shortMovies"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.musicVideos)} key="musicVideos"></Tabs.TabPane>
          </Tabs>
        }
      />
      <SelectMobile
        value={selectFilmList}
        listOption={arrayFilmList}
        onChange={setSelectFilmList}
      />
      <div className="contain_list w-100">
        {loading && <Loading />}

        {listPopuler && (
          <ListFilm
            rowClass="row-20"
            col={{ md: 5, xs: 12 }}
            type="crowdfunding"
            loading={true}
            dataFilm={listPopuler.docs}
          />
        )}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}
          className="pagination"
        >
          {listPopuler && (
            <Pagination
              defaultCurrent={currentPage}
              pageSize={limitPageSize}
              total={listPopuler?.totalDocs}
              showSizeChanger={false}
              onChange={(e) => {
                setCurrentPage(e);
              }}
            />
          )}
        </div>
      </div>
    </PageOfList>
  );
};

export default Crowdfunding;
