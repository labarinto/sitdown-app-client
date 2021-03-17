import { 
    SET_UI_ERROR, CLEAR_UI_ERROR, SHOW_MESSAGE_CONFIRM, CLEAR_MESSAGE_CONFIRM
} from '../types';


const initialState = {
    error: {},
    messageConfirm: ''
};

const ui = (state = initialState, action) => {

    switch(action.type) {
        case SET_UI_ERROR: return { ...state, error: action.error };
        case CLEAR_UI_ERROR: return { ...state, error: {} };
        case SHOW_MESSAGE_CONFIRM: return {...state, messageConfirm: action.message};
        case CLEAR_MESSAGE_CONFIRM: return { ...state, messageConfirm: ''};
        default: return state;
    }
};

export default ui;