/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
import React, { useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

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
            <i
                title="Copy"
                className="bi bi-clipboard-plus icon"
                onClick={() => copyFunction()}
                ref={target}
            />
            <Overlay target={target.current} show={show} placement="right">
                {() => (
                    <Tooltip id="overlay-example" style={{ zIndex: 100 }}>
                        Text copied succesfully!
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
};

export default CopyIcon;
