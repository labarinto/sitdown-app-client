import React from 'react';
import classes from './ModalConfirm.module.scss';

import Text from '../Text/Text';
import Button from '../Button/Button';
import Card from '../Card/Card';

const ModalConfirm = (props) => {

    return (
        <Card className={classes.modalConfirm}>
            <Text size20>{props.text}</Text>
            <Button primary onClick={props.onClose} fontSize="xs">Okay</Button>
        </Card>
    )
}

export default ModalConfirm;
