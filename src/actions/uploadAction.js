import * as UploadApi from '../api/UploadRequest'


export const uploadPost = (newPost) => async (dispatch) => {
    dispatch({ type: "POST_START" })
    try {
        const { data } = await UploadApi.Post(newPost);
        dispatch({ type: "POST_SUCCESS", data: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: "POST_FAIL" })
    }
}
