import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import { PatientsList } from "./pages";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={PatientsList} />
    </Switch>
  );
};

export default App;
