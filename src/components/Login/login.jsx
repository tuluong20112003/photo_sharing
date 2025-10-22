/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import * as authService from "../../ApiService/authService";
import { useSnackbar } from "notistack";

function Login({ setCurrentUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loginFrm, setLoginFrm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    setCurrentUser(undefined);
    localStorage.clear();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(loginFrm);
    if (loginFrm.username === "" || loginFrm.password === "") {
      enqueueSnackbar("Username and password can not be empty!", {
        variant: "error",
      });
      return;
    }
    try {
      const res = await authService.login(loginFrm);
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("token", res.token);
        setCurrentUser(res.user);
        enqueueSnackbar(res.message, { variant: "success" });
        navigate(`/users/${res.user._id}`);
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <p>
          <strong></strong> 
        </p>
        <p>
          
          
        </p>
      </div>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) =>
              setLoginFrm({
                ...loginFrm,
                username: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) =>
              setLoginFrm({
                ...loginFrm,
                password: e.target.value,
              })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to={"/register"}>
                <Typography variant="body2">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default Login;