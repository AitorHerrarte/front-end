import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState, useContext , useEffect} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from "axios";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {

  const [fechaActual, setFechaActual] = useState(new Date().toLocaleDateString());
  const { profile } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([])
  const [balance0, setBalance0] = useState([])
  const [profit0, setProfit0] = useState([])

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
      const balances = response.data.map(account => account.balance);
      const profits = response.data.map(account => account.profit);

      setBalance0(balances);
      setProfit0(profits);
      console.log("cuentas obtenidas", setBalance0)
    }catch (error){
      console.error("Error al obtener las cuentas del usuario", error);
    }
  }

  const totalBalance = balance0.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const totalProfit = profit0.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  useEffect(() => {
    getAccounts();
  }, []);
  
  return (
    <React.Fragment>
       <Title>Balance</Title>
      <Typography component="p" variant="h5">
        {totalBalance}
      </Typography>
      <Title>PROFIT</Title>
      <Typography component="p" variant="h5">
        {totalProfit}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 , marginTop: 4}}>
        {fechaActual}
      </Typography>
      
    </React.Fragment>
  );
}