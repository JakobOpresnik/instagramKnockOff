//import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./userContext";
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import AddPhoto from './components/AddPhoto';
import Photos from './components/Photos';
import PhotoExpand from './components/PhotoExpand';
import AddComment from './components/AddComment';
import Profile from './components/Profile';
import PhotosSorted from './components/PhotosSorted';
import TaggedPhotos from './components/TaggedPhotos';


function App() {

  const [user, setUser] = useState(localStorage.user ? JSON.parse(localStorage.user) : null);
  const updateUserData = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="App">
          <Header title="vaja4 - React"/>
          <Routes>
            <Route path="/" element={<Photos/>}/>
            <Route path="/photos/sorted" element={<PhotosSorted/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/publish" element={<AddPhoto/>}/>
            <Route path="/photos/:id" element={<PhotoExpand/>}/>
            <Route path="/comment/:id" element={<AddComment/>}/>
            <Route path="/profile/:id" element={<Profile/>}/>
            <Route path="/photos/tags/:tag" element={<TaggedPhotos/>}/>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
