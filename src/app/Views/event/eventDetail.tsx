import React, { FC, useEffect, useState } from 'react';
import 'assets/style/Views/eventDetail.scss';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import ModalShare from '../FilmDetail/LikeShareSave/ModalShare';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from 'app/Services';
import { EventType } from 'app/Models';
import { propertyImgLang, propertyLang } from 'assets/propertyLang';
import moment from 'moment';
import MyRouter from 'components/myRouter';
import TransitionLoading from 'components/transitionLoading';
import SEO from 'components/seo';
import LazyImage from 'components/lazyLoadImage';

const EventDetailPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataEvent, setDataEvent] = useState<EventType>();
  const [sharing, setSharing] = useState<boolean>(false);
  const { id } = useParams();
  const { width } = useWindowDimensions();
  const [t] = useTranslation();
  useEffect(() => {
    if (!id) return;
    (async () => {
      const dataListEvent = await eventService.getEventDetal(id);
      dataListEvent && setDataEvent(dataListEvent);
      setLoading(false);
    })();
  }, [id]);
  return (
    <MyRouter
      leftButton="back"
      title={dataEvent ? propertyLang(dataEvent, 'title') : ''}
      customrightButton={<ModalShare sharing={sharing} setSharing={setSharing} width={width} />}
    >
      <SEO title={t(common.events)} />
      <TransitionLoading loading={loading} className="view center">
        <div className="view event_detail_page">
          {!dataEvent ? <></> : <EventDetail dataEvent={dataEvent} />}
        </div>
      </TransitionLoading>
    </MyRouter>
  );
};

export default EventDetailPage;

interface PropsDetail {
  dataEvent: EventType;
}

const EventDetail: FC<PropsDetail> = ({ dataEvent }) => {
  const [t] = useTranslation();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [sharing, setSharing] = useState<boolean>(false);
  console.log({ dataEvent });
  return (
    <>
      <SEO
        title={propertyLang(dataEvent, 'title')}
        description={propertyLang(dataEvent, 'content')}
        metaImage={propertyImgLang(dataEvent, 'image')}
      />
      <div className="title_area">
        <div className="title">{propertyLang(dataEvent, 'title')}</div>
        <ModalShare sharing={sharing} setSharing={setSharing} width={width} />
      </div>
      <div className="event_data">
        <div className="infor_area">
          <span className="status_event">
            {dataEvent.status === 0
              ? dataEvent.is_notice
                ? t(common.notice)
                : t(common.proceeding)
              : t(common.end)}
          </span>
          <span className="timeline">
            {moment(dataEvent.startDate).format('YYYY.MM.DD')}&nbsp;~&nbsp;
            {moment(dataEvent.endDate).format('YYYY.MM.DD')}
          </span>
        </div>
        <LazyImage
          alt={propertyLang(dataEvent, 'content')}
          src={propertyImgLang(dataEvent, 'image')}
          className="event_img"
        />
        <div className="infor_area">
          <div className="information">{propertyLang(dataEvent, 'content')}</div>
          <Button className="button_ant_ct big_ant" onClick={() => navigate('/events')}>
            {t(common.listView)}
          </Button>
        </div>
        <div className="infor_area_mobile">
          {dataEvent?.status === 0 ? t(common.proceeding) : t(common.end)}
          <span className="timeline">
            {moment(dataEvent.startDate).format('YYYY.MM.DD')}&nbsp;~&nbsp;
            {moment(dataEvent.endDate).format('YYYY.MM.DD')}
          </span>
          <div className="information">{propertyLang(dataEvent, 'content')}</div>
          <div className="lookup">
            {t(common.lookup)}&nbsp;{dataEvent.view}
          </div>
        </div>
      </div>
    </>
  );
};
