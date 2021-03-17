import React from 'react';
import classes from './Tooltip.module.scss';

const Tooltip = (props) => {
    return (
        <div className={classes.tooltip}>
            {props.children}
            <span className={classes.text}>{props.text}</span>
        </div>
    )
}

export default Tooltip;
