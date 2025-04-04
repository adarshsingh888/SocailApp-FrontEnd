import React from 'react'
import PostSide from './PostSide/PostSide'
import ProfileSide from './ProfileSide/ProfileSide'
import RightSide from './RightSide/RightSide'
function Body() {
  return (
    <div className=' grid grid-cols-7  grid-flow-col gap-4  rounded-md '>
      <div className=' col-span-2 '>
        <ProfileSide />
      </div>
      <div className='  col-span-3'>
        <PostSide />
      </div>
      <div className='  col-span-2'>
        <RightSide />
      </div>
    </div>
  )
}

export default Body