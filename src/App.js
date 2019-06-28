import React from "react";
import FilteredCalls from "./filtered-calls/FilteredCalls";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LabelCalls from "./label-calls/LabelCalls";
import Home from "./home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/filter" component={FilteredCalls} />
          <Route path="/label" component={LabelCalls} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
