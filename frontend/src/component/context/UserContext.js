import {useContext,createContext} from 'react'


export const userContext=createContext({
    user:{
        "id":"lkjdsflds",
        "accessToken":"slkdjfslkjfjds",
        "refresh":"dfljsljfdsjfls",
        "username":"mudasir"
    },
    addUser:()=>{},
    deleteUser:()=>{}
});

export const UserProvider=userContext.Provider

export const useUser=()=>{
    return useContext(userContext)}





