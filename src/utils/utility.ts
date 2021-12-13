import { createTheme, ThemeOptions } from '@mui/material';
import { StorageEnum } from '../enums/storage.enum';
import { storage, StorageType } from '../types/Storage.type';

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

/** Script injected inside the background page
 * it takes all the values from local or session storage
 * based on the args
 */
const accesWindowStorage = (id: number) => {
  const storageValues: StorageType[] = [];

  const localKeys = Object.keys(localStorage);
  const sessionKeys = Object.keys(sessionStorage);

  let localStorageLength = localKeys.length;
  let sessionStorageLength = sessionKeys.length;

  while (localStorageLength) {
    storageValues.push({
      key: localKeys[localStorageLength - 1],
      value: localStorage.getItem(localKeys[localStorageLength - 1]) || '',
      tabId: id.toString(),
      storage: 'local',
    });
    localStorageLength -= 1;
  }

  while (sessionStorageLength) {
    storageValues.push({
      key: sessionKeys[sessionStorageLength - 1],
      value:
        sessionStorage.getItem(sessionKeys[sessionStorageLength - 1]) || '',
      tabId: id.toString(),
      storage: 'session',
    });
    sessionStorageLength -= 1;
  }
  return storageValues;
};

export const getStorageValues = (
  tabId: string,
  setStorageValues: (values: StorageType[]) => void
): void => {
  let storageValues: StorageType[] = [];
  if (parseInt(tabId, 10) > 0) {
    chrome.scripting.executeScript(
      {
        target: { tabId: parseInt(tabId, 10) || 0 },
        func: accesWindowStorage,
        args: [parseInt(tabId, 10) || 0],
      },
      (value) => {
        storageValues = storageValues.concat(
          value && value.length && value[0].result ? value[0].result : []
        );
        setStorageValues(storageValues);
      }
    );
  } else {
    setStorageValues(storageValues);
  }
};
