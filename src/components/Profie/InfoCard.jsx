import React ,{useEffect, useState}from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ProfileModel from './ProfileModel';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js'
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { UserContext } from '../../store/userContext.js';
function InfoCard() {
  const userr=useContext(UserContext)
  const dispatch=useDispatch();
  const [modelOpened,setModelOpened]=useState(false);
  const {user}=useSelector((state)=> state.AuthReducer.authData);
  const username=user.username;
  if(!userr){
    return (
      <div>
        Loading
      </div>
    )
  }
  
  const handelLogOut=()=>{
      dispatch({type:"LOG_OUT"});
  }
  return (
    
    <div className='bg-white my-4 p-4 rounded-2xl flex flex-col shadow-xl'>
         <div className='flex justify-between my-4 mx-2'>
            <p className='font-bold text-lg'>Profile Info</p>      
             {userr.username === username ?  <FontAwesomeIcon icon={faPen} className='cursor-pointer' onClick={()=> setModelOpened(true)}/>:""}
         </div>
         
         <div className='mx-2'>
          <span className='font-bold'>Status</span>
          <span> {userr.relationship ? userr.relationship:""}</span>
         </div>
         <div className='mx-2'>
          <span className='font-bold'>Lives in  </span>
          <span>{userr.livesIn? userr.livesIn:""}</span>
         </div>
         <div className='mx-2'>
            <span className='font-bold'>
              Work at 
            </span>
            <span>
             { " "+userr.worksAt}
            </span>
         </div>
         <div className='m-2 mt-5 '>
          {userr.username ===username &&  <span className='left-0 bg-red-600 text-white rounded-md p-2 cursor-pointer'onClick={handelLogOut}>Logout</span>}
         </div>

         <ProfileModel modelOpened={modelOpened} setModelOpened={setModelOpened} data={user}/>
    </div>
  )
}

export default InfoCard;