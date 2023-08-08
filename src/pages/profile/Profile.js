import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import './Profile';
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';




const defaultTheme = createTheme();





const ProfilePage = () => {
  const [rankingPosition, setRankingPosition] = useState('');
  const [userRealStates, setUserRealStates] = useState([]);
  const [config, setConfig] = useState(false)


  React.useEffect(() => {
    setReload(!reload);
  }, []);

  const openPopup = () => {
    setConfig(true);
  };

  const closePopup = () => {
    setConfig(false);
  };


  const { profile, setReload, reload } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);


  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4003/users');
        const sortedUsers = response.data.sort((a, b) => b.balance - a.balance);
        const playerPosition =
          sortedUsers.findIndex((user) => user._id === profile._id) + 1;
        setRankingPosition(playerPosition);
      } catch (error) {
        console.error('Error al obtener la posición del jugador en el ranking', error);
      }
    };
    fetchUsers();
  }, [profile]);

  useEffect(() => {
    const findUserRealStates = async () => {
      const userRealStatesAux = [];
      if (profile.realState != null) {
        for (let i = 0; i < profile.realState.length; i++) {
          const aux = await axios.get(`http://localhost:4003/realStates/${profile.realState[i]._id}`, {
            headers: {
              'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
          });
          userRealStatesAux.push(aux.data);
        }
        setUserRealStates(userRealStatesAux);
        console.log(`userRealStates: ${userRealStates}`);
      }
    };

    findUserRealStates();
  }, [profile]);

  const sumIncome = profile.realState
    ? profile.realState.reduce(
      (totalIncome, realState) => totalIncome + (realState.income),
      0
    )
    : 0;

  const tiers = [

    {
      title: "Balance",
      description: [
        `Su Balance es: ${profile.balance} €`,
        `Su Income por Hora es: ${sumIncome} €`
      ],
    },
    {
      title: "Ranking",
      description: [
        "Su puesto en el  ",
        `Ranking Global es el: ${rankingPosition.toString()} º`,
      ],

    },
    {
      title: "Real States",
      description: [
        `Usted es dueño de: `,
        `${userRealStates.length.toString()} propiedades`,
      ],
    },

  ];



  return (
    <div>
      <div>
        <button onClick={logout}>logOut</button>
      </div>
      <div id="divPrincipal" style={{ height: "100vh" }}>
        < ThemeProvider theme={defaultTheme} >
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <CssBaseline />
          <div

            style={{
              minHeight: '100vh',
              // minWidth: '100vw',
              // maxHeight: '100vh',
              // maxWidth: '100vw',
              // backgroundImage: `url(${fotoProfile4})`,
              backgroundSize: 'cover',
              backgroundPosition: 'auto',
              // fontFamily: 'sans-serif'


            }}
          >
            <Container
              disableGutters
              maxWidth="sm"
              component="main"
              sx={{
                pt: 8, pb: 6,
                backgroundColor: "transparent"
              }}

            >
              <Typography
                // component="h1"
                // variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: "70px",
                  // fontWeight: "bold",
                  textShadow: "2px 3px 5px #5b5b5b",
                  color: green[500],

                }}
              >
                <h1 sx={{ color: green[500] }}><span sx={{ color: green[500] }}>
                  Profile</span><span>
                    
                  </span></h1>
              </Typography>
              {config && (
                <div id="modal-container">
                  <div
                    id="popup"
                    style={{
                      width: "400px",
                      height: "auto",
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 9999,
                      WebkitBoxShadow: "0px 0px 49px 13px rgba(255,255,255,1)",
                      mozboxshadow: "0px 0px 49px 13px rgba(255,255,255,1)",
                      boxshadow: "0px 0px 49px 13px rgba(255,255,255,1)",
                     
                      backgroundSize: 'cover',
                      backgroundPosition: 'auto',

                      backgroundColor: "white"


                    }}
                  >
                    


                  </div>
                </div>

              )}
              <Typography

                variant="h3"
                align="center"
                color="text.secondary"
                component="p"
                sx={{
                  color: "white",
                  // fontFamily: "serif",
                  fontSize: "40px",
                }}
              >
                Aqui tiene sus datos, <br />
              </Typography>
              <Typography
                id="shake-horizontal"
                variant="h3"
                align="center"
                color="text.secondary"
                component="p"
                sx={{
                  color: "white",
                  // fontFamily: "serif",
                  fontSize: "40px",
                }}
              >
                <span id="shake-horizontal" style={{
                  color: green[500],
                  // fontFamily: "serif",
                  fontSize: "60px",
                  fontWeight: "bold", textShadow: "3px 5px 5px #5b5b5b"
                }}>
                  {profile.userName}
                </span>
              </Typography>
            </Container >
            <Container component="main" sx={{
            }} >
              <Grid
                container
                spacing={4}
                alignItems="flex-end"
                justifyContent={"center"}
                width={1}
                height={1}
              >
                {tiers.map((tier) => (
                  <Grid
                    item
                    key={tier.title}
                    xs={12}
                    md={3}
                    minWidth={0.3}

                  >
                    <Card
                      sx={{ heigth: 7000 }}
                    >
                      <CardHeader
                        title={tier.title}
                        titleTypographyProps={{ align: "center" }}
                        sx={{ backgroundColor: green[500] }}
                      />
                      <CardContent

                        backgroundColor={"green"}

                      >

                        <ul>
                          {tier.description.map((line) => (
                            <Typography
                              component="li"
                              variant="subtitle1"
                              align="center"
                              key={line}
                            >
                              {line}
                            </Typography>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>

                ))}
              </Grid>
              <div id="divboton">
                <Button
                  id="botonChulo"

                  sx={{
                    color: green[500],
                    width: 400
                  }}
                  onClick={() => navigate("/ProfileHouses")}
                ><span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Visitar sus casas</Button>
              </div>
            </Container>
          </div >
        </ThemeProvider >
      </div >
    </div >

  )
}


export default ProfilePage
