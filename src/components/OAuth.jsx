import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  async function onGoogleClick() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // console.log(user);

      //Below code is to set the user to the database after setting it to firebase authentication. If you refer it is same as in SignUp!
      const googleFormData = {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp()
      }

      //So as we are using this Auth Component in signin as well as in signup so before saving the data to the database we need to check that the user is already present or not. If not then we can save the user and it is already saved then we can directly redirect the user to the home page. This checking is done by the getDoc method.

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()) {
        await setDoc(docRef, googleFormData);
        toast.success("Sign Up successful!")
      }
      navigate("/");
    } catch (error) {
      toast.error("Error occurred while signin which Google!")
      console.log(error);
    }
  }
  return (
    <>
      <button type="button" onClick={onGoogleClick} className="uppercase bg-red-700 text-white w-full py-2 text-[14px] rounded flex justify-center items-center gap-x-2 mb-5">
        <img
          className="w-[20px]"
          src="assets/google-logo.png"
          alt="Google logo"
        />
        <span>Continue with Google</span>
      </button>
    </>
  );
};

export default OAuth;
