import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage";
import Header from "./Header";
import StudentDashboard from "./StudentDashboard";
import OrgDashboard from "./OrgDashboard";
import AdminDashboard from "./AdminDashboard";
import "./index.css";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/student" component={StudentDashboard} />
        <Route path="/organization" component={OrgDashboard} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/" exact component={StudentDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
