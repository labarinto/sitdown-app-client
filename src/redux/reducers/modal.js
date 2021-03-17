import { 
    OPEN_MODAL, CLOSE_MODAL, ADD_STATUS_MODAL, EDIT_STATUS_MODAL, 
    ADD_PROJECT_MODAL, EDIT_PROJECT_MODAL, CLEAR_INPUTS_MODAL
} from '../types';

import statusForm from '../../util/forms/statusForm';
import projectForm from '../../util/forms/projectForm';

const initialState = {
    isOpen: false,
    title: '',
    form: {},
    addStatus: {},
    editStatus: {},
    addProject: {},
    editProject: {},
    mode: '',
}

const modal = (state = initialState, action) => {

    switch(action.type) {
        
        case OPEN_MODAL: return { ...state, isOpen: true };
        case CLOSE_MODAL: return { ...state, isOpen: false, [state.mode]: action.formValues };
        case ADD_STATUS_MODAL:
            return {
                ...state,
                title: 'Add new update',
                form: statusForm,
                mode: 'addStatus'
            }
        case EDIT_STATUS_MODAL:
            return {
                ...state,
                title: 'Edit status',
                form: statusForm,
                mode: 'editStatus',
                editStatus: {...action.editValues}
            }
        case ADD_PROJECT_MODAL:
            return {
                ...state,
                title: 'Add new project',
                form: projectForm,
                mode: 'addProject'
            }
        case EDIT_PROJECT_MODAL:
            return {
                ...state,
                title: 'Edit project',
                form: projectForm,
                mode: 'editProject',
                editProject: { ...action.editValues }
            }
        case CLEAR_INPUTS_MODAL: return { ...state, isOpen:false, [state.mode]: {}, form: {} };
        default: return state;
    }
};

export default modal;