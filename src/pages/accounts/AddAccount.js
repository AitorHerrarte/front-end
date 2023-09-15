import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddAccountPage() {
  const [newAccountData, setnewAccountData] = useState({
    accountName: "",
    balance: "",
  });
  const [accounts, setAccounts] = useState ([]);
  const navigate = useNavigate();


  const getAccountData = async () => {
    try {
      const response = await axios.get("http://localhost:4003/accounts/getAccountUser")
      setAccounts(response.data);
    }catch(error){
      console.log("error al obtener las accounts del usuario", error);
    }
  }

  const addAccount = async () => {
    getAccountData();
    try {
      const response = await axios.post(
        `http://localhost:4003/accounts/addAccount/`,
        newAccountData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      getAccountData();
      console.log("Respuesta del backend:", response.data);
    } catch (error) {
      console.error("Error al añadir la account", error);
      // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario, etc.
    }

    
  };
    useEffect(() => {
    getAccountData();
  }, []);
  const handleAddAccount = (accounts) => {
    addAccount(accounts);
    toast.success("you added ur account correctly");
    getAccountData();
    navigate('/Accounts')
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setnewAccountData({ ...newAccountData, [name]: value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AttachMoneyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add new account
          </Typography>
          <Box
            component="form"
            onSubmit={() => handleAddAccount(newAccountData)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              label="Account"
              type="text"
              name="accountName"
              value={newAccountData.accountName}
              required
              fullWidth              
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Balance"
              name="balance"
              value={newAccountData.balance}
              onChange={handleInputChange}
              type="number"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
