import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetail, setChangeDetail] = useState(false);

  function onChange(e) {
    setFormData((preval) => ({
      ...preval,
      [e.target.id]: e.target.value,
    }));
  }

  const { name, email } = formData;

  function signOut() {
    auth.signOut();
    navigate("/");
  }

  async function onSubmit() {
    try {

      if(auth.currentUser.displayName !== name) {
        //Updating the displayname in the authentication
        await updateProfile(auth.currentUser ,{
          displayName: name
        })
        //Updating the displayname in the firestore database.

        const docRef = doc(db, "users", auth.currentUser.uid)//by this line we will get the current user from the database by matching the uid.

        await updateDoc(docRef, {
          name, //This line means shortcut to write -> name: name
        })

        toast.success("Profile Name updated successfully!")
      }
    } catch (error) {
      toast.error("Could not update the Profile Name")
    }
  }

  return (
    <>
      <section className="mt-6 xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-6">My Profile</h1>
        <div className="mt-6 px-3 flex flex-col justify-center items-center">
          <form action="" className="w-full flex flex-col items-center">
            <input
              type="text"
              className={`md:w-[50%] md:mb-6 max-md:mb-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}
              id="name"
              value={name}
              onChange={onChange}
              disabled={!changeDetail}
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
              <p className="flex items-center">
                Do you want to change your name ?
                <span
                  onClick={() => {
                    changeDetail && onSubmit()
                    setChangeDetail((preval) => !preval)}}//If we dont use the return function the setChangeDetail will be called in loop.
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply Changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={signOut}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
