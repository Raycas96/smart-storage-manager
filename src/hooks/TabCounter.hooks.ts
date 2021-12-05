import React from 'react';

const useTabCount = () => {
  const [tabCount, setTabCount] = React.useState<number>(1);

  React.useEffect(
    () => chrome.tabs.query({}, (foundTabs) => setTabCount(foundTabs.length)),
    [],
  );

  React.useEffect(() => {
    chrome.tabs.onCreated.addListener(() => setTabCount(tabCount + 1));
    chrome.tabs.onRemoved.addListener(() => setTabCount(tabCount - 1));

    return () => {
      chrome.tabs.onCreated.removeListener(() => true);
      chrome.tabs.onRemoved.removeListener(() => true);
    };
  });

  return tabCount;
};

export default useTabCount;
