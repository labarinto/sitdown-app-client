import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { setUiError, postStatus, clearModalForm, 
    editStatus, postProject, editProject, showMessage, clearUiError } from '../../redux/actions';

import classes from './ModalForm.module.scss';
import { Button, Modal, Input } from '..';
import { checkValidity } from '../../util/validation';
import { formatModeToMessage } from '../../util/formatting';

const ModalForm = (props) => {

    const [form, setForm] = useState();
    const [editorState, setEditorState] = useState();
    const formKeys = Object.keys(props.form);

    const { clearUiError } = props;
    useEffect( () => {
        // FORM
        const newForm = {...props.form};
        Object.keys(props.form).forEach( key => {
            let value = '';
            if(props.formValues && props.formValues[key]) {
                value = props.formValues[key];
                //handle tags
                if(key === 'tags' && typeof value === 'object') value = Object.keys(value).join(' ');
            }
            newForm[key].value = value;
        });
        // EDITOR STATE
        let editorState = '';
        if(props.formValues.editorState) editorState = props.formValues.editorState;

        // SET STATES
        setForm(newForm);
        setEditorState(editorState);
        clearUiError();

    }, [props.form, props.mode, props.formValues, clearUiError]);

    const modalClosed = () => {
        let minForm = {}
        formKeys.forEach( key => {
            minForm = {...minForm, [key]: form[key].value }
        })
        let formValues = {...minForm, editorState: editorState}
        props.onClose(formValues);
    }

    const inputChanged = (event, editorState = null) => {
        if (!event.target) {
            if(editorState) {
                setForm({
                    ...form,
                    body: {
                        ...form.body,
                        value: event
                    }
                });
                setEditorState(editorState);
            } else setForm({
                ...form,
                teamMembers: {
                    ...form.teamMembers,
                    value: event
                }
            })
        } else setForm({
            ...form,
            [event.target.name]: {
                ...form[event.target.name],
                value: event.target.value
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let isFormValid = true, 
            errors = {},
            data = {};
        
        formKeys.forEach( key => {
            const { value, validation } = form[key];

            let formValue = value;
            if(key === 'body' && value.blocks) formValue = value.blocks[0].text; //for checking if empty

            const hasErrors = checkValidity(key, formValue, validation); //either returns false or object with error message
            if (hasErrors) {
                isFormValid = false;
                errors = {...errors, ...hasErrors}
            } else {
                if (key === 'tags') formValue = value.split(" ");
                if (key === 'body') formValue = value;
                data = {...data, [key]: formValue}
            }
        });

        if(isFormValid) {
            props.clearModalForm();
            if(props.mode === 'addStatus') props.postStatus(data, props.auth.credentials.name, props.auth.credentials.imageUrl);
            if(props.mode === 'editStatus') props.editStatus(data, props.status.statusId);
            if(props.mode === 'addProject') props.postProject(data, props.auth.credentials.name, props.auth.credentials.imageUrl);
            if(props.mode === 'editProject') props.editProject(data, props.project.projectId);
            //props.showMessage(`${formatModeToMessage(props.mode)} succesfully!`);

        } else props.setUiError(errors)
    };

    return (
        <Modal title={props.title} isOpen={props.openModal} onClose={modalClosed}>
            <form className={classes.modalForm}>

                {form && Object.keys(form).map( key => {
                    const { config, value, label, labelCaption, inputType } = form[key];

                    return <Input
                        key={key}
                        inputType={inputType}
                        config={config}
                        onChange={inputChanged}
                        value={value}
                        isSubmit={props.ui.isFormSubmitted}
                        label={`${label}*`}
                        labelCaption={labelCaption}
                        error={props.ui.error && props.ui.error[key]}
                        editorState = {editorState}
                    />
                })}

                <Button primary className={classes.button} onClick={submitHandler}>
                    {props.mode.substring(0, 3) === 'add' ? 'ADD' : 'EDIT'}
                </Button>
            </form>
        </Modal>
    )
}

const mapStateToProps = state => ({
    ui: state.ui,
    status: state.status,
    auth: state.auth,
    project: state.project,
});

const mapDispatchToProps = {
    clearModalForm,
    setUiError,
    postStatus, editStatus,
    postProject, editProject,
    showMessage, clearUiError
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
