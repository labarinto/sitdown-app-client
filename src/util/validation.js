export const checkValidity = (name, value, rules, secondValue = '') => {
    if (!rules) return false;
    const { required, minLength, maxLength, confirmPass, arrayRequired } = rules;
    
    if (required && value.trim() === '') return {[name]: `is Required!`};
    if (arrayRequired && value.length === 0) return {[name]: `is Required!`};
    if (minLength && value.length < minLength) return {[name]: `should be at least ${minLength} characters!`};
    if (maxLength && value.length > maxLength) return {[name]: `should be ${maxLength} characters max!`};
    if (confirmPass && value !== secondValue) return {[name]: `password should match!`}
    if (rules.isString && !isString(value)) return {[name]: `must be a String!`};
    if (rules.isNumeric && !isNumeric(value)) return {[name]: `must be a Number!`};
    if (rules.isEmail && !isEmail(value)) return {[name]: `must be an Email!`};
    if (rules.isName && !isName(value)) return {[name]: `must be a Name!`};
    if (rules.isFloat && !isFloat(value)) return {[name]: `must be a Decimal Number!`};  
    return false;
};

export const isEmail = value => {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(value);
}
export const isFloat = value => /^-?\d*[.,]?\d*$/.test(value);
export const isString = value => /^[a-zA-Z_]+( [a-zA-Z_]+)*$/.test(value);
export const isNumeric = value => /^\d+$/.test(value);
export const isName = value => /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value);