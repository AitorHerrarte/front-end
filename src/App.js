import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartScreen from "./pages/startScreen/StartScreen";
import GeneralLayout from "./components/generalLayout/GeneralLayout";
import ProfilePage from "./pages/profile/Profile";
import Login from "./components/login/loginPage";
import Register from "./components/register/registerPage";
// import MainMenu from "./pages/mainMenu/MainMenu";
import Dashboard from "./pages/mainMenu/Dashboard";
import Accounts from "./pages/accounts/MyAccounts";
import Friends from "./pages/friends/Friends";
import Stocks from "./pages/stocks/Stocks";




function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<GeneralLayout><ProfilePage /></GeneralLayout>} />
        <Route path="/DashBoard" element={<GeneralLayout><Dashboard /></GeneralLayout>} />
        <Route path="/Friends" element={<GeneralLayout><Friends /></GeneralLayout>} />
        <Route path="/Stocks" element={<GeneralLayout><Stocks /></GeneralLayout>} />
        <Route path="/Accounts" element={<GeneralLayout><Accounts /></GeneralLayout>} />
      </Routes>

    </>
  );
}

export default App;
