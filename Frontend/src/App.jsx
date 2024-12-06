import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import Home from "./pages/Home";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import { useEffect } from 'react';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {authActions} from "./store/auth";
import AddPodcast from './pages/AddPodcast';
import AllPodcasts from './pages/AllPodcasts';
import CategoriesPage from './pages/CategoriesPage';
import DescriptionPage from './pages/DescriptionPage';
import FavoritesPage from './pages/FavoritesPage';
import AllAlbums from './pages/AllAlbums';
import AddAlbum from './pages/AddAlbum';
const App = () => {
  const dispatch= useDispatch();
  useEffect(() =>{
    const fetch = async()=> {
    try {
        const res= await axios.get("http://localhost:8080/api/v1/check-cookie", {withCredentials:true});
        if(res.data.message){
          dispatch(authActions.login());
        }; /* console.log(res.data.message); */
    } catch (error) {
      console.log(error);
    }
    };
    fetch();
  }, []);
  
  return (
    <div className="">
      <Router>
        <Routes >
          <Route path="/" element={<MainLayout/>}>
            {" "}
            <Route index element={<Home/>} />
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/add-podcast" element={<AddPodcast/>}/>
            <Route path="/all-podcasts" element={<AllPodcasts/>}/>
            <Route path="/categories/:cat" element={<CategoriesPage/>}/>
            <Route path="/description/:id" element={<DescriptionPage/>}/>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/all-albums" element={<AllAlbums/>}/>
            <Route path="/add-album" element={<AddAlbum/>}/>

          </Route>
          <Route path="/" element={<AuthLayout/>}>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
          </Route> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;