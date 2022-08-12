import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News pageSize={4} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
