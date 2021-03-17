import React, { useState } from 'react';
import classes from './CardStatus.module.scss';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faEllipsisH, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { deleteStatus, openEditStatusModal, setStatusId, getStatusByTag, showMessage } from '../../redux/actions';

import { Card, Text, TextEditorDisplay, ProfileImg } from '../';
import relativeDateFormat from '../../util/relativeDateFormat';

const CardStatus = (props) => {

    const [showOptions, setShowOptions] = useState(false);

    let cardClasses = [classes.card];
    props.margin && cardClasses.push(classes.MB10);

    const openModalHandler = () => {

        const editValues = {};

        const dataNeeded = ['title', 'body', 'tags'];
        dataNeeded.forEach( key => {
            editValues[key] = props[key]
        });

        props.openEditStatusModal(editValues);
        props.setStatusId(props.statusId);
    }

    const deleteHandler = (statusId) => {
        props.deleteStatus(statusId);
        //props.showMessage('Status deleted successfully!');
    }

    return (
        <Card className={cardClasses.join(' ')}>

            <div>
                <ProfileImg className={classes.circle} src={props.userImageUrl} />
            </div>

            <div className={classes.content}>
                <div className={classes.contentHeader}>
                    {!props.view ? <Text type="h3" tertiary padY10 padB15>
                        {props.userName}
                        <Text type="span"> updated his status </Text>
                        <Text type="span" primary>{relativeDateFormat(new Date(props.createdAt))}</Text>
                    </Text> : <Text type="h3" tertiary padY10 padB15>{props.userName}</Text>}

                    {props.userId === props.auth.credentials.userId && <div className={classes.moreIconContainer}>
                        <FontAwesomeIcon icon={faEllipsisH} className={classes.moreIcon} onClick={ () => setShowOptions(!showOptions)}/>

                        {showOptions && <div className={classes.moreIconInner} onClick={ () => setShowOptions(!showOptions)}>
                            <div className={classes.triangle}>
                                <div className={classes.innerTriangle} />
                            </div>
                            
                            <Card className={classes.moreOptionsCard}>
                                <div className={classes.options}>
                                    <div onClick={openModalHandler} className={classes.option}>
                                        <FontAwesomeIcon icon={faEdit} />
                                        <Text size20>Edit Status</Text>
                                    </div>
                                    <div onClick={deleteHandler.bind(this, props.statusId)} className={classes.option}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        <Text size20>Delete Status</Text>
                                    </div>
                                </div>
                            </Card>
                        </div>}
                    </div>}
                </div>
                
                {!props.view ? (
                    <Text type="h2" size16 padB5>{props.title}</Text>
                ) : (
                    <div className={classes.title}>
                        <Text type="h2" size16 padB5>{props.title}</Text>
                        <Text primary>{new Date(props.createdAt).toTimeString().slice(0,5)}</Text>
                    </div>
                )}

                <TextEditorDisplay body={props.body}/>

                <div className={classes.statusTags}>
                    <FontAwesomeIcon icon={faTag} className={classes.tagIcon} />

                    { props.tags && Object.keys(props.tags).map( 
                        tag => <div className={classes.tag} key={tag}>
                            <Link to={`/tags?tag=${tag}`}>
                                <Text key={tag} type="h4" padL10 underline>{tag}</Text>
                            </Link>
                        </div>
                    )}
    
                </div>
                
                
            </div>
        </Card>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    deleteStatus,
    openEditStatusModal,
    setStatusId,
    getStatusByTag,
    showMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(CardStatus);
