import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faMapMarkerAlt, faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import {  uploadPost } from '../../actions/uploadAction';
import defaultProfile from '../../../public/assets/img/defaultProfile.png'
function PostShare() {
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState(null)
  const dispatch = useDispatch();

  const user = useSelector((state) => state.AuthReducer.authData);
  const { loading } = useSelector((state) => state.postReducer)
  const imgRef = useRef();
  const imageClicked = () => {
    document.getElementById('fileInput').click();
  };

  // const videoClicked = () => {
  //   imgRef.current.click();
  // };

  const imgChange = (e) => {
    const img = e.target.files[0];
   // console.log(img);
    setImage(img);
  //  console.log(image)
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const newPost = {
      des: desc,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + process.env.IMG_CODE;
      data.append("fileName", fileName);
      data.append("file", image);
      data.append("upload_preset", "SocailApp");
      data.append("cloud_name", process.env.CLOUD_NAME); 
  
      newPost.image = fileName;
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data
        }
      )
      const uploadedImgUrl = await res.json();
      newPost.image=uploadedImgUrl.url;
      


      try {
          await dispatch(uploadPost(newPost));
      
      } catch (error) {
        console.log("Image upload failed:", error);
        return;
      }
    }
  else if(!image){
    try {
      dispatch(uploadPost(newPost));
    } catch (error) {
      console.log("Post upload failed:", error);
    }
    setImage(null)
  };
  }

  return (
    <div className='flex flex-col bg-white m-4 rounded-lg shadow-lg'>
      <div className='flex flex-wrap p-4 justify-center items-center border-b'>
        <img src={user.profilePicture ? process.env.CLOUD_URL + user?.profilePicture + ".png" : defaultProfile} alt="" className='w-10 h-10 rounded-full mr-4' />
        <input
          type="text"
          name='des'
          onChange={(e) => setDesc(e.target.value)}
          placeholder="What's happening?"
          required
          className='px-4 py-2 rounded-full flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div className='flex p-4 justify-around'>
        <button className='flex items-center m-1 text-blue-500 hover:text-blue-700' onClick={imageClicked}>
          <FontAwesomeIcon icon={faImage} className='text-blue-500 mr-2' /> Photo
        </button>
        <button className='flex items-center m-1 text-red-500 hover:text-red-700' >
          <FontAwesomeIcon icon={faVideo} className='text-red-500 mr-2' /> Video
        </button>
        <button className='flex items-center m-1 text-green-500 hover:text-green-700'>
          <FontAwesomeIcon icon={faMapMarkerAlt} className='text-green-500 mr-2' /> Location
        </button>
        <button className='flex items-center m-1 text-yellow-500 hover:text-yellow-700'>
          <FontAwesomeIcon icon={faCalendarAlt} className='text-yellow-500 mr-2' /> Schedule
        </button>
        <button
          className={
            loading
              ? 'border border-black p-2 rounded-lg hover:bg-green-500 hover:text-white transition duration-300'
              : 'border border-slate-400 p-2 rounded-lg hover:bg-slate-500 hover:text-white transition duration-300'
          }
          disabled={loading}
          onClick={handleUpload}
        >
          {loading ? "Sharing... " : "Share"}
        </button>
      </div>

      <input type="file" accept="image/*" className="hidden" id="fileInput" ref={imgRef} onChange={imgChange} />
      {image != null && (
        <div className='relative self-center mt-4 w-52 p-4'>
          <FontAwesomeIcon icon={faTimes} onClick={() => setImage(null)} className='p-2 rounded-full absolute top-0 right-0 cursor-pointer text-white bg-black' />
          <img src={URL.createObjectURL(image)} className='w-full h-auto rounded-lg' />
        </div>
      )}
    </div>
  );
}

export default PostShare;
