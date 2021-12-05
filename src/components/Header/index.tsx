import { Col, Row } from 'react-bootstrap';
import React from 'react';
import TabCounter from '../TabCounter';

const Header: React.FC = () => (
    <div className="container-fluid mb-2">
        <Row>
            <Col xs={4} xl={4} lg={4} sm={4} md={4} />{' '}
            {/* inserire tab per quantità elementi local */}
            <Col xs={4} xl={4} lg={4} sm={4} md={4} />{' '}
            {/* inserire tab per quantità elementi session */}
            <Col xs={4} xl={4} lg={4} sm={4} md={4} className="text-right">
                <TabCounter />
            </Col>
        </Row>
    </div>
);

export default Header;
