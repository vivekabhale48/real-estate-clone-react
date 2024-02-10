import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Contact = ({ creatorId, listing }) => {
  const [getOwnerData, setOwnerData] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getOwner() {
      const docRef = doc(db, "users", creatorId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOwnerData(docSnap.data());
      } else {
        toast.error("Unable to find owner data!");
      }
    }
    getOwner();
  }, [creatorId]);

  function handleChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {getOwnerData !== null && (
        <div className="flex flex-col w-full mt-5">
          <p className="font-medium text-lg text-slate-500">
            Contact Owner <span className="font-bold text-black">{getOwnerData.name}</span> for more information regarding
            Flat
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={handleChange}
              placeholder="Write a message"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          
          <a href={`mailto:${getOwnerData.email}?Subject=${listing.name}&body=${message}`}>
            <button
              className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
              type="button"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
