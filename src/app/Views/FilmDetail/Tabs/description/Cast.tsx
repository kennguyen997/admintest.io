import React from 'react';
import { useTranslation } from 'react-i18next';
import { common } from 'app/trans';
import Loading from 'components/loading';
import { Space } from 'antd';
import { propertyLang } from 'assets/propertyLang';
import LazyImage from 'components/lazyLoadImage';

type Props = {
  dataDetailSeason: any;
  width: number;
  //   selectEpsiodeFilm: number;
};

type CastTablePros = {
  funcInfomation: Array<any>;
  width: number;
  //   selectEpsiodeFilm: number;
};

const CastTable = function ({funcInfomation, width} : CastTablePros) {

  const newArr : Array<any> = [];
  let row = 0;
  for(let i =0; i< funcInfomation.length; i++) {
    if(!newArr[row]) {
      newArr[row] = [];
    }
    newArr[row].push(funcInfomation[i]);
    if(i != 0 && i % 2 == 1) {
      row++;
    }
  }
  
  return (<table>
    {
      newArr.map((col, idx) => {
        const rowData = col.map((c: any, idx2: number) => {
          return (<td key={idx2} className="content_detail_production_child">
                    <div className="title">{propertyLang(
                          c,
                          'name',
                        )}</div>
                    <div className="content">
                      {!c && <Loading />}
                      {propertyLang(
                          c,
                          'data',
                        )}
                    </div>
                  </td>)
        })       
        return (<tr key={idx} className="content_detail_production">{rowData}</tr>)
      })
    }
  </table>);
}

const Cast = function ({ dataDetailSeason, width }: Props) {
  const [t] = useTranslation();

  return (
    <div>
      <div className="desciption_cast">
        <div>
          <div className="desciption_cast_title">{t(common.cast)}</div>
          <Space size={width > 768 ? 20 : 12} className="show_desciption_cast">
            {!dataDetailSeason && <Loading />}
            {dataDetailSeason?.programParticipants?.map((el: any) => {
              return (
                <Space
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                  key={el._id}
                >
                  <LazyImage src={el.avatar} alt="caster" className="image_avatar" />
                  <div
                    style={{
                      width: '100%',
                    }}
                  >
                    <div className="name_actor">
                      {propertyLang(el, 'dataNameActor') || t(common.noInformation)}
                    </div>
                    <div className="name_character">
                      {propertyLang(el, 'dataNameCharacter') || t(common.noInformation)}
                    </div>
                  </div>
                </Space>
              );
            })}
          </Space>
        </div>
        <div style={{ paddingTop: 78 }}>
          <div className="desciption_cast_title">{t(common.storyline)}</div>
          {
            !dataDetailSeason 
              ? <div className="content_storyline"><Loading /></div> 
              : <div className="content_storyline" dangerouslySetInnerHTML={{ __html: propertyLang(dataDetailSeason, 'story').replaceAll("\n", "<br>") }}></div>
          }
        </div>
        <div style={{ padding: ' 78px 0' }}>
          <div className="desciption_cast_title">{t(common.crew)}</div>
          {dataDetailSeason?.productInformation && <CastTable funcInfomation={dataDetailSeason?.productInformation} width={width} ></CastTable>}
        </div>
      </div>
    </div>
  );
};

export default Cast;
