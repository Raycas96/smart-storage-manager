import React from 'react';
import { StorageLengthType } from '../types/Storage.type';

/** Script injected inside the background page
 * it takes all the values from local or session storage
 * based on the args
 */
const accesWindowStorage = (): StorageLengthType => ({
  local: Object.keys(localStorage).length,
  session: Object.keys(sessionStorage).length,
});

const getStorageLengthValues = (
  setStorageValue: (storageLengthValues: StorageLengthType) => void
): void => {
  const storageLengthValues: StorageLengthType = {
    local: 0,
    session: 0,
  };
  // Get all the tabs
  chrome.tabs.query({}, (tabs) => {
    let counter = 0;
    tabs.forEach((tab) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id || 0 },
          func: accesWindowStorage,
        },
        (res) => {
          storageLengthValues.local +=
            res?.length && !Number.isNaN(res[0].result.local)
              ? (res[0]?.result?.local as number)
              : 0;

          storageLengthValues.session +=
            res?.length && !Number.isNaN(res[0].result.session)
              ? (res[0]?.result?.session as number)
              : 0;
          console.log('counter', counter, tabs.length);

          counter += 1;
          if (counter === tabs.length) {
            console.log('entro counter', counter, tabs.length);
            console.log('entro');
            setStorageValue(storageLengthValues);
          }
        }
      );
    });
  });
};

const useStorageItemCounter = () => {
  const [storageLengthValue, setStorageLengthValue] =
    React.useState<StorageLengthType>({
      local: 0,
      session: 0,
    });

  React.useEffect(() => {
    getStorageLengthValues(setStorageLengthValue);

    window.addEventListener('refresh', () =>
      getStorageLengthValues(setStorageLengthValue));

    return window.removeEventListener('refresh', () =>
      getStorageLengthValues(setStorageLengthValue));
  }, []);

  return storageLengthValue;
};

export default useStorageItemCounter;
