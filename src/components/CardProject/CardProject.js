import React from 'react';
import { faUserFriends, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { openEditProjectModal, setProjectId } from '../../redux/actions';

import classes from './CardProject.module.scss';
import { Card, Text, TextEditorDisplay, Tooltip} from '../';

const CardProject = (props) => {


    const openModalHandler = () => {

        const editValues = {};

        const dataNeeded = ['title', 'body', 'teamMembers'];
        dataNeeded.forEach( key => {
            if (key === 'teamMembers') editValues[key] = Object.keys(props[key]);
            else editValues[key] = props[key];
        });

        props.openEditProjectModal(editValues);
        props.setProjectId(props.projectId);
    };

    const cardClasses = [classes.card];
    props.className && cardClasses.push(props.className)

    return (
        <Card className={cardClasses.join(' ')}>
            <div>
                <Text type="h2" size18>{props.title}</Text>
                <TextEditorDisplay  body={props.body} />
            </div>
            
            
            <footer>
                <div className={classes.divider} />

                <div className={classes.mainFooter}>
                    <div className={classes.userIcon}>
                        <FontAwesomeIcon icon={faUserFriends} className={classes.icon} />
                        <div className={classes.circle}>
                            <Text white>{Object.keys(props.teamMembers).length + 1}</Text>
                        </div>
                    </div>

                    {props.auth.credentials.userId === props.userId && <Tooltip text="Edit Project">
                        <FontAwesomeIcon icon={faEdit} className={classes.icon} onClick={openModalHandler}/>
                    </Tooltip>}
                </div>
            </footer>
        </Card>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    openEditProjectModal,
    setProjectId
}

export default connect(mapStateToProps, mapDispatchToProps)(CardProject);
