import React from 'react';
import classes from './Text.module.scss';

const Text = (props) => {

    let text, 
        tc = []; //textClasses 

    //passed on class
    props.className && tc.push(props.className);
    //padding
    props.padY5 && tc.push(classes.padY5);
    props.padY10 && tc.push(classes.padY10);
    props.padY15 && tc.push(classes.padY15);
    props.padX5 && tc.push(classes.padX5);
    props.padX10 && tc.push(classes.padX10);
    props.padX15 && tc.push(classes.padX15);
    props.padL5 && tc.push(classes.padL5);
    props.padL10 && tc.push(classes.padL10);
    props.padL15 && tc.push(classes.padL15);
    props.padB5 && tc.push(classes.padB5);
    props.padB10 && tc.push(classes.padB10);
    props.padB15 && tc.push(classes.padB15);
    //font size
    props.size12 && tc.push(classes.size12);
    //props.size14 && tc.push(classes.size14);
    props.size16 && tc.push(classes.size16);
    props.size18 && tc.push(classes.size18);
    props.size20 && tc.push(classes.size20);
    props.size24 && tc.push(classes.size24);
    //font weight
    props.light && tc.push(classes.light);
    props.medium && tc.push(classes.medium);
    props.bold && tc.push(classes.bold);
    props.bolder && tc.push(classes.bolder);
    //opacity
    props.opac90 && tc.push(classes.opac90);
    props.opac80 && tc.push(classes.opac80);
    props.opac70 && tc.push(classes.opac70);
    props.opac60 && tc.push(classes.opac60);
    props.opac50 && tc.push(classes.opac50);
    props.opac40 && tc.push(classes.opac40);
    //color
    props.primary && tc.push(classes.primary);
    props.tertiary && tc.push(classes.tertiary);
    props.black && tc.push(classes.black);
    props.black2 && tc.push(classes.black2);
    props.white && tc.push(classes.white);
    props.error && tc.push(classes.error);
    props.brandColor && tc.push(classes.brandColor);
    //others
    props.underline && tc.push(classes.underline);
    props.capitalise && tc.push(classes.capitalise);
    //type
    switch(props.type) {
        case 'h1': text = <h1 className={tc.join(' ')}>{props.children}</h1>; break;
        case 'h2': text = <h2 className={tc.join(' ')}>{props.children}</h2>; break;
        case 'h3': text = <h3 className={tc.join(' ')}>{props.children}</h3>; break;
        case 'h4': text = <h4 className={tc.join(' ')}>{props.children}</h4>; break;
        case 'h5': text = <h5 className={tc.join(' ')}>{props.children}</h5>; break;
        case 'h6': text = <h6 className={tc.join(' ')}>{props.children}</h6>; break;
        case 'span': text = <span className={tc.join(' ')}>{props.children}</span>; break;
        default: text = <p className={tc.join(' ')}>{props.children}</p>;
    };
    
    return text;
}

export default Text;
