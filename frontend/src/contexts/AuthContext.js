import React, { createContext, useState, useContext, useEffect } from 'react'
import app from'./firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
     onAuthStateChanged, signOut, sendPasswordResetEmail, 
     updateEmail, updatePassword } from "firebase/auth";


const AuthContext = createContext()
export const useAuth = () =>{
    return useContext(AuthContext)
}
//console.log(firebaseConfig)
export  function AuthProvider({children}) {
    // Initialize Firebase
    const auth = getAuth(app);
    console.log(auth)

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            // if (user) {
            // // User is signed in, see docs for a list of available properties
            // // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid;
           
            // } else {
            // // User is signed out
            // } 
        })
        return unsubscribe;
    }, [])
    const addUserToMongo = async(email) =>{
        console.log(email)
        await fetch("/create-user",{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"email": email})
        })
        .then(res => res.json())
        .then((data) =>{
            console.log(data)
       })
    }
    const signup = (email, password) =>{
       return createUserWithEmailAndPassword(auth, email, password);
       
    }
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
     }

    const logout = () =>{
        return signOut(auth);
    }
    const resetPassword = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }
    const updateUserEmail = (email) =>{
        return updateEmail(auth.currentUser, email)
    }
    const updateUserPassword = (password) =>{
        return updatePassword(auth.currentUser, password)
    }
    const value = {
        currentUser,
        signup, 
        login,
        logout,
        resetPassword,
        updateUserEmail,
        updateUserPassword,
        addUserToMongo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
