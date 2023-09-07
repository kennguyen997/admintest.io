import React from 'react';
import { Select } from 'antd';
import { propertyLang } from 'assets/propertyLang';

type Prop = {
  option: Array<any>;
  handleChange?: (value: string | number) => void;
  selected: string | number;
  className?: string;
  dropdownClassName?: string;
};

const SelectForm = function ({
  option,
  handleChange,
  selected,
  className,
  dropdownClassName,
}: Prop) {
  if (!handleChange) {
    // handleChange = () => {};
  }

  return (
    <div className={`select_in_tabs ${className ? className : ''}`}>
      <Select value={selected} onChange={handleChange} dropdownClassName={dropdownClassName}>
        {option &&
          option.map((e) => {
            return (
              <Select.Option key={e._id} value={e._id}>
                {propertyLang(e, 'name')}
              </Select.Option>
            );
          })}
      </Select>
    </div>
  );
};

export default SelectForm;
