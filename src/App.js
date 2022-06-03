import { Route, Routes } from "react-router-dom";
import './App.css';
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <div>
      <LogIn></LogIn>
      {/* <Routes>
        <Route path="/" element={<LogIn></LogIn>}></Route>
        <Route path="/signUp" element={<SignUp></SignUp>}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
