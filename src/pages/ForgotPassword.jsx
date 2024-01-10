import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  //The spread operator creates the copy of the existing object and stores it into the previousValue variable, now the changes in the object is done on this existing copy of object and then it is passed to the setFormData
  function handleOnChange(e) {
    setEmail(e.target.value);
  }
  return (
    <section className="mt-6 h-[calc(100vh-87px)] xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] mx-auto">
      <h1 className="text-3xl text-center  font-bold">Forgot Password</h1>
      <div className="flex justify-center gap-20 flex-wrap mx-auto mt-24">
        <div className="w-[40%]">
          <img
            className="signin-image w-full"
            src="assets/sign-in.svg"
            alt="Signin Image"
          />
        </div>

        <div className="w-[40%] flex flex-col justify-center items-end">
          <form className="w-full" action="">
            <input
              className="w-full p-2 focus:outline-none rounded"
              type="email"
              id="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Email address"
            />
            <div className="flex justify-between my-7 text-[14px]">
              <span>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-red-500">
                  Register
                </Link>
              </span>
              <Link to="/sign-in" className="text-blue-600">
                Sign In
              </Link>
            </div>
            <button className="uppercase bg-blue-700 text-white w-full py-2 text-[14px] rounded">
              Send Reset Email
            </button>
            <div className="flex justify-center items-center my-7">
              <div className="flex-1 border-t-[1px] border-gray-400 h-0"></div>
              <span className="px-2">OR</span>
              <div className="flex-1 border-t-[1px] border-gray-400 h-0"></div>
            </div>
            <div>
              <OAuth />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
