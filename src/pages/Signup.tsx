import { useFormik } from 'formik';
import signup_image from '../assets/signup_pic.jpg';
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { SignupSchema } from '../schemas/SignupSchema';
import { SignupCall } from '../services/UserServices/Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const [signUpError, setSignUpError] = useState('');
    const [userName, setUserName] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const {
        values, 
        touched,
        handleBlur, 
        handleChange, 
        handleSubmit, 
        errors, 
        isSubmitting
    } = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            passwordConfirmation:''
        },
        validationSchema: SignupSchema,
        onSubmit
    });

    async function onSubmit(values:{name:string, email:string, password:string, passwordConfirmation:string}, actions:any){
        const {data} = await SignupCall(values);
        if(data.errors){
            const error = data.errors[0].message;
            setSignUpError(error);
            setShowMessage(true);
            setTimeout(()=>{
                setShowMessage(false);
            },2000)
            actions.resetForm();
            return;
        }      
        const user = data.data.createUser.name
        setUserName(user);
        setShowMessage(true);
        setTimeout(()=>{
            setShowMessage(false);
            navigate('/login', {replace:true});
        },2000)

        actions.resetForm();
    } 

    function handleGoToSignIn(){
        navigate('/login', {replace:true});
    }

    useEffect(()=>{
        if(!showMessage){
            setTimeout(()=>{
                setUserName('');
                setSignUpError('');
            },1000)
        }
    },[showMessage])

    return ( 
        <>
            <div className='flex items-center justify-between mt-10
                            md:px-14
                            xs:fixed xs:w-full xs:mx-0 xs:px-7 xs:z-10'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <PiPaperPlaneTiltFill 
                    className='text-3xl text-[#20DC49]'
                    />
                    <h1 className='text-xl font-bold text-[#20DC49]'>Maker</h1>
                </div>
                <p className='lg:text-base lg:font-normal lg:text-black
                            md:block md:text-lg md:font-semibold md:text-white/60
                            xs:hidden'>Have an account? <span onClick={handleGoToSignIn} className='font-semibold text-[#20DC49] cursor-pointer'>Sign in!</span></p>
                <span onClick={handleGoToSignIn} className='font-bold text-[#20DC49] cursor-pointer md:hidden xs:block'>Sign In</span>  
            </div>
            <div className="lg:grid lg:grid-cols-[3fr_4fr]
                            xs:relative">
                <div className='h-screen relative'>
                    <img className='h-full w-full object-cover' src={signup_image} alt="Two women working and laughing on laptop" />
                </div>
                <div className='flex flex-col
                                lg:static lg:transform-none
                                xs:absolute'>
                    
                    <div className='flex flex-col items-center justify-center my-auto
                                    lg:static lg:transform-none lg:p-0 lg:rounded-none lg:bg-none lg:backdrop-blur-none
                                    md:p-10                                
                                    xs:p-10 xs:rounded-lg xs:bg-white/50 xs:backdrop-blur-xl
                                    xs:fixed xs:top-1/2 xs:left-1/2 xs:transform xs:-translate-x-1/2 xs:-translate-y-1/2 z-10'>
                        <h2 className='font-bold text-center
                                       md:text-4xl
                                       xs:text-4xl'>Get Started With MAKER</h2>
                        <p className='text-lg mt-2'>Getting started is easy</p>
                        <div className='flex gap-5'>
                            <div className='flex items-center gap-2 max-w-32 py-2 px-6 mt-10 border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 ease-in-out
                                            hover:border-[#20DC49]
                                            lg:border-gray-300
                                            xs:border-black/50'>
                                <FcGoogle 
                                className='text-2xl'/>
                                <p className='font-medium'>Google</p>
                            </div>
                            <div className='flex items-center gap-2 max-w-32 py-2 px-4 mt-10 border rounded-md cursor-pointer transition-colors duration-200 ease-in-out
                                            hover:border-[#20DC49]
                                            lg:border-gray-300
                                            xs:border-black/50'>
                                <FaFacebook 
                                className='text-2xl text-blue-600'/>
                                <p className='font-medium'>Facebook</p>
                            </div>
                        </div>
                        <div className="flex items-center mt-10
                                        md:flex
                                        xs:hidden">
                            <div className="w-32 border-t 
                                            lg:border-gray-400/70
                                            xs:w-40 xs:border-black/50" />
                            <div className="mx-4 lg:block xs:hidden">Or continue with</div>
                            <div className="mx-4 lg:hidden xs:block">Or</div>
                            <div className="w-32 border-t 
                                            lg:border-gray-400/70
                                            xs:w-40 xs:border-black/50" />
                        </div>
                        <form 
                        onSubmit={handleSubmit}
                        className='flex flex-col max-w-[400px] 
                                lg:w-full
                                md:gap-6 md:mt-9
                                xs:w-full xs:gap-3 xs:mt-6'>
                            <div>
                                <input 
                                type="text" 
                                id='name'
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-6 py-5 bg-white outline-none border border-gray-300 rounded-lg
                                            ${errors.name && touched.name ? 'border-red-400' : ''}`}
                                placeholder='Full Name' />
                                {errors.name && touched.name && <p className='text-xs text-red-400 pl-2'>{errors.name}</p>}
                            </div>
                            <div>
                                <input 
                                type="text" 
                                id='email'
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-6 py-5 bg-white outline-none border border-gray-300 rounded-lg
                                            ${errors.email && touched.email ? 'border-red-400' : ''}`}
                                placeholder='Email' />
                                {errors.email && touched.email && <p className='text-xs text-red-400 pl-2'>{errors.email}</p>}
                            </div>
                            <div>
                                <input
                                type="password" 
                                id='password'
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-6 py-5 bg-white outline-none border border-gray-300 rounded-lg
                                            ${errors.password && touched.password ? 'border-red-400' : ''}`}
                                placeholder='Password'/>
                                {errors.password && touched.password && <p className='text-xs text-red-400 pl-2'>{errors.password}</p>}
                            </div>
                            <div>
                                <input
                                type="password" 
                                id='passwordConfirmation'
                                value={values.passwordConfirmation}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-6 py-5 bg-white outline-none border border-gray-300 rounded-lg
                                            ${errors.passwordConfirmation && touched.passwordConfirmation ? 'border-red-400' : ''}`}
                                placeholder='Confirm Password'/>
                                {errors.passwordConfirmation && touched.passwordConfirmation && <p className='text-xs text-red-400 pl-2'>{errors.passwordConfirmation}</p>}
                            </div>
                            <button 
                            type='submit'
                            disabled={isSubmitting}
                            className={`w-full py-5 border-none bg-[#20DC49] rounded-lg text-lg leading-none transition-colors duration-200 ease-in-out
                                    ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
                                    hover:bg-[#1dc642]`}>
                                Create Account
                            </button>
                        </form>
                    </div>
                    <div className={`toast toast-end mb-10 transition-opacity duration-200 ease-in-out ${showMessage && userName !== '' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="alert alert-success bg-white border-2 border-green-400">
                            <span>Welcome aboard {userName}!</span>
                        </div>
                    </div>
                    <div className={`toast toast-end transition-opacity duration-200 ease-in-out ${showMessage && signUpError !== '' ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="alert alert-error bg-white border-2 border-red-400">
                            <span>{signUpError}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Signup;