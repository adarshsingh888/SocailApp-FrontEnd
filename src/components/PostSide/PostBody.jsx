import React, { useContext, useEffect } from 'react';
import Post from './Post';
import { getAllPost, getTimelinePosts } from '../../actions/PostAction';
import { useSelector, useDispatch } from 'react-redux';
import { UserContext } from '../../store/userContext';

function PostBody() {
  const dispatch = useDispatch();
  const userr = useContext(UserContext);
  const { posts = [] } = useSelector((state) => state.postReducer); // Default to empty array
  const { user } = useSelector((state) => state.AuthReducer.authData) || {}; // Handle potential undefined
  const username = user?.username; // Avoid direct access to undefined object

  useEffect(() => {
    if (!username || !userr?.username) return; // Prevent unnecessary execution if values are missing

    if (username === userr.username) {
      dispatch(getAllPost());
    } else {
      dispatch(getTimelinePosts(username));
    }
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
