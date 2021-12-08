import React, { useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import styles from './CopyIcon.module.css';

interface CopyIconType {
  text: string;
}

const CopyIcon: React.FC<CopyIconType> = ({ text }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const copyFunction = () => {
    setShow(true);
    navigator.clipboard
      .writeText(text)
      .then(() => setTimeout(() => setShow(false), 1000));
  };
  return (
    <>
      <button
        type="button"
        className="btn bg-transparent"
        onClick={() => copyFunction()}
      >
        <i
          title="Copy Value"
          className={`bi bi-clipboard-plus icon ${styles.icon}`}
          ref={target}
        />
      </button>
      <Overlay target={target.current} show={show} placement="right">
        {({ arrowProps, placement, popper, ref, show: toolShow, style }) => (
          <Tooltip
            style={{ zIndex: 100, ...style }}
            arrowProps={arrowProps}
            placement={placement}
            popper={popper}
            ref={ref}
            show={toolShow}
          >
            Text copied succesfully!
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default CopyIcon;
