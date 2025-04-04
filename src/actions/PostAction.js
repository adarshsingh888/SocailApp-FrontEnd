import * as PostApi from '../api/PostRequest';

export const getPostByUsername = (username) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getPostByUsername(username);
    dispatch({ type: "RETREIVING_SUCCESS", payload: data }); // Ensure you're passing 'payload' here
  } catch (error) {
    dispatch({
      type: "RETREIVING_FAIL",
      error: error.message || 'An error occurred while fetching posts.',
    });
    console.error(error); // For better debugging
  }
};
export const getAllPost = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getAllPost();
    dispatch({ type: "RETREIVING_SUCCESS", payload: data }); // Ensure you're passing 'payload' here
  } catch (error) {
    dispatch({
      type: "RETREIVING_FAIL",
      error: error.message || 'An error occurred while fetching posts.',
    });
    console.error(error); // For better debugging
  }
};


export const likePost = (postId, userId) => ({
  type: "POST_LIKED",
  payload: { postId, userId },
});

