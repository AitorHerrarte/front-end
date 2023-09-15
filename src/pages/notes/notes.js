import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MainListItems, SecondaryListItems } from "../mainMenu/ListItems";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { blueGrey, grey } from "@mui/material/colors";

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

export default function Notes() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [inputText, setInputText] = useState("");
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNote, setEditingNote] = useState({ id: null, description: "" });
  const [newNote, setNewNote] = useState("");

  const { profile, logout, reload, setReload } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4003/notes/myNotes", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
    setIsLoading(false);
  };
  const addNote = async () => {
    if (newNote.trim() !== "") {
      console.log("nota", newNote);
      try {
        const response = await axios.post(
          "http://localhost:4003/notes/addNoteToUser",
          { description: newNote },
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        setNewNote("");
        getNotes();
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };
  const deleteNote = async (notes) => {
    try {
      const response = await axios.delete(
        `http://localhost:4003/notes/${notes._id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      getNotes();
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const editNote = (note) => {
    setEditingNote({ id: note._id, description: note.description });
  };

  const updateNote = async (notes) => {
    try {
      if (editingNote.id) {
        const response = await axios.patch(
          `http://localhost:4003/notes/${notes._id}`,
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
          }
        );
        getNotes();
      }
    } catch (error) {
      console.log("error al cambiar la nota", error);
    }
  };
  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
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
              Notes
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
        <Container sx={{ py: 1, mb: 1000 }} maxWidth="md">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="20vh"
          >
            <TextField
              label="Escribe una nota"
              variant="outlined"
              value={newNote}
              onChange={handleNoteChange}
              style={{ marginBottom: "16px" }}
            />
            <Button variant="contained" color="primary" onClick={addNote}>
              Agregar Nota
            </Button>
          </Box>
          <Grid container spacing={4}>
            {notes.map((note) => (
              <Grid item key={note._id} xs={100} sm={25} md={20}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: grey[300],
                    marginTop: 10,
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      align="center"
                      sx={{
                        backgroundColor: grey[400],
                        fontWeight: "bold",
                        padding: "0.2em",
                      }}
                    >
                      Note: {note.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => deleteNote(note)}
                      variant="contained"
                      color="grey"
                      sx={{
                        backgroundColor: blueGrey[300],
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      onClick={() => updateNote(note)}
                      variant="contained"
                      color="grey"
                      sx={{
                        backgroundColor: blueGrey[300],
                      }}
                    >
                      Update
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
