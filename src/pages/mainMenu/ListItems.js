import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const MainListItems = () => {
  const navigate = useNavigate();
  const goDashboard = () => {
    navigate("/DashBoard")
  }
  const goAccounts = () => {
    navigate("/Accounts")
  }
  const goFriends = () => {
    navigate("/friends")
  }
  const goNotes = () => {
    navigate("/Notes")
  }
  const goProfile = () => {
    navigate("/Profile")
  }

  return (
  <React.Fragment>
    <ListItemButton onClick={goProfile}>
      <ListItemIcon>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton onClick={goDashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={goFriends}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Friends" />
    </ListItemButton>
    <ListItemButton onClick={goNotes}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Notes" />
    </ListItemButton>
    <ListItemButton onClick={goAccounts}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accounts" />
    </ListItemButton>
  </React.Fragment>
);
}

export const SecondaryListItems = () => {

  return(
  <React.Fragment>
    <ListSubheader component="div" inset>
           
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        
      </ListItemIcon>
      <ListItemText primary="" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        
      </ListItemIcon>
      <ListItemText primary="" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        
      </ListItemIcon>
      <ListItemText primary="" />
    </ListItemButton>
  </React.Fragment>
);
}