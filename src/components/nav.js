import React, { Component } from 'react';
import { Link } from "react-router";
import classnames from "classnames";
import "../css/nav.css";

export default class Nav extends Component {
	render(){
		const pathname = this.props.pathname;
		return (
			<ul className="nav-list">
				<li className="nav-item">
					<Link to="/" className={classnames({"active":pathname==="/"})} >
						<div className="icon"><i className="iconfont fontsize44">&#xe682;</i></div>
						<p className="fontsize20">找主办</p>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/findSponsor" className={classnames({"active":pathname==="/findSponsor"})}>
						<div className="icon"><i className="iconfont fontsize44">&#xe66c;</i></div>
						<p className="fontsize20">找赞助</p>
					</Link> 
				</li>
				<li className="nav-item">
					<Link to="/news" className={classnames({"active":pathname==="/news"})}>
						<div className="icon"><i className="iconfont fontsize44">&#xe613;</i></div>
						<p className="fontsize20">消息</p>
					</Link>
				</li>
				<li className="nav-item">
					<Link to="/my" className={classnames({"active":pathname==="/my"})}>
						<div className="icon"><i className="iconfont fontsize44">&#xe6a3;</i></div>
						<p className="fontsize20">我的</p>
					</Link>  
				</li>
			</ul> 
		)
	}
}