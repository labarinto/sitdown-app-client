import React, { useRef } from 'react';
import classes from './Modal.module.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, Text } from '../';

const Modal = (props) => {

    const outsideRef = useRef(null);

    const modalClasses = [classes.modal];
    props.className && modalClasses.push(props.className);
    props.isOpen && modalClasses.push(classes.show);

    const outsideClicked = (e) => {
        if (outsideRef && (outsideRef.current === e.target)) props.onClose();
    };

    return (
        <div className={modalClasses.join(' ')} ref={outsideRef} onClick={outsideClicked}>
            <Card className={classes.content}>
                <header>
                    <Text size18>{props.title}</Text>
                    <div className={classes.circle} onClick={props.onClose}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                </header>

                <div className={classes.main}>
                    {props.children}
                </div>
            </Card>
        </div>
    )
}

export default Modal;
