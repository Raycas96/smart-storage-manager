import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { StorageValueType } from '../../../../types/Storage.type';
import CopyIcon from '../CopyIcon';
import styles from './ItemCard.module.css';

const itemCard: React.FC<StorageValueType> = ({ storeKey: key, value }) => (
  <Card className={styles.itemCard}>
    <Card.Body className={styles.itemCard}>
      <Row>
        <Col
          xs={1}
          xl={1}
          lg={1}
          sm={1}
          md={1}
          className={styles.iconsContainer}
        >
          <CopyIcon text={value} />
        </Col>
        <Col xs={11} xl={11} lg={11} sm={11} md={11}>
          <Row>
            <Col xs={2} xl={2} lg={2} sm={2} md={2}>
              <span>Key:</span>
            </Col>
            <Col xs={10} xl={10} lg={10} sm={10} md={10}>
              {key}
            </Col>
          </Row>
          <Row>
            <Col xs={6} xl={6} lg={6} sm={6} md={6}>
              <hr className="pinkColor" />
            </Col>
          </Row>
          <Row>
            <Col xs={2} xl={2} lg={2} sm={2} md={2}>
              <span>Value:</span>
            </Col>
            <Col
              xs={10}
              xl={10}
              lg={10}
              sm={10}
              md={10}
              className={`${styles.itemValue} text-truncate`}
            >
              {value}
            </Col>
          </Row>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default itemCard;
