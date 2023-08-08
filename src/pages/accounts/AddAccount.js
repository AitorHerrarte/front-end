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
import { useState } from "react";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [newAccountData, setnewAccountData] = useState({
    accountName: "",
    balance: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    // const getBalanceData = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:4003/orders`);
    //       //   setPrice(response.data.price);
    //       //   setIncome(response.data.income);
    //       setbalance(response.data);
    //     } catch (error) {
    //       console.error("Error al obtener las ordenes del usuario", error);
    //     }
    //   };

    // const addBalanceToUser = async () => {
    //   try {
    //     const response = await axios.post(
    //       `http://localhost:4003/orders/addOrder/`,
    //       newBalanceData,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    //         },
    //       }
    //     );
    //     getBalanceData();
    //     console.log("Respuesta del backend:", response.data);
    //   } catch (error) {
    //     console.error("Error al agregar la orden:", error);
    //     // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario, etc.
    //   }
    // };

    //   const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setnewBalanceData({ ...newBalanceData, [name]: value });
    //   };
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
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="Account"
              label="Account"
              type="text"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Balance"
              name="Balance"
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
