import './Content/App.css'
import Login from './Components/Login'
import Cadastro from './Components/Cadastro'
import RecuperarSenha from './Components/RecuperarSenha'

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
          <h1>Not implemented</h1>
        </Route>

        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
