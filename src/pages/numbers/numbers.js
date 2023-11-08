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
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function AddAccountPage() {
  const [newNumberData, setNewNumberData] = useState({
    number: "",
    numberToCalculate: "",
  });
  const [calculatedNumbers, setCalculatedNumbers] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNumberData({ ...newNumberData, [name]: value });
  };

  const addNumber = async () => {
    if (newNumberData.number.trim() !== "") {
      try {
        await axios.post("https://galiyaitormoneyback-a4x7.onrender.com/numbers/addNumber/", {
          numero: newNumberData.number,
        });
        setNewNumberData({ ...newNumberData, number: "" });
      } catch (error) {
        handleToastFail();
      }
    }
  };

  const searchResults = async () => {
    if (newNumberData.numberToCalculate.trim() !== "") {
      try {
        const response = await axios.get(
          `https://galiyaitormoneyback-a4x7.onrender.com/numbers/getAllNextNumbers/${newNumberData.numberToCalculate}`
        );
        setCalculatedNumbers(response.data.allNextNumbers);
      } catch (error) {
        handleToastFail();
      }
    }
  };

  const handleToastFail = () => {
    toast.error("something went wrong !");
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
            RULETA
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              label="Numero"
              type="text"
              name="number"
              value={newNumberData.number}
              required
              fullWidth
              onChange={handleInputChange}
              autoFocus
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addNumber}
            >
              Añade Numero
            </Button>
            <TextField
              margin="normal"
              label="Numero a calcular"
              type="text"
              name="numberToCalculate"
              value={newNumberData.numberToCalculate}
              required
              fullWidth
              onChange={handleInputChange}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={searchResults}
            >
              Buscar Resultados
            </Button>

            <Box mt={2}>
  <Typography variant="h6">Resultados:</Typography>
  <ul>
    {Object.entries(calculatedNumbers).map(([number, nextNumbers]) => (
      <li key={number}>
        {number}: {Array.isArray(nextNumbers) ? nextNumbers.join(', ') : 'No hay siguientes números'}
      </li>
    ))}
  </ul>
</Box>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
