import DeleteIconSvg from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import AskModal from '../../../Modals/AskModal';

interface DeleteIconType {
  tabId: number;
  keyValue: string;
}

const DeleteIcon: React.FC<DeleteIconType> = ({ tabId, keyValue }) => {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <AskModal
        text={`Are You sure about deleting the item with Key: ${keyValue}?`}
        action={() => tabId}
        setShow={setShow}
        show={show}
      />
      <DeleteIconSvg
        className="icon"
        onClick={() => setShow(true)}
        sx={{ cursor: 'pointer' }}
      />
    </Box>
  );
};

export default DeleteIcon;
