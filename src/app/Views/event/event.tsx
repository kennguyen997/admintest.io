import React, { FC, useEffect, useState } from 'react';
import 'assets/style/Views/event.scss';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import { Col, Pagination, Row } from 'antd';
import { Link } from 'react-router-dom';
import { ListEventType } from 'app/Models';
import { propertyImgLang, propertyLang } from 'assets/propertyLang';
import { eventService } from 'app/Services';
import moment from 'moment';
import TransitionLoading from 'components/transitionLoading';
import SEO from 'components/seo';
import LazyImage from 'components/lazyLoadImage';

const Event: FC = () => {
  const [t] = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [listEvent, setListEvent] = useState<ListEventType>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const dataListEvent = await eventService.getListEvent(currentPage);
      dataListEvent && setListEvent(dataListEvent);
      setLoading(false);
    })();
  }, [currentPage]);

  const renderlistEvent = () => {
    return (
      listEvent?.docs &&
      listEvent.docs.map((data) => {
        return (
          <Col xs={{ span: 24 }} md={{ span: 12 }} key={data._id}>
            <Link to={`/events/${data._id}`} className="event_item">
              <LazyImage
                alt={propertyLang(data, 'content')}
                src={propertyImgLang(data, 'image')}
                className="event_img"
              />
              <div className="infor_area">
                <span className="status_event">
                  {data.status === 0
                    ? data.is_notice
                      ? t(common.notice)
                      : t(common.proceeding)
                    : t(common.end)}
                </span>
                <span className="timeline">
                  {moment(data.startDate).format('YYYY.MM.DD')}&nbsp;~&nbsp;
                  {moment(data.endDate).format('YYYY.MM.DD')}
                </span>
                <div className="lookup">
                  {t(common.lookup)}&nbsp;{data.view}
                </div>
              </div>
            </Link>
          </Col>
        );
      })
    );
  };

  return (
    <div className="view event_page">
      <SEO title={t(common.events)} />
      <div className="title">{t(common.events)}</div>
      <TransitionLoading loading={loading}>
        <Row gutter={[20, 20]} className="list_event">
          {renderlistEvent()}
        </Row>
      </TransitionLoading>
      {listEvent && listEvent.totalPages > 0 && (
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0 50px 0' }}
          className="pagination"
        >
          <Pagination
            defaultCurrent={currentPage}
            defaultPageSize={10}
            total={listEvent.totalPages * 10}
            showSizeChanger={false}
            onChange={(e) => {
              setCurrentPage(e);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Event;
