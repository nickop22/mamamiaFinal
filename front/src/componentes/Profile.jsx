import React, {  useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Button } from 'bootstrap';

export const Profile = () => {
  const { user, getUser,isLoggedIn,token,logOut } = useContext(UserContext);

  console.log('Profile',user)
  
  useEffect(() => {
   
    if (isLoggedIn) {  
      getUser()
    }
  }, [isLoggedIn,getUser]);
  return (
    <div>
      {isLoggedIn ? (
       <div className='text-center text-white mt-4 bg-dark p-3 container'>
       <p>Email: {user?.email}</p>
       <Link to="/" className='btn display-3 bg-warning border-rounded'><Button onClick={logOut}>Cerrar sesión</Button></Link>
 </div>
      ) : (
      <p>Inicie sesión para ver su perfil</p>
      )}
    </div>
  );
}
export default Profile