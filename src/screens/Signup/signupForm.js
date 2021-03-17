const loginForm = {
    email: {
        id: 1,
        inputType: 'input',
        config: {
            name: 'email',
            type: 'email',
            placeholder: 'Enter email',
        },
        value: '',
        validation: {
            //required: true,
            //isEmail: true,
        },
        valid: true,
    },
    name: {
        id: 2,
        inputType: 'input',
        config: {
            name: 'name',
            type: 'text',
            placeholder: 'Enter name',
        },
        value: '',
        validation: {
            //required: true,
            //isEmail: true,
        },
        valid: true,
    },
    password: {
        id: 3,
        inputType: 'input',
        config: {
            name: 'password',
            type: 'password',
            placeholder: 'Enter password'
        },
        value: '',
        validation: {
            //required: true,
            //minLength: 8,
        },
        valid: true,
    },
    confirmPassword: {
        id: 4,
        inputType: 'input',
        config: {
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm password'
        },
        value: '',
        validation: {
            //required: true,
            //minLength: 8,
        },
        valid: true,
    },
};

/*
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    name: req.body.name
*/

export default loginForm;