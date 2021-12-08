import React, { useEffect, useState } from 'react';
import { DebouncedInputType } from '../../types/DebouncedInputType';

const DebouncedInput: React.FC<DebouncedInputType> = ({
  action,
  initialValue = '',
  delay = 500,
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
    <input
      className="form-control form-control-sm w-100"
      value={inputValue}
      onChange={(event) => handleChange(event)}
    />
  );
};

export default DebouncedInput;
