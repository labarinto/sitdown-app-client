import { SET_USERS, SET_USER } from '../types';

const initialState = {
    users: []
};

const user = (state = initialState, action) => {

    switch(action.type) {

        case SET_USERS: return { ...state, users: action.users};
        case SET_USER: 
            const updatedUsers = [...state.users];
            const userToUpdate = state.users.findIndex( user => user.userId === action.userId);
            updatedUsers[userToUpdate] = {...updatedUsers[userToUpdate], ...action.newData };
            return {...state, users: updatedUsers }
        default: return state;
    }
}

export default user;