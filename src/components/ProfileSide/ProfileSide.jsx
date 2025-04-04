import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; // Import the specific brand icon
import LogoSearch from './LogoSearch';
import ProfileCard from './ProfileCard';
import Follower from './Follower';

function ProfileSide() {
  return (
    <div className=' h-screen w-full flex flex-col '>
      {/* <LogoSearch /> */}
      <ProfileCard />
      <Follower />
    </div>
  );
}

export default ProfileSide;
