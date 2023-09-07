import React, { FC } from 'react';
import 'assets/style/listFilm.scss';
import { Col, Row, RowProps, ColProps } from 'antd';
import Loading from 'components/loading';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import { propertyImgLang, propertyLang, formatCreatedAt, crowdFundingLink } from 'assets/propertyLang';
import { useNavigate } from 'react-router-dom';
import LazyImage from 'components/lazyLoadImage';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';

interface Prop {
  row?: RowProps;
  rowClass: 'row-20' | 'row-8';
  col: ColProps;
  dataFilm: any;

  loading?: boolean;
}

const ListPopularInPageHome: FC<Prop> = ({ dataFilm, row, col, loading }) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const [t] = useTranslation();

  const renderListFilm = () => {
    if (!loading) {
      return <Loading />;
    }

    return dataFilm?.map((data: any) => {
      return (
        <Col {...col} key={data._id}>
          <div
            className="streaming_item"
            onClick={() => {
              if (data.type == 'STREAMING') {
                navigate(`/detail-film/${data.streamingID}`);
              }
              if (data.type == 'CROWDFUNDING') {
                window.open(
                  data.crowdfundingID?.[crowdFundingLink()],
                  '_blank', // <- This is what makes it open in a new window.
                );
              }
            }}
            aria-hidden="true"
          >
            <LazyImage
              src={
                width > 768
                  ? propertyImgLang(data, 'imageWeb')
                  : propertyImgLang(data, 'imageMobile')
              }
              alt={propertyLang(data, 'title')}
              className="filmImage"
            />
            {/* <div className="w-100 updated_at">
              <div className="filmImage">
                <span>
                  {t(common.updatedAt)} : {formatCreatedAt(data.updatedAt)}
                </span>
              </div>
            </div> */}
            <div className="name_in_home_page ">
              <div className="text-overflow-1">{propertyLang(data, 'title')}</div>
              {/* {data.type == 'CROWDFUNDING' && (
                <div className="price">
                  {i18n.language == 'korean'
                    ? `${
                        data.crowdfundingID?.amount
                          ? `${data.crowdfundingID.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                      }원~`
                    : `＄${
                        data.crowdfundingID?.amount
                          ? `${data.crowdfundingID?.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          : null
                      } ~`}
                </div>
              )} */}
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Row {...row} className={`listFilm streaming`} gutter={10}>
      {renderListFilm()}
    </Row>
  );
};

export default ListPopularInPageHome;
