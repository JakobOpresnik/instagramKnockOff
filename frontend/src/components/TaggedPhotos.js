import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';

function TaggedPhotos() {

    const { tag } = useParams();

    const [photos, setPhotos] = useState([]);
    useEffect(function() {
        const getPhotos = async function() {
            const res = await fetch("http://localhost:3001/photos/tags/"+tag);
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();
    }, []);

    return (
        <div>
            <h3 id="tag-title">PHOTOS WITH TAG "{tag}"</h3>
            <ul>
                {photos.map(photo => (
                    <div className="photo" key={photo._id}>
                        <Link to={"/photos/"+photo._id}>
                            <Photo photo={photo} key={photo._id}></Photo>
                        </Link>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default TaggedPhotos;