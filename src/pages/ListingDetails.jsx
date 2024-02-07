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
    </main>
  );
};

export default ListingDetails;
