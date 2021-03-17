export const capitalize = word => {
    if(typeof word !== 'string') return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const formatModeToMessage = (mode) => {
    let message = mode.split(/(?=[A-Z])/);
    return `${capitalize(message[0])}ed ${message[1].toLowerCase()}`;
}