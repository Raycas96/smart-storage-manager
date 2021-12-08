import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { DispatchType } from '../../../../types/DispatchType';
import { PageType } from '../../../../types/PageType';
import { TypeSelect } from '../../enums/TypeSelect.enum';

const SelectTab: React.FC<{
  dispatch: (payload: DispatchType<string>) => void;
  initialValue: string;
  windowPagesName: PageType[];
}> = ({ dispatch, initialValue, windowPagesName }) => (
  <Row className="mb-2 text-left">
    <Col xs={3} xl={3} lg={3} sm={3} md={3}>
      <span>Tab: </span>
    </Col>
    <Col xs={9} xl={9} lg={9} sm={9} md={9}>
      <select
        className="w-100 form-select form-select-sm"
        value={initialValue}
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
);

export default SelectTab;
