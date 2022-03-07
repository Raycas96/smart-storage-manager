import React from 'react';
import { StorageType } from '../types/Storage.type';

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

const getStorageValues = (
  setStorageValue: (storageValue: StorageType[]) => void,
  tabId: string
): void => {
  let storageValues: StorageType[] = [];
  if (parseInt(tabId, 10) > 0) {
    chrome.scripting.executeScript(
      {
        target: { tabId: parseInt(tabId, 10) || 0 },
        func: accesWindowStorage,
        args: [parseInt(tabId, 10) || 0],
      },
      (res) => {
        storageValues = storageValues.concat(
          res && res.length && res[0].result ? res[0].result : []
        );
        setStorageValue(storageValues);
      }
    );
  }
};

const useStorageValues = (tabId: string) => {
  const [storageValue, setStorageValue] = React.useState<StorageType[]>([]);

  React.useEffect(() => {
    window.addEventListener('refresh', () =>
      getStorageValues(setStorageValue, tabId));

    getStorageValues(setStorageValue, tabId);

    return window.removeEventListener('refresh', () =>
      getStorageValues(setStorageValue, tabId));
  }, [tabId]);

  return storageValue;
};

export default useStorageValues;
