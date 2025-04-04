import React, { useState,useEffect } from "react";
import logo from "../../public/assets/img/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { signUp, logIn } from "../actions/AuthAction";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [isSignUp, setisSignUp] = useState(true);
  const [isConfirm, setisConfirm] = useState(true);
  const [data, setData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const { authData } = useSelector((state) => state.AuthReducer); // ✅

  useEffect(() => {
    if (authData) {
      navigate("/home"); // ✅ Navigate only after success
    }
  }, [authData, navigate]);


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center p-4 rounded-lg">
        <img src={logo} alt="" className="w-28 mx-2" />
        <div className="p-4">
          <p className="font-bold text-3xl mb-4">Social Media</p>
          <p>Explore the ideas throughout the world</p>
        </div>
      </div>
      <div>
        {isSignUp ? (
          <LogIN setisSignUp={setisSignUp} handleChange={handleChange} data={data} />
        ) : (
          <SignUP setisSignUp={setisSignUp} handleChange={handleChange} isConfirm={isConfirm} data={data} setisConfirm={setisConfirm} />
        )}
      </div>
    </div>
  );
}

function SignUP({ setisSignUp, handleChange, isConfirm, data, setisConfirm }) {
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.AuthReducer)
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmpassword) {

      setisConfirm(false);
    } else {
      dispatch(signUp(data));
      setisConfirm(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              onChange={handleChange} // Ensure `handleChange` updates `data.confirmpassword`
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <span className={isConfirm ? "hidden" : "text-red-700"}>
            ** Confirm Password did not match. **
          </span>
          <span className={error ? "text-red-700" : "hidden"}>
            Username Already exists. Please try another username!
          </span>
          <div
            className="my-2 cursor-pointer"
            onClick={() => setisSignUp(true)}
          >
            Already have an account
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

function LogIN({ setisSignUp, handleChange, data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(data));
    setisSignUp(true);

  }
  const loading = useSelector((state) => state.AuthReducer.loading)
  return (
    <div className="min-h-screen flex items-center justify-center max-w-md">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 my-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <input

          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 my-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <span
          className="my-4 cursor-pointer"
          onClick={() => setisSignUp(false)}
        >
          New User Registration!
        </span>
        <button
          type="submit"

          disabled={loading}
          className={`w-full my-4 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading
            ? "bg-slate-300 hover:bg-slate-600 focus:ring-slate-400"
            : "bg-orange-500 hover:bg-orange-600 focus:ring-orange-400"
            }`}

        >
          {loading ? "Loading..." : "LogIn"}
        </button>
      </form>
    </div>
  );
}

export default Auth;
