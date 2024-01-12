import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  //The spread operator creates the copy of the existing object and stores it into the previousValue variable, now the changes in the object is done on this existing copy of object and then it is passed to the setFormData
  function handleOnChange(e) {
    setFormData((previousValue) => ({
      ...previousValue,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      //Below code is to save the user inside the Authentication of the firestore.
      const auth = getAuth();
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name
      })
      const user = userCredentials.user;

      //Uptill the above code the user got save in the Authentication of the database now tthe below code is to save the user in the FireBase database. So we cant store the password in the database hence we are removing the password and also adding the timestamp.

      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      //SetDoc is the method to store the data into the database which returns the promise and takes method doc and the formData as an argument.
      //The doc method also takes tyhe three arguments  first in the db inwhich the data is to be stored. Then the name of the collection and then the unique id of that user.
      //By this inside the firebase Database collections named users is created within that we have the user with specific uid and then its details.

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign Up successful!")
      navigate("/"); //On successful login navigate to hone page
    } catch (error) {
      console.log(error);
      toast.error("Error occured while Sign Up !")
    }
  }
  return (
    <section className="mt-6 h-[calc(100vh-87px)] xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] mx-auto">
      <h1 className="text-3xl text-center  font-bold">Sign Up</h1>
      <div className="flex max-md:flex-col max-md:items-center justify-center md:gap-20 max-md:gap-10 flex-wrap mx-auto md:mt-24 max-md:mt-10 max-md:px-5">
        <div className="w-[40%] max-md:w-[60%]">
          <img
            className="signin-image w-full"
            src="assets/sign-in.svg"
            alt="Signin Image"
          />
        </div>

        <div className="md:w-[40%] max-md:w-full flex flex-col justify-center items-end">
          <form className="w-full" onSubmit={onSubmit}>
            <input
              className="w-full p-2 md:mb-7 max-md:mb-4 focus:outline-none rounded"
              type="text"
              id="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Full Name"
            />
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
                Have an account?{" "}
                <Link to="/sign-in" className="text-red-500">
                  Sign In
                </Link>
              </span>
              <Link to="/forgot-password" className="text-blue-600">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="uppercase bg-blue-700 text-white w-full py-2 text-[14px] rounded">
              Sign Up
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

export default SignUp;
