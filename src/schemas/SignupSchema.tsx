import * as yup from 'yup';

export const SignupSchema = yup.object().shape({
    name: yup.string().required('Please enter your full name'),
    email: yup.string().email('Please enter a valid email').required('Please enter an email'),
    password: yup.string().min(1).required('Please enter your password'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
});