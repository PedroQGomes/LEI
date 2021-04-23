import React, { useContext, useState, useEffect } from "react"
import axios from 'axios';
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory();

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
            
            setLoading(false);
        });
        
    }, [])


    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {

        const originalRequest = error.config;
        console.log(error.response);

        if (error.response.status === 401 && !originalRequest._retry && error.response.data !== "refresh token invalid") {

        originalRequest._retry = true;

        return axios.post('/user/refresh-token')
        .then((response) => {
            console.log("new acess token");
            return axios(originalRequest);
      });
  }

  return Promise.reject(error);
});




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