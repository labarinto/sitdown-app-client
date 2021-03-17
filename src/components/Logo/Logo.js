import React from 'react';
import logo from '../../assets/img/logo.png';
import smallLogo from '../../assets/img/small-logo.png';

const Logo = (props) => {

    let imageSrc = logo;
    if (props.smallLogo) imageSrc = smallLogo;

    return <img
        src={imageSrc}
        alt="sitdown app logo"
    />
};

export default Logo;