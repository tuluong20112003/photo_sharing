/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import * as photoService from "./../../ApiService/photoService";
import * as commentService from "./../../ApiService/commentService";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";

// TESTING
import Post from "../Post/Post";
import UploadForm from "./../UploadForm/UploadForm";
const STATIC_PHOTO_URL = "https://dspjll-8082.csb.app/static/images/";

function UserPhotos(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  console.log(userInfo);

  const setContext = props.setContext;
  let { value, forceUpdateCb } = props;

  const [userPhotos, setUserPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const userPhotosJsx = [];
  const currentUser = props.currentUser;
  console.log("current User", currentUser);
  console.log("User Info");
  useEffect(() => {
    if (!props.currentUser) {
      setLoading(false);
      enqueueSnackbar("Access Denied!", {
        variant: "error",
        preventDuplicate: true,
      });
      navigate("/");
      return;
    }
    const getUserPhotos = async () => {
      const res = await photoService.getPhotosByUserId(userInfo._id);
      if (res.status !== 200) {
        setLoading(false);
        enqueueSnackbar(res.message, {
          variant: "error",
          preventDuplicate: true,
        });
        if (res.status === 401) navigate("/");
      }
      setUserPhotos(res.photosList);
      setLoading(false);
    };
    setContext(`Photo of ${userInfo.first_name + " " + userInfo.last_name}`);
    getUserPhotos();
  }, [value]);

  const handleSendComment = async (photoId) => {
    const currentdate = new Date();
    const payload = {
      comment: comment,
      photoId,
      user_id: props.currentUser._id,
      date_time: currentdate.toUTCString(),
    };
    const res = await commentService.addComment(payload);
    console.log(res);
    if (res.status === 200) {
      // const res = await photoService.getPhotosByUserId(userInfo._id);
      // setUserPhotos(res);
      // forceUpdateCb();
      setUserPhotos(
        userPhotos.map((photo) => {
          if (photo._id === photoId) {
            const comment = { ...res.comment, user: props.currentUser };
            console.log(comment);
            photo.comments.push(comment);
          }
          return photo;
        })
      );
      setComment("");
      enqueueSnackbar("Comment success", { variant: "success" });
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
    // if (e.key === "Enter") {
    // }
  };

  if (userPhotos.length === 0) {
    userPhotosJsx.push(
      <div key={-1}>This user has not uploaded any photos.</div>
    );
  } else {
    for (let photo of userPhotos) {
      const imageSource = STATIC_PHOTO_URL + photo.file_name;
      const imageDateTime = photo.date_time;
      userPhotosJsx.push(
        <div key={photo._id}>
          <Post
            imageUrl={imageSource}
            fullname={userInfo.first_name + " " + userInfo.last_name}
            creationDate={imageDateTime}
            comments={photo.comments}
            photo={photo}
            handleSendComment={handleSendComment}
            setComment={setComment}
            comment={comment}
          />
        </div>
      );
    }
  }
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="photos-container">
          {currentUser._id === userInfo._id ? (
            <UploadForm
              currentUser={currentUser}
              forceUpdateCb={forceUpdateCb}
            />
          ) : (
            <></>
          )}
          {userPhotosJsx}
        </div>
      )}
    </>
  );
}

export default UserPhotos;
