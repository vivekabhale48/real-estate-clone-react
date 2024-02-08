import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { PiShareFatFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { FaBath, FaBed, FaChair } from "react-icons/fa6";
import { FaMapMarkerAlt, FaParking } from "react-icons/fa";

const ListingDetails = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getListings() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    getListings();
    console.log(listing);
  }, [params.listingId]);

  if (loading) return <Spinner />;

  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ type: "progressbar" }}
        slidesPerView={1}
        navigation={{ clickable: true }}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className="relative w-full overflow-hidden h-[400px]"
                style={{
                  background: `url(${img}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="fixed top-[13%] right-[3%] z-10 bg-white rounded-full cursor-pointer border-gray-400 p-3">
        <PiShareFatFill className="text-lg text-slate-500" onClick={()=>{
          navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to Clipboard!")
        }}/>
      </div>

      <div className="flex flex-col md:flex-row mx-auto max-w-6xl m-4 p-4 rounded-lg shadow-lg bg-white">
        <div className="w-full">
          <p className="text-2xl font-bold mb-3 text-blue-900">{listing.name} - ${listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold"><FaMapMarkerAlt className="text-green-700 mr-1" />{listing.address}</p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="flex justify-between items-center"><FaBed className="mr-2"/> {listing.bedrooms} Beds</span>
            <span className="flex justify-between items-center"><FaBath className="mr-2"/> {listing.bathrooms} Baths</span>
            {
              listing.furnished && (
                <span className="flex justify-between items-center"><FaChair className="mr-2"/> Furnished</span>
              )
            }
            {
              listing.parking && (
                <span className="flex justify-between items-center"><FaParking className="mr-2"/> Parking Spot</span>
              )
            }
          </div>
        </div>
        <div className="w-full">

        </div>
      </div>
    </main>
  );
};

export default ListingDetails;
