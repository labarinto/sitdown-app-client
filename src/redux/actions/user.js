import axios from 'axios';
import { SET_USERS, SET_USER } from '../types';

export const getAllUsers = () => dispatch => {

    axios.get('/users')
        .then(res => {
            dispatch({ type: SET_USERS, users: res.data})
        })
        .catch( e => {
            console.error(e);
        })
};

export const updateUser = (userId, newData) => dispatch => {
    dispatch({ type: SET_USER, userId, newData});
}
