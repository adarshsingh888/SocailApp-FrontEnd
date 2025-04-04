import React, { useContext, useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from '../../store/userContext';
import { getPostByUsername } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

function PostBody() {
  const dispatch = useDispatch();
  const userr = useContext(UserContext);
  const { posts = [] } = useSelector((state) => state.postReducer); // Default to empty array
  const { user } = useSelector((state) => state.AuthReducer.authData) || {}; // Handle potential undefined
  const {username} = useParams(); // Avoid direct access to undefined object
    
  useEffect(() => {
      dispatch(getPostByUsername(username));
    
  }, [dispatch, username, userr?.username]);

  if (!userr) {
    return <div>Loading...</div>;
  }

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
