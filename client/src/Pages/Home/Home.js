import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home-title">Are you a payer or provider?</div>
      <div className="home-controls">
        <Link to="/payerform">
          <div className="home-btn">Payer</div>
        </Link>
        <Link to="/providerform">
          <div className="home-btn">Provider</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
