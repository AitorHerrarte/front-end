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
import { useParams } from "react-router-dom";

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

const defaultTheme = createTheme();

export default function EditAccount({ account }) {

  const { accountId } = useParams();
  const [open, setOpen] = React.useState(true);
  const [broker, setBroker] = useState(account?.broker || "");
  const [name, setName] = useState(account?.accountName || "");
  const [balance, setBalance] = useState(account?.balance || "");
  
  
  const { logout, reload, setReload } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleAccountNameChange = (event) => {
    setName(event.target.value);
  };

  const handleToastFail = () => {
    toast.error("Something went wrong!");
  };


  const nameChange = async () => {
    try {
      await axios.patch(
        `https://aitorpersonalproyectback.onrender.com/accounts/${accountId}/updateAccountName`,
        { accountName: name },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      
  
      toast.success("Account name changed successfully", {
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
      // handleToastFail();
    }
  };

  const handleBrokerChange = (event) => {
    setBroker(event.target.value);
  };

  const brokerChange = async (account) => {
    try {
      await axios.patch(
        `https://aitorpersonalproyectback.onrender.com/accounts/${accountId}/updateAccountBroker`,
        { broker: broker },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
     
  
      toast.success("Broker changed successfully", {
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
      handleToastFail();
    }
  };
  

  const handleBalanceChange = (event) => {
    setBalance(event.target.value);
  };

  const balanceChange = async (account) => {
    try {
      await axios.patch(
        `https://aitorpersonalproyectback.onrender.com/accounts/${accountId}/updateAccountBalance`,
        { balance: balance },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
  
      toast.success(`Balance changed successfully`, {
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
      handleToastFail();
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
              pr: "24px",
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
            <MainListItems />
            <Divider sx={{ my: 1 }} />
            <SecondaryListItems />
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="Account name"
                  label="New account name"
                  name="name"
                  value={name}
                  onChange={handleAccountNameChange}
                />
                <Button onClick={nameChange} id="myButton">
                  Change
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="broker"
                  label="New broker"
                  type="text"
                  id="broker"
                  autoComplete="current-broker"
                  value={broker}
                  onChange={handleBrokerChange}
                />
                <Button onClick={brokerChange} id="myButton">
                  Change
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="balance"
                  label="New balance"
                  type="number"
                  id="balance"
                  value={balance}
                  onChange={handleBalanceChange}
                />
                <Button id="myButton" onClick={balanceChange}>
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
