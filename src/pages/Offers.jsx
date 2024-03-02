import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import ListingItem from '../components/ListingItem';
import Spinner from '../components/Spinner';

const Offers = () => {

  const [offerListings, setOfferListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadListings, setLoadListings] = useState(8);
  const [showBtn, setShowBtn] = useState(true);

  useEffect(()=>{
    async function getOfferListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("offer", "==", true), orderBy("timestamp", "desc"));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc)=> {
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        const numListings = listings.slice(0, loadListings);
        setOfferListings(numListings);
        setLoading(false);
        if(listings[listings.length - 1].id === numListings[numListings.length - 1].id) setShowBtn(false)
      } catch (error) {
        console.log(error)
      }
    }
    getOfferListings();
  }, [loadListings])

  if (loading) return <Spinner />;

  return (
    <div className="px-2 mx-auto max-w-6xl mt-5">
      {offerListings && offerListings.length > 0 && (
        <>
          <h2 className="text-5xl text-center font-semibold mb-4">Offers</h2>
          <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offerListings.map((list) => (
              <ListingItem key={list.id} id={list.id} listing={list.data} />
            ))}
          </ul>
        </>
      )}
      {showBtn && (
        <div className="w-full flex justify-center mt-2">
          <button
            onClick={() => setLoadListings(loadListings + 4)}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Load More
          </button>
        </div>
      )}
      {!showBtn && (
        <div className="w-full flex justify-center mt-2">
          <button
            onClick={() => {setLoadListings(8); setShowBtn(true);}}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
}

export default Offers