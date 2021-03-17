import React from 'react';
import { Link } from 'react-router-dom';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { openAddStatusModal } from '../../redux/actions';
import classes from './SideNav.module.scss';

import { Logo, Tooltip, ProfileImg } from '../../components';
import Links from '../Links/Links';

const SideNav = (props) => {

    const openModalHandler = () => {
        props.openAddStatusModal();
    }

    return (
        <header className={classes.sideNav}>
            <div className={classes.logo}>
                <Logo smallLogo/>
            </div>
            

            <div className={classes.iconContainer}>
                <Tooltip text="Add Status">
                    <FontAwesomeIcon 
                        icon={faPlusCircle} 
                        className={classes.addIcon} 
                        onClick={openModalHandler}
                    />
                </Tooltip>
            </div>
            

            <Links />

            <Link to="/profile" >
                <Tooltip text="Your profile">
                    <div>
                        <ProfileImg 
                            src={props.auth.credentials.imageUrl} 
                            className={classes.imageCircle} 
                        />
                    </div>
                </Tooltip>
            </Link>
                
        </header>
    )
};

const mapStateToProps = state => ({
    auth: state.auth,
    modal: state.modal
})

const mapDispatchToProps = { openAddStatusModal };

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);