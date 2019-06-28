import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <Link to="/filter" className="Home__link">
          Filtered Calls
        </Link>
        <Link to="/label" className="Home__link">
          Label Calls
        </Link>
      </div>
    );
  }
}

export default Home;
