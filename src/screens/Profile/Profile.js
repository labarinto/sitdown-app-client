import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { authLogout, uploadImage, setUiError, 
    clearUiError, addUserDetails, updateUser, showMessage
} from '../../redux/actions';

import classes from './Profile.module.scss';
import { faUser, faCog, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, Text, Button, Tooltip, Form, ProfileImg } from '../../components';
import profileForm from './profileForm';

const Profile = (props) => {

    const [form, setForm] = useState(profileForm);
    const [isDisabled, setIsDisabled] = useState(true);

    const imageInputRef = useRef(null);

    const imageChangeHandler = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        props.uploadImage(formData);
    }

    const imageChangeClicked = () => {
        imageInputRef.current.click();
    }

    const formHandler = formData => {

        let messageConfirm = 'Details are the same!';

        if(isDisabled) {
            setIsDisabled(false);
        } else {
            const updatedFormData = {};
            // check if the new data is not the same as current data
            formData && Object.keys(formData).forEach( key => {
                console.log(formData[key] !== props.auth.credentials[key]);
                if(formData[key] !== props.auth.credentials[key]) updatedFormData[key] = formData[key];
            })

            // only send new data to db
            if (Object.keys(updatedFormData).length > 0) {
                props.addUserDetails(updatedFormData);
                props.updateUser(props.auth.credentials.userId, updatedFormData);
                messageConfirm = 'Details updated successfully!';
            }

            props.clearUiError();
            props.showMessage(messageConfirm);
            setIsDisabled(true);
        }
    };

    // Fetch Current form values
    useEffect( () => {
        const currentFormValues = {...profileForm};
        Object.keys(profileForm).forEach( key => {
            let keyValue = props.auth.credentials[key];
            if (keyValue) currentFormValues[key].value = keyValue;
        });

        setForm(currentFormValues);
    }, [props.auth.credentials]);

    return (
        <main className={classes.profile}>
            <Card className={classes.card}>

                <Text type="h1" size24 light opac80 className={classes.title}>Settings</Text>
                
                

                <nav>
                    <Button primary>
                        <FontAwesomeIcon icon={faUser} /> Profile
                    </Button>

                    <Button white>
                        <FontAwesomeIcon icon={faCog} /> Account Settings
                    </Button>
                    
                    <Button white onClick={props.authLogout}>Logout</Button>
                </nav>

                <section className={classes.profileInfo}>
                    <section>
                        <div className={classes.formContainer}>
                            <Text size16 black2 padB15>Your Details</Text>
                            <Form form={form} onSubmit={formHandler} onError={props.setUiError} error={props.ui.error} disabled={isDisabled}>
                                <Button primary fontSize="xs" className={classes.button}>{isDisabled ? 'Edit Details' : 'Update'}</Button>
                            </Form>
                        </div>

                        <div className={classes.avatar}> 
                            <input type="file" ref={imageInputRef} hidden="hidden" onChange={imageChangeHandler} />
                            <Text size16 padB10 black2>Your Avatar</Text>

                            <div className={classes.avatarPicture}>
                                <ProfileImg src={props.auth.credentials.imageUrl} className={classes.circle}/>
                                
                                <div className={classes.avatarIconContainer} onClick={imageChangeClicked}>
                                    <Tooltip text="Update Profile Picture">
                                        <FontAwesomeIcon icon={faCamera} className={classes.avatarIcon} />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className={classes.email}>
                        <Text size16 padY15 medium>Email Address</Text>

                        <section>
                            <Text>Your email address is leojacob@gmail.com</Text>
                            <Text primary underline className={classes.textButtons}>Change</Text>
                        </section>
                    </div>

                    <section className={classes.password}>
                        <Text size16 padY15 medium>Password</Text>
                        <Text primary underline className={classes.textButtons}>Change</Text>
                    </section>
                </section>
            </Card>
        </main>
    )
}
const mapStateToProps = state => ({
    auth: state.auth,
    ui: state.ui,
})
const mapDispatchToProps = {
    authLogout,
    uploadImage,
    setUiError,
    clearUiError,
    addUserDetails,
    updateUser,
    showMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
