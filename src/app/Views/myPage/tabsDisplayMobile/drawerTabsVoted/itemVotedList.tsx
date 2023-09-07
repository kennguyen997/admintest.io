import { Space } from 'antd';
import { VotedContentType, VotedOptionType } from 'app/Models/Voted';
import { common } from 'app/trans';
import moment from 'moment';
import 'moment/locale/ko';

import React, { FC } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LinearWithValueLabel from 'components/Slider/LinearWithValueLabel';
import { propertyLang } from 'assets/propertyLang';
import i18n from 'app/trans/i18n';
moment.locale('ko');

type Prop = {
  src: string;
  data: VotedContentType;
  votedOption: VotedOptionType;
};

const ItemVotedList: FC<Prop> = ({ src, data, votedOption }) => {
  // const navigate = useNavigate();
  const [t] = useTranslation();

  return (
    <div className="flex_column voted-item" aria-hidden="true">
      <Space
        className="background-content"
        direction="vertical"
        style={{
          backgroundImage: ` linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%), url("${src}")`,
        }}
      >
        <div className="tittle-vote">{propertyLang(data, 'title')}</div>
        <div className="content-vote text-overflow-2 ">{propertyLang(data, 'content')}</div>
        <Space direction="horizontal">
          <div className="title-date-vote">
            {moment().isAfter(data.endDate) ? t(common.finished) : t(common.ongoing)}
          </div>
          <div className="content-date-vote">
            {i18n.language == 'korean'
              ? `${moment(data.endDate).locale('ko').format('MMM Do')} 까지`
              : `~ ${moment(data.endDate).locale('en').format('MM.DD')}`}
          </div>
        </Space>
      </Space>
      <div className="footer-content">
        <div className=" title-footer flex_row ">
          <div className="text-overflow-1">{`${t(common.myVote)}: ${propertyLang(
            votedOption,
            'data',
          )}`}</div>
          <div
            style={{
              color: moment().isAfter(data.endDate) ? '#0E7EE4' : '#FE9738',
            }}
          >{`${((votedOption.quantity / data.quantity) * 100).toFixed(0)}%`}</div>
        </div>
        <LinearWithValueLabel
          color={moment().isAfter(data.endDate) ? '#0E7EE4' : '#FE9738'}
          number={Number(((votedOption.quantity / data.quantity) * 100).toFixed(0))}
        />
      </div>
    </div>
  );
};

export default ItemVotedList;
