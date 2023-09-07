import React, { FC } from 'react';
import 'assets/style/bottom.scss';
import { useLocation } from 'react-router-dom';

const BottomMain: FC = () => {
  const Loc = useLocation();
  if (
    Loc.pathname === '/' ||
    Loc.pathname.includes('/login') ||
    Loc.pathname.includes('/sign-up') ||
    Loc.pathname.includes('/forgot-password') ||
    Loc.pathname.includes('/oauth/kakao/callback')
  )
    return <></>;
  return (
    <div className="w-100">
      <div className="bottom_area">
        {/* {width > 768 ? (
          <>
            <div className="logo_bottom">Terafly</div>
            <div className="content_area">
              <div className="content">
                <div className="title_bottom">(주)000000</div>
                대표이사 000 / 사업자등록번호: 123-45-67890
                <br />
                통신판매업신고: 제 2018-서울강남-00000 호<br />
                서울특별시 강남구 가나길 00,0층 (우)12354
                <br />
                개인정보 보호책임자 : 0000 / 개인정보 보호담당자 : 0000
              </div>
              <div className="content content_right">
                <div className="title_bottom">고객센터</div>
                평일 10:00 ~ 18:00 KST
                <br />
                (토/일/공휴일 휴무)
              </div>
            </div>
            <div className="content_bottom">© 2015 TERAFTY, Inc.</div>
            <div></div>
          </>
        ) : ( */}
        <div className="content_area">
          <div className="content">
            <div className="title_bottom">테라프티</div>
            대표이사: 김은택
            <br />
            사업자 번호: 166-87-02503
            <br />
            통신판매업 신고번호 2023-인천연수구-0145
            <br />
            주소: 22007 인천광역시 연수구 인천타워대로 323, 비동 16층 1607호 지10(송도동, 송도 센트로드)
            <br />
            문의: cs@terafty.com 대표번호: 070-4578-4907
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default BottomMain;
