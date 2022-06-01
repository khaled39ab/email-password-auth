import { getAuth } from "firebase/auth";
import './App.css';
import app from './firebase.init';


const auth = getAuth(app);
function App() {
  return (
    <div className="App">
      <div>
        <form>
            <>Email:</>
            <input type="email" name="" id="" /> <br />
            <>Password:</>
            <input type="password" name="" id="" />
        </form>
      </div>
    </div>
  );
}

export default App;
