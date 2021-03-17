import React from 'react';
import classes from './Input.module.scss';
import { Text, TextEditor, MemberSelect} from '../';

const Input = (props) => {

    let input,
        inputClasses = [classes.inputElem];
    
    !props.isValid && inputClasses.push(classes.invalid);
    props.disabled && inputClasses.push(classes.disabled);
    props.error && inputClasses.push(classes.inputError);

    switch (props.inputType) {
        case('input'):
            input = <input
                className={inputClasses.join(' ')}
                {...props.config}
                value={props.value}
                onChange={props.onChange}
                onClick={props.onClick}
                disabled={props.disabled}
            />;
            break;
        case('text-editor'):
            input = <TextEditor 
                onChange={props.onChange}
                value={props.value}
                editorState={props.editorState}
            />;
            break;
        case('member-select'):
            input = <MemberSelect 
                value={props.value}
                onChange={props.onChange}
            />;
            break;
        case('select'):
            input = <select 
                className={inputClasses.join(' ')} 
                value={props.value}
                name={props.config.name} 
                onChange={props.onChange}
                disabled={props.disabled}
            >
                {props.config.options.map( option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>;
            break;
        default:
            input = <input
                className={inputClasses.join(' ')}
                {...props.config}
                value={props.value}
                onChange={props.onChange}
                onClick={props.onClick}
                // onChange, onBlur, onClick, ref
            />

    }

    return (
        <div className={classes.input}>
            <div className={props.label && classes.flexRow}>
                {props.label && 
                    <Text padB5>
                        {props.label} {props.labelCaption && 
                            <Text type="span" size12 opac60>{props.labelCaption}</Text>}
                    </Text>
                }
                <div className={classes.error}>{props.error}</div>
            </div>
            {input}
        </div>
    )

}

export default Input;