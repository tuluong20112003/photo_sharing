/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import "./UserListStyles.css";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import * as userService from "./../../ApiService/userService";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Use Effect in Userlist comp run!");
    const getUsers = async () => {
      const res = await userService.getUsers();
      console.log(res);
      setUsers(res.usersList);
      setLoading(false);
    };
    getUsers();
  }, []);
  return (
    <div>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <List component="nav">
          {users.map((item, index) => (
            <div key={item._id}>
              <ListItem className="item">
                <PersonIcon />
                <Link to={`/users/${item._id}`} underline="none">
                  <ListItemText
                    primary={`${item.first_name} ${item.last_name}`}
                    className="fullname"
                  />
                </Link>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </div>
  );
}

export default UserList;
