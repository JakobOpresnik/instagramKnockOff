import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';
import { Navigate } from 'react-router';

function Photos() {

    const [photos, setPhotos] = useState([]);
    useEffect(function() {
        const getPhotos = async function() {
            const res = await fetch("http://localhost:3001/photos");
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos();
    }, []);

    const [tag, setTag] = useState([]);
    const [searched, setSearched] = useState(false);
    async function Search(e) {
        e.preventDefault();
        setSearched(true);
    }

    return (
        <div>
            <div>
                <h4 id="search-photos">SEARCH PHOTOS BY TAG</h4>
                <form id="search-photos" onSubmit={Search}>
                    { searched ? <Navigate replace to = {"/photos/tags/"+tag} /> : "" }
                    <input type="text" name="tags" placeholder="Tag" onChange={(e) => {setTag(e.target.value)}}></input>
                    <input className="btn btn-primary m-1" type="submit" name="submit" value="SEARCH"></input>
                </form>
            </div>
            <ul>
                {photos.map(photo => (
                    <div className="photo" key={photo._id}>
                        { photo.flags < 3 ?
                            <>
                                <Link to={"/photos/"+photo._id}>
                                    <Photo photo={photo} key={photo._id}></Photo>
                                </Link>
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Photos;
