import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Login from "../../components/login/loginPage";
import Register from "../../components/register/registerPage";
import "./StartScreen";
import { useNavigate } from "react-router-dom";

const tiers = [
  {
    title: "Register",
    description: [
      "No esperes MÁS",
      " y hazte un Bussines Man!! ",
      "comprando inmuebles",
      "e invirtiendo en la bolsa!!",
    ],
    buttonText: "get registered now !",
    buttonVariant: "contained",
    component: <Register />,
    path: "/register",
  },
  {
    title: "Login",
    description: [
      "Cuida tus inversiones",
      "mirando las noticias",
      "y chequeando la bolsa!!",
      "Hay cambios en el ranking!",
    ],
    buttonText: "get loging now !",
    buttonVariant: "contained",
    component: <Login />,
    path: "/login",
  },
];

const defaultTheme = createTheme();

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{
            fontFamily: "serif",
            fontSize: "70px",
            fontWeight: "bold",
            textShadow: "2px 3px 5px #5b5b5b",
          }}
        >
          Financial Challenge
        </Typography>
        <Typography
          variant="h3"
          align="center"
          color="text.secondary"
          component="p"
          sx={{
            fontFamily: "serif",
          }}
        >
          Simulador interactivo, aprende jugando!
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={4}
          alignItems="flex-end"
          justifyContent={"center"}
        >
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={5}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center", fontFamily: "serif",
                  fontSize: "2em", fontWeight: "600" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[600]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                        sx={{
                          fontFamily: "serif",
                          fontSize: "1.3em",
                          fontWeight: "600",
                        }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    sx={{
                      fontSize: "1.4em",
                      fontFamily: "serif",
                      backgroundColor: "#000000",
                      "&:hover": {
                        backgroundColor: "#333333"
                      },
                    }}
                    onClick={() => navigate(tier.path)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
                {/* {tier.component}

                {tier.title === "Login" && <Login />}

                {tier.title === "Register" && <Register />} */}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
