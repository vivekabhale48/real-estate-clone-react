import React from 'react'

const Signin = () => {
  return (
    <section className='mt-6 h-[calc(100vh-87px)] xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] mx-auto'>
        <h1 className='text-3xl text-center  font-bold'>Sign In</h1>
        <div className='flex justify-center gap-20 flex-wrap mx-auto mt-24'>
            <div className='w-[40%]'>
                <img className='signin-image w-full' src="assets/sign-in.svg" alt="Signin Image" />
            </div>

            <div className='flex flex-col justify-center items-end'>
                <form className='' action="">
                    <input className='w-full p-2 mb-7 focus:outline-none rounded' type="text" placeholder='Email address' />
                    <input className='w-full p-2 focus:outline-none rounded' type="text" placeholder='Password'/>
                    <div className='flex justify-between my-7 text-[14px]'>
                        <span>Don't have an account? <a className='text-red-500'>Register</a></span>
                        <span className='text-blue-600'>Forgot Password?</span>
                    </div>
                    <button className='uppercase bg-blue-700 text-white w-full py-2 text-[14px] rounded'>Sign in</button>
                    <div className='flex justify-center items-center my-7'>
                        <div className='flex-1 border-t-[1px] border-gray-400 h-0'></div>
                        <span className='px-2'>OR</span>
                        <div className='flex-1 border-t-[1px] border-gray-400 h-0'></div>
                    </div>
                    <div>
                        <button className='uppercase bg-red-700 text-white w-full py-2 text-[14px] rounded flex justify-center items-center gap-x-2'><img className='w-[20px]' src="assets/google-logo.png" alt="Google logo"/><span>Continue with Google</span></button>
                    </div>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Signin;