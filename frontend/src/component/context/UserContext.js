import {useContext,createContext} from 'react'


export const userContext=createContext({
    user:{},
    addUser:()=>{},
    deleteUser:()=>{},
    updateToken:()=>{}
});

export const UserProvider=userContext.Provider

export const useUser=()=>{
    return useContext(userContext)}





