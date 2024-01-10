import React from "react";

const OAuth = () => {
  return (
    <>
      <button className="uppercase bg-red-700 text-white w-full py-2 text-[14px] rounded flex justify-center items-center gap-x-2">
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
