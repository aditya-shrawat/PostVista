import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const UserContext = createContext() ;

const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const BackendURL = import.meta.env.VITE_backendURL
                const response = await axios.get(`${BackendURL}/profile`,{
                    withCredentials: true,
                });
                setUser(response.data) ;
            } catch (error) {
                console.log("Error : ",error);
            }
        }

        fetchUser();
    },[])

  return (
    <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider