import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import React from 'react';
import { AskModalType } from './AskModalType';

const AskModal: React.FC<AskModalType> = ({ show, text, action, setShow }) => {
  const handleClose = (result: boolean) => {
    if (result) {
      action();
    }
    setShow(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            mb: 2,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: 'medium' }}>{text}</Typography>
          <Stack
            spacing={2}
            direction="row"
            sx={{ justifyContent: 'center', mt: 2 }}
          >
            <Button
              size="small"
              sx={{ backgroundColor: '#e2fbf9', color: 'black' }}
              onClick={() => handleClose(false)}
            >
              No
            </Button>
            <Button
              size="small"
              sx={{ backgroundColor: '#eddcff', color: 'black' }}
              onClick={() => handleClose(true)}
            >
              Yes
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AskModal;
