import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail/UserDetail";
import UserList from "./components/UserList/UserList";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import Login from "./components/Login/login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";

const App = (props) => {
  let [value, setValue] = useState(0); // integer state
  const forceUpdateCb = () => setValue((value) => value + 1);

  const [context, setContext] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              context={context}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              forceUpdateCb={forceUpdateCb}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {currentUser ? <UserList /> : <></>}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            {/* Content Area */}
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="/"
                  element={<Login setCurrentUser={setCurrentUser} />}
                />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/users/:userId"
                  element={
                    <UserDetail
                      setContext={setContext}
                      currentUser={currentUser}
                    />
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <UserPhotos
                      setContext={setContext}
                      currentUser={currentUser}
                      value={value}
                      forceUpdateCb={forceUpdateCb}
                    />
                  }
                />
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;