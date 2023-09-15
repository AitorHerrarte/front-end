import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import axios from "axios";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, SecondaryListItems } from "../mainMenu/ListItems";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../mainMenu/Title";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useEffect, useContext } from "react";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);

  const { profile,logout, reload, setReload } = useContext(AuthContext);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);
    setEmailError(!isValidEmail(inputValue));
  };
  const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const EmailChange = async () => {
    try {
      await axios.patch(
        "http://localhost:4003/users/updateUser",
        { email: email },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Email cambiado con éxito", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setReload(!reload);
    } catch (error) {
      console.error("Error al actualizar el email", error);
      toast.error(`El email ya está en uso`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const PasswordChange = async () => {
    try {
      await axios.patch(
        "http://localhost:4003/users/updateUser",
        { password: password },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setReload(!reload);

      toast.success("Contraseña actualizada con éxito", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error al actualizar la contraseña", error);
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const NameChange = async () => {
    try {
      await axios.patch(
        "http://localhost:4003/users/updateUser",
        { userName: username },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(`El nombre de usuario cambiado con éxito`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error al actualizar el userName", error);
      toast.error(`El nombre de usuario ya está en uso`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setReload(!reload);
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              PROFILE
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <button onClick={logout}>
              <ExitToAppIcon color="inherit" />{" "}
            </button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems></MainListItems>
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems></SecondaryListItems>
          </List>
        </Drawer>
        <Box
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            width: "200vh",
          }}
        >
          <Container sx={{ marginTop: "50px", marginLeft: "10px" }}>
            <Typography component="h1" variant="h3" sx={{ marginLeft: 60 }}>
              {profile.userName}
            </Typography>
            <Typography component="h1" variant="h3" sx={{ marginLeft: 35 }}>
              {profile.email}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Insertar nuevo email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? "Email incorrecto" : ""}
                  InputProps={{
                    classes: {
                      underline: emailError ? "error-underline" : "",
                    },
                  }}
                />
                <Button onClick={EmailChange} id="myButton">
                  Change
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Insertar nueva contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button onClick={PasswordChange} id="myButton">
                  Change
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="username"
                  label="Insertar nuevo nombre"
                  type="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <Button id="myButton" onClick={NameChange}>
                  Change
                </Button>
              </Box>
              <Grid container>
                <Grid item sx={{ marginTop: "20px" }}></Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
