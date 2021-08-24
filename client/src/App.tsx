import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";

import { Patients } from "./pages";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Patients} />
    </Switch>
  );
};

export default App;
