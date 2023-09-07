import React, { FC, useEffect, useState } from 'react';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { getListCategoriesGenre } from 'app/Services/streaming';
import { useSearchParams } from 'react-router-dom';
import i18n from 'app/trans/i18n';
import { Pagination, Tabs } from 'antd';
import PageOfList from 'components/pageOfList';
import HeaderPageOfList from 'components/pageOfList/headerPageOfList';
import ListFilm from 'components/displayFilm/listFilm';
import SelectForm from 'components/selectForm';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import HeaderList from 'components/pageOfList/headerList';
import {
  getDataCrowdfundingOnSearchInPageAll,
  getDataCrowdfundingOnSearchInPageCrowdfunding,
  getDataStreamingOnSearchInPageAll,
  getDataStreamingOnSearchInPageStreaming,
} from 'app/Services/search';
import arrayCategoryStreaming from 'components/array/arrayCategoryStreaming';
import { StreamingType, CrowdfundingType } from 'app/Models';

const SearchPage: FC = () => {
  const [t] = useTranslation();
  const [searchParams] = useSearchParams();
  const objectSearchParams = Object.fromEntries([...Array.from(searchParams)]);

  const [selectCategory, setSelectCategory] = useState('all');
  const [selectTabs, setSelectTabs] = useState<string>();
  const { width } = useWindowDimensions();
  const limitPageSize = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [optionSelectCategory, setOptionSelectCategory] = useState([
    { _id: 'all', name_kr: '전체', name_eng: 'All' },
  ]);
  const [loadingStreaming, setLoadingStreaming] = useState(true);
  const [loadingCrowdfunding, setLoadingCrowdfunding] = useState(true);

  const [dataFilmStreaming, setDataFilmStreaming] = useState<StreamingType[]>([]);
  const [dataCrowdfunding, setDataCrowdfunding] = useState<CrowdfundingType[]>([]);

  const handeChangeSelectCategory = (e: any) => {
    setSelectCategory(e);
  };
  useEffect(() => {
    if (width <= 768 && (selectTabs === 'all' || !selectTabs)) {
      setSelectTabs('streaming');
    } else if (!selectTabs) {
      setSelectTabs('all');
    }
  }, [width, selectTabs]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fectchDataFilmStreaming = async () => {
    setLoadingStreaming(false);
    setDataFilmStreaming([]);
    const response: any = await getDataStreamingOnSearchInPageAll({
      limit: 10,
      key: objectSearchParams.key,
    });
    if (response.status == 200) {
      setDataFilmStreaming(response.data.data);
      setLoadingStreaming(true);
    }
  };
  const fectchDataFilmStreamingHavePagination = async () => {
    setLoadingStreaming(false);
    setDataFilmStreaming([]);
    const response: any = await getDataStreamingOnSearchInPageStreaming({
      limit: limitPageSize,
      key: objectSearchParams.key,
      page: currentPage,
      categoryGenre: selectCategory == 'all' ? null : selectCategory,
    });
    if (response.status == 200) {
      setDataFilmStreaming(response.data.data.docs);
      setTotalPage(response.data.data.totalDocs);
      setLoadingStreaming(true);
    }
  };

  const fectchDataCrowdfunding = async () => {
    setLoadingCrowdfunding(false);
    setDataCrowdfunding([]);
    const response: any = await getDataCrowdfundingOnSearchInPageAll({
      limit: 10,
      key: objectSearchParams.key,
    });
    if (response.status == 200) {
      setDataCrowdfunding(response.data.data);
      setLoadingCrowdfunding(true);
    }
  };
  const fectchDataCrowdfundingHavePagination = async () => {
    setLoadingCrowdfunding(false);
    setDataCrowdfunding([]);
    const response: any = await getDataCrowdfundingOnSearchInPageCrowdfunding({
      limit: limitPageSize,
      key: objectSearchParams.key,
      page: currentPage,
      categoriesID: selectCategory == 'all' ? null : selectCategory,
    });
    if (response.status == 200) {
      setDataCrowdfunding(response.data.data.docs);
      setTotalPage(response.data.data.totalDocs);
      setLoadingCrowdfunding(true);
    }
  };

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
  useEffect(() => {
    if (selectTabs == 'all') {
      fectchDataFilmStreaming();
      fectchDataCrowdfunding();
    }
    if (selectTabs == 'streaming') {
      fectchDataFilmStreamingHavePagination();
    }
    if (selectTabs == 'crowdfunding') {
      fectchDataCrowdfundingHavePagination();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, selectTabs, selectCategory, currentPage]);

  const renderTitle = () => {
    if (i18n.language === 'korean') return `“${objectSearchParams.key || ''}” ${t(common.search)}`;
    return `${t(common.search)} “${objectSearchParams.key || ''}”`;
  };

  const renderDataSearch = () => {
    switch (selectTabs) {
      case 'streaming':
        return (
          <div>
            <ListFilm
              rowClass="row-20"
              col={{ md: 5, xs: 8 }}
              type="streaming"
              loading={loadingStreaming}
              dataFilm={dataFilmStreaming}
            />
            {dataFilmStreaming.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="pagination">
                <Pagination
                  defaultCurrent={currentPage}
                  pageSize={limitPageSize}
                  total={totalPage}
                  showSizeChanger={false}
                  onChange={(e) => {
                    setCurrentPage(e);
                  }}
                />
              </div>
            )}
          </div>
        );
      case 'crowdfunding':
        return (
          <div>
            <ListFilm
              rowClass="row-20"
              col={{ md: 5, xs: 12 }}
              type="crowdfunding"
              loading={loadingCrowdfunding}
              dataFilm={dataCrowdfunding}
            />
            {dataCrowdfunding.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="pagination">
                <Pagination
                  defaultCurrent={currentPage}
                  pageSize={limitPageSize}
                  total={totalPage}
                  showSizeChanger={false}
                  onChange={(e) => {
                    setCurrentPage(e);
                  }}
                />
              </div>
            )}
          </div>
        );
      default:
        return (
          <>
            {dataFilmStreaming.length > 0 && (
              <HeaderList
                title={t(common.streaming)}
                customBtn={{ name: t(common.all2), onClick: () => setSelectTabs('streaming') }}
              />
            )}
            <ListFilm
              rowClass="row-20"
              col={{ md: 5, xs: 8 }}
              type="streaming"
              loading={loadingStreaming}
              dataFilm={dataFilmStreaming}
            />
            {dataCrowdfunding.length > 0 && (
              <HeaderList
                title={t(common.crowdfunding)}
                customBtn={{ name: t(common.all2), onClick: () => setSelectTabs('crowdfunding') }}
              />
            )}
            <ListFilm
              rowClass="row-20"
              col={{ md: 5, xs: 12 }}
              type="crowdfunding"
              loading={loadingCrowdfunding}
              dataFilm={dataCrowdfunding}
            />
          </>
        );
    }
  };

  const changeTab = (data: string) => {
    setSelectTabs(data);
    setSelectCategory('all');
  };

  return (
    <PageOfList>
      <HeaderPageOfList
        title={renderTitle()}
        tabs={
          <Tabs
            activeKey={selectTabs}
            onChange={(data) => {
              changeTab(data);
              setDataFilmStreaming([]);
            }}
          >
            <Tabs.TabPane tab={t(common.allStreaming)} key="all"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.streaming)} key="streaming"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.crowdfunding)} key="crowdfunding"></Tabs.TabPane>
          </Tabs>
        }
        rightCustom={
          (selectTabs == 'all' && <div></div>) ||
          (selectTabs == 'streaming' && (
            <SelectForm
              dropdownClassName="select_page_of_list"
              option={optionSelectCategory}
              selected={selectCategory}
              handleChange={handeChangeSelectCategory}
            />
          )) || (
            <SelectForm
              dropdownClassName="select_page_of_list"
              option={arrayCategoryStreaming}
              selected={selectCategory}
              handleChange={handeChangeSelectCategory}
            />
          )
        }
        tabsMobile={
          <Tabs activeKey={selectTabs} onChange={(data) => changeTab(data)}>
            <Tabs.TabPane tab={t(common.streaming)} key="streaming"></Tabs.TabPane>
            <Tabs.TabPane tab={t(common.crowdfunding)} key="crowdfunding"></Tabs.TabPane>
          </Tabs>
        }
      />
      {width <= 768 && selectTabs == 'streaming' && (
        <div className="select_in_tabs selec_mb">
          <SelectForm
            option={optionSelectCategory}
            selected={selectCategory}
            handleChange={handeChangeSelectCategory}
          />
        </div>
      )}
      {width <= 768 && selectTabs == 'crowdfunding' && (
        <div className="select_in_tabs selec_mb">
          <SelectForm
            option={arrayCategoryStreaming}
            selected={selectCategory}
            handleChange={handeChangeSelectCategory}
          />
        </div>
      )}
      <div className="contain_list w-100">{renderDataSearch()}</div>
    </PageOfList>
  );
};

export default SearchPage;
