import React from 'react';
import { Badge } from 'react-bootstrap';
import useTabCount from '../../hooks/TabCounter.hooks';

const TabCounter: React.FC = () => {
  const tabCount = useTabCount();

  return (
    <Badge pill bg="success">
      Open Tabs: {tabCount}
    </Badge>
  );
};

export default TabCounter;
