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
    password: {
        id: 2,
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
};

export default loginForm;