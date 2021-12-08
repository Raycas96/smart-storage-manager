import React from 'react';
import { Badge } from 'react-bootstrap';
import { StorageEnum } from '../../enums/storage.enum';
import useStorageItemCounter from '../../hooks/StorageItemCounter.hook';

const StorageItemCounter: React.FC<{ type: string }> = ({ type }) => {
  const storageCount = useStorageItemCounter();
  return (
    <Badge pill bg="success" className="w-100">
      {type === StorageEnum.LOCAL ? 'Local' : 'Session'} Storage Total Items:
      {storageCount[type]}
    </Badge>
  );
};

export default StorageItemCounter;
