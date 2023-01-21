function Photo(props) {
    return (
        <div id="photo-div" className="card text-dark">
            <h5 className="card-title p-2 m-2"><b>{props.photo.name}</b></h5>
            <img className="card-img" src={"http://localhost:3001/"+props.photo.path} alt={props.photo.name}/>
            <div className="photo-info p-1">
                <h5 className="text-dark m-2">Posted by <b>{props.photo.postedBy.username}</b></h5>
                <h5 className="text-dark m-2">VIEWS: {props.photo.views}</h5>
                <h5 className="text-dark m-2">LIKES: {props.photo.likes}</h5>
                <h5 className="text-dark m-2">FLAGS: {props.photo.flags}</h5>
                <h5 className="text-dark m-2">{props.photo.date_time}</h5>
            </div>
        </div>
    );
}

export default Photo;