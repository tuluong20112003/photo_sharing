import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import * as userService from "../../ApiService/userService";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function Register({ setCurrentUser }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [registrationFrm, setregistrationFrm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(registrationFrm);
    if (registrationFrm.username === "") {
      enqueueSnackbar("Username can not be empty!", { variant: "error" });
      return;
    }
    if (
      registrationFrm.password === "" ||
      registrationFrm.confirmPassword === ""
    ) {
      enqueueSnackbar("Password or Confirm Password can not be empty!", {
        variant: "error",
      });
      return;
    }
    if (
      registrationFrm.first_name.trim() === "" ||
      registrationFrm.last_name.trim() === ""
    ) {
      enqueueSnackbar("First name or last name can not be empty", {
        variant: "error",
      });
      return;
    }
    if (registrationFrm.password !== registrationFrm.confirmPassword) {
      enqueueSnackbar("Password and confirm password does not match!", {
        variant: "error",
      });
      return;
    }
    try {
      const res = await userService.register(registrationFrm);
      enqueueSnackbar(res.message, {
        variant: res.status === 200 ? "success" : "error",
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registration
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
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
            id="password1"
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
                password: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Cofirm Password"
            type="password"
            id="password2"
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
                confirmPassword: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="first_name"
            label="First Name"
            id="first_name"
            fullWidth
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
                first_name: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="last_name"
            label="Last Name"
            id="last_name"
            fullWidth
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
                last_name: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="location"
            label="Location"
            id="location"
            fullWidth
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
                location: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="occupation"
            label="Occupation"
            id="occupation"
            fullWidth
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
                occupation: e.target.value,
              })
            }
          />
          <TextField
            margin="normal"
            name="description"
            label="Description"
            id="description"
            fullWidth
            onChange={(e) =>
              setregistrationFrm({
                ...registrationFrm,
                description: e.target.value,
              })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Register Me
          </Button>
          <Grid container>
            <Grid item>
              <Link to={"/"}>
                <Typography variant="body2">
                  {"Already have an account? Sign in"}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default Register;
