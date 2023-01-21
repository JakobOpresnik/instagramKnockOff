import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';

function PhotosSorted() {

    const [photos, setPhotos] = useState([]);
    useEffect(function() {
        const getPhotos = async function() {
            const res = await fetch("http://localhost:3001/photos/sorted");
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();
    }, []);

    return (
        <div>
            <h3 id="sorted-title">PHOTOS SORTED BY LIKES</h3>
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

export default PhotosSorted;