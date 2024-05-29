import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";
import HomeScreen from "./views/HomeScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer";
import DashboardScreen from "./views/DashboardScreen";
import DashboardScreenAWS from "./views/DashboardScreenAWS";


function App() {

  return (
    <Router>
      
      <div>
      <Header /> 
      <main>
      {/* <div><a>hehe</a></div> */}
      <Route path="/" component={HomeScreen} exact></Route>
      <Route path="/dashboard" component={DashboardScreenAWS} exact></Route>
      </main>
      </div>
    </Router> 
  );
}

export default App;