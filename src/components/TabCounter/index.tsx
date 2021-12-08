import React from 'react';
import { Badge } from 'react-bootstrap';
import useTabCount from '../../hooks/TabCounter.hook';

const TabCounter: React.FC = () => {
  const tabCount = useTabCount();

  return (
    <Badge pill bg="success" className="w-100">
      Open Tabs: {tabCount}
    </Badge>
  );
};

export default TabCounter;
