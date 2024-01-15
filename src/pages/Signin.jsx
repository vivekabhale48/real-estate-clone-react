import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  const [showPassword, setPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  //The spread operator creates the copy of the existing object and stores it into the previousValue variable, now the changes in the object is done on this existing copy of object and then it is passed to the setFormData
  function handleOnChange(e) {
    setFormData((previousValue) => ({
      ...previousValue,
      [e.target.id]: e.target.value,
    }));
  }

  //OnSubmit

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      if(userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad user credentials")
      console.log(error)
    }
  }

  return (
    <section className="mt-6 h-[calc(100vh-87px)] xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] mx-auto">
      <h1 className="text-3xl text-center  font-bold">Sign In</h1>
      <div className="flex max-md:flex-col max-md:items-center justify-center md:gap-20 max-md:gap-10 flex-wrap mx-auto md:mt-24 max-md:mt-10 max-md:px-5">
        <div className="w-[40%] max-md:w-[60%]">
          <img
            className="signin-image w-full"
            src="assets/sign-in.svg"
            alt="Signin Image"
          />
        </div>

        <div className="md:w-[40%] max-md:w-full flex flex-col justify-center items-end">
          <form onSubmit={onSubmit} className="w-full" action="">
            <input
              className="w-full p-2 md:mb-7 max-md:mb-4 focus:outline-none rounded"
              type="email"
              id="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Email address"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 focus:outline-none rounded"
                id="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl"
                  onClick={() => setPassword((preVal) => !preVal)}
                />
              ) : (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl"
                  onClick={() => setPassword((preVal) => !preVal)}
                />
              )}
            </div>
            <div className="flex justify-between my-7 max-md:my-4 text-[14px]">
              <span>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-red-500">
                  Register
                </Link>
              </span>
              <Link to="/forgot-password" className="text-blue-600">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="uppercase bg-blue-700 text-white w-full py-2 text-[14px] rounded">
              Sign in
            </button>
            <div className="flex justify-center items-center my-7 max-md:my-4">
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

export default Signin;
