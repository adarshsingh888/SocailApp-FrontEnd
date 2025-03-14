import React, { useEffect } from 'react';
import Post from './Post';
import { getAllPost} from '../../actions/PostAction';
import { useSelector, useDispatch } from 'react-redux';

function PostBody() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postReducer); // Default to empty array
  const { user } = useSelector((state) => state.AuthReducer.authData) || {}; // Handle potential undefined

  useEffect(() => {
      dispatch(getAllPost());
    
  }, []);
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((postData, id) => <Post key={id} postData={postData} />)
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
}

export default PostBody;
