import React, { FC } from 'react';
import { Select, SelectProps } from 'antd';

interface Prop extends SelectProps {
  errorMessage?: string;
  name: string;
  label?: string;
}

const SelectForm: FC<Prop> = ({ errorMessage, children, ...props }) => {
  return (
    <>
      <Select status={errorMessage ? 'error' : ''} {...props}>
        {children}
      </Select>
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
    </>
  );
};

export default SelectForm;
