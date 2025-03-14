import React from 'react'
import PostShear from './PostShear';
import PosBody from './PosBody';
function PostSide() {
  return (
<div className="h-screen w-full flex flex-col overflow-y-scroll border hide-scrollbar">

    <PostShear />
    <PosBody />
  
</div>


  )
}

export default PostSide;