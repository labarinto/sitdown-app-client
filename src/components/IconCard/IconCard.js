import React from 'react';
import classes from './IconCard.module.scss';

const IconCard = (props) => {
    return (
        <div className={classes.container}>
            <div className={`${classes.iconCard} ${classes.active}`}>
                <div className={classes.square} />
                <div className={classes.square} />
                <div className={classes.square} />
                <div className={classes.square} />
            </div>
        </div>
    )
}

export default IconCard;
