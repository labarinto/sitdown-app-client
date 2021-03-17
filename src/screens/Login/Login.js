import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { authSignin, clearAuthErrors, authSigninWithGoogle } from '../../redux/actions';
import { Link, Redirect } from 'react-router-dom';

import googleLogo from '../../assets/img/google.png'
import classes from './Login.module.scss';
import { Button, Logo, Text, Form } from '../../components';
import loginForm from './loginForm';
import Loading from '../Loading/Loading';

const Login = (props) => {

    const googleBtnRef = useRef(null);

    const formHandler = (formData ) => {
        props.clearAuthErrors();
        props.authSignin(formData);
    }

    const { clearAuthErrors } = props;
    useEffect(() => {
        clearAuthErrors();
    }, [clearAuthErrors]);

    const { authSigninWithGoogle } = props;
    useEffect( () => {

        window.gapi.load('auth2', () => {
            
            const auth2 = window.gapi.auth2.init({
                client_id: '423516508550-dst64nlb5nuqqemdii2aude2mqkb3lfu.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            //attach sign in
            auth2.attachClickHandler(
                googleBtnRef.current, 
                {},
                googleUser => onSuccess(googleUser), 
                error => onFailure(error)
            );
        });

        const onSuccess = googleUser => {
            const idToken = googleUser.getAuthResponse().id_token;
            const profile = googleUser.getBasicProfile();

            const data = {
                idToken,
                email: profile.getEmail(),
                name: profile.getName(),
                imageUrl: profile.getImageUrl()
            }
            authSigninWithGoogle(data)
        }

        const onFailure = error => {
            alert(JSON.stringify(error, undefined, 2));
        }
    }, [authSigninWithGoogle]);

    if (props.auth.isLoading) return <Loading />;
    if (props.auth.isAuthenticated) return <Redirect to="/" />;

    return (
        <section className={classes.login}>
            
            <div className={classes.heading}>
                <Logo/>
            </div>

            <Button white buttonRef={googleBtnRef}>
                <div className={classes.googleLogin} onClick={() => {}}>
                    <img src={googleLogo} alt="google logo"/>
                    <Text size18 opac70>Login with Google</Text>
                </div>
            </Button>

            <div className={classes.divider}>
                <Text size16 opac70>OR</Text>
            </div>

            <Form form={loginForm} onSubmit={formHandler} error={props.auth.error}> 

                {props.auth.error && props.auth.error.general &&
                    <div className={classes.errorMessage}>
                        <Text error size12>{props.auth.error.general}</Text>
                    </div>}

                <div className={classes.forgot}>
                    <Text underline opac70 className={classes.link}>Forgotten Password?</Text>
                </div>

                <Button fullWidth primary>{
                    props.auth.isLoading ? "Loading..." : "Login"
                }</Button>

                <Text opac70 padY15>
                    Not a member? <Link to="/signup">
                        <Text type="span" underline className={classes.link}>Register now!</Text>
                    </Link>
                </Text>
            </Form>
        </section>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    authSignin, clearAuthErrors, authSigninWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);