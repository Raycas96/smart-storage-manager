import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';

interface CopyIconType {
  text: string;
}

const CopyIcon: React.FC<CopyIconType> = ({ text }) => {
  const [show, setShow] = useState(false);
  const copyFunction = () => {
    setShow(true);
    navigator.clipboard
      .writeText(text)
      .then(() => setTimeout(() => setShow(false), 1000));
  };
  return (
    <Tooltip
      PopperProps={{
        disablePortal: true,
      }}
      open={show}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title="Text copied succesfully!"
      arrow
    >
      <FileCopyIcon
        className="icon"
        onClick={() => copyFunction()}
        sx={{ cursor: 'pointer' }}
      />
    </Tooltip>
  );
};

export default CopyIcon;
