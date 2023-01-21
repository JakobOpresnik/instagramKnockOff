import { useContext, useState } from 'react'
import { Navigate } from 'react-router';
import { UserContext } from '../userContext';


function AddPhoto() {

    const userContext = useContext(UserContext);
    const [name, setName] = useState("");
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [tags, setTags] = useState([]);

    async function onSubmit(e) {
        e.preventDefault();
        if (!name) {
            alert("Provide a name!");
            return;
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("caption", caption);
        formData.append("image", file);
        formData.append("tags", tags);
        const res = await fetch('http://localhost:3001/photos', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await res.json();
        setUploaded(true);
    }

    return (
        <form id="photo-form" className="form-group" onSubmit={onSubmit}>
            { !userContext.user ? <Navigate replace to = "/login" /> : "" }
            { uploaded ? <Navigate replace to = "/" /> : "" }
            <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <textarea className="form-control" name="caption" placeholder="Caption" value={caption} onChange={(e) => {setCaption(e.target.value)}} rows="10" cols="50"/>
            <input type="text" className="form-control" name="tags" placeholder="Tags" value={tags} onChange={(e) => {setTags(e.target.value)}}/>
            <label>CHOOSE PHOTO</label><br/>
            <input type="file" id="file" onChange={(e) => {setFile(e.target.files[0])}}/><br/>
            <input className="btn btn-primary" type="submit" name="submit" value="POST"/>
        </form>
    );
}

export default AddPhoto;