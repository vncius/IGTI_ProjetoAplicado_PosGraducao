import './Content/App.css'
import Login from './Components/Login'
import Cadastro from './Components/Cadastro'
import RecuperarSenha from './Components/RecuperarSenha'
import Principal from './Components/Principal'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/autenticacao">
          <Login />
        </Route>
        <Route path="/cadastro">
          <Cadastro />
        </Route>
        <Route path="/recuperar-senha">
          <RecuperarSenha />
        </Route>
        <Route path="/principal">
          <Principal />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
