import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { authSignin, clearAuthErrors } from '../../redux/actions';
import { Link } from 'react-router-dom';

import signupForm from './signupForm';
import { Form, Button, Logo, Text} from '../../components';
import classes from './Signup.module.scss';

const Signup = (props) => {

    const formHandler = (userData) => {
        const isSignup = true;
        props.authSignin(userData, isSignup);
    }

    const { clearAuthErrors } = props;
    useEffect(() => {
        clearAuthErrors();
    }, [clearAuthErrors])

    return (
        <section className={classes.signup}>

            <div className={classes.heading}>
                <Logo />
            </div>

            <Text size24 black2 padB15>Creat an account</Text>

            <Form form={signupForm} onSubmit={formHandler} error={props.auth.error}>
                <Button fullWidth primary className={classes.button}>
                    {props.auth.isLoading ? 'Loading...' : 'Sign up'}
                </Button>
            </Form>

            <Text opac70 padY15>
                Already have an account? <Link to="/login">
                    <Text type="span" underline className={classes.link}>Login now!</Text>
                </Link>
            </Text>
        </section>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    authSignin,
    clearAuthErrors
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
