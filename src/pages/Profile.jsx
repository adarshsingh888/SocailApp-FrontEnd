import React, { useState,useEffect } from 'react'
import ProfileLeft from '../components/Profie/ProfileLeft'
import ProfileMid from '../components/Profie/ProfileMid'
import ProfileRight from '../components/Profie/ProfileRight'
import { UserContext } from '../store/userContext'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as UserApi from '../api/UserRequest'

function Profile() {
  const[userr,setUserr]=useState(null);
  const { user } = useSelector((state) => state.AuthReducer.authData);
     const {username}=useParams();
    useEffect(()=>{        
          const fetchprofileUser = async ()=>{
            if(username === user.username){
              setUserr(user)           
            }
            else{        
              const profileuser=await UserApi.getUser(username);      
              setUserr(profileuser.data);
            }
          }
          fetchprofileUser()
    },[username,user])
   
    if(user === null){
      return (<div>Loading</div>)
    }



  return (
    <UserContext.Provider value={userr}>
      <div className=' grid grid-cols-7  grid-flow-col gap-4  rounded-md '>
        <div className='  col-span-2  '>
          <ProfileLeft />
        </div>
        <div className=' col-span-3'>
          <ProfileMid />
        </div>
        <div className='  col-span-2'>
          <ProfileRight />
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default Profile