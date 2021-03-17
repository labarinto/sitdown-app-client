import React from 'react';
import classes from './Link.module.scss';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tooltip from '../../components/Tooltip/Tooltip';

const Link = (props) => {
    return (
        <li className={classes.link}>
            <NavLink
                exact={props.exact}
                to={props.to}
                activeClassName={classes.activeLink}
            >
                <Tooltip text={props.tooltipText}>
                    <FontAwesomeIcon icon={props.icon} className={classes.icon} />
                </Tooltip>

                {props.children}
            </NavLink>
        </li>
    )
}

export default Link;
