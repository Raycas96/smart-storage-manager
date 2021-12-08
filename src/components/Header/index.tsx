import { Col, Row } from 'react-bootstrap';
import React from 'react';
import TabCounter from '../TabCounter';
import StorageCounter from '../StorageItemCounter';
import { StorageEnum } from '../../enums/storage.enum';

const Header: React.FC = () => (
  <div className="container-fluid mb-2">
    <Row>
      <Col xs={4} xl={4} lg={4} sm={4} md={4}>
        <StorageCounter type={StorageEnum.LOCAL} />
      </Col>
      <Col xs={4} xl={4} lg={4} sm={4} md={4}>
        <StorageCounter type={StorageEnum.SESSION} />
      </Col>
      <Col xs={4} xl={4} lg={4} sm={4} md={4} className="text-right">
        <TabCounter />
      </Col>
    </Row>
  </div>
);

export default Header;
