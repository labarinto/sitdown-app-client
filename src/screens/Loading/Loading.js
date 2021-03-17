import React from 'react';
import classes from './Loading.module.scss';
import { Loading as LoadingIndicator } from '../../components';

const Loading = (props) => {

    return (
        <div className={classes.loading}>
            <LoadingIndicator />
        </div>
    )
}

export default Loading;
