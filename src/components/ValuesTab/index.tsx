/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
import React, { useReducer } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import useTabName from '../../hooks/PagesNameGetter.hooks';
import useStorageValues from '../../hooks/StorageGetter.hooks';
import { PageType } from '../../types/PageType';
import { StoreStorageType } from '../../types/Storage.type';
import CopyIcon from './components/copyIcon';
import { TypeSelect } from './enums/TypeSelect.enum';
import styles from './ValuesTab.module.css';

const reducer = (state: any, action: { type: string; payload: any }): any => {
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
): JSX.Element[] => {
    if (selectedOption.type === '1') {
        return storageValue.local
            .concat(storageValue.session)
            .filter(
                (value) => value.tabId === parseInt(selectedOption.tabId, 10)
            )
            .map(({ key, value }) => (
                <tr key={key}>
                    <td>
                        <CopyIcon text={value} />
                    </td>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            ));
    }
    if (selectedOption.type === '2') {
        return storageValue.local
            .filter(
                (value) => value.tabId === parseInt(selectedOption.tabId, 10)
            )
            .map(({ key, value }) => (
                <tr key={key}>
                    <td>
                        <CopyIcon text={value} />
                    </td>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            ));
    }

    return storageValue.session
        .filter((value) => value.tabId === parseInt(selectedOption.tabId, 10))
        .map(({ key, value }) => (
            <tr key={key}>
                <td>
                    <CopyIcon text={value} />
                </td>
                <td>{key}</td>
                <td>{value}</td>
            </tr>
        ));
};

const ValuesTab: React.FC = () => {
    const storageValue: StoreStorageType = useStorageValues();
    const windowPagesName: PageType[] = useTabName();
    const [selectedOption, dispatch] = useReducer(reducer, {
        type: '1',
        tabId: windowPagesName[0]?.id || 0,
    });
    return (
        <div className="container-fluid mb-2">
            <Row className="mb-2">
                <Col xs={6} xl={6} lg={6} sm={6} md={6}>
                    <select
                        className="w-100"
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
                <Col xs={6} xl={6} lg={6} sm={6} md={6}>
                    <select
                        className="w-100"
                        value={selectedOption.tab}
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
            <Table
                striped
                bordered
                hover
                variant="dark"
                className={`w-100 ${styles.valuesTable}`}
            >
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Key</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>{getValues(selectedOption, storageValue)}</tbody>
            </Table>
        </div>
    );
};

export default ValuesTab;
