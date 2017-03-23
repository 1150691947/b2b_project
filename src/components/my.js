import React, { Component } from 'react';
import { Link } from "react-router";

import "../css/my.css";

import Nav from "./nav";


export default class My extends Component {
	render(){
		return (
			<div>
				<Nav />
			</div> 
		)
	}
}