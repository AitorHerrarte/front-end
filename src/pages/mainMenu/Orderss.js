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
import MenuItem from "@mui/material/MenuItem"; 
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
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

  const getAccounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4003/accounts/getAccountUser`,
        
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      
      setAccounts(response.data)
      console.log("cuentas obtenidas", response.data)
    }catch (error){
      console.error("Error al obtener las cuentas del usuario", error);
    }
  }
  useEffect(() => {
    getAccounts();
  }, []);

  const getOrderData = async () => {
    try {
      const response = await axios.get(`http://localhost:4003/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al obtener las ordenes del usuario", error);
    }
  };
  const addOrder = async (newOrder) => {
    try {
      const response = await axios.post(
        `http://localhost:4003/orders/addOrder`,
        newOrder,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      getOrderData();
      console.log("Respuesta del backend:", response.data);
    } catch (error) {
      console.error("Error al añadir la account", error);
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
  const handleAddOrder = () => {
    const newOrder = {
      date: newOrderData.date,
      account:selectedAccount,
      description: newOrderData.description,
      pair: newOrderData.pair,
      entryPrice: newOrderData.entryPrice,
      closePrice: newOrderData.closePrice,
      orderProfit: newOrderData.profit,
    };
    console.log(selectedAccount)
    console.log(newOrder)
    addOrder(newOrder)
    console.log("handleaddorder2")
    toast.success("you added ur order correctly");
    setShowPopUp(false);

    console.log("soy el notify");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "account") {
      setSelectedAccount(value);
    } else {
      setNewOrderData({ ...newOrderData, [name]: value });
    }
  };


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
              <TableCell>
                {new Date(orders.date).toLocaleDateString()}
              </TableCell>
              <TableCell>
              {accounts.find((account) => account._id === orders.account)?.accountName || 'N/A'}
                </TableCell>
              <TableCell>{orders.description}</TableCell>
              <TableCell>{orders.pair}</TableCell>
              <TableCell>{orders.entryPrice}</TableCell>
              <TableCell>{orders.closePrice}</TableCell>
              <TableCell align="right">{`$${orders.orderProfit}`}</TableCell>
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
              select
              margin="dense"
              label="Account"
              name="account"
              value={selectedAccount}
              onChange={(event) => setSelectedAccount(event.target.value)}
              fullWidth
            >
              {accounts.map((account) => (
                <MenuItem key={account._id} value={account._id}>
                  {account.accountName}
                </MenuItem>
              ))}
            </TextField>
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
              value={newOrderData.orderProfit}
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
