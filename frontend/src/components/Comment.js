import { useEffect, useState } from "react";

function Comment(props) {

    // get user who posted the comment
    const [user, setUser] = useState([]);
    useEffect(function() {
        const getUser = async function() {
            const res = await fetch("http://localhost:3001/users/"+props.comment.postedBy);
            const data = await res.json();
            setUser(data);
        }
        getUser();
    }, []);

    return (
        <div id="comment-div" className="card text-dark">
            <h5 id="comment-title" className="card-title"><b>{props.comment.contents}</b></h5>
            <hr/>
            <h5 className="text-dark">Posted by <b>{user.username}</b></h5>
            <h5 className="text-dark">{props.comment.date_time}</h5>
        </div>
    );
}

export default Comment;