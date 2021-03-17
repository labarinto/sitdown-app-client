import React from 'react';
import classes from './Card.module.scss';

const Card = (props) => {

    const cardClasses = [classes.card]
    props.className && cardClasses.push(props.className)

    return (
        <div className={cardClasses.join(' ')}>
            {props.children}
        </div>
    )
};

export default Card;