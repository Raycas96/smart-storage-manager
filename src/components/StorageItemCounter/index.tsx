import { Chip } from '@mui/material';
import React from 'react';
import { StorageEnum } from '../../enums/storage.enum';
import useStorageItemCounter from '../../hooks/StorageItemCounter.hook';

const StorageItemCounter: React.FC<{ type: string }> = ({ type }) => {
  const storageCount = useStorageItemCounter();
  const text = `${
    type === StorageEnum.LOCAL ? 'Local' : 'Session'
  } Storage Total Items: ${
    type === StorageEnum.LOCAL ? storageCount.local : storageCount.session
  }`;
  return (
    <Chip
      size="small"
      label={text}
      color="success"
      sx={{ width: '100%', fontSize: 'x-small' }}
    />
  );
};

export default StorageItemCounter;
