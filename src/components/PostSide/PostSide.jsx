import React from 'react'
import PostShear from './PostShear';
import PosBody from './PosBody';
import PostBody from './PostBody';
import { useParams } from 'react-router-dom';
function PostSide() {
  const { username } = useParams();

  return (
    <div className="h-screen w-full flex flex-col overflow-y-scroll border hide-scrollbar">

      <PostShear />
      {username ? <PostBody /> : <PosBody />}

    </div>


  )
}

export default PostSide;