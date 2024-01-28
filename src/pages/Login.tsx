import login_image from '../assets/login_pic.jpg';
import thumps_up from '../assets/thumbs_up.png';

import { useFormik } from 'formik';
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { LoginSchema } from '../schemas/LoginSchema';
import { LoginCall } from '../services/UserServices/Login';
import useUserStore from '../store/user-store';


const Login = () => {
    const navigate = useNavigate()    
    const setLoggedInUser = useUserStore((state:any) => state.setLoggedInUser);
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
                email:'',
                password:''
            },
            validationSchema: LoginSchema,
            onSubmit
    });

    async function onSubmit(values:{email:string, password:string}, actions:any){
        const {data} = await LoginCall(values);
        if(data instanceof Error){
            actions.resetForm();
            return;
        }
        await setLoggedInUser(data.data.login);      
        navigate('/home', {replace:true});
        actions.resetForm();
    }   

    function handleGoToSignup(){
        navigate('/signup', {replace:true});
    }

    return ( 
        <div className="lg:grid lg:grid-cols-[4fr_3fr]
                        xs:relative">
            <div className='flex flex-col
                            lg:static lg:transform-none
                            xs:absolute'>
                <div className='flex items-center justify-between mt-10
                                lg:static lg:w-auto
                                md:px-14
                                xs:fixed xs:w-full xs:mx-0 xs:px-7 xs:z-10'>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <PiPaperPlaneTiltFill 
                        className='text-3xl lg:text-[#20DC49]/50 xs:text-[#20DC49]'
                        />
                        <h1 className='text-xl font-bold lg:text-[#20DC49]/60 xs:text-[#20DC49]'>Maker</h1>
                    </div>
                    <p className='lg:text-base lg:font-normal 
                                  md:block md:text-lg md:font-semibold 
                                  xs:hidden'>Don't have an account? <span onClick={handleGoToSignup} className='font-semibold text-[#20DC49] cursor-pointer'>Sign up!</span></p>
                    <span onClick={handleGoToSignup} className='font-bold text-[#20DC49] cursor-pointer md:hidden xs:block'>Sign Up</span>  
                </div>
                <div className='flex flex-col items-center justify-center my-auto
                                lg:static lg:transform-none lg:p-0 lg:rounded-none lg:bg-none lg:backdrop-blur-none
                                md:p-10                                
                                xs:p-10 xs:rounded-lg xs:bg-white/50 xs:backdrop-blur-xl
                                xs:fixed xs:top-1/2 xs:left-1/2 xs:transform xs:-translate-x-1/2 xs:-translate-y-1/2 z-10'>
                    <h2 className='font-semibold
                                    md:text-5xl
                                    xs:text-4xl'>Welcome Back</h2>
                    <p className='text-lg mt-2'>Login into your account</p>
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
                        <div className='flex items-center justify-between w-full mb-9 -mt-1'>
                            <div className='flex items-center gap-2'>
                                <input 
                                type="checkbox" 
                                className="toggle toggle-primary"/>
                                <p className='text-sm'>Remember me</p>
                            </div>
                            <p className='text-sm cursor-pointer lg:text-red-400 lg:font-normal xs:font-semibold xs:text-red-700'>Recover Password</p>
                        </div>
                        <button 
                        type='submit'
                        disabled={isSubmitting}
                        className={`w-full py-5 border border-gray-500/70 rounded-lg text-lg leading-none transition-colors duration-200 ease-in-out
                                 ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
                                 hover:border-[#20DC49] hover:text-[#20DC49]
                                 lg:border-gray-500/70
                                 xs:border-black/70`}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <div className='h-screen relative'>
                <img className='h-full w-full object-cover' src={login_image} alt="Two women working and laughing on laptop" />
                <div className='w-full h-[300px] absolute bottom-0 items-center justify-center mb-12
                                lg:flex 
                                xs:hidden'>
                    <div className='flex flex-col gap-6 py-11 pl-9 pr-14  w-full h-full max-w-[547px] max-h-[270px] backdrop-blur-3xl shadow-lg shadow-gray-700/15 rounded-2xl'>
                        <div className='flex items-center gap-2 bg-[#20DC49] w-2/4 p-3 rounded-xl cursor-pointer transition-colors duration-200 ease-in-out
                                        hover:bg-[#1dc642]'>
                            <img className='w-6' src={thumps_up} alt="Thumbs up" />
                            <p className='text-sm font-medium'>Top Notch Stock Resources</p>
                        </div>
                        <p className='text-white text-lg font-normal'>Today, we create innovative solutions to the challenges that consumers face in both their everyday lives and events.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;