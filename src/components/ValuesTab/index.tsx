import React, { useEffect, useReducer } from 'react';
import { Col, Row } from 'react-bootstrap';
import useTabName from '../../hooks/PagesNameGetter.hook';
import useStorageValues from '../../hooks/StorageGetter.hook';
import { PageType } from '../../types/PageType';
import { StorageType, StoreStorageType } from '../../types/Storage.type';
import ItemCard from './components/ItemCard';
import { TypeSelect } from './enums/TypeSelect.enum';
import styles from './ValuesTab.module.css';

const reducer = (
  state: { tabId: string; type: string },
  action: { type: string; payload: any }
): { tabId: string; type: string } => {
  switch (action.type) {
    case TypeSelect.TYPE:
      return { ...state, type: action.payload };
    case TypeSelect.TAB:
      return { ...state, tabId: action.payload };
    default:
      return state;
  }
};

const getValues = (
  selectedOption: { tabId: string; type: string },
  storageValue: StoreStorageType
): StorageType[] => {
  if (selectedOption.type === '1') {
    return storageValue.local
      .concat(storageValue.session)
      .filter((value) => value.tabId === parseInt(selectedOption.tabId, 10));
  }
  if (selectedOption.type === '2') {
    return storageValue.local.filter(
      (value) => value.tabId === parseInt(selectedOption.tabId, 10)
    );
  }

  return storageValue.session.filter(
    (value) => value.tabId === parseInt(selectedOption.tabId, 10)
  );
};

const ValuesTab: React.FC = () => {
  const storageValue: StoreStorageType = useStorageValues();
  const windowPagesName: PageType[] = useTabName();
  const [selectedOption, dispatch] = useReducer(reducer, {
    type: '1',
    tabId: '0',
  });

  useEffect(() => {
    chrome.tabs.query({ active: true }, (tabs) => {
      dispatch({ payload: tabs[0].id, type: TypeSelect.TAB });
    });
  }, []);

  const values: StorageType[] = getValues(selectedOption, storageValue);

  return (
    <div className={`container-fluid pb-2 ${styles.pageContainer}`}>
      <Row className="mb-2 text-left">
        <Col xs={3} xl={3} lg={3} sm={3} md={3}>
          <span>Storage Type: </span>
        </Col>
        <Col xs={9} xl={9} lg={9} sm={9} md={9}>
          <select
            className="w-100 form-select form-select-sm"
            value={selectedOption.type}
            onChange={(e) =>
              dispatch({
                type: TypeSelect.TYPE,
                payload: e.target.value,
              })
            }
          >
            <option value="1">Both</option>
            <option value="2">Local Storage</option>
            <option value="3">Session Storage</option>
          </select>
        </Col>
      </Row>
      <Row className="mb-2 text-left">
        <Col xs={3} xl={3} lg={3} sm={3} md={3}>
          <span>Tab: </span>
        </Col>
        <Col xs={9} xl={9} lg={9} sm={9} md={9}>
          <select
            className="w-100 form-select form-select-sm"
            value={selectedOption.tabId}
            onChange={(e) =>
              dispatch({
                type: TypeSelect.TAB,
                payload: e.target.value,
              })
            }
          >
            {windowPagesName.map(({ name, id }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <div className={`${styles.cardContainer}`}>
        {values.map(({ key, value }) => (
          <ItemCard key={key} value={value} storeKey={key} />
        ))}
      </div>
    </div>
  );
};

export default ValuesTab;
