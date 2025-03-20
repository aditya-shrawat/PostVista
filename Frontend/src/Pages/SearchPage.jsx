import React, { useState } from "react";
import Header from "../Components/Header";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
    const [searchQueary,setSearchQueary] = useState('');
    const [searchedAccounts,setSearchedAccounts] = useState([]);

    const searchAccounts = async (e)=>{
        e.preventDefault();
        const value = e.target.value.trim();
        setSearchQueary(value)
        if(value==='') return ;
    
        try {
          const BackendURL = import.meta.env.VITE_backendURL;
          const response = await axios.get(`${BackendURL}/search?query=${value}`,{withCredentials:true})
          setSearchedAccounts(response.data.accounts)
        } catch (error) {
          console.log("Error while searching users: ",error)
        }
    }

  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full">
        <div className="w-full px-6 py-5 overflow-y-auto relative">
          <div className="flex items-center w-full px-2 py-2 border-[1px] rounded-3xl ">
            <IoSearchSharp className="mr-1 text-2xl" />
            <input type="text" onChange={searchAccounts} value={searchQueary}
              placeholder="Search"
              className="px-2 py-1 w-full text-lg bg-transparent outline-none border-none"
            />
          </div>

          {searchedAccounts.length !== 0 && (
            <div className="w-full h-full mt-4">
              {searchedAccounts.map((account) => {
                return (
                  <div key={account._id} className="w-full px-1 py-2 my-1 flex items-center cursor-pointer rounded-lg hover:bg-gray-100 ">
                    <Link to={`/${account.username}`}>
                      <div className=" h-10 w-10 bg-gray-500 rounded-full cursor-pointer border-[1px] overflow-hidden ">
                        <img src={account.profilePicURL} className="h-full w-full object-cover" />
                      </div>
                    </Link>
                    <div className="w-full ml-4 ">
                      <div className="w-full ">
                        <Link to={`/${account.username}`}
                          className="w-full flex flex-col  ">
                          <h1 className=" text-base font-semibold hover:underline line-clamp-1 break-words font-plex">
                            {account.name}
                          </h1>
                          <h1 className=" text-gray-500 text-[14px] line-clamp-1 break-words font-plex">{`@${account.username}`}</h1>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
