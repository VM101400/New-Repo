import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  
  const getFeed = async () => {
    // If feed is already fetched, return early
    // This prevents unnecessary API calls
    // and optimizes performance by avoiding redundant data fetching.
    // This is useful in scenarios where the feed data is already available
    // in the Redux store and does not need to be fetched again.
    // If feed is null, it means it has not been fetched yet.
    // In that case, we proceed to fetch the feed data from the server.
    // If feed is already fetched, we do not need to fetch it again.
    // This helps in reducing the number of API calls made to the server,
    // improving the performance of the application.
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true
      });
      dispatch(addFeed(res?.data?.data));
    }catch(err) {
      //TODO: handle error
      console.error("Error fetching feed:", err.message || err.response?.data?.message || "Unknown error");
    }
  };
useEffect(() => {
  getFeed();
}, []);
  
  if(!feed) return;

  if(feed.length === 0) return <h1 className='flex justify-center my-10'>No New Users Found</h1>
  return (
    feed && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]}/>
      </div>
    )
  );
};

export default Feed;