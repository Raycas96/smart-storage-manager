import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { DispatchType } from '../../../../types/DispatchType';
import { TypeSelect } from '../../enums/TypeSelect.enum';

const SelectType: React.FC<{
  dispatch: (payload: DispatchType<string>) => void;
  initialValue: string;
}> = ({ dispatch, initialValue }) => (
  <Row className="mb-2 text-left">
    <Col xs={3} xl={3} lg={3} sm={3} md={3}>
      <span>Storage Type: </span>
    </Col>
    <Col xs={9} xl={9} lg={9} sm={9} md={9}>
      <select
        className="w-100 form-select form-select-sm"
        value={initialValue}
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
);

export default SelectType;
