import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Image } from "@chakra-ui/react"
import './css/profile.css';

const Profile = () => {
    const { currentUser } = useAuth();

    return (
        <div className="user-profile-wrapper"> 
            <Image src={process.env.PUBLIC_URL + "user-profile-icon.jpg"} className="image-profile-user" />
            <div className="user-profile-text"> 
                Username : {currentUser.username}
            </div>
            <div className="user-profile-text"> 
                Numero de utilizador : {currentUser.userno}
            </div>
            <div className="user-profile-text">
                Grupo do utilizador : {currentUser.grupo}
            </div>
            <div className="user-profile-text">
                Email : {currentUser.email}
            </div>
            {currentUser.ESA ? <div className="user-profile-text">
                Administrador : SIM
            </div> : <div className="user-profile-text">
                Administrador : NAO
            </div> }
           
        </div>
    )
}

export default Profile
