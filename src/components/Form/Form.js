import React, { useState } from 'react';
import { Input } from '../';
import { checkValidity } from '../../util/validation';

const Form = (props) => {

    const [form, setForm] = useState(props.form);
    const formKeys = Object.keys(props.form);
        
    const formHandler = (e) => {
        e.preventDefault();

        let isFormValid = true, 
            errors = {},
            data = {};
        
        formKeys.forEach( key => {

            console.log(form[key]);
            
            const { value, validation } = form[key];

            const hasErrors = checkValidity(key, value, validation); //either returns false or object with error message
            if (hasErrors) {
                isFormValid = false;
                errors = {...errors, ...hasErrors}
            } else {
                data = {...data, [key]: value}
            }
        });

        if(isFormValid) props.onSubmit(data);
        else props.onError(errors);
    };

    const inputChanged = (event) => {
        setForm({
            ...form,
            [event.target.name]: {
                ...form[event.target.name],
                value: event.target.value
            }
        }
        )
    }

    return (
        <form onSubmit={formHandler}>
            { formKeys.map(key => {
                const { label, inputType, config, value, labelCaption } = form[key];

                return (
                    <Input
                        key={key}
                        label={label}
                        inputType={inputType}
                        config={config}
                        value={value}
                        labelCaption={labelCaption}
                        onChange={inputChanged}
                        onClick={() => {}}
                        error={props.error && props.error[key]}
                        disabled={props.disabled}
                    />
                )
            })}

            {props.children}
        </form>
    )
}

export default Form;
