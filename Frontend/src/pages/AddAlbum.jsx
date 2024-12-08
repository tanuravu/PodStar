import React from "react";
import { useSelector } from "react-redux";
import AddAlbumForm from "../components/AddAlbum/AddAlbum"; 
import ErrorPage from "./ErrorPage";

const AddAlbum = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return <div>{isLoggedIn ? <AddAlbumForm /> : <ErrorPage />}</div>;
};

export default AddAlbum;