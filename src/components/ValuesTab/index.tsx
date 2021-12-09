import React, { useEffect, useReducer } from 'react';
import { Col, Row } from 'react-bootstrap';
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
  action: DispatchType<string>
): ValuesTabReducerType => {
  switch (action.type) {
    case TypeSelect.TYPE:
      return { ...state, type: action.payload };
    case TypeSelect.TAB:
      return { ...state, tabId: action.payload };
    case TypeSelect.SEARCH:
      return { ...state, searchText: action.payload };
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
          value.tabId === parseInt(selectedOption.tabId, 10) &&
          value.key
            .toLowerCase()
            .includes(selectedOption.searchText.toLowerCase())
      );
  }
  if (selectedOption.type === '2') {
    return storageValue.local.filter(
      (value) =>
        value.tabId === parseInt(selectedOption.tabId, 10) &&
        value.key
          .toLowerCase()
          .includes(selectedOption.searchText.toLowerCase())
    );
  }

  return storageValue.session.filter(
    (value) =>
      value.tabId === parseInt(selectedOption.tabId, 10) &&
      value.key.toLowerCase().includes(selectedOption.searchText.toLowerCase())
  );
};

const ValuesTab: React.FC = () => {
  const storageValue: StoreStorageType = useStorageValues();
  const windowPagesName: PageType[] = useTabName();
  const [selectedOption, dispatch] = useReducer(reducer, {
    type: '1',
    tabId: '0',
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
    <div className={`container-fluid pb-2 ${styles.pageContainer}`}>
      <SelectType dispatch={dispatch} initialValue={selectedOption.type} />
      <TabSelect
        windowPagesName={windowPagesName}
        initialValue={selectedOption.tabId}
        dispatch={dispatch}
      />
      <Row className="mb-4">
        <Col xs={3} xl={3} lg={3} sm={3} md={3}>
          <span>Search: </span>
        </Col>
        <Col xs={9} xl={9} lg={9} sm={9} md={9}>
          <DebouncedInput
            action={(payload) => dispatch({ type: TypeSelect.SEARCH, payload })}
            placeholder="Search Key..."
          />
        </Col>
      </Row>
      {!!values.length ? (
        <div className={`${styles.cardContainer}`}>
          {values.map(({ key, value }) => (
            <ItemCard key={key} value={value} storeKey={key} />
          ))}
        </div>
      ) : (
        <Row>
          <Col className="text-center">
            <p>No Item Found</p>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ValuesTab;
