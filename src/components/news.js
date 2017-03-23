import React, { Component } from 'react';
import { Link } from "react-router";

import "../css/news.css";

import Nav from "./nav";

const ListItem = ( props ) => {
	return (
		<li>
			<Link to={`news/${props.href}`}  className="menu-item">
				<div className="left fontsize30">{props.title}</div>
				<div className="right"><i className="iconfont fontsize30">&#xe602;</i></div>
			</Link>
		</li>
	)
}


export default class News extends Component {
	render(){
		return (
			<div className="news-page">

				<ul className="menu-list">
					<ListItem title="发送记录" href="sendRecord" />
					<ListItem title="邀合作" />
				</ul>

				<Nav />
			</div>
		)
	}
}