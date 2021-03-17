import { 
    SET_UI_ERROR, CLEAR_UI_ERROR, SHOW_MESSAGE_CONFIRM, CLEAR_MESSAGE_CONFIRM
} from '../types';


export const setUiError = (error) => dispatch => {
    dispatch({ type: SET_UI_ERROR, error })
}

export const clearUiError = () => dispatch => {
    dispatch({ type: CLEAR_UI_ERROR })
}

export const showMessage = (message) => dispatch => {
    dispatch({ type: SHOW_MESSAGE_CONFIRM, message });
    //setTimeout(() => dispatch({ type: CLEAR_MESSAGE_CONFIRM }), 5000);
}

export const clearMessage = () => dispatch => {
    dispatch({ type: CLEAR_MESSAGE_CONFIRM});
}