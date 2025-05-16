import React, { useState } from 'react';
import CommonSignUp from '../CommonSignUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo-on-light.png"
import { ApiLoginRequiest } from '../../Axios/ApiRequirest';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    // const navigate = useNavigate()

    // const [forgetPassword, setNewForgetPassword] = useState({})

    // const handleSubmitForget = (e) => {

    //     const name = e.target.name;
    //     const value = e.target.value;

    //     // console.log(name, value);
        

    //     setNewForgetPassword(preData => ({...preData, [name]: value }))

    // }


    // const handleForgetPassword = async (e) => {

    //     e.preventDefault()

    //     const response = await ApiLoginRequiest("user/forget-password", forgetPassword)

    //     // console.log(response);

    //     if(response.status === 200) {
    //         navigate("/verify-otp", { state: { from: "forget-password", forgetPassword, forgetPurpose : "passwordReset" } });
    //     }
        
    // }





    // return (
    //     <div>
    //         <form action="" onSubmit={handleForgetPassword}>
    //             <div className="w-full mt-6 pb-7 flex flex-col lg:flex-row justify-between">

    //                 <div className="hidden lg:block lg:w-[40%] w-full h-auto">
    //                     <CommonSignUp />
    //                 </div>

    //                 <div className="w-full lg:w-[60%] h-auto flex justify-center items-center">

    //                     <div className="w-full lg:w-[60%] h-[430px] rounded-2xl shadow-xl p-4 md:p-8">
    //                         <img src={logo} alt="" className="w-[40%] m-auto pt-3" />
    //                         <div className="w-[60%] m-auto flex justify-center">
    //                             <FontAwesomeIcon icon={faMessage} className="text-[#9333EA] text-4xl mt-5" />
    //                         </div>
    //                         <h1 className="text-center mt-3 font-semibold text-2xl">Please Enter Your Email</h1>
    //                         <p className="text-center mt-2 text-sm text-gray-400">We'll send a forget password one-time password (OTP) to your email address</p>

    //                         <div className="w-[70%] m-auto flex justify-center mt-5">
    //                             <input type="email" name='email' onChange={handleSubmitForget}  placeholder="Please Enter Your Email Address" className="border-2 w-full p-2 rounded-xl border-gray-500" />
    //                         </div>
    //                         <p className="mt-2 text-sm text-gray-400 text-center">OTP will be sent to this email</p>

    //                         <div className="w-[70%] m-auto flex justify-center mt-5">
    //                             <button type='submit' className="border-2 w-full p-2 rounded-xl bg-[#9333EA] text-white cursor-pointer">Send OTP</button>
    //                         </div>
    //                     </div>
    //                 </div>

    //             </div>
    //         </form>
    //     </div>
    <></>
    // )
}

export default ForgetPassword
