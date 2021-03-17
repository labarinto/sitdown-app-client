const profileForm = {
    name: {
        id: 1,
        label: 'Name',
        inputType: 'input',
        config: {
            name: 'name',
            type: 'text',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
    },
    position: {
        id: 2,
        label: 'Position',
        inputType: 'select',
        config: {
            name: 'position',
            options: [
                'Junior Developer',
                'Senior Developer',
                'Freeloader'
            ]
        },
        value: 'Junior Developer',
        validation: {
            required: true,
        },
        valid: true,
    },
};

export default profileForm;