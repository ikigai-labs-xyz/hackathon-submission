import React from "react";
import Navbar from "./Navbar"
import Hero from "./Hero";
import Badge from "./Badge";
import Standards from "./Standards";
import Ecosystem from "./Ecosystem";
import Footer from "./Footer";
import "./index.css";
import Logo from "./Logo";

const Landingpage = () => (
	<>
	<div className="borders">
	  <Navbar />
	  </div>
	  <Hero/>
	  <div className="borders">
	  <Badge/>
	  <Standards/>
	  <Ecosystem/>
	  </div>
	  <Footer/>
	</>
  );
  
  export default Landingpage;
  
