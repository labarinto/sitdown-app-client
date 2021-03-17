const statusForm = {
    title: {
        id: 1,
        label: 'Headline',
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
        config: { 
            name: 'body',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
    },
    tags: {
        id: 3,
        label: 'Tags',
        labelCaption: '(Separate tags using space)',
        inputType: 'input',
        config: {
            name: 'tags',
            type: 'text',
        },
        value: '',
        validation: {
            required: true,
        },
        valid: true,
    },
};

export default statusForm;