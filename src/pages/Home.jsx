import { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import ListingItem from '../components/ListingItem'
import { Link } from 'react-router-dom'

const Home = () => {

  const [offerListings, setOfferListings] = useState(null);
  useEffect(()=>{
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(4));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc)=>{
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
    fetchListings();
  },[])

  const [rentListings, setRentListings] = useState(null);
  useEffect(()=>{
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("type", "==", "rent"), orderBy("timestamp", "desc"), limit(4));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc)=>{
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setRentListings(listings);
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings();
  },[])

  const [sellListings, setSellListings] = useState(null);
  useEffect(()=>{
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings");
        const q = query(listingRef, where("type", "==", "sell"), orderBy("timestamp", "desc"), limit(4));
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc)=>{
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setSellListings(listings);
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings();
  },[])

  return (
    <div>      
      <Slider/>
      <div className="px-2 mx-auto max-w-6xl">
        {
          offerListings && offerListings.length > 0 && (
            <>
            <h2 className="text-2xl font-semibold mt-8 pl-[10px]">Recent Offers</h2>
            <Link to={'/category/rent'}>
              <p className='pl-[10px] text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more offers</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                offerListings.map((list)=>(
                  <ListingItem 
                    key={list.id}
                    listing={list.data}
                    id={list.id}
                  />
                ))
              }
            </ul>
            </>
          )
        }
      </div>
      <div className="px-2 mx-auto max-w-6xl">
        {
          rentListings && rentListings.length > 0 && (
            <>
            <h2 className="text-2xl font-semibold mt-8 pl-[10px]">Places for Rent</h2>
            <Link to={'/category/sell'}>
              <p className='pl-[10px] text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for Rent</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                rentListings.map((list)=>(
                  <ListingItem 
                    key={list.id}
                    listing={list.data}
                    id={list.id}
                  />
                ))
              }
            </ul>
            </>
          )
        }
      </div>
      <div className="px-2 mx-auto max-w-6xl">
        {
          sellListings && sellListings.length > 0 && (
            <>
            <h2 className="text-2xl font-semibold mt-8 pl-[10px]">Places for Sell</h2>
            <Link to={'/offers'}>
              <p className='pl-[10px] text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out'>Show more places for Sell</p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {
                sellListings.map((list)=>(
                  <ListingItem 
                    key={list.id}
                    listing={list.data}
                    id={list.id}
                  />
                ))
              }
            </ul>
            </>
          )
        }
      </div>
    </div>
  )
}

export default Home