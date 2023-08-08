import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {

  const [fechaActual, setFechaActual] = useState(new Date().toLocaleDateString());
  const { profile } = useContext(AuthContext);
  return (
    <React.Fragment>
       <Title>Balance</Title>
      <Typography component="p" variant="h4">
        {/* {profile.balance} */}
      </Typography>
      <Title>PROFIT</Title>
      <Typography component="p" variant="h4">
        {/* {profile.profit} */}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {fechaActual}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View history
        </Link>
      </div>
    </React.Fragment>
  );
}