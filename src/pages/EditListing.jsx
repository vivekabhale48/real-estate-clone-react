import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { BsCurrencyRupee } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
const EditListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [geolocationEnabled, setGeolocation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: true,
    regularPrice: 1,
    discountedPrice: 1,
    latitude: 0,
    longitude: 0,
    images: {},
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  const params = useParams();
  useEffect(()=>{
    setLoading(true);
    async function fetchListing() {
        const docRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            setListing(docSnap.data());
            setFormData({...docSnap.data()});
            setLoading(false);

        }
        else {
            navigate("/");
            toast.error("Listing does not Exists!")
        }
    }
    fetchListing();
  },[navigate, params.listingId])

  useEffect(()=>{
    if(listing && listing.creator_id !== auth.currentUser.uid) {
        toast.error("You can't edit this listing.");
        navigate("/");
    }
  },[auth.currentUser.uid, listing, navigate]);
  const onChange = (e) => {
    let boolean = null;
    //This if else block is written to convert the string true false to boolean true false. Otherwise it wont works
    if (e.target.value === "true") {
      boolean = true;
    } else if (e.target.value === "false") {
      boolean = false;
    } else if (e.target.files) {
      setFormData((previousValue) => ({
        ...previousValue,
        images: e.target.files,
      }));
    }
    if (!e.target.files) {
      setFormData((previousValue) => ({
        ...previousValue,
        [e.target.id]: boolean ?? e.target.value, // ?? this symbol means if the boolean is not null, true or false then e.target.value will work.
      }));
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log([...images]);
    setLoading(true);
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted Price must be less than Regular Price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images are only allowed");
      return;
    }
    let geolocation = {};
    let location;
    //To enable geo location go to google cloud console website select your working project search for geocoding api and enable it. This will provide you with some API key.
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      //Some times when address is not correct the results are zero hence put ? after results and if both are not there i.e null or undefined then put lat as zero hence ??.
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined; //It means that if data.status is ZERO_RESULTS then make location = undefined.

      if (location === undefined) {
        setLoading(false);
        toast.error("Please enter a correct address.");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        //The usage or how to upload files to firebase is given on their site.
        const storage = getStorage();
        //If the same person add same images two times so to give unique file name every time we are using a package called uuid. This is how you call uuidv4 you can checkout its usage in npm.
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);

        const uploadTask = uploadBytesResumable(storageRef, image);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
    }

    //Promise.all is used when there are multiple promises to be handled simultaneously. It in takes the array of promises and then resolves it. The below function calls the storeImage function for every image and it returns the array of uploaded image urls which it gets from the storeImage function.
    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((e) => {
      setLoading(false);
      toast.error("Error occurred while uploading images.");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      creator_name: auth.currentUser.displayName,
      creator_id: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    }

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;

    const docRef = doc(db, "listings", params.listingId);
    await updateDoc(docRef, formDataCopy)
    setLoading(false);
    toast.success("Listing Edited Successfully!")
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) return <Spinner />;

  return (
    <section className="mt-6 xl:max-w-[1280px] lg:max-w-[1024px] mx-auto">
      <h1 className="text-3xl font-bold text-center mt-6">Edit List</h1>
      <div className="mt-6 px-3 flex flex-col justify-center max-w-[740px] mx-auto">
        <form onSubmit={onSubmit}>
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Sell/Rent
            </label>
            <div className="flex gap-x-6">
              <button
                type="button"
                id="type"
                value="sell"
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  type === "rent" ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                sell
              </button>
              <button
                type="button"
                id="type"
                value="rent"
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  type === "sell" ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                Rent
              </button>
            </div>
          </div>
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Name
            </label>
            <div className="flex gap-x-6">
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                placeholder="Name"
                maxLength="90"
                minLength="10"
                required
                className={`px-4 py-2 font-medium text-xl text-gray-700 border-gray-300 bg-white shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out focus:border-slate-600`}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-3 md:mb-6 max-md:mb-4">
            <div>
              <p className="text-lg font-semibold">Beds</p>
              <input
                type="number"
                id="bedrooms"
                value={bedrooms}
                onChange={onChange}
                min="1"
                max="50"
                className="px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out text-center"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Bathroom</p>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onChange}
                min="1"
                max="50"
                className="px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out text-center"
              />
            </div>
          </div>
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Parking Spot
            </label>
            <div className="flex gap-x-6">
              <button
                type="button"
                id="parking"
                value={true}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  !parking ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                id="parking"
                value={false}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  parking ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                N0
              </button>
            </div>
          </div>
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Furnished
            </label>
            <div className="flex gap-x-6">
              <button
                type="button"
                id="furnished"
                value={true}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  !furnished ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                id="furnished"
                value={false}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  furnished ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                N0
              </button>
            </div>
          </div>
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Address
            </label>
            <div className="flex gap-x-6">
              <textarea
                type="text"
                id="address"
                value={address}
                onChange={onChange}
                placeholder="Address"
                required
                className={`px-4 py-2 font-medium text-xl text-gray-700 border-gray-300 bg-white shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out focus:border-slate-600`}
              />
            </div>
          </div>
          {!geolocationEnabled && (
            <div className="flex items-center gap-x-3 md:mb-6 max-md:mb-4">
              <div>
                <p className="text-lg font-semibold">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onChange}
                  min="-90"
                  max="90"
                  className="px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out text-center"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onChange}
                  min="-180"
                  max="180"
                  className="px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out text-center"
                />
              </div>
            </div>
          )}
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Description
            </label>
            <div className="flex gap-x-6">
              <textarea
                type="text"
                id="description"
                value={description}
                onChange={onChange}
                placeholder="Description"
                required
                className={`px-4 py-2 font-medium text-xl text-gray-700 border-gray-300 bg-white shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out focus:border-slate-600`}
              />
            </div>
          </div>
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Offer
            </label>
            <div className="flex gap-x-6">
              <button
                type="button"
                id="offer"
                value={true}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  !offer ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                id="offer"
                value={false}
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  offer ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                N0
              </button>
            </div>
          </div>
          <div className="md:mb-6 max-md:mb-4">
            <p className="text-lg font-semibold">Regular Price</p>
            <div className="flex items-center gap-x-2">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                required
                min="50"
                max="400000000"
                className="px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out text-center"
              />
              {type === "rent" && (
                <p className="text-md font-semibold flex justify-center items-center"><BsCurrencyRupee/> / Month</p>
              )}
            </div>
          </div>
          {offer && (
            <div className="md:mb-6 max-md:mb-4">
              <p className="text-lg font-semibold">Discounted Price</p>
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                required={offer}
                onChange={onChange}
                min="50"
                max="400000000"
                className="px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out text-center"
              />
            </div>
          )}
          <div className="md:mb-6 max-md:mb-4">
            <p className="text-lg font-semibold">Images</p>
            <p className="text-gray-600">
              The first Image will be the cover (max 6)
            </p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            />
          </div>
          <button
            type="submit"
            className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Edit Listing
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditListing;
