import { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { restoreAuth, closeModal, getAllStatus, 
    getAllProjects, getAllUsers, getAllTags, clearMessage 
} from '../redux/actions';

import  { 
    Dashboard, Login, Profile, Projects, Signup, Tags, Users
} from '../screens';

import SideNav from './SideNav/SideNav';
import ModalForm from '../components/ModalForm/ModalForm';
import ModalConfirm from '../components/ModalConfirm/ModalConfirm';

const Navigation = (props) => {

    const { restoreAuth, getAllStatus, getAllTags, getAllProjects, getAllUsers } = props;
    useEffect( ()=> {
        restoreAuth();
        
        //modify so that  it only calls when someones authenticated.
        if (props.auth.isAuthenticated) {
            getAllStatus();
            getAllTags();
            getAllProjects();
            getAllUsers();
        }
    }, [restoreAuth, getAllStatus, getAllTags, getAllProjects, getAllUsers, props.auth.isAuthenticated]);

    const { isOpen, title, form, mode } = props.modal;
    const { messageConfirm } = props.ui;

    //if (props.auth.isLoading) return <Loading />;

    //ROUTES
    let routes = <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Redirect to="/" />
    </Switch>

    if (props.auth.isAuthenticated) routes = <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/users" component={Users} />
        <Route to="/" component={Dashboard} />
        <Redirect to="/" />
    </Switch>

  
    // END of ROUTES

    return (
        <BrowserRouter>

            {props.auth.isAuthenticated && <Fragment>
                {form && mode && <ModalForm
                    openModal={isOpen}
                    title={title}
                    form={form}
                    mode={mode}
                    formValues={props.modal[mode]}
                    onClose={props.closeModal}
                />}


                {messageConfirm && <ModalConfirm 
                    text={messageConfirm}
                    onClose={props.clearMessage}
                /> }

                <SideNav />
            </Fragment>}
            
            { routes }
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    modal: state.modal,
    ui: state.ui
});

const mapDispatchToProps = {
    restoreAuth,
    closeModal,
    getAllStatus,
    getAllProjects,
    getAllUsers,
    getAllTags,
    clearMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);