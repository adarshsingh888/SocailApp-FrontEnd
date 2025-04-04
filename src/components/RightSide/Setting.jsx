import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { deleteUser } from '../../api/UserRequest.js';
function Setting() {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=> state.AuthReducer.authData);
  const handleDelete= async()=>{
    const ress= await deleteUser()
    console.log(ress);
    if(ress.status===200){
      alert("Account Deleted Successfully");
    }
    else{
      alert("Something went wrong");
    }
    dispatch({type:"LOG_OUT"});
  }
  const handelLogOut=()=>{
  dispatch({type:"LOG_OUT"});
  }
  return (
    <div className='bg-white shadow-xl flex-grow p-4'>

      <span className=' m-4 p-2 bg-red-700 text-white rounded-md cursor-pointer'
      onClick={handleDelete}>
        Delete Account
      </span>

      <span className=' m-4 p-2 bg-red-700 text-white rounded-md cursor-pointer'
      onClick={handelLogOut}>
        LogOut
      </span>



    </div>
  )
}

export default Setting