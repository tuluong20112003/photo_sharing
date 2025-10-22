import "./styles.css";
import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UploadForm from "./../UploadForm/UploadForm";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSnackbar } from "notistack";

function TopBar({ context, currentUser, setCurrentUser, forceUpdateCb }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleLogOut = () => {
    setCurrentUser(setCurrentUser);
    localStorage.clear();
    navigate("/");
    enqueueSnackbar("Logout success!", { variant: "success" });
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <span className="context-container" style={{ gap: "16px" }}>
          <Typography variant="h5" color="inherit">
            {currentUser ? `Hi ${currentUser.first_name}!` : "Please Login"}
          </Typography>
          {/* {currentUser ? (
            <UploadForm
              currentUser={currentUser}
              forceUpdateCb={forceUpdateCb}
            />
          ) : (
            <></>
          )} */}
        </span>
        {currentUser ? (
          <span className="context-container">
            <Typography variant="h6" color="inherit">
              {context}
            </Typography>
            <IconButton
              style={{ color: "#fff" }}
              aria-label="logout"
              onClick={handleLogOut}
            >
              <LogoutIcon />
            </IconButton>
          </span>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
