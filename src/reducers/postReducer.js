const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
) => {
    switch (action.type) {
        case "POST_START":
            return { ...state, loading: true, error: false };
        case "POST_SUCCESS":
            console.log(action);
            return { ...state, posts: [action.data, ...state.posts], loading: false, error: false };
;
        case "POST_FAIL":
            return { ...state, loading: false, error: true };

        case "RETREIVING_START":
            return { ...state, loading: true };
        case "RETREIVING_SUCCESS":
            return { ...state, loading: false, posts: action.payload };
        case "RETREIVING_FAIL":
            return { ...state, loading: false, error: action.error }; 
        case "POST_LIKED":
            return {
                ...state,
                posts: state.posts.map(post =>
                    post.postId === action.payload.postId
                        ? {
                            ...post,
                            likes: post.likes.includes(action.payload.userId)
                                ? post.likes.filter(id => id !== action.payload.userId) // Unlike
                                : [...post.likes, action.payload.userId] // Like
                        }
                        : post
                ),
            };   
        default:
            return state;
    }
};

export default postReducer;
