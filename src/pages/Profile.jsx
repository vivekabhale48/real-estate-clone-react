import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  function onChange(e) {
    setFormData((preval)=> ({
      ...preval,
       [e.target.id]: e.target.value
    }))
  }

  const { name, email } = formData;

  function signOut() {
    auth.signOut();
    navigate("/");
  }

  return (
    <>
      <section className="mt-6 xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-6">My Profile</h1>
        <div className="mt-6 px-3 flex flex-col justify-center items-center">
          <form action="" className="w-full flex flex-col items-center">
            <input
              type="text"
              className="md:w-[50%] md:mb-6 max-md:mb-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              id="name"
              value={name}
              onChange={onChange}
              disabled
            />
            <input
              type="email"
              className="md:w-[50%] md:mb-6 max-md:mb-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              id="email"
              value={email}
              onChange={onChange}
              disabled
            />

            <div className="w-full md:w-[50%] flex justify-between whitespace-nowrap text-sm sm:text-lg md:mb-6 max-md:mb-4">
              <p className="flex items-center">Do you want to change your name ?
                <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">Edit</span>
              </p>
              <p onClick={signOut} className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer">Sign out</p>
          
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
