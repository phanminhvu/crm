import React from 'react';
import { Select } from 'antd';

interface TypeSelectProps {
  value?: boolean;
  placeholder?: string;
  onChange?: (value: boolean) => void;
}

const TypeSelect: React.FC<TypeSelectProps> = (props) => {
  const { value, ...attr } = props;

  return (
    <Select value={value === undefined ? false : value} {...attr} allowClear>
      <Select.Option value='false'>Hoạt động</Select.Option>
      <Select.Option value='true'>Khóa</Select.Option>
    </Select>
  );
};

export default TypeSelect;
