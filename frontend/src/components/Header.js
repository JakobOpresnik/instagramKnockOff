import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

function Header(props) {
    return (
        <header>
            <h1 id="page-title">{props.title}</h1>
            <nav id="header">
                <ul id="header-links">
                    <li><Link to="/">HOME</Link></li>
                    <UserContext.Consumer>
                        {context => (
                            context.user ?
                                <>
                                    <li><Link to="/publish">PUBLISH</Link></li>
                                    <li><Link to={"/profile/"+context.user._id}>PROFILE</Link></li>
                                    <li><Link to="/logout">LOGOUT</Link></li>
                                </>
                            :
                                <>
                                    <li><Link to="/login">LOGIN</Link></li>
                                    <li><Link to="/register">REGISTER</Link></li>
                                </>
                        )}
                    </UserContext.Consumer>
                    <li><Link to="/photos/sorted">POSTS SORTED BY LIKES</Link></li>
                    <hr/>
                </ul>
            </nav>
        </header>
    );
}

export default Header;