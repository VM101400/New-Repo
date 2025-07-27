import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  // Function to review connection requests
  // It takes a status and an id as parameters.
  // It sends a POST request to the backend endpoint with the status and id.
  // It handles any errors that may occur during the request.
  // The status can be either "accepted" or "rejected".
  // This function is called when the user clicks on the accept or reject button for a request.
  const reviewRequests = async (status, _id) => {
    try{
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" +_id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));

    }catch(err) {
      console.error("Error reviewing requests:", err);
    }

  }

  // Function to fetch connection requests
  // from the backend and dispatch them to the Redux store
  // using the addRequests action.
  // It uses axios to make a GET request to the backend endpoint
  // and handles any errors that may occur.
  // The useEffect hook is used to call this function when the component mounts.
  // If there are no requests, it returns early.
  // If there are no requests, it displays a message indicating that no requests were found.
  // If there are requests, it maps over them and displays each request's details
  // including the user's photo, name
  const fetchRequests = async () => {
    try{
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true },);
      dispatch(addRequests(res?.data?.data));
    }catch(err){
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if(!requests) return;

    if(requests.length === 0) return <h1 className='flex justify-center my-10'>No Requests Found</h1>;
  return (
    <div className='text-center my-10'>
        <h1 className='text-bold text-3xl'>Connection Requests</h1>
        
        {requests.map((request) => {
            const {_id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId;
            return (
            <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto'>
                <div><img alt='photo' className='w-20 h-20 rounded-full' src={photoUrl}/></div>
                <div className='text-left mx-4'>
                    <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                </div>
                <div>
                    <button className="btn btn-primary mx-2" 
                    onClick={() => reviewRequests("rejected", request._id)}>Reject</button>

                    <button className="btn btn-secondary mx-2" 
                    onClick={() => reviewRequests("accepted", request._id)}>Accept</button>
                </div>
            </div>
        )})}
    </div>
  );
};

export default Requests