import React from 'react'

import Link from './Link';
import classes from './Links.module.scss';

import { faGlobe, faCopy, faTags, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const Links = (props) => {
    return (
        <nav className={classes.links}>
            <ul>
                <Link to="/" icon={faGlobe} exact tooltipText={"Dashboard"}/>
                <Link to="/projects" icon={faCopy} exact tooltipText={"Projects"}/>
                <Link to="/tags" icon={faTags} exact tooltipText={"Tags"}/>
                <Link to="/users" icon={faUserFriends} exact tooltipText={"Users"}/>
            </ul>
        </nav>
    )
}

export default Links;
