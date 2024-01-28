import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import useUserStore from '../store/user-store';
import { useNavigate } from 'react-router-dom';

const Skeleton = () => {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false);
    const user = useUserStore((state:any) => state.loggedInUser);

    const {name} = user;
    
    setTimeout(()=>{
        setShowMessage(true);        
    },2000);

    useEffect(()=>{
        if(!user.token){
            navigate('/login', {replace:true})
        }
    },[])

    useEffect(()=>{
        if(showMessage){
            confetti({
                particleCount: 100,
                spread: 70,
                angle: 135,
                origin: { y: 0.6, x:0.7 }
            })
            confetti({
                particleCount: 100,
                spread: 70,
                angle: 45,
                origin: { y: 0.6, x:0.3 }
            })
        }
    },[showMessage])
    
    return ( 
        <div className="w-full h-screen flex items-center justify-center">
            {showMessage && <div className="flex flex-col items-center justify-center">
                <h2 className='text-5xl font-semibold'>Congratulations!</h2>
                <h3 className="text-3xl font-normal mt-3">Hi {name}, you're logged</h3>
            </div>}
            {!showMessage && <div className="flex flex-col items-center justify-center w-[363px]">
                <div className="skeleton h-12 w-full"></div>
                <div className="skeleton h-9 w-[183px] mt-3"></div>
            </div>}
        </div>
    );
}
 
export default Skeleton;