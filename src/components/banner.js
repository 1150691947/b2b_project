import React, {Component} from "react";
import { Link } from "react-router";
import banner from "../images/banner.jpg";
import "../css/banner.css";
export default class Banner extends Component {
	render(){
		return (
			<div className="banner-container">
				<Link to="/brandSettled"><img src={banner} alt=""/></Link>
			</div>
		) 
	}
} 