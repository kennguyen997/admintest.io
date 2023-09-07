import React, { FC } from 'react';
import { Input, InputProps } from 'antd';

interface Prop extends InputProps {
  errorMessage?: string;
  label?: string;
}

const InputForm: FC<Prop> = ({ errorMessage, ...props }) => {
  return (
    <>
      <Input
        status={errorMessage ? 'error' : ''}
        {...props}
        className={`className input_ant_ct w-100 ${props.className}`}
      />
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
    </>
  );
};

export default InputForm;
