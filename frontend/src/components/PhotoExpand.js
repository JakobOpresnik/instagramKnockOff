import '../App.css';
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import Comment from './Comment';
import { UserContext } from '../userContext';

function PhotoExpand() {

    // gets the parameter from the URL
    const { id } = useParams();

    const [photo, setPhoto] = useState([]);
    const [user, setUser] = useState([]);
    const [comments, setComments] = useState([]);
    const userContext = useContext(UserContext);
    const [error, setError] = useState([]);
    const [liked, setLiked] = useState(false);
    const [flagged, setFlagged] = useState(false);
    const [likeButtonText, setLikeButtonText] = useState("ADD A LIKE"); // text on the like button

    useEffect(function() {
        const getPhoto = async function() {
            const res = await fetch("http://localhost:3001/photos/"+id);
            const data = await res.json();
            setPhoto(data);
        }
        getPhoto();
    }, []);

    /**
     * fetches the route which updates the likes of the photo
     * waits for response and updates the photo here (setPhoto)
     */
    async function AddLike(e) {
        e.preventDefault();
        // user must be logged in to like a photo
        if (userContext.user && !liked) {
            const res = await fetch('http://localhost:3001/photos/like/'+id);
            const data = await res.json();
            setPhoto(data);
            setLiked(true);
            setLikeButtonText("REMOVE LIKE");
        }
        else if (!userContext.user) {
            setError("YOU HAVE TO LOGIN TO LIKE A PHOTO");
        }
        else if (liked) {
            //setError("YOU HAVE ALREADY LIKED THIS PHOTO");
            const res = await fetch('http://localhost:3001/photos/unlike/'+id);
            const data = await res.json();
            setPhoto(data);
            setLiked(false);
            setLikeButtonText("ADD A LIKE");
        }
    }

    // get all comments to this photo
    useEffect(function() {
        const getComments = async function() {
            const res = await fetch("http://localhost:3001/comments/"+id);
            const data = await res.json();
            setComments(data);
        }
        getComments();
    }, []);

    // find user who posted the photo
    useEffect(function() {
        const getUser = async function() {
            const res = await fetch("http://localhost:3001/users/"+photo.postedBy);
            const data = await res.json();
            setUser(data);
            console.log(data);
        }
        getUser();
    }, []);

    console.log("http://localhost:3001/users/"+photo.postedBy)
    console.log(user);

    async function AddFlag(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/photos/flag/"+id);
        const data = await res.json();
        setFlagged(true);
        setPhoto(data);
    }

    // get each tag from tags array
    function getTags(tags) {
        let tagsArray = [];
        for (var i in tags) {
            tagsArray.push(<button className="btn btn-primary m-1">{tags[i]}</button>);
        }
        return tagsArray;
    }


    return (
        <div id="photo-expand-div" className="card text-dark">
            <h5 className="card-title p-2 m-2"><b>{photo.name}</b></h5>
            <img className="card-img" src={"http://localhost:3001/"+photo.path} alt={photo.name}/>
            <div className="photo-info p-1">
                <h5 className="text-dark m-2">{photo.caption}</h5>
                <h4 className="m-1">{getTags(photo.tags)}</h4>
                <h5 className="text-dark m-2">Posted by <b>{user.username}</b></h5>
                <h5 className="text-dark m-2">VIEWS: {photo.views}</h5>
                <h5 className="text-dark m-2">LIKES: {photo.likes}</h5>
                <h5 className="text-dark m-2">FLAGS: {photo.flags}</h5>
                <h5>{error}</h5>
                <h5 className="text-dark m-2">{photo.date_time}</h5>
                <Link to={"/comment/"+id}><button className="btn btn-primary text-white m-2">ADD COMMENT</button></Link>
                <button onClick={AddLike} className="btn btn-warning m-2">{likeButtonText}</button>
                <button onClick={AddFlag} className="btn btn-danger m-2">FLAG POST</button>
            </div>
            <ul id="comments-list">
                {comments.map(comment => (<Comment comment={comment} key={comment._id}></Comment>))}
            </ul>
        </div>
    );

}

export default PhotoExpand;