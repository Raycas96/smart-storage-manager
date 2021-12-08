import React from 'react';
import { StorageType, StoreStorageType } from '../types/Storage.type';

/** Script injected inside the background page
 * it takes all the values from local or session storage
 * based on the args
 */
const accesWindowStorage = (id: number) => {
  const storageValues: StoreStorageType = {
    local: [] as StorageType[],
    session: [] as StorageType[],
  } as StoreStorageType;

  const localKeys = Object.keys(localStorage);
  const sessionKeys = Object.keys(sessionStorage);

  let localStorageLength = localKeys.length;
  let sessionStorageLength = sessionKeys.length;

  while (localStorageLength) {
    storageValues.local.push({
      key: localKeys[localStorageLength - 1],
      value: localStorage.getItem(localKeys[localStorageLength - 1]) || '',
      tabId: id,
    });
    localStorageLength -= 1;
  }

  while (sessionStorageLength) {
    storageValues.session.push({
      key: sessionKeys[sessionStorageLength - 1],
      value:
        sessionStorage.getItem(sessionKeys[sessionStorageLength - 1]) || '',
      tabId: id,
    });
    sessionStorageLength -= 1;
  }
  return storageValues;
};

const getStorageValues = (
  setStorageValue: (storageValue: StoreStorageType) => void
): void => {
  const storageValues: StoreStorageType = {
    local: [],
    session: [],
  } as StoreStorageType;
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
          storageValues.local = storageValues.local.concat(
            res && res.length ? res[0].result?.local : []
          );

          storageValues.session = storageValues.session.concat(
            res && res.length ? res[0].result?.session : []
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
  const [storageValue, setStorageValue] = React.useState<StoreStorageType>({
    local: [],
    session: [],
  } as StoreStorageType);

  React.useEffect(() => getStorageValues(setStorageValue), []);

  return storageValue;
};

export default useStorageValues;
