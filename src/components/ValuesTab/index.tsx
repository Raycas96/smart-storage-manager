import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useReducer } from 'react';
import useTabName from '../../hooks/PagesNameGetter.hook';
import useStorageValues from '../../hooks/StorageGetter.hook';
import { DispatchType } from '../../types/DispatchType';
import { PageType } from '../../types/PageType';
import { StorageType, StoreStorageType } from '../../types/Storage.type';
import DebouncedInput from '../DebouncedInput';
import ItemCard from './components/ItemCard';
import TabSelect from './components/SelectTab';
import SelectType from './components/SelectType';
import { TypeSelect } from './enums/TypeSelect.enum';
import { ValuesTabReducerType } from './types/ValuesTabReducerType';
import styles from './ValuesTab.module.css';

const reducer = (
  state: ValuesTabReducerType,
  action: DispatchType<string | number>
): ValuesTabReducerType => {
  switch (action.type) {
    case TypeSelect.TYPE:
      return { ...state, type: action.payload as string };
    case TypeSelect.TAB:
      return { ...state, tabId: action.payload as number };
    case TypeSelect.SEARCH:
      return { ...state, searchText: action.payload as string };
    default:
      return state;
  }
};

const getValues = (
  selectedOption: ValuesTabReducerType,
  storageValue: StoreStorageType
): StorageType[] => {
  if (selectedOption.type === '1') {
    return storageValue.local
      .concat(storageValue.session)
      .filter(
        (value) =>
          value.tabId === selectedOption.tabId &&
          value.key
            .toLowerCase()
            .includes(selectedOption.searchText.toLowerCase())
      );
  }
  if (selectedOption.type === '2') {
    return storageValue.local.filter(
      (value) =>
        value.tabId === selectedOption.tabId &&
        value.key
          .toLowerCase()
          .includes(selectedOption.searchText.toLowerCase())
    );
  }

  return storageValue.session.filter(
    (value) =>
      value.tabId === selectedOption.tabId &&
      value.key.toLowerCase().includes(selectedOption.searchText.toLowerCase())
  );
};

const ValuesTab: React.FC = () => {
  const storageValue: StoreStorageType = useStorageValues();
  const windowPagesName: PageType[] = useTabName();
  const [selectedOption, dispatch] = useReducer(reducer, {
    type: '1',
    tabId: 0,
    searchText: '',
  });

  useEffect(() => {
    chrome.tabs.query({ active: true }, (tabs) => {
      dispatch({
        payload: tabs[0]?.id?.toString() || '0',
        type: TypeSelect.TAB,
      });
    });
  }, []);

  const values: StorageType[] = getValues(selectedOption, storageValue);

  return (
    <Box className={styles.pageContainer} sx={{ mt: 3, pb: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6} xl={6} lg={6} sm={6} md={6}>
          <SelectType dispatch={dispatch} initialValue={selectedOption.type} />
        </Grid>
        <Grid item xs={6} xl={6} lg={6} sm={6} md={6}>
          <TabSelect
            windowPagesName={windowPagesName}
            value={selectedOption.tabId}
            dispatch={dispatch}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mb: 2, mt: 2 }}>
        <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
          <DebouncedInput
            action={(payload) => dispatch({ type: TypeSelect.SEARCH, payload })}
            placeholder="Search Key..."
          />
        </Grid>
      </Grid>
      {!!values.length ? (
        <div className={`${styles.cardContainer}`}>
          {values.map(({ key, value, tabId }) => (
            <ItemCard key={key} value={value} storeKey={key} tabId={tabId} />
          ))}
        </div>
      ) : (
        <Grid container>
          <Grid item sx={{ textAlign: 'center', width: '100%' }}>
            <p>No Item Found</p>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ValuesTab;
