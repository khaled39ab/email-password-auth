import { getAuth } from "firebase/auth";
import './App.css';
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import app from './firebase.init';


const auth = getAuth(app);
function App() {
  return (
    <div>
      <LogIn></LogIn>
      <SignUp></SignUp>
    </div>
  );
}

export default App;
