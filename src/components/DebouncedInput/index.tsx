import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DebouncedInputType } from '../../types/DebouncedInputType';

const DebouncedInput: React.FC<DebouncedInputType> = ({
  action,
  initialValue = '',
  delay = 500,
  placeholder = '',
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      action(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleChange = ({ target: { value } }: any) => {
    setInputValue(value);
  };

  return (
    <TextField
      size="small"
      label="Search Key"
      defaultValue="Hello World"
      value={inputValue}
      onChange={(event) => handleChange(event)}
      type="text"
      placeholder={placeholder}
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ width: '100%' }}
    />
  );
};

export default DebouncedInput;
