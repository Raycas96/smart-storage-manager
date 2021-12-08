import React from 'react';
import { PageType } from '../types/PageType';

const useTabName = () => {
  const [tabsName, setTabsName] = React.useState<PageType[]>([] as PageType[]);

  React.useEffect(
    () =>
      chrome.tabs.query({}, (foundTabs) => {
        setTabsName(
          foundTabs.map((tab) => ({
            id: tab.id || 0,
            name: tab.title || '',
          }))
        );
      }),
    []
  );

  return tabsName;
};

export default useTabName;
