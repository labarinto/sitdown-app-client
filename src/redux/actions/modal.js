import { 
    OPEN_MODAL, CLOSE_MODAL, ADD_STATUS_MODAL, EDIT_STATUS_MODAL, 
    ADD_PROJECT_MODAL, EDIT_PROJECT_MODAL, CLEAR_INPUTS_MODAL
} from '../types';

export const closeModal = (formValues) => dispatch => {
    dispatch({ type: CLOSE_MODAL, formValues });
};

export const openAddStatusModal = () => dispatch => {
    dispatch({ type: OPEN_MODAL});
    dispatch({ type: ADD_STATUS_MODAL });
};

export const openEditStatusModal = (editValues) => dispatch => {
    dispatch({ type: OPEN_MODAL});
    dispatch({ type: EDIT_STATUS_MODAL, editValues });
};

export const openAddProjectModal = () => dispatch => {
    dispatch({ type: OPEN_MODAL});
    dispatch({ type: ADD_PROJECT_MODAL });
};

export const openEditProjectModal = (editValues) => dispatch => {
    dispatch({ type: OPEN_MODAL});
    dispatch({ type: EDIT_PROJECT_MODAL, editValues });
};

export const clearModalForm = () => dispatch => {
    dispatch({ type: CLEAR_INPUTS_MODAL });
};