const projectForm = {
    title: {
        id: 1,
        label: 'Project name',
        inputType: 'input',
        config: {
            name: 'title',
            type: 'text',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
    },
    body: {
        id: 2,
        label: 'Description',
        inputType: 'text-editor',
        config: { },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
    },
    teamMembers: {
        id: 3,
        label: 'Team members',
        inputType: 'member-select',
        config: {
            name: 'teamMembers',
        },
        value: '',
        validation: {
            arrayRequired: true,
        },
        valid: true,
    },
};

export default projectForm;