import React, { useContext, useState, useEffect } from "react"
import axios from 'axios';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login(username, password) {
        console.log()
        axios.post('/user/authenticate', {
            username: username,
            password: password
        }).then((res) => {
            setCurrentUser(res.data);
        }).catch((error) => {
        });

    }

    function logout() {
        console.log()
        axios.post('/user/revoke-token').then((res) => {
            setCurrentUser(null);
            
        }).catch((error) => {
            setCurrentUser(null);
        });

    }

    useEffect(() => {

        axios.get('/user/info').then((res) => {
            setCurrentUser(res.data);
            setLoading(false);
        }).catch((error) => {
            // console.log(error);
            setLoading(false);
        });
        
    }, [])

    const value = {
        currentUser,
        login,
        logout
    }

   return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}