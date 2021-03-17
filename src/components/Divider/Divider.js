import React from 'react';
import classes from './Divider.module.scss';
import { Text } from '../';

const Divider = (props) => {
    return (
        <div className={classes.divider}>
            <Text type="h2" size16 black2 >{props.title}</Text>
            <div className={classes.line} />
        </div>
    )
}

export default Divider;
