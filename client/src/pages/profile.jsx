import React from 'react'
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            {JSON.stringify(currentUser)}
        </div>
    )
}

export default Profile
