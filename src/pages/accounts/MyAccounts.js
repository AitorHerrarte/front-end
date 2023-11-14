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
import { AuthContext } from "../../contexts/AuthContext";
import { useState, useEffect, useContext } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ToastContainer, toast } from "react-toastify";

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

export default function MyAccounts() {
  const [open, setOpen] = React.useState(true);
  const [accounts, setAccounts] = useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const { profile, logout, reload, setReload } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleToastFail = () => {
    toast.error("something went wrong !");
  };

  const goAddAccount = () => {
    navigate("/AddAccount");
  };
  const getAccounts = async () => {
    try {
      const response = await axios.get(
        `https://aitorpersonalproyectback.onrender.com/accounts/getAccountUser`,

        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setAccounts(response.data);
    } catch (error) {
      handleDeleteAccount();
    }
  };
  useEffect(() => {
    getAccounts();
    const interval = setInterval(getAccounts, 1000);
    return () => clearInterval(interval);
  }, [reload]);
  const handleDeleteAccount = async (accounts) => {
    try {
      const response = await axios.delete(
        `https://aitorpersonalproyectback.onrender.com/accounts/${accounts._id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      getAccounts();
    } catch (error) {
      handleToastFail();
    }
  };
  const goEditAccount = (accountId) => {
    navigate(`/EditAccount/${accountId}`);
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
              Accounts
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
          <Box
            sx={{
              marginTop: "50px",
              marginLeft: "10px",
            }}
          >
            <Title>My Accounts</Title>
            <Table
              size="small"
              sx={{
                marginTop: "20px",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>ACCOUNT</TableCell>
                  <TableCell>BALANCE</TableCell>
                  <TableCell>BROKER</TableCell>
                  <TableCell align="right">PROFIT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accounts.map((account) => (
                  <TableRow key={account._id}>
                    <TableCell>{account.accountName}</TableCell>
                    <TableCell>{account.balance}</TableCell>
                    <TableCell>{account.broker}</TableCell>
                    <TableCell align="right">{`$${account.profit}`}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteAccount(account)}
                        color="primary"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => goEditAccount(account._id)}
                        color="primary"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <Button
            onClick={goAddAccount}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add account
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
