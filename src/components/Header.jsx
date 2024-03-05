import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RiMenu3Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [privateRoute, setPrivateRoute] = useState("SignIn")
    const auth = getAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPrivateRoute("Profile")
            }
            else {
                setPrivateRoute("SignIn")
            }
        })
    }, [auth])
    function pathMatchRoute(path) {
        if (path === location.pathname) return true;
    }
    return (
        <div className='bg-white shadow-sm sticky top-0 z-40 relative'>
            <header className='flex justify-between px-3 xl:max-w-[1280px] lg:max-w-[1024px] mx-auto items-center'>
                <div className='flex cursor-pointer align-middle justify-center py-5' onClick={() => navigate("/")}>
                    <img className='h-5 mr-2' src="/assets/realestateindia-logo.svg" alt="realestate-logo" />
                    <img className='h-5' src="/assets/realestateindia-icon.svg" alt="realestate-icon" />
                </div>
                <div className='space-x-10 hidden md:flex'>
                    <ul onClick={() => navigate("/")} className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "!text-black !border-b-blue-400"}`}>Home</ul>

                    <ul onClick={() => navigate("/offers")} className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "!text-black !border-b-blue-400"}`}>Offers</ul>
                    <ul onClick={() => navigate("/profile")} className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "!text-black !border-b-blue-400"}`}>{privateRoute}</ul>
                </div>
                <div className='md:hidden'>
                    <div>
                        <RiMenu3Line onClick={() => setSidebarOpen((prev) => !prev)} className='w-[30px] h-[30px]' />
                    </div>
                    <div className={`sidebar ${sidebarOpen ? 'active' : ''} w-[250px] fixed min-h-[100vh] top-0 right-[-250px] bg-white transition-all duration-500 z-10 shadow-md`}>
                        <div className='p-5 flex justify-between items-center'>
                            <RxCross2 onClick={() => setSidebarOpen((prev) => !prev)} className='w-5 h-5 p-1 rounded-full border-black border-[1px] text-black' />
                            <div className='flex items-center'>
                                <img className='h-5 mr-2' src="/assets/realestateindia-logo.svg" alt="realestate-logo" />
                                <h4 className='text-blue-700 text-[18px]'>RealEstate<span className='text-red-500'>India</span></h4>
                            </div>
                        </div>

                        <div className='flex flex-col justify-center items-center gap-y-3 px-3 mt-3'>
                            <ul onClick={() => {navigate("/"); setSidebarOpen((prev) => !prev)}} className={`cursor-pointer py-[10px] px-[16px] w-full bg-[#e5e8ec] rounded-[4px] flex justify-center text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "!text-black !border-b-blue-400"}`}>Home</ul>

                            <ul onClick={() => {navigate("/offers"); setSidebarOpen((prev) => !prev)}} className={`cursor-pointer py-[10px] px-[16px] w-full bg-[#e5e8ec] rounded-[4px] flex justify-center text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "!text-black !border-b-blue-400"}`}>Offers</ul>

                            <ul onClick={() => {navigate("/profile"); setSidebarOpen((prev) => !prev)}} className={`cursor-pointer py-[10px] px-[16px] w-full bg-[#e5e8ec] rounded-[4px] flex justify-center text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "!text-black !border-b-blue-400"}`}>{privateRoute}</ul>
                        </div>
                    </div>
                    <div onClick={() => setSidebarOpen((prev) => !prev)} className={`side-overlay ${sidebarOpen ? 'active' : ''} fixed top-0 left-0 w-full h-full transition-all duration-500 invisible opacity-0`}></div>
                </div>
            </header>
        </div>
    )
}

export default Header