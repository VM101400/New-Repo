const UserCard = ({user}) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;


  return (
    <div key={_id} className="card bg-base-300 w-96 ">
        <div className="card-image bg-base-300 my-5  ">
          <figure>
            <img className="w-60 h-80 "
            src={photoUrl}
            alt="Photo" />
          </figure>
        </div>
        <div className="card-body ">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + "," + gender}</p>}
            <p>{about}</p>
        </div>
    </div>
  )
}

export default UserCard;