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

const Slider = () => {
  const [listings, getListings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.log(listings);
    }
    getAllListings();
  }, []);

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
        {listings.map((list) =>
          list.data.imgUrls.map((img, index) => {
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
          })
        )}
      </Swiper>
    )
  );
};

export default Slider;
