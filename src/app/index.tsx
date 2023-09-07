import '../assets/style/index.scss';
import React, { FC, lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store';
import { loadLoginUser } from './redux/Slices/AccountsSlice';
import UnRequireAuth from 'components/unRequireAuth';
import RequireAuth from 'components/authenticateRoutes';
import MyRouter from 'components/myRouter';
import { common } from './trans';
import { useTranslation } from 'react-i18next';
import BottomMain from 'components/bottomMain';
import ButtonX from 'assets/icons/ButtonX';
import { translateMessage } from './Models/yupcustom';
const Main = lazy(() => import('./Views/main'));
const SearchPage = lazy(() => import('./Views/searchPage'));
const FilmDetail = lazy(() => import('./Views/FilmDetail'));
const Home = lazy(() => import('./Views/home'));
// const Error404 = lazy(() => import('./Views/404'));
const Streaming = lazy(() => import('./Views/streaming'));
const Crowdfunding = lazy(() => import('./Views/crowdfunding'));
const MyPage = lazy(() => import('./Views/myPage'));
const MyPageEdit = lazy(() => import('./Views/myPage/myPageEdit'));
const Event = lazy(() => import('./Views/event/event'));
const EventDetailPage = lazy(() => import('./Views/event/eventDetail'));
const Apply = lazy(() => import('./Views/apply'));
translateMessage();
import SEO from 'components/seo';
import { changeLanguageRedux } from 'app/redux/Slices/AccountsSlice';

const App: FC = () => {
  const Loc = useLocation();
  const navigator = useNavigate();
  const [t] = useTranslation();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectTabs, setSelectTabs] = useState<{ [k: string]: string }>();

  const containerStyle = {
    zIndex: 1999,
  };

  const classBgMain = () => {
    if (
      Loc.pathname === '/' ||
      [
        '/login',
        '/sign-up',
        '/login-method',
        '/forgot-password',
        '/apply',
        '/email-verification',
        '/inlet-channel',
        '/access-information',
      ].includes(Loc.pathname)
    ) {
      return 'app bgMain';
    }
    return 'app';
  };

  useEffect(() => {
    (async () => {
      const curLang = window.localStorage.getItem("lang");
      const browserLange = window.navigator.language;
      console.log(`curLang ===> ${curLang}; browserLange ===> ${browserLange}`);
      if(["ko", "ko-KP", "ko-KR"].indexOf(browserLange) < 0) {
        store.dispatch(changeLanguageRedux("english"));
      } else {
        store.dispatch(changeLanguageRedux("korean"));
      }
      await store.dispatch(loadLoginUser());
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const objectSearchParams = Object.fromEntries([...Array.from(searchParams)]);
    setSelectTabs(objectSearchParams);
  }, [searchParams]);

  return (
    <div className={classBgMain()}>
      <SEO />
      <ToastContainer style={containerStyle} />
      {/* <Header /> */}
      <section className="app-scroll-wrapper">
        <main className="app-content">
          <Suspense fallback={<></>}>
            <Routes>
              <Route
                path="/"
                element={
                  <MyRouter leftButton="navBar" rightButton="search">
                    <Home />
                  </MyRouter>
                }
              />
              <Route
                path="/search"
                element={
                  <MyRouter leftButton="back" title={`“${selectTabs?.key || ''}”`}>
                    <SearchPage />
                  </MyRouter>
                }
              />
              <Route
                path="/mypage_edit"
                element={
                  <MyRouter leftButton="back" title="내 정보 수정">
                    <RequireAuth loading={isLoading}>
                      <MyPageEdit />
                    </RequireAuth>
                  </MyRouter>
                }
              />
              <Route
                path="/events"
                element={
                  <MyRouter leftButton="navBar" title={t(common.events)} rightButton="search">
                    <Event />
                  </MyRouter>
                }
              />
              <Route
                path="/events/:id"
                element={
                  // <MyRouter
                  //   leftButton="back"
                  //   title="Filming the movie 'Brother'"
                  //   customrightButton={
                  //     <ModalShare sharing={sharing} setSharing={setSharing} width={width} />
                  //   }
                  // >
                  <EventDetailPage />
                  // </MyRouter>
                }
              />
              <Route
                path="/apply"
                element={
                  <MyRouter leftButton="navBar" title={t(common.apply)} rightButton="search">
                    <Apply />
                  </MyRouter>
                }
              />
              <Route
                path="/streaming"
                element={
                  <MyRouter leftButton="navBar" title={t(common.streaming)} rightButton="search">
                    <Streaming />
                  </MyRouter>
                }
              />
              <Route
                path="/crowdfunding"
                element={
                  <MyRouter leftButton="navBar" title={t(common.crowdfunding)} rightButton="search">
                    <Crowdfunding />
                  </MyRouter>
                }
              />
              <Route
                path="/detail-film/:id"
                element={
                  <MyRouter leftButton="back">
                    <FilmDetail />
                  </MyRouter>
                }
              />
              <Route
                path="/mypage"
                element={
                  <MyRouter
                    customleftButton={
                      <div
                        onClick={() => navigator(-1)}
                        aria-hidden="true"
                        style={{ marginRight: 'auto' }}
                      >
                        <ButtonX size={24} />
                      </div>
                    }
                    title={t(common.my_page)}
                    titleStyle={{ textAlign: 'center' }}
                    customrightButton={
                      <div onClick={() => navigator(-1)} aria-hidden="true" className="hiden">
                        <ButtonX size={24} />
                      </div>
                    }
                  >
                    <RequireAuth loading={isLoading}>
                      <MyPage />
                    </RequireAuth>
                  </MyRouter>
                }
              />
              {/* <Route element={Error404} /> */}
              <Route
                path="*"
                element={
                  <UnRequireAuth>
                    <Main />
                  </UnRequireAuth>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </section>
      <BottomMain />
    </div>
  );
};

export default App;
