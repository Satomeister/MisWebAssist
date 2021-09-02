import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import {
  CreateDocument,
  Document,
  EditDocument,
  LoginPage,
  Patient,
  PatientsList,
} from './pages';

const App = () => {

  return (
    <Switch>
      <Route
        exact
        path={'/login'}
        component={LoginPage}
      />
      <Route
        exact
        path={['/', '/patients']}
        component={PatientsList}
      />
      <Route
        exact
        path="/patients/:patientID/documents"
        component={Patient}
      />
      <Route
        exact
        path="/patients/:patientID/documents/create"
        component={CreateDocument}
      />
      <Route
        exact
        path="/patients/:patientID/documents/:documentID"
        component={Document}
      />
      <Route
        exact
        path="/patients/:patientID/documents/:documentID/edit"
        component={EditDocument}
      />
      <Route render={() => <div>Сторінку не знайдено</div>} />
    </Switch>
  );
};

export default App;
