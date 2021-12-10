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
      storage: 'Local Storage',
    });
    localStorageLength -= 1;
  }

  while (sessionStorageLength) {
    storageValues.push({
      key: sessionKeys[sessionStorageLength - 1],
      value:
        sessionStorage.getItem(sessionKeys[sessionStorageLength - 1]) || '',
      tabId: id.toString(),
      storage: 'Session Storage',
    });
    sessionStorageLength -= 1;
  }
  return storageValues;
};

const getStorageValues = (
  setStorageValue: (storageValue: StorageType[]) => void
): void => {
  let storageValues: StorageType[] = [];
  // Get all the tabs
  chrome.tabs.query({}, (tabs) => {
    let counter = 0;
    tabs.forEach((tab) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id || 0 },
          func: accesWindowStorage,
          args: [tab.id || 0],
        },
        (res) => {
          storageValues = storageValues.concat(
            res && res.length && res[0].result ? res[0].result : []
          );

          counter += 1;
          if (counter === tabs.length - 1) {
            setStorageValue(storageValues);
          }
        }
      );
    });
  });
};

const useStorageValues = () => {
  const [storageValue, setStorageValue] = React.useState<StorageType[]>([]);

  React.useEffect(() => getStorageValues(setStorageValue), []);

  return storageValue;
};

export default useStorageValues;
