import React from 'react';
import SelectForm from 'components/selectForm';
import arrayFilmList from '../../../../../components/array/arrayFilmList';

type Prop = {
  selectFilmList: number | string;
  handleChange?: any;
};

const SelectFilmList = function ({ selectFilmList, handleChange }: Prop) {
  return (
    <SelectForm option={arrayFilmList} selected={selectFilmList} handleChange={handleChange} />
  );
};

export default SelectFilmList;
