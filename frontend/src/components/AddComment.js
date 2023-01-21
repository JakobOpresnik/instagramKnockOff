import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';
import { useParams } from "react-router-dom";

function AddComment() {

    const { id } = useParams();

    const userContext = useContext(UserContext);
    const [contents, setContents] = useState("");
    const [uploaded, setUploaded] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        if (!contents) {
            alert("Provide a comment!");
            return;
        }
        const res = await fetch('http://localhost:3001/comments', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                commentedOn: id
            })
        });
        const data = await res.json();
        setUploaded(true);
    }

    return (
        <form id="comment-form" className="form-group" onSubmit={onSubmit}>
            { !userContext.user ? <Navigate replace to = "/login" /> : "" }
            { uploaded ? <Navigate replace to = {"/photos/"+id} /> : "" }
            <textarea className="form-control" name="contents" placeholder="Contents" value={contents} onChange={(e) => {setContents(e.target.value)}} rows="10" cols="50"/>
            <input className="btn btn-primary" type="submit" name="submit" value="ADD COMMENT"/>
        </form>
    );
}

export default AddComment;