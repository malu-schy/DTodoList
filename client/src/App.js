import './App.css';
import Todo from './Pages/Todolist'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
      <div className="navbar">
          <Link to="/"> TodoList💫 </Link>
        </div>
        <Switch>
          <Route path="/" exact component={Todo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
