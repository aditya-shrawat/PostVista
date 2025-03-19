import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import { Link, Outlet } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";

const LayoutPage = () => {
  const [recentBookmarks, setRecentBookmarks] = useState([]);
  const [loadingrecentBookmarks, setLoadingrecentBookmarks] = useState(true);
  const [recommendedAccounts, setRecommendedAccounts] = useState([]);
  const [loadingRecommendedAccounts, setLoadingRecommendedAccounts] = useState(true);

  const fetchRecentBookmarks = async () => {
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/recent/bookmarks`, {
        withCredentials: true,
      });
      setRecentBookmarks(response.data.recentBookmarks);
    } catch (error) {
      console.log("Error in fetching recent bookmarks - ", error);
    } finally {
      setLoadingrecentBookmarks(false);
    }
  };

  const fetchRecommendedAccounts = async () => {
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/recommend/accounts`, {
        withCredentials: true,
      });
      setRecommendedAccounts(response.data.recommendAccounts);
    } catch (error) {
      console.log("Error in fetching recommended accounts - ", error);
    } finally {
      setLoadingRecommendedAccounts(false);
    }
  };

  useEffect(() => {
    fetchRecentBookmarks();
    fetchRecommendedAccounts();
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto">
        <Header />
        <div className=" w-screen lg:max-w-[1200px] lg:m-auto flex relative">
          <div className="max-w-[730px] w-full min-h-screen m-auto lg:m-0 ">
            <Outlet />
          </div>

          <div className="hidden lg:flex flex-1 w-full min-w-[370px] max-w-[470px] h-screen sticky top-0 border-l-[1px] ">
            <div className="w-full">
              <div className="pl-7 pr-5 relative">
                <div className="h-14 pb-2 pt-3 ">
                  <div className="flex items-center w-full px-2 border-[1px] rounded-3xl h-full overflow-hidden">
                    <IoSearchSharp className="mr-1 text-2xl" />
                    <input
                      type="text"
                      className="px-2 py-1 w-full text-lg bg-transparent outline-none border-none"
                    />
                  </div>
                </div>

                <div className="w-full border-[1px] rounded-2xl p-3 px-4 mt-7 ">
                  <h2 className="text-lg font-bold mb-2">Who to follow</h2>
                  {loadingRecommendedAccounts &&
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="w-full flex mb-5">
                        <div className="w-auto">
                          <div className="skeleton h-12 w-12 mr-3 shrink-0 rounded-full"></div>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="w-full ">
                            <div className="skeleton w-[70%] h-4 mb-2"></div>
                            <div className="skeleton w-[60%] h-4"></div>
                          </div>
                          <div className="w-auto">
                            <div className="skeleton w-20 h-8 ml-3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {!loadingRecommendedAccounts && (
                    <>
                      {recommendedAccounts.map((account) => (
                        <RecomendedAccountComponent
                          key={account._id}
                          account={account}
                        />
                      ))}
                      <div className=" inline-block p-1 mt-1 font-semibold hover:underline cursor-pointer">
                        See more...
                      </div>
                    </>
                  )}
                </div>

                { (recentBookmarks.length>0) && 
                <div className="w-full border-[1px] rounded-2xl p-3 px-4 mt-7 ">
                  <h2 className="text-lg font-bold mb-2">Recently saved</h2>
                  {loadingrecentBookmarks &&
                    [...Array(2)].map((_, index) => (
                      <div key={index} className="w-full mb-4">
                        <div className="w-full flex items-center mb-2">
                          <div className="skeleton h-7 w-7 mr-3 shrink-0 rounded-full"></div>
                          <div className="skeleton w-[50%] h-4"></div>
                        </div>
                        <div className="w-full">
                          <div className="skeleton w-full h-4 mb-2"></div>
                          <div className="skeleton w-full h-4"></div>
                        </div>
                      </div>
                    ))}

                  {!loadingrecentBookmarks && (
                    <>
                      {recentBookmarks.map((post) => (
                        <RecomendedRecentPostComponent
                          key={post._id}
                          post={post}
                        />
                      ))}
                      <Link
                        to={`/my/bookmarks`}
                        className=" inline-block p-1 font-semibold hover:underline cursor-pointer"
                      >
                        See more...
                      </Link>
                    </>
                  )}
                </div>
                }
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

const RecomendedAccountComponent = ({ account }) => {
  const [followStatus, setFollowStatus] = useState(false);
  const [isYourAccount, setIsYourAccount] = useState(false);

  const checkFollowStatus = async () => {
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.get(`${BackendURL}/user/${account._id}/follow/status`,
        { withCredentials: true }
      );
      setFollowStatus(response.data.isFollowed);
      setIsYourAccount(response.data.isYou);
    } catch (error) {
      console.log("Error in checking Followe status -", error);
    }
  };

  useEffect(() => {
    checkFollowStatus();
  }, []);

  const toggleFollowStatus = async () => {
    try {
      const BackendURL = import.meta.env.VITE_backendURL;
      const response = await axios.post(`${BackendURL}/user/${account._id}/follower`,{},
        { withCredentials: true }
      );
      checkFollowStatus();
    } catch (error) {
      console.log("Error in toggling FollowStatus -", error);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full py-2 my-1 flex cursor-pointer ">
        <Link to={`/${account.username}`}>
          <div className=" h-12 w-12 bg-gray-500 rounded-full cursor-pointer border-[1px] overflow-hidden ">
            <img src={account.profilePicURL} className="h-full w-full object-cover"/>
          </div>
        </Link>
        <div className="w-full ml-4 ">
          <div className="w-full flex">
            <Link to={`/${account.username}`} className="w-full flex flex-col  ">
              <h1 className=" text-lg font-semibold hover:underline line-clamp-1 break-words font-plex">
                {account.name}
              </h1>
              <h1 className=" text-gray-500 text-base line-clamp-1 break-words font-plex">{`@${account.username}`}</h1>
            </Link>
            <div>
              <button onClick={toggleFollowStatus}
                className={`ml-4 ${followStatus?'bg-gray-100 text-black hover:bg-gray-200 border-2':
                'bg-green-500 hover:bg-green-600 text-white border-none'} rounded-xl 
                px-3 py-1 font-semibold cursor-pointer text-[14px] block `}>
                {(followStatus)?'Following':'Follow'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecomendedRecentPostComponent = ({ post }) => {
  return (
    <div className="w-full py-2 my-1 flex cursor-pointer  ">
      <Link to={`/post/${post._id}`} className="w-full">
        <div className="w-full ">
          <div className="flex items-center mb-2">
            <div className="block bg-gray-500 h-6 w-6 rounded-full mr-3 cursor-pointer border-[1px] overflow-hidden ">
              <img
                src={post.createdBy.profilePicURL}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-auto cursor-pointer ">
              <div className="flex items-baseline">
                <h1 className=" font-semibold text-black hover:underline line-clamp-1 break-words font-plex">
                  {post.createdBy.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <h1 className="text-lg font-bold line-clamp-2 break-words font-plex">
              {post.body}
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LayoutPage;
