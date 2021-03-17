import { 
    AUTH_START, AUTH_SIGNIN, AUTH_LOGOUT, 
    AUTH_FAILED, CLEAR_AUTH_ERROR, UPDATE_AUTH_DETAILS
} from '../types';

const initialState = {
    isAuthenticated: false,
    credentials: {},
    isLoading: false,
    error: null,
};

const auth = (state = initialState, action) => {

    switch(action.type) {
        case AUTH_START: return { ...state, error: false, isLoading: true };
        case AUTH_SIGNIN: return { ...state, credentials: action.credentials, isAuthenticated: true, error: null, isLoading: false }
        case AUTH_FAILED: return { ...state, error: action.error, isLoading: false };
        case UPDATE_AUTH_DETAILS: return { ...state, isLoading: false, error: null, 
            credentials: {...state.credentials, ...action.newData}}
        case CLEAR_AUTH_ERROR: return { ...state, error: null };
        case AUTH_LOGOUT: return initialState;
        default: return state;
    }
};

export default auth;