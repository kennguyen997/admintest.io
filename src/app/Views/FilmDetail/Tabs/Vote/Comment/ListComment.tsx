import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import { Select, Space } from 'antd';
import HeartIcon from './HeartIcon';
import { UndoOutlined } from '@ant-design/icons';
import { ResultAccount } from 'app/Models';
import Loading from 'components/loading';
import { useParams } from 'react-router-dom';
import { getDataCommentListHaveAuthen, getDataCommentListNoAuthen } from 'app/Services/streaming';
import InfiniteScroll from 'react-infinite-scroll-component';

import 'moment/locale/ko';
import * as momentTZ from 'moment-timezone';
import i18n from 'app/trans/i18n';
momentTZ.tz.setDefault('Asia/Seoul');

type Prop = {
  createdNewCmt: boolean;
  setCreatedNewCmt: any;
  account: ResultAccount | null;
  selectEpsiodeFilm: number;
  seasonSelect: number;
  dataAllEpisodesAndSeasonOfFilm: any;
};

const ListComment = function ({
  createdNewCmt,
  setCreatedNewCmt,
  account,
  selectEpsiodeFilm,
  dataAllEpisodesAndSeasonOfFilm,
  seasonSelect,
}: Prop) {
  const [t] = useTranslation();
  const [spinRefresh, setSpinRefresh] = useState(false);
  const [dataComment, setDataComment] = useState(null);
  const [items, setItems] = useState([]);
  const [counterPage, setCounterPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [valueSort, setValueSort] = useState<number>(2);
  const [theFirstToCmt, setTheFirstToCmt] = useState<boolean>(false);
  const params = useParams();
  const idFilm = params.id;
  const idSelectedEpsiodeFilm = dataAllEpisodesAndSeasonOfFilm?.filter(
    (el: any) => el.number == selectEpsiodeFilm && el.numberSeason == seasonSelect,
  )[0]?._id;

  //lấy ddataa comment
  const fecthDataCommentList = async () => {
    setTheFirstToCmt(false);

    if (account) {
      const response = await getDataCommentListHaveAuthen({
        limit: 5,
        page: counterPage,
        keySort: valueSort == 2 ? 'createdAt' : 'quantityHeart',
        streamingEpisodesID: idSelectedEpsiodeFilm,
        streamingID: idFilm,
      });
      if (response.status == 200) {
        if (response.data?.data.docs.length == 0) {
          setTheFirstToCmt(true);
          setHasMore(false);
        }
        setItems(response.data?.data.docs);
        setDataComment(response.data?.data);
      }
      return;
    }
    const response = await getDataCommentListNoAuthen({
      limit: 5,
      page: counterPage,
      keySort: valueSort == 2 ? 'createdAt' : 'quantityHeart',
      streamingEpisodesID: idSelectedEpsiodeFilm,
      streamingID: idFilm,
    });
    if (response.status == 200) {
      if (response.data?.data.docs.length == 0) {
        setTheFirstToCmt(true);
        setHasMore(false);
      }
      setItems(response.data?.data.docs);

      setDataComment(response.data?.data);
    }
  };

  // khi nhấn refresh
  const fecthDataCommentListRefresh = async () => {
    setHasMore(true);
    setTheFirstToCmt(false);
    if (account) {
      const response = await getDataCommentListHaveAuthen({
        limit: 5,
        page: 1,
        keySort: valueSort == 2 ? 'createdAt' : 'quantityHeart',
        streamingEpisodesID: idSelectedEpsiodeFilm,
        streamingID: idFilm,
      });
      if (response.status == 200) {
        if (response.data?.data.docs.length == 0) {
          setTheFirstToCmt(true);
          setHasMore(false);
        }
        setItems(response.data?.data.docs);
        setDataComment(response.data?.data);
      }
      return;
    }
    const response = await getDataCommentListNoAuthen({
      limit: 5,
      page: 1,
      keySort: valueSort == 2 ? 'createdAt' : 'quantityHeart',
      streamingEpisodesID: idSelectedEpsiodeFilm,
      streamingID: idFilm,
    });
    if (response.status == 200) {
      if (response.data?.data.docs.length == 0) {
        setTheFirstToCmt(true);
        setHasMore(false);
      }
      setItems(response.data?.data.docs);

      setDataComment(response.data?.data);
    }
  };

  // khi sort
  useEffect(() => {
    setHasMore(true);
    fecthDataCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAllEpisodesAndSeasonOfFilm, seasonSelect, selectEpsiodeFilm, idFilm, valueSort]);

  // khi scroll xem list comment
  const fetchMoreData = () => {
    // a fake async api call like which sends
    setTimeout(async () => {
      const maxCounter = counterPage + 1;
      if (account) {
        const response = await getDataCommentListHaveAuthen({
          page: maxCounter,
          limit: 5,
          keySort: valueSort == 2 ? 'createdAt' : 'quantityHeart',
          streamingEpisodesID: idSelectedEpsiodeFilm,
          streamingID: idFilm,
        });
        // //console.log('response message', response);
        if (response.data?.data?.docs.length < 5) {
          setHasMore(false);
        }
        setItems(items.concat(response.data?.data?.docs));
        setCounterPage(maxCounter);
        return;
      }
      const response = await getDataCommentListNoAuthen({
        page: maxCounter,
        limit: 5,
        keySort: valueSort == 2 ? 'createdAt' : 'quantityHeart',
        streamingEpisodesID: idSelectedEpsiodeFilm,
        streamingID: idFilm,
      });
      // //console.log('response message', response);
      if (response.data?.data?.docs.length < 5) {
        setHasMore(false);
      }
      setItems(items.concat(response.data?.data?.docs));
      setCounterPage(maxCounter);
    }, 250);
  };

  //handle When created new comment
  useEffect(() => {
    setCounterPage(1);
    if (!createdNewCmt) {
      return;
    }

    fecthDataCommentListRefresh();
    Promise.all([fecthDataCommentListRefresh]).then(() => {
      setCreatedNewCmt(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdNewCmt]);

  useEffect(() => {
    if (items.length > 0) {
      setTheFirstToCmt(false);
    }
  }, [items]);
  console.log('items', items);

  return (
    <div className="list_comment">
      <div className="refresh_sort">
        <div
          className="refresh"
          onClick={() => {
            setDataComment(null);
            setCounterPage(1);
            setSpinRefresh(true);
            fecthDataCommentListRefresh();
            Promise.all([fecthDataCommentListRefresh]).then(() => {
              setTimeout(() => {
                setSpinRefresh(false);
              }, 1000);
            });
          }}
          aria-hidden="true"
        >
          <UndoOutlined style={{ color: '#bdc5cb' }} spin={spinRefresh} />
          <div className="text_refresh">{t(common.refresh)}</div>
        </div>
        <div className="sort">
          <Select
            value={valueSort}
            onChange={(e) => {
              setDataComment(null);
              setCounterPage(1);
              setValueSort(e);
            }}
          >
            <Select.Option value={1}>{t(common.popular)}</Select.Option>
            <Select.Option value={2}>{t(common.latest)}</Select.Option>
          </Select>
        </div>
      </div>
      <div className="content_list_comment">
        {!dataComment && (
          <div style={{ marginTop: 20 }}>
            <Loading />
          </div>
        )}
        {theFirstToCmt && <div>{t(common.firstComment)}</div>}
        {items && (
          <div>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={hasMore}
              height={400}
              loader={<div>{t(common.loading)}</div>}
            >
              {items.map((el: any) => {
                return (
                  <Space
                    direction="horizontal"
                    align="start"
                    className="component_comment"
                    key={el._id}
                  >
                    <div>
                      <img
                        src={
                          el.userID?.avatar ||
                          'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
                        }
                        alt="avatar"
                        className="avatar_comment"
                      />
                    </div>
                    <div className="content_main_comment">
                      <div className="user_name">{el.userID?.userName}</div>
                      <div style={{ color: '#BDC5CB', wordWrap: 'break-word' }}>{el.content}</div>
                      <Space direction="horizontal" className="like_time_number">
                        <div style={{ fontSize: 12, color: '#BDC5CB', width: 100 }}>
                          {i18n.language == 'korean'
                            ? momentTZ.tz(el.createdAt, 'Asia/Seoul').locale('ko').fromNow()
                            : momentTZ.tz(el.createdAt, 'Asia/Seoul').locale('en').fromNow()}
                        </div>
                        <HeartIcon
                          commentID={el._id}
                          streamingEpisodesID={idSelectedEpsiodeFilm}
                          isliked={el.isHeart}
                          numberLike={el.quantityHeart}
                          account={account}
                        />
                      </Space>
                    </div>
                  </Space>
                );
              })}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListComment;
