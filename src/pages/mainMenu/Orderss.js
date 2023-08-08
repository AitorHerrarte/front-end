import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Button from "@mui/material/Button";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect, useState, useContext, useStyles } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [newOrderData, setNewOrderData] = useState({
    date: "",
    account: "",
    description: "",
    pair: "",
    entryPrice: "",
    closePrice: "",
    profit: "",
  });

  // const [selectedImage, setSelectedImage] = useState(null);

  const { profile, setReload, reload } = useContext(AuthContext);

  const getOrderData = async () => {
    try {
      const response = await axios.get(`http://localhost:4003/orders`);
      //   setPrice(response.data.price);
      //   setIncome(response.data.income);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener las ordenes del usuario", error);
    }
  };
  const addOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4003/orders/addOrder/`,
        newOrderData,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      getOrderData();
      console.log("Respuesta del backend:", response.data);
    } catch (error) {
      console.error("Error al agregar la orden:", error);
      // Aquí puedes manejar errores, como mostrar un mensaje de error al usuario, etc.
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  const handleClick = () => {
    setShowPopUp(true);
  };
  const handleCancel = () => {
    setShowPopUp(false);
  };
  const handleAddOrder = (orders) => {
    addOrder(orders);
    toast.success("you added ur order correctly");
    setShowPopUp(false);

    console.log("soy el notify");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewOrderData({ ...newOrderData, [name]: value });
  };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setNewOrderData({ ...newOrderData, image: file });
  // };

  const handleDeleteOrder = async (orders) => {
    try {
      const response = await axios.delete(
        `http://localhost:4003/orders/${orders._id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
     getOrderData();
    } catch (error) {
      console.log("error al borrar la order", error);
    }
  };

  return (
    <React.Fragment>
      <Title>My Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Pair</TableCell>
            <TableCell>Entry Price</TableCell>
            <TableCell>Close Price</TableCell>
            <TableCell align="right">PROFIT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((orders) => (
            <TableRow key={orders._id}>
              <TableCell>{new Date(orders.date).toLocaleDateString()}</TableCell>
              <TableCell>{orders.account}</TableCell>
              <TableCell>{orders.description}</TableCell>
              <TableCell>{orders.pair}</TableCell>
              <TableCell>{orders.entryPrice}</TableCell>
              <TableCell>{orders.closePrice}</TableCell>
              <TableCell align="right">{`$${orders.profit}`}</TableCell>
              <Button
                onClick={() => handleDeleteOrder(orders)}
                color="primary"
                align="right"
                startIcon={<DeleteIcon />}
              ></Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
      <Button
        size="small"
        onClick={() => handleClick(orders)}
        sx={{
          color: "primary",
          backgroundColor: "transparent",
          mt: 3,
        }}
      >
        Add new order
      </Button>
      <Dialog open={showPopUp} onClose={handleCancel}>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Inputs para añadir la nueva orden */}
            <TextField
              autoFocus
              margin="dense"
              type="date"
              name="date"
              value={newOrderData.date}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Account"
              type="text"
              name="account"
              value={newOrderData.account}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              name="description"
              value={newOrderData.description}
              onChange={handleInputChange}
              fullWidth
            />
            {/* <label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label> */}
            <TextField
              margin="dense"
              label="Pair"
              type="text"
              name="pair"
              value={newOrderData.pair}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Entry Price"
              type="number"
              name="entryPrice"
              value={newOrderData.entryPrice}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Close Price"
              type="number"
              name="closePrice"
              value={newOrderData.closePrice}
              onChange={handleInputChange}
              fullWidth
            />
           
            <TextField
              margin="dense"
              label="Profit"
              type="number"
              name="profit"
              value={newOrderData.profit}
              onChange={handleInputChange}
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleAddOrder(newOrderData)} color="primary">
            Add Order
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
