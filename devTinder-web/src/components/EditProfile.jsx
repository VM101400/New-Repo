import { useState } from 'react';
import EViewProfileData from './EViewProfileData';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';


const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);


    const saveProfile = async () => {
        setError("");
        try{
            const res = await axios.patch(BASE_URL + "/profile/edit", {firstName, lastName, photoUrl, age, gender, about}, 
                {withCredentials: true});
                dispatch(addUser(res?.data?.data));
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
        }
        catch(err){
            setError(err.response.data);
        }
    };

    const [error, setError] = useState("");
   
  return (
    <>
        <div className='flex justify-center my-10'>
            <div className='flex justify-center mx-10'>
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>
                        <div>
                            <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">First Name:</legend>
                            <input type="text" value={firstName} className="input" onChange={(e)=> setFirstName(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Last Name:</legend>
                            <input type="text" value={lastName} className="input" onChange={(e)=> setLastName(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Photo Url:</legend>
                            <input type="text" value={photoUrl} className="input" onChange={(e)=> setPhotoUrl(e.target.value)}/>
                            </fieldset>
                            <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">Age:</legend>
                            <input type="text" value={age} className="input" onChange={(e)=> setAge(e.target.value)}/>
                            </fieldset>
                            <div className="dropdown dropdown-content">
                                <div tabIndex={0} role="button" className="btn m-1" >Gender</div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li><a onClick={() => setGender('male')}>male</a></li>
                                    <li><a onClick={() => setGender('female')}>female</a></li>
                                    <li><a onClick={() => setGender('others')}>others</a></li>
                                </ul>
                            </div>
                            <fieldset className="fieldset my-2">
                            <legend className="fieldset-legend">About:</legend>
                            <textarea className="textarea" maxLength={200} value={about} onChange={(e)=> setAbout(e.target.value)}></textarea>
                            </fieldset>
                        </div>
                        <p className='text-red-500'>{error}</p>
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <UserCard user={{firstName, lastName, photoUrl, age, gender, about}}/> */}
            <EViewProfileData user={{firstName, lastName, photoUrl, age, gender, about}}/>
        </div>
        {showToast &&
            <div className="toast toast-top toast-center">
            <div className="alert alert-success">
                <span>Profile saved successfully.</span>
            </div>
        </div>
        }
    </>
  );
};

export default EditProfile;