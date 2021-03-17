import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { 
    AUTH_START, AUTH_SIGNIN, AUTH_LOGOUT, 
    AUTH_FAILED, CLEAR_AUTH_ERROR, UPDATE_AUTH_DETAILS, SHOW_MESSAGE_CONFIRM
} from '../types';

export const authLogout = () => {
    // google sign out
    /*const auth2 = window.gapi.auth2;
    auth2 && auth2.getAuthInstance().signOut().then( () => {
        console.log('user signed out');
    })*/
    //
    localStorage.removeItem('expDate');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    return { type: AUTH_LOGOUT }
};

export const authSignin = (userData, isSignup = false) => dispatch => {
    dispatch({ type: AUTH_START });
    let url = '/login';
    if(isSignup) url = '/signup';

    axios.post(url, userData)
        .then( res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
        })
        .catch(e => {
            dispatch({ type: AUTH_FAILED, error: e.response.data });
        })
};

export const authSigninWithGoogle = (data) => dispatch => {
    dispatch({ type: AUTH_START });
    
    axios.post('/loginWithGoogle', data)
        .then( res => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
        })
        .catch(e => {
            dispatch({ type: AUTH_FAILED, error: e.response.data });
        });
}

const getUserData = () => dispatch => { //authenticated user
    axios.get('/user')
        .then( res => {
            dispatch({ type: AUTH_SIGNIN, credentials: res.data.credentials });
        })
        .catch( e => console.log(e));
};

export const restoreAuth = () => dispatch => {
    const token = localStorage.getItem('token');

    if (token) {
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 <= Date.now()) {
            dispatch(authLogout());
        } else {
            axios.defaults.headers.common['Authorization'] = token;
            dispatch(getUserData());
        }
    }
}

export const clearAuthErrors = () => dispatch => dispatch({ type: CLEAR_AUTH_ERROR });

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`; // Firebase Id token
    localStorage.setItem('token', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const uploadImage = (formData) => dispatch => {
    axios.post('/user/image', formData)
        .then( res => {
            dispatch(getUserData());
            dispatch({ type: SHOW_MESSAGE_CONFIRM, message: 'New image uploaded successfully!'});
        })
        .catch( e => console.log(e));
};

export const addUserDetails = (formData) => dispatch => {
    axios.post('/user', formData)
        .then( res => {
            dispatch({type: UPDATE_AUTH_DETAILS, newData: formData});
        })
        .catch( e => console.log(e));
};
