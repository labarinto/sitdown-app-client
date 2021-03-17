import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {

    let buttonClasses = [classes.button];
    props.className && buttonClasses.push(props.className);
    
    props.white && buttonClasses.push(classes.white);
    props.primary && buttonClasses.push(classes.primary);
    props.fullWidth && buttonClasses.push(classes.fullWidth);

    // font sizes
    let fontSizeClass = classes.font20;
    if (props.fontSize === 's') fontSizeClass = classes.font16;
    if (props.fontSize === 'xs') fontSizeClass = classes.font12;
    buttonClasses.push(fontSizeClass);

    return (
        <button className={buttonClasses.join(' ')} onClick={props.onClick} ref={props.buttonRef}>
            {props.children}
        </button>
    )
}

export default Button;