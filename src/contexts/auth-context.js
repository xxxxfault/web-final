import React, {createContext, useContext, useEffect, useState} from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {auth} from "../firebase-config";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    //
    //  onAuthStateChanged(auth,(user) => {
    //     setCurrentUser(user);
    // })

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signout = () => {
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe=
        onAuthStateChanged(auth,(user) => {
            console.log(user);
            setCurrentUser(user);
        })
        return ()=>{
            unsubscribe();
        }
    }, [])


    const value = { currentUser, signup, login, signout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}



export const useAuth = () => {
    return useContext(AuthContext)
}