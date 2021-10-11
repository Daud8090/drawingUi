import { Route } from 'react-router';
import './App.css';
import Container from "./components/container/Container" 
import Login from './components/login/Login';
import {Switch} from 'react-router-dom';



function App() {
  return (
    <>
    <Switch>
   <Route exact path="/">
   <Login />
   </Route>
   <Route path="/draw">
   <Container />
   </Route>

    </Switch>
   </>
  );
}

export default App;
