import { Chip } from '@mui/material';
import React from 'react';
import useTabCount from '../../hooks/TabCounter.hook';

const TabCounter: React.FC = () => {
  const tabCount = useTabCount();
  return (
    <Chip
      size="small"
      label={`Open Tabs: ${tabCount}`}
      color="success"
      sx={{ width: '100%', fontSize: 'x-small' }}
    />
  );
};

export default TabCounter;
