import React, { Component } from 'react';
import { Link } from "react-router";

import "../css/nav.css";

export default class Nav extends Component {
	render(){
		return (
			<ul className="nav-list">
				<li className="nav-item">
					<Link to="/" activeClassName="active">
						<div className="icon"><i className="iconfont fontsize40">&#xe6bf;</i></div>
						<p className="fontsize20">主办</p>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="news" activeClassName="active">
						<div className="icon"><i className="iconfont fontsize40">&#xe613;</i></div>
						<p className="fontsize20">消息</p>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="my" activeClassName="active">
						<div className="icon"><i className="iconfont fontsize40">&#xe6a3;</i></div>
						<p className="fontsize20">我的</p>
					</Link>
				</li>
			</ul> 
		)
	}
}