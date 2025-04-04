import * as UserApi from "../api/UserRequest";


export const updateUser = ( formData) => async (dispatch) => {
    dispatch({ type: "UPDATING_START" })
    try {
        const { data } = await UserApi.updateUser(formData);
        const qq = JSON.parse(localStorage.getItem("profile"));
        qq.user=data;
        dispatch({ type: "UPDATING_SUCCESS", data: qq })
    }
    catch (error) {
        dispatch({ type: "UPDATING_FAIL" })
    }
}


export const followUnfollowUser = (username) => async (dispatch) => {    
   const {data}= await UserApi.followUnfollowUser(username)
   const qq = JSON.parse(localStorage.getItem("profile"));
   qq.user=data;
   console.log(data)
   dispatch({ type: "UNFOLLOW_USER",data:qq})
}