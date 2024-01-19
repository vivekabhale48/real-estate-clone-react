import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";

const CreateListing = () => {
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
  } = formData;
  const onChange = () => {};
  return (
    <section className="mt-6 xl:max-w-[1280px] lg:max-w-[1024px] md:max-w-[768px] mx-auto">
      <h1 className="text-3xl font-bold text-center mt-6">My Profile</h1>
      <div className="mt-6 px-3 flex flex-col justify-center max-w-[740px] mx-auto">
        <form action="">
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Sell/Rent
            </label>
            <div className="flex gap-x-6">
              <button
                type="button"
                id="type"
                value="sale"
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  type === "sell" ? "bg-white" : "bg-slate-600 text-white"
                }`}
              >
                sell
              </button>
              <button
                type="button"
                id="type"
                value="sale"
                onClick={onChange}
                className={`px-7 py-3 font-medium text-sm uppercase shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out ${
                  type === "rent" ? "bg-white" : "bg-slate-600 text-white"
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
                id="type"
                value={name}
                onClick={onChange}
                placeholder="Name"
                maxLength="32"
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
                id="bathroom"
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
                onClick={onChange}
                placeholder="Address"
                required
                className={`px-4 py-2 font-medium text-xl text-gray-700 border-gray-300 bg-white shadow-md hover:shadow-lg rounded focus:shadow-lg w-full active:shadow-lg transition duration-150 ease-in-out focus:border-slate-600`}
              />
            </div>
          </div>
          <div className="md:mb-6 max-md:mb-4">
            <label className=" md:mb-6 max-md:mb-4 font-semibold text-lg">
              Description
            </label>
            <div className="flex gap-x-6">
              <textarea
                type="text"
                id="description"
                value={description}
                onClick={onChange}
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
                <p className="text-md font-semibold">$/Month</p>
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
            <p className="text-gray-600">The first Image will be the cover (max 6)</p>
            <input
              type="file"
              id="images"
              accept=".jpg,.png,.jpeg"
              onChange={onChange}
              multiple
              required
              className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
            />
          </div>
          <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Create Listing
        </button>
        </form>
      </div>
    </section>
  );
};

export default CreateListing;
