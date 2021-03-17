import axios from 'axios';
import { 
    SET_STATUSES, SET_STATUS, EDIT_STATUS, DELETE_STATUS,
    POST_STATUS, SET_TAGS, STATUS_START, SET_STATUS_ID,
    SET_STATUS_ERROR, SET_FILTERED_STATUS, SHOW_MESSAGE_CONFIRM
} from '../types';

export const getAllStatus = () => dispatch => {
    dispatch({ type: STATUS_START });
    axios.get('/statuses')
        .then( res => {
            dispatch({ type: SET_STATUSES, statuses: res.data})
        })
        .catch( e => setError(e.response.data));
};

export const getStatus = statusId => dispatch => {
    dispatch({ type: STATUS_START });
    axios.get(`/status/${statusId}`)
        .then( res => {
            dispatch({ type: SET_STATUS, status: res.data})
        })
        .catch( e => setError(e.response.data));
};

export const postStatus = (statusData, userName, userImageUrl) => dispatch => {
    dispatch({ type: STATUS_START });
    axios.post('/status', statusData)
        .then( res => {
            const status = {...res.data.resStatus, userName, userImageUrl}
            dispatch({ type: POST_STATUS, status});
            dispatch({ type: SHOW_MESSAGE_CONFIRM, message: 'New status added successfully!'});
        })
        .catch( e => setError(e.response.data));
};

export const setStatusId = (statusId) => dispatch => dispatch({ type: SET_STATUS_ID, statusId });
export const editStatus = (newStatusData, statusId) => dispatch => {
    dispatch({ type: STATUS_START });
    axios.post(`/status/${statusId}`, newStatusData)
        .then( res => {
            dispatch({ type: EDIT_STATUS, updatedStatus: res.data.resStatus, statusId});
            dispatch({ type: SHOW_MESSAGE_CONFIRM, message: 'Status edited successfully!'});
        })
        .catch( e => setError(e.response.data));
}

export const deleteStatus = (statusId) => dispatch => {
    dispatch({ type: STATUS_START });
    axios.delete(`/status/${statusId}`)
        .then( res => {
            dispatch({ type: DELETE_STATUS, statusId });
            dispatch({ type: SHOW_MESSAGE_CONFIRM, message: 'Status deleted successfully!'});
        })
        .catch( e => setError(e.response.data));
};

export const getAllTags = () => dispatch => {
    dispatch({ type: STATUS_START });
    axios.get('tags')
        .then( res => {
            dispatch({ type: SET_TAGS, tags: res.data })
        })
        .catch( e => setError(e.response.data));
}

export const getStatusByTag = tagName => dispatch => {
    dispatch({ type: STATUS_START });
    axios.get(`/tag/${tagName}`)
        .then( res => {
            dispatch({ type: SET_FILTERED_STATUS, filteredStatus: res.data.status })
        })
        .catch( e => setError(e.response.data));
}

const setError = error => dispatch => dispatch({ type: SET_STATUS_ERROR, error});

