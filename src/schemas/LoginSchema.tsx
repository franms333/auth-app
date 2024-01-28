import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('Please enter an email'),
    password: yup.string().min(1).required('Please enter your password')
});