import React, { FC, useRef, useEffect, useState } from 'react';
import 'assets/style/Views/home.scss';
import { common } from 'app/trans';
import { useTranslation } from 'react-i18next';
import { Button, Carousel } from 'antd';
import { ReactComponent as BackSVG } from 'assets/icons/back.svg';
import { ReactComponent as NextSVG } from 'assets/icons/next.svg';
import { getDataBanner, getDataPopular } from 'app/Services/home';
import ListPopularInPageHome from 'components/displayFilm/listPopularInPageHome';
import Loading from 'components/loading';
import useWindowDimensions from 'components/GetWidthHeightWindow/useWindowDimensions';
import { propertyImgLang } from 'assets/propertyLang';

const Home: FC = () => {
  const [t] = useTranslation();
  const slider = useRef<any>(null);
  const [dataPopular, setDataPopular] = useState(null);
  const [dataBanner, setDataBanner] = useState<any>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchDataPopular = async () => {
      const response = await getDataPopular({ limit: 30 });
      if (response.status == 200 || response.status == 201) {
        setDataPopular(response.data.data.docs);
      }
    };
    fetchDataPopular();
    const fetchDataCarosel = async () => {
      const response = await getDataBanner();
      if (response.status == 200 || response.status == 201) {
        setDataBanner(response.data.data);
      }
    };
    fetchDataCarosel();
  }, []);

  const renderItemCarosel = () => {
    if (!dataBanner) {
      return (
        <div>
          <div className="bgrCarosel">
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loading />
            </div>
          </div>
        </div>
      );
    }
    if (dataBanner) {
      if (width > 768) {
        return propertyImgLang(dataBanner, 'imageWeb')?.map((data: any) => {
          return (
            <div key={data._id}>
              <div
                className="bgrCarosel"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(20, 28, 35, 0) 80.54%, #141C23 100%), url("${data.image}")`,
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  window.open(
                    data?.url,
                    // '_blank', // <- This is what makes it open in a new window.
                    '_self', // <- Open on the same tab
                  );
                }}
                aria-hidden="true"
              ></div>
            </div>
          );
        });
      }
      return propertyImgLang(dataBanner, 'imageMobile')?.map((data: any) => {
        return (
          <div key={data._id}>
            <div
              className="bgrCarosel"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(20, 28, 35, 0) 80.54%, #141C23 100%), url("${data.image}")`,
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                cursor: 'pointer',
              }}
              onClick={() => {
                window.open(
                  data?.url,
                  // '_blank', // <- This is what makes it open in a new window.
                  '_self', // <- Open on the same tab
                );
              }}
              aria-hidden="true"
            ></div>
          </div>
        );
      });
    }
  };

  return (
    <div className="view home_page">
      <div className="carosel_area">
        <Carousel ref={slider} className="carouselHome" autoplay autoplaySpeed={5000}>
          {renderItemCarosel()}
        </Carousel>
        <div className="buttonMethods">
          <Button
            className="backCarousel"
            type="link"
            onClick={() => slider.current.prev()}
            icon={<BackSVG width={36} height={36} />}
          />
          <Button
            className="rightCarousel"
            type="link"
            onClick={() => slider.current.next()}
            icon={<NextSVG width={36} height={36} />}
          />
        </div>
      </div>

      <div className="populer_container">
        <div className="title">{t(common.popular)}</div>
        {!dataPopular && <Loading />}
        <ListPopularInPageHome
          rowClass="row-8"
          col={{ md: 4, xs: 8 }}
          loading={true}
          dataFilm={dataPopular}
        />
      </div>
    </div>
  );
};

export default Home;
