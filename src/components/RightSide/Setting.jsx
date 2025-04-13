import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../api/UserRequest.js';
import { useNavigate } from 'react-router-dom';
function Setting() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer.authData);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    try {
      if (!user || !user.username) {
        alert("User not found. Please try again.");
        return;
      }

      // ✅ Disable button to prevent multiple clicks
      setIsDeleting(true);

      // ✅ Call deleteUser without passing ID (since backend extracts it from token)
      const ress = await deleteUser();
      console.log("Delete response:", ress);

      if (ress.status === 200) {
        alert("Account Deleted Successfully");

        // ✅ Dispatch LOG_OUT before navigating
        dispatch({ type: "LOG_OUT" });

        navigate("/auth"); // ✅ Redirect to login/auth page
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting account:", error.response?.data || error.message);
      alert("Failed to delete account. Try again later.");
    } finally {
      setIsDeleting(false); // Re-enable button after error
    }
  };
  const handelLogOut = () => {
    navigate("/");
    localStorage.removeItem("profile");
    dispatch({ type: "LOG_OUT" });
  }
  return (
    <div className='bg-white shadow-xl flex-grow p-4'>

      <button onClick={handleDelete} disabled={isDeleting} className=' m-4 p-2 bg-red-700 text-white rounded-md cursor-pointer'>
        {isDeleting ? "Deleting..." : "Delete Account"}
      </button>


      <span className=' m-4 p-2 bg-red-700 text-white rounded-md cursor-pointer'
        onClick={handelLogOut}>
        LogOut
      </span>
    </div>
  )
}

export default Setting