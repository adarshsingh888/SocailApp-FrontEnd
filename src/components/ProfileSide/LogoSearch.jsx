import React from "react";
import Logo from '../../../public/assets/img/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const LogoSearch = () => {
  return (
    <div className="flex justify-center p-4 self-center "> {/* Ensures full width */}
      <div className="flex flex-grow items-center self-center">
        <img src={Logo} alt="" className="w-10 h-9 mx-2" />
        <div className="flex rounded-full flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <input
            type="text"
            placeholder="#Explore"
            className="px-4 py-2 flex-grow rounded-l-full  "
          />
          <div className="s-icon  flex items-center w-10 bg-gray-200 justify-center rounded-r-full">
            <FontAwesomeIcon icon={faSearch} className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
