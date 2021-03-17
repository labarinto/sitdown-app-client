import axios from 'axios';
import { 
    SET_PROJECTS, SET_PROJECT, POST_PROJECT, EDIT_PROJECT, 
    PROJECT_START, SET_PROJECT_ID, DELETE_PROJECT, SHOW_MESSAGE_CONFIRM
} from '../types';

const loading = dispatch => dispatch({ type: PROJECT_START });

export const getAllProjects = () => dispatch => {
    loading(dispatch);
    axios.get('/projects')
        .then( res => {
            dispatch({ type: SET_PROJECTS, projects: res.data })
        })
        .catch( e => console.error(e));
}

export const getProject = projectId => dispatch => {
    loading(dispatch);
    axios.get(`/project/${projectId}`)
        .then( res => {
            dispatch({ type: SET_PROJECT, status: res.data})
        })
        .catch( e => {
            //dispatch({ type: SET_ERROR, error: e.response.data})
        });
};

export const postProject = (projectData, userName, userImageUrl) => dispatch => {
    loading(dispatch);
    console.log(projectData);
    axios.post('/project', projectData)
        .then( res => {
            const project = {...res.data.resProject, userName, userImageUrl}
            dispatch({ type: POST_PROJECT, project});
            dispatch({ type: SHOW_MESSAGE_CONFIRM, message: 'New project added successfully!'});
        })
        .catch( e => {
            //dispatch({ type: SET_ERROR, error: e.response.data})
        });
};

export const setProjectId = projectId => dispatch => dispatch({ type: SET_PROJECT_ID, projectId });
export const editProject = (newProjectData, projectId) => dispatch => {
    loading(dispatch);
    axios.post(`/project/${projectId}`, newProjectData)
        .then( res => {
            dispatch({ type: EDIT_PROJECT, updatedProject: res.data.resProject, projectId});
            dispatch({ type: SHOW_MESSAGE_CONFIRM, message: 'Project edited successfully!'});
        })
        .catch( e => {
            //dispatch({ type: SET_ERROR, error: e.response.data})
        });
}

export const deleteProject = projectId => dispatch => {
    loading(dispatch);
    axios.delete(`/project/${projectId}`)
        .then( res => {
            dispatch({ type: DELETE_PROJECT, projectId });
            dispatch({ type: SHOW_MESSAGE_CONFIRM, message: 'Project deleted successfully!'});
        })
        .catch( e => {
            //dispatch({ type: SET_ERROR, error: e.response.data})
        });
};