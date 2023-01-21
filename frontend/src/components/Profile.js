import '../App.css';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile() {

    const { id } = useParams();

    const userContext = useContext(UserContext);
    const [profile, setProfile] = useState([]);

    useEffect(function() {
        const getProfile = async function() {
            const res = await fetch('http://localhost:3001/users/profile/'+id);
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    return (
        <div id="profile-div" className="card">
            { !userContext.user ? <Navigate replace to = "/login" /> : "" }
            <h1 className="p-1">USER PROFILE</h1>
            <h5 className="p-1">username: {profile.username}</h5>
            <h5 className="p-1">email: {profile.email}</h5>
            <h5 className="p-1">number of posts: {profile.posts}</h5>
            <h5 className="p-1">number of total likes: {profile.total_likes}</h5>
        </div>
    );
}

export default Profile;