import React, { useEffect, useState } from 'react';
import User from './User';
import { getUnfollowedUser } from '../../api/UserRequest.js';
import { useSelector } from 'react-redux';

function Follower() {
  const [person, setPerson] = useState([]);
  const { user } = useSelector((state) => state.AuthReducer.authData) || {};

  useEffect(() => {
    const fetchUnfollowedUsers = async () => {
      try {
        const response = await getUnfollowedUser();
        const { data } = response;
        setPerson(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUnfollowedUsers();
  }, []);

  useEffect(() => {
    console.log("Updated Person State:", person);
  }, [person]);

  return (
    <div className="bg-white w-full rounded-3xl pb-2 flex flex-col flex-grow items-center overflow-hidden">
      <h2 className="font-bold text-2xl m-2">People you might know.</h2>
      <div className="flex flex-col w-full flex-grow overflow-y-auto hide-scrollbar">
        {person.length > 0 ? (
          person.map((person,id) =>
           <User key={id} person={person} /> 
          )
        ) : (
          <p className="text-gray-500 text-center p-2">No suggestions available.</p>
        )}
      </div>
    </div>
  );
}

export default Follower;
