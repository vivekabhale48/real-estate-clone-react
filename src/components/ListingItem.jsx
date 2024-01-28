import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { BsCurrencyRupee } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <li className="bg-white relative flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md transition-shadow duration-150 m-[10px] overflow-hidden">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="w-full h-[170px] object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt=""
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white px-2 py-1 rounded-md text-xs font-semibold uppercase shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <FaLocationDot className="text-green-600 w-4 h-4" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold mt-2 text-lg  text-[#457b9d] truncate">
            {listing.name}
          </p>
          <div className="text-[#457b9d] mt-2 font-semibold">
            <p className="flex items-center">
            <BsCurrencyRupee />
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              {listing.type === "rent" && "/ month"}
            </p>
            <div className="flex items-center mt-[10px] space-x-3">
              <div className="flex items-center space-x-1">
                <p className="font-bold text-xs">
                  {listing.bedrooms}{" "}
                  <span>{listing.bedrooms > 1 ? "Beds" : "Bed"}</span>
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <p className="font-bold text-xs">
                  {listing.bathrooms}{" "}
                  <span>
                    {listing.bathrooms > 1 ? "Bathroom" : "Bathrooms"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {onDelete && (<MdDelete className="absolute right-2 bottom-2 text-red-600 cursor-pointer" onClick={onDelete}/>)}
      {onEdit && (<MdEdit className="absolute right-8 bottom-2 cursor-pointer" onClick={onEdit}/>)}
    </li>
  );
};

export default ListingItem;
