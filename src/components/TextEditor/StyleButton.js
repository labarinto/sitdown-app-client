import React from 'react';
import './TextEditor.css';

const StyleButton = (props) => {

    const onToggle = (e) => {
        e.preventDefault(e);
        props.onToggle(props.style);
    };

    let className = 'RichEditor-styleButton';
    if (props.active) className += ' RichEditor-activeButton';

    return (
        <span className={className} onMouseDown={onToggle}>
            {props.label}
        </span>
    );
};

export default StyleButton;
