import { 
    SET_PROJECTS, SET_PROJECT, POST_PROJECT, EDIT_PROJECT, 
    PROJECT_START, SET_PROJECT_ID, DELETE_PROJECT,
} from '../types';

const initialState = {
    projects: [],
    project: {},
    isLoading: false,
    cfmMessage: '',
    projectId: '',
}
const project = (state = initialState, action) => {

    switch(action.type) {
        case PROJECT_START: return { ...state, isLoading: true };
        case SET_PROJECTS: return { ...state, projects: action.projects, isLoading: false};
        case SET_PROJECT: return { ...state, project: action.project, isLoading: false};
        case SET_PROJECT_ID: return { ...state, projectId: action.projectId, cfmMessage: ''};
        case POST_PROJECT:
            state.projects.unshift(action.project);
            return { ...state, cfmMessage: 'Project added'};
        case EDIT_PROJECT:
            const indexToEdit = state.projects.findIndex(project => project.projectId === action.projectId);
            state.projects[indexToEdit] = {...state.projects[indexToEdit], ...action.updatedProject};
            return { ...state, cfmMessage: 'Project edited succesfully!'};
        case DELETE_PROJECT:
            const indexToDelete = state.projects.findIndex(project => project.projectId === action.projectId);
            state.projects.splice(indexToDelete, 1);
            return { ...state, cfmMessage: 'Project deleted successfully!' }
        default: return state;
    }
};

export default project;