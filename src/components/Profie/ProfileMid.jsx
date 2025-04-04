import React from 'react'
import PostBody from '../PostSide/PostBody.jsx';
import PostShare from '../PostSide/PostShear.jsx';
import ProfCard from './ProfCard.jsx';

function ProfileMid() {
 

  return (
    <div className='h-screen w-full flex flex-col overflow-y-scroll border hide-scrollbar'>
      <ProfCard />
      <PostShare />
      <PostBody />
    </div>
  )
}

export default ProfileMid;