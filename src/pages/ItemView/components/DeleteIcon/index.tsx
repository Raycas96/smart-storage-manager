import DeleteIconSvg from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import AskModal from '../../../../components/Modals/AskModal';
import { storage } from '../../../../types/Storage.type';
import { refreshItems } from '../../../../utils/utility';

interface DeleteIconType {
  tabId: string;
  keyValue: string;
  storageType: storage;
}

const deleteItem = (tabId: string, storageType: storage, key: string): void => {
  chrome.scripting.executeScript(
    {
      target: { tabId: parseInt(tabId, 10) || 0 },
      func: (strorageType: storage, itemKey: string) => {
        if (strorageType === 'local') {
          localStorage.removeItem(itemKey);
        } else if (storageType === 'session') {
          sessionStorage.removeItem(itemKey);
        }
      },
      args: [storageType, key],
    },
    () => {
      window.dispatchEvent(refreshItems);
    }
  );
};

const DeleteIcon: React.FC<DeleteIconType> = ({
  tabId,
  keyValue,
  storageType,
}) => {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <AskModal
        text={`Are You sure about deleting the item with Key: ${keyValue}?`}
        action={() => deleteItem(tabId, storageType, keyValue)}
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
