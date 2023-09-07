import React, { useState, FC } from 'react';
import 'assets/style/Views/streaming.scss';

// import { useTranslation } from 'react-i18next';
import { Button, Pagination } from 'antd';
import { ItemBookmarkListType } from 'app/Models/BookmarkList';
import FilmList from 'components/displayFilm/FilmList';
import i18n from 'app/trans/i18n';
import { propertyLang } from 'assets/propertyLang';
import { handleUnBookmark } from 'app/Services/myPage';
type Prop = {
  dataBookmark: Array<ItemBookmarkListType>[];
  limitPageSize: number;
  setCurrentPage: any;
  width: number;
  hideHeader: boolean;
  total: number;
  setUnliked: any;
  setHideHeader: any;
  currentPage: number;
};

const DisplayMobileBookmark: FC<Prop> = ({
  dataBookmark,
  limitPageSize,
  setCurrentPage,
  hideHeader,
  total,
  setHideHeader,
  setUnliked,
  width,
  currentPage,
}) => {
  const [selectedIdFilms, setSelectedIdFilms] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (id: string) => {
    if (selectedIdFilms.indexOf(id) < 0) {
      setSelectedIdFilms([...selectedIdFilms, id]);
      return;
    }
    setSelectedIdFilms(selectedIdFilms.filter((el) => el !== id));
  };
  console.log('selectedIdFilms', selectedIdFilms);
  const handleUnLike = async () => {
    setLoading(true);
    const response = await handleUnBookmark({ arrayStreaming: selectedIdFilms });
    console.log('response', response);
    if (response.status == 200) {
      setLoading(false);
      setSelectedIdFilms([]);
      setUnliked(true);
      setHideHeader(false);
    }
  };
  return (
    <div style={{ position: 'relative' }}>
      <ul className="list-film">
        {dataBookmark.map((el: any) => {
          return (
            <li className="item-Bookmark-list" key={el._id} aria-hidden="true">
              <FilmList
                idFilm={el.streamingID._id}
                width={width}
                src={
                  el.streamingID[
                    i18n.language == 'korean'
                      ? 'thumbnailImageWebDomestic'
                      : 'thumbnailImageWebOversea'
                  ]
                }
                name={propertyLang(el.streamingID, 'title')}
              />
              {hideHeader && (
                <div
                  className="icon_circle_click_to_delete"
                  onClick={() => {
                    handleChange(el.streamingID._id);
                  }}
                  aria-hidden="true"
                >
                  {selectedIdFilms.indexOf(el.streamingID._id) >= 0 ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8" cy="8" r="7.5" fill="#0E7EE4" stroke="white" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="8" cy="8" r="7.5" stroke="white" />
                    </svg>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {selectedIdFilms.length > 0 && (
        <div className="button_deleted">
          <Button
            type="primary"
            style={{ width: width - 32, height: 56 }}
            loading={loading}
            onClick={handleUnLike}
          >
            삭제
          </Button>
        </div>
      )}
      {total > 0 && !hideHeader && (
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 0 50px 0' }}
          className="pagination"
        >
          <Pagination
            defaultCurrent={currentPage}
            pageSize={limitPageSize}
            total={total}
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

export default DisplayMobileBookmark;
