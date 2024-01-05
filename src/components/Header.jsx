import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
   
    const location = useLocation();
    const navigate = useNavigate();

    function pathMatchRoute(path) {
        if(path === location.pathname) return true;
    }
  return (
    <div className='bg-white shadow-sm sticky top-0 z-50'>
        <header className='flex justify-between px-3 container mx-auto'>
            <div className='flex cursor-pointer align-middle justify-center py-5' onClick={()=>navigate("/")}>
                <img className='h-5 mr-2' src="assets/realestateindia-logo.svg" alt="realestate-logo" />
                <img className='h-5' src="assets/realestateindia-icon.svg" alt="realestate-icon"/>
            </div>
            <div className='flex space-x-10'>
                <ul  onClick={()=>navigate("/")} className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "!text-black !border-b-blue-400"}`}>Home</ul>

                <ul  onClick={()=>navigate("/offers")} className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/offers") && "!text-black !border-b-blue-400"}`}>Offers</ul>
                <ul  onClick={()=>navigate("/sign-in")} className={`cursor-pointer py-5 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${pathMatchRoute("/sign-in") && "!text-black !border-b-blue-400"}`}>SignIn</ul>
            </div>
        </header>
    </div>
  )
}

export default Header