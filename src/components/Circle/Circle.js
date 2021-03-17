import React from 'react';
import classes from './Circle.module.scss';

const Circle = (props) => {

    const circleClasses = [classes.circle];
    props.className && circleClasses.push(props.className);

    return (
        <div className={circleClasses.join(' ')}>
            
        </div>
    )
}

export default Circle;
