import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

export const UserContext = createContext()

const User = (props) =>{

    const state = "Rohit"

    return (
        <UserContext.Provider value={state}>
            {props.children}
        </UserContext.Provider>
    )
}

export default User;