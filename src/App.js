import { getAuth } from "firebase/auth";
import './App.css';
import LogIn from "./components/LogIn/LogIn";
import app from './firebase.init';


const auth = getAuth(app);
function App() {
  return (
    <div>
      <LogIn></LogIn>
    </div>
  );
}

export default App;
