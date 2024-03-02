import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { PiShareFatFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { FaBath, FaBed, FaChair } from "react-icons/fa6";
import { FaMapMarkerAlt, FaParking } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const ListingDetails = () => {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [contactOwner, setContactOwner] = useState(false);

  const auth = getAuth();

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
  }, [params.listingId ,listing]);

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
                className="relative w-full overflow-hidden h-[375px]"
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
        <PiShareFatFill
          className="text-lg text-slate-500"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to Clipboard!");
          }}
        />
      </div>

      <div className="px-5">
        <div className="flex flex-col md:flex-row mx-auto max-w-6xl m-4 p-4 rounded-lg shadow-lg bg-white gap-5">
          <div className="w-full">
            <p className="text-2xl font-bold mb-3 text-blue-900 flex items-center">
              {listing.name} -
              <span className="flex items-center">
                <BsCurrencyRupee className="w-[20px] h-[20px]"/>
                {listing.offer
                  ? listing.discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : listing.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </p>
            <p className="flex items-start mt-6 mb-3 font-semibold gap-x-2">
              <FaMapMarkerAlt className="text-green-700 mr-1 w-[30px] h-[30px]" />
              {listing.address}
            </p>
            <div className="flex justify-start items-center space-x-4 w-[75%]">
              <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                {listing.type === "rent" ? "Rent" : "Sale"}
              </p>
              {listing.offer && (
                <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md flex items-center text-nowrap gap-x-2">
                  <BsCurrencyRupee />
                  {" " + listing.regularPrice - +listing.discountedPrice}{" "}
                  Discount
                </p>
              )}
            </div>
            <p className="mt-3 mb-3">
              <span className="font-semibold">Description - </span>
              {listing.description}
            </p>
            <div className="flex justify-between items-center gap-y-2 flex-wrap">
              <span className="flex justify-between items-center">
                <FaBed className="mr-2" /> {listing.bedrooms} Beds
              </span>
              <span className="flex justify-between items-center">
                <FaBath className="mr-2" /> {listing.bathrooms} Baths
              </span>
              {listing.furnished && (
                <span className="flex justify-between items-center">
                  <FaChair className="mr-2" /> Furnished
                </span>
              )}
              {listing.parking && (
                <span className="flex justify-between items-center">
                  <FaParking className="mr-2" /> Parking Spot
                </span>
              )}
            </div>
            {!contactOwner && auth.currentUser?.uid !== listing.creator_id && (
              <button
                onClick={() => setContactOwner(true)}
                className="px-7 py-3 bg-blue-600 text-white rounded shadow-md font-medium uppercase hover:shadow-lg text-sm hover:bg-blue-700 w-full text-center mt-5"
              >
                Contact Owner
              </button>
            )}
            {contactOwner && (
              <Contact creatorId={listing.creator_id} listing={listing} />
            )}
          </div>
          <div className="w-full z-10 overflow-x-hidden custom-map-height">
            <MapContainer
              center={[listing.geolocation.lat, listing.geolocation.lng]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[listing.geolocation.lat, listing.geolocation.lng]}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ListingDetails;
