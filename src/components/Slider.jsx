import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [listings, getListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllListings() {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const allListings = [];
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        allListings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      getListings(allListings);
      setLoading(false);
    }
    getAllListings();
  }, []);

  function redirectToDetailsPage(list) {
    navigate(`/category/${list.data.type}/${list.id}`);
  }

  if (loading) return <Spinner />;

  return (
    listings && (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ type: "progressbar" }}
        slidesPerView={1}
        navigation={{ clickable: true }}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listings.map((list, index) => {
          return (
            <SwiperSlide key={index}>
                <div
                  className="relative w-full overflow-hidden h-[375px]"
                  style={{
                    background: `url(${list.data.imgUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  onClick={()=> redirectToDetailsPage(list)}
                ></div>
                <p className="absolute top-4 left-4 p-3 bg-[#457b9d] text-[#f1faee] opacity-90 shadow-lg rounded-br-3xl">{list.data.name}</p>
                <p className="absolute bottom-4 left-4 p-3 bg-[#e63946] text-[#f1faee] opacity-90 shadow-lg rounded-tr-3xl">{list.data.discountedPrice ?? list.data.regularPrice} {list.data.type === 'rent' ? ' Rs/month' : ''}</p>
            </SwiperSlide>
          )
        }
        )}
      </Swiper>
    )
  );
};

export default Slider;
