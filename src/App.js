import "./App.css";
import { Routes, Route } from "react-router-dom";
import GeneralLayout from "./components/generalLayout/GeneralLayout";
import ProfilePage from "./pages/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/registerPage";
import Dashboard from "./pages/mainMenu/Dashboard";
import Accounts from "./pages/accounts/MyAccounts";
import Notes from "./pages/notes/notes";
import AddAccount from "./pages/accounts/AddAccount";
import EditAccount from "./pages/accounts/EditAccount"
import CodereTorrejon from "./pages/codereTorrejon/CodereTorrejon"
import Quantum  from "../../back-end/modules/quantumModel";




function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<GeneralLayout><ProfilePage /></GeneralLayout>} />
        <Route path="/EditAccount/:accountId" element={<GeneralLayout><EditAccount /></GeneralLayout>} />
        <Route path="/DashBoard" element={<GeneralLayout><Dashboard /></GeneralLayout>} />
        <Route path="/Notes" element={<GeneralLayout><Notes /></GeneralLayout>} />
        <Route path="/Accounts" element={<GeneralLayout><Accounts /></GeneralLayout>} />
        <Route path="/AddAccount" element={<GeneralLayout><AddAccount /></GeneralLayout>} />
        <Route path="/CodereTorrejon" element={<GeneralLayout><CodereTorrejon /></GeneralLayout>} />
        <Route path="/Quantum" element={<GeneralLayout><Quantum /></GeneralLayout>} />
      </Routes>

    </>
  );
}

export default App;
