import React from 'react';
import SelectForm from 'components/selectForm';

type Prop = {
  selectCategory: string;
  setSelectCategory: any;
  handleChange?: any;
  optionSelectCategory: Array<any>;
};

const SelectCategory = function ({ selectCategory, handleChange, optionSelectCategory }: Prop) {
  return (
    <div className="select_in_tabs">
      <SelectForm
        option={optionSelectCategory}
        selected={selectCategory}
        handleChange={handleChange}
      />
    </div>
  );
};

export default SelectCategory;
