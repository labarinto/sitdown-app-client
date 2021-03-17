import React from 'react';
import classes from './ProfileImg.module.scss';

const ProfileImg = (props) => {

    const profileImgClasses = [classes.profileImg];
    props.className && profileImgClasses.push(props.className);

    return <img 
        src={props.src} 
        className={profileImgClasses.join(' ')}
        alt="profile" 
    />
}

export default ProfileImg;
