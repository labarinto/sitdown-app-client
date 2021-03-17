import { 
    SET_STATUSES, SET_STATUS, EDIT_STATUS, DELETE_STATUS,
    POST_STATUS, SET_TAGS, STATUS_START, SET_STATUS_ID, SET_FILTERED_STATUS
} from '../types';

const initialState = {
    statuses: [],
    filteredStatus: [],
    status: {},
    isLoading: false,
    cfmMessage: '',
    statusId: '',
    tags: [],
    error: null,   
}
const status = (state = initialState, action) => {

    switch(action.type) {
        case STATUS_START: return { ...state, isLoading: true };
        case SET_STATUSES: return { ...state, statuses: action.statuses, isLoading: false};
        case SET_STATUS: return { ...state, status: action.status, isLoading: false}
        case SET_STATUS_ID: return { ...state, statusId: action.statusId }
        case POST_STATUS: 
            state.statuses.unshift(action.status);
            return { ...state, cfmMessage: 'Status updated!', isLoading: false};
        case EDIT_STATUS:
            const indexToEdit = state.statuses.findIndex(status => status.statusId === action.statusId);
            state.statuses[indexToEdit] = {...state.statuses[indexToEdit], ...action.updatedStatus};
            return { ...state, cfmMessage: 'Status edited succesfully!', isLoading: false};
        case DELETE_STATUS:
            const indexToDelete = state.statuses
                .findIndex(status => status.statusId === action.statusId);
            state.statuses.splice(indexToDelete, 1);
            return { ...state, cfmMessage: 'Status deleted successfully!', isLoading: false };
        case SET_TAGS: 
            return {...state, tags: action.tags, isLoading: false };
        case SET_FILTERED_STATUS:
            return {...state, filteredStatus: action.filteredStatus, isLoading: false };
        default: return state;
    }
};

export default status;