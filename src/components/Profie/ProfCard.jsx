import React, { useContext } from 'react'
//import cover from "../../../public/assets/img/cover.jpg"
//import defaultProfile from "../../../public/assets/img/defaultProfile.png"
import { UserContext } from '../../store/userContext'
import { useSelector } from 'react-redux'
function ProfCard() {
  const userr=useContext(UserContext)
  const {user}=useSelector((state)=> state.AuthReducer.authData);
  const defaultProfile="http://res.cloudinary.com/dwue6nt31/image/upload/v1744525015/el9miugv9tkn6fxl2hsw.png";
  const cover="http://res.cloudinary.com/dwue6nt31/image/upload/v1744525016/bmodykkl7klhinez1jef.jpg";

  if(!userr){
    return(
        <div>
            Loading
        </div>
    )
  }
     
    console.log(userr)
    return (
      <div className='max-w-4xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-lg sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto m-4 bg-white shadow-xl rounded-lg text-gray-900'>
        {/* Cover Photo */}
        <div className='rounded-t-lg h-32 overflow-hidden'>
          <img
            className='object-cover object-top w-full'
            src={userr?.coverPicture ? userr.coverPicture : cover}
            alt='Cover'
          />
  
        </div>
  
        {/* Profile Picture */}
        <div className='mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden'>
          <img
            className='object-cover object-center h-32'
            src={userr?.profilePicture ? userr.profilePicture : defaultProfile}
            alt='Profile'
          />
        </div>
  
        {/* User Info */}
        <div className='text-center mt-2'>
          <h2 className='font-semibold'>{userr?.firstname} {user?.lastname}</h2>
          <p className='text-gray-500'>{userr?.worksAt || "Write about yourself"}</p>
        </div>
  
        {/* Followers & Following */}
        <ul className='py-4 mt-2 text-gray-700 flex items-center justify-around'>
          <li className='flex flex-col items-center justify-around'>
            <div>{userr?.followers?.length || 0}</div>
            <p className='text-xs sm:text-sm'>Followers</p>
          </li>
          <div className='border-l-2 border-gray-300 h-8 sm:h-12 mx-2 sm:mx-4'></div>
          <li className='flex flex-col items-center justify-around'>
            <div>{userr?.following?.length || 0}</div>
            <p className='text-xs sm:text-sm'>Following</p>
          </li>
        </ul>
      </div>
    );
  }

export default ProfCard