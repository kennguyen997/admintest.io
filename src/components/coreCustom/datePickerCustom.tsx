import React, { FC } from 'react';
import { DatePickerProps, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ko_KR';
import i18n from 'app/trans/i18n';
import 'moment/locale/ko';

type Props = {
  placeholderBlack?: boolean;
} & DatePickerProps;

const DatePickerCustom: FC<Props> = (props) => {
  return (
    <DatePicker
      {...props}
      locale={i18n.language === 'korean' ? locale : undefined}
      className={`input_ant_ct w-100 ${props.className || ''} ${
        props.placeholderBlack ? 'placeholder_black' : ''
      }`}
      suffixIcon={<div className="icon_down" />}
    />
  );
};

export default DatePickerCustom;
