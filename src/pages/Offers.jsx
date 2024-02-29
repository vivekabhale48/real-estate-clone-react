import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import ListingItem from '../components/ListingItem';

const Offers = () => {

  const [offerListings, setOfferListings] = useState(null);
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
        setOfferListings(listings);
      } catch (error) {
        console.log(error)
      }
    }
    getOfferListings();
  }, [])

  return (
    <div className="px-2 mx-auto max-w-6xl mt-14">
        {offerListings && offerListings.length > 0 && (
          <>
            <h2 className="text-5xl text-center font-semibold mb-4">Offers</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((list) => (
                <ListingItem
                  key={list.id}
                  id={list.id}
                  listing={list.data}
                />
              ))}
            </ul>
          </>
        )}
    </div>
  )
}

export default Offers