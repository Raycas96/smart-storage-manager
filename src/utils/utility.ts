import { createTheme, ThemeOptions } from '@mui/material';
import { StorageEnum } from '../enums/storage.enum';
import { storage } from '../types/Storage.type';

export const getStorageDescription = (type: storage): string => {
  let sentence = '';
  if (type === StorageEnum.LOCAL) {
    sentence = 'Local Storage';
  } else if (type === StorageEnum.SESSION) {
    sentence = 'Session Storage';
  } else if (type === StorageEnum.COOKIES) {
    sentence = 'Session Storage';
  }
  return sentence;
};

export const themeOptions: ThemeOptions = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffedfe',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffedfe',
            },
            '&:hover fieldset': {
              borderColor: '#eddcff',
              borderWidth: '0.15rem',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          root: {
            '& .MuiInput-underline:after': {
              borderBottomColor: '#ffedfe',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ffedfe',
              },
              '&:hover fieldset': {
                borderColor: '#eddcff',
                borderWidth: '0.15rem',
              },
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInput-underline:after': {
            borderBottomColor: '#ffedfe',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ffedfe',
            },
            '&:hover fieldset': {
              borderColor: '#eddcff',
              borderWidth: '0.15rem',
            },
          },
          '& svg': {
            color: '#ffedfe',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#eddcff',
      dark: '#eddcff',
      light: '#ffedfe',
      contrastText: '#e2fbf9',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: 'rgb(36, 36, 36)',
      paper: 'rgb(36, 36, 36)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffedfe',
      disabled: '#f5f5f5',
    },
    divider: '#eddcff',
  },
});
