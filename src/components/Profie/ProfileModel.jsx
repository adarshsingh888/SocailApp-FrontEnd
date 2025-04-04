import { Modal, useMantineTheme } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateUser } from '../../actions/UserAction.js';


function ProfileModel({ modelOpened, setModelOpened, data }) {

  const theme = useMantineTheme();

  return (
    <>
      <Modal
        opened={modelOpened}
        onClose={() => setModelOpened(false)}
        title="Edit Profile Info"
        centered
        className=''>
        <Form setModelOpened={setModelOpened} id={data} />
      </Modal>
    </>
  );
}

function Form({ setModelOpened }) {
  const { user } = useSelector((state) => state.AuthReducer.authData)
  const { password, ...other } = user
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  // console.log(other)
  const [formData, setFormData] = useState(other);

  const handleSubmit = async (e) => {
    let UserData = formData;
    e.preventDefault();
    if (profileImage) {
      const data = new FormData();

      const fileName = Date.now() + process.env.IMG_CODE;

      data.append("fileName", fileName);
      data.append("file", profileImage);
      data.append("upload_preset", "SocailApp");
      data.append("cloud_name", process.env.CLOUD_NAME);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data
        }
      )
      const uploadedImgUrl = await res.json();
      UserData.profilePicture = uploadedImgUrl.url;
    }
    if (coverImage) {
      const data = new FormData();

      const fileName = Date.now() + process.env.IMG_CODE;
      data.append("fileName", fileName);
      data.append("file", coverImage);
      data.append("upload_preset", "SocailApp");
      data.append("cloud_name", process.env.CLOUD_NAME);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data
        }
      )
      const uploadedImgUrl = await res.json();
      UserData.coverPicture = uploadedImgUrl.url;

    }
    setModelOpened(false)
    dispatch(updateUser(UserData));


  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form
          className="infoForm space-y-6"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Your Info
          </h3>

          {/* Name Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <input
              value={formData.firstname}
              onChange={handleChange}
              type="text"
              placeholder="First Name"
              name="firstname"
              className="infoInput border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              value={formData.lastname}
              onChange={handleChange}
              type="text"
              placeholder="Last Name"
              name="lastname"
              className="infoInput border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Work Input */}
          <div>
            <input
              value={formData.worksAt}
              onChange={handleChange}
              type="text"
              placeholder="Works at"
              name="worksAt"
              className="infoInput w-full border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Address Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <input
              value={formData.livesIn}
              onChange={handleChange}
              type="text"
              placeholder="Lives in"
              name="livesIn"
              className="infoInput border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              value={formData.country}
              onChange={handleChange}
              type="text"
              placeholder="Country"
              name="country"
              className="infoInput border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Relationship Status */}
          <div>
            <input
              value={formData.relationship}
              onChange={handleChange}
              type="text"
              placeholder="Relationship status"
              name="relationship"
              className="infoInput w-full border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* File Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                onChange={onImageChange}
                className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                name="coverImage"
                onChange={onImageChange}
                className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}


export default ProfileModel; 