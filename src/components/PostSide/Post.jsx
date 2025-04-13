import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { likedPost } from '../../api/PostRequest';
import { likePost } from '../../actions/PostAction';
import EditModel from './EditModel';
function Post({ postData }) {
    const { des, userId, image, postId, createdAt, likes } = postData;
    const { user } = useSelector((state) => state.AuthReducer.authData);
    const [liked, setLiked] = useState(likes !== null ? likes.includes(user.id) : false);
    const [modelOpen, setModelOpen] = useState(false);
    const [countlikes, setcountLikes] = useState(likes !== null ? likes.length : 0);
    const dispatch = useDispatch();
    const isEdit = user.id === userId;
    // console.log(isEdit)
    // console.log(user.id)
    // console.log(userId)
    const handlePostLiked = async () => {
        dispatch(likePost(postData._id, user._id))
        setcountLikes((prev) => (liked ? prev - 1 : prev + 1));
        setLiked((prev) => !prev);
        likedPost(postId);

    };
    return (
        <div className="bg-white rounded-lg shadow-md w-full max-w-lg mx-auto mb-6">
            {/* Header - User Info */}
            {/* <div className="flex items-center px-4 py-3">
                <img
                    src={`https://api.dicebear.com/6.x/bottts/svg?seed=${userId}`} 
                    alt="Profile"
                    className="h-10 w-10 rounded-full border mr-3"
                />
                <div>
                    <p className="font-semibold text-gray-800">{userId}</p>
                    <p className="text-xs text-gray-500">{new Date(createdAt).toLocaleString()}</p>
                </div>
            </div> */}

            {/* Post Image */}
            {image && (
                <img src={image} alt="Post" className="w-full max-h-[400px] object-cover" />
            )}

            {/* Likes & Description */}
            <div className="px-4 ">
               
                <p className="text-sm text-gray-800 mt-1 pr-4 break-words ">
                    {/* <span className="font-semibold">{userId} </span> */}
                    {des}
                </p>
            </div>

            {/* Icons Section */}
            <div className="flex justify-between items-center px-4 py-3">
                <div className="flex space-x-4">
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`cursor-pointer text-xl ${liked ? "text-red-500" : "text-gray-700"}`}
                        onClick={handlePostLiked}
                    />
                    <FontAwesomeIcon icon={faComment} className="cursor-pointer text-xl text-gray-700" />
                    <FontAwesomeIcon icon={faPaperPlane} className="cursor-pointer text-xl text-gray-700" />
                    {/* {isEdit && <button onClick={() => setModelOpen(true)}>Edit</button>} */}
                </div>
            </div>
            {/* Likes & Description */}
            <div className="px-4 pb-3">
                <p className="text-sm font-semibold">{countlikes} likes</p>
                
            </div>

            <div>
                <EditModel modelOpen={modelOpen} setModelOpen={setModelOpen} />
            </div>
        </div>
    );
}

export default Post;
