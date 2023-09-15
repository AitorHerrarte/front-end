import "./App.css";
import { Routes, Route } from "react-router-dom";
import GeneralLayout from "./components/generalLayout/GeneralLayout";
import ProfilePage from "./pages/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/registerPage";
import Dashboard from "./pages/mainMenu/Dashboard";
import Accounts from "./pages/accounts/MyAccounts";
import Friends from "./pages/friends/Friends";
import Notes from "./pages/notes/notes";
import AddAccount from "./pages/accounts/AddAccount";




function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<GeneralLayout><ProfilePage /></GeneralLayout>} />
        <Route path="/DashBoard" element={<GeneralLayout><Dashboard /></GeneralLayout>} />
        <Route path="/Friends" element={<GeneralLayout><Friends /></GeneralLayout>} />
        <Route path="/Notes" element={<GeneralLayout><Notes /></GeneralLayout>} />
        <Route path="/Accounts" element={<GeneralLayout><Accounts /></GeneralLayout>} />
        <Route path="/AddAccount" element={<GeneralLayout><AddAccount /></GeneralLayout>} />
      </Routes>

    </>
  );
}

export default App;
