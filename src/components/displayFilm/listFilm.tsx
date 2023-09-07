import React, { FC } from 'react';
import 'assets/style/listFilm.scss';
import { StreamingType } from 'app/Models';
import { Col, Row, RowProps, ColProps } from 'antd';
import Loading from 'components/loading';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import {
  propertyImgLang,
  propertyLang,
  formatCreatedAt,
  crowdFundingLink,
} from 'assets/propertyLang';
import i18n from 'app/trans/i18n';
import { useNavigate } from 'react-router-dom';
import { addClickCountForCrowdfungding } from 'app/Services/crowdfunding';
import { CrowdfundingType } from 'app/Models';
import LazyImage from 'components/lazyLoadImage';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';

interface Prop {
  row?: RowProps;
  rowClass: 'row-20' | 'row-8';
  col: ColProps;
  dataFilm: StreamingType[] | CrowdfundingType[];
  type: 'streaming' | 'crowdfunding';
  loading?: boolean;
  disableUpdateAt?: boolean;
}

const ListFilm: FC<Prop> = ({ dataFilm, row, col, loading, type, rowClass, disableUpdateAt }) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [t] = useTranslation();

  const renderListFilm = () => {
    if (!loading) {
      return <Loading />;
    }

    const getUrl = (data: CrowdfundingType | StreamingType, type: string) => {
      if (type !== 'crowdfunding') return data.url;
      return (data as CrowdfundingType)[crowdFundingLink()];
    };

    if (type === 'streaming') {
      return dataFilm?.map((data) => {
        return (
          <Col {...col} key={data._id}>
            <div
              className="streaming_item"
              onClick={() => {
                navigate(`/detail-film/${data._id}`);
              }}
              aria-hidden="true"
            >
              <LazyImage
                src={
                  width > 768
                    ? propertyImgLang(data, 'thumbnailImageWeb')
                    : propertyImgLang(data, 'thumbnailImageMobile')
                }
                alt={propertyLang(data, 'title')}
                className="filmImage"
              />
              <div className={`w-100 updated_at ${disableUpdateAt ? 'hiden' : ''}`}>
                <div className="filmImage">
                  <span>
                    {t(common.updatedAt)} : {formatCreatedAt(data.updatedAt)}
                  </span>
                </div>
              </div>
              <div className="name text-overflow-1">{propertyLang(data, 'title')}</div>
            </div>
          </Col>
        );
      });
    }

    return dataFilm.map((data) => {
      return (
        <Col {...col} key={data._id}>
          <div
            className="crowdfunding_item"
            onClick={async () => {
              // const { response }: any = await addClickCountForCrowdfungding(data._id);
              await addClickCountForCrowdfungding(data._id);
              window.open(
                getUrl(data, type),
                '_blank', // <- This is what makes it open in a new window.
              );
            }}
            aria-hidden="true"
          >
            <LazyImage
              src={
                width >= 768
                  ? propertyImgLang(data, 'imageWeb')
                  : propertyImgLang(data, 'imageMobile')
              }
              alt={propertyLang(data, 'title')}
              className="filmImage"
            />
            <div className={`w-100 updated_at ${disableUpdateAt ? 'hiden' : ''}`}>
              <div className="filmImage">
                <span>
                  {t(common.updatedAt)} : {formatCreatedAt(data.updatedAt)}
                </span>
              </div>
            </div>
            <div className="infor_area">
              <div className="infor">
                <div className="name text-overflow-2">{propertyLang(data, 'title')} </div>
                <div className="price">
                  {i18n.language == 'korean'
                    ? `${
                        data.amount_krw || data.amount_krw === 0
                          ? `${data.amount_krw}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                      }원`
                    : `＄${
                        data.amount_usd || data.amount_usd === 0
                          ? `${data.amount_usd}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                      }`}
                </div>
              </div>
              <div className="foot_info">
                <span>
                  {data.numberOfSponsors
                    ? `${data.numberOfSponsors.toLocaleString('en-US')} ${t(common.backers)}`
                    : ''}
                </span>
                <span>
                  {data.achievementRate ? `${data.achievementRate.toLocaleString('en-US')}%` : ''}
                </span>
              </div>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Row {...row} className={`listFilm ${type} ${rowClass}`}>
      {renderListFilm()}
    </Row>
  );
};

export default ListFilm;
