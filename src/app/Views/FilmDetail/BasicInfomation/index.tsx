import React from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import 'assets/style/Views/FilmDetail/_basicInfomation.scss';
import { DetailStreamingType } from 'app/Models';
import { propertyLang } from 'assets/propertyLang';
import i18n from 'app/trans/i18n';

type Props = {
  filmDetail: DetailStreamingType;
  seasonSelect: number;
  selectEpsiodeFilm: number;
};

const BasicInfomation = function ({ filmDetail, seasonSelect, selectEpsiodeFilm }: Props) {
  const [t] = useTranslation();

  return (
    <div className="basic_infomation_film">
      <div className="name_film">{propertyLang(filmDetail, 'title')}</div>
      <div className="infomation_season_epsiode">
        <div className="infomatiom_all">{t(common.all)}</div>
        {seasonSelect >= 1 && filmDetail.category.name_eng == "web drama" && (
          <div className="infomation_season">
            {i18n.language == 'korean' ? `시즌 ${seasonSelect}` : `Season ${seasonSelect}`}
          </div>
        )}
        {selectEpsiodeFilm >= 1 && filmDetail.category.name_eng == "web drama" && (
          <div className="infomation_epsiode">
            {i18n.language == 'korean'
              ? `에피소드 ${selectEpsiodeFilm}`
              : `Epsiode ${selectEpsiodeFilm}`}
          </div>
        )}
      </div>
      <div className="infomation_desciption" dangerouslySetInnerHTML={{ __html: propertyLang(filmDetail, 'story').replaceAll("<p></p>", "<br />").replaceAll("\n", "<br />") }}>
      </div>
    </div>
  );
};

export default React.memo(BasicInfomation);
