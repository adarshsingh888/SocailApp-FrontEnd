import React from 'react'
import InfoCard from './InfoCard'
import LogoSearch from '../ProfileSide/LogoSearch'
import Followed from './Followed';
import { UserContext } from '../../store/userContext';
import { useContext } from 'react';
function ProfileLeft() {
  const user=useContext(UserContext);
  console.log(user)
  return (
    <div className='h-screen w-full flex flex-col '>
      {/* <LogoSearch /> */}
      <InfoCard />
      <Followed />

    </div>
  )
}

export default ProfileLeft