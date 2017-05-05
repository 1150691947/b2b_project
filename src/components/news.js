/*消息页面*/
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
		const pathname = this.props.location.pathname;
		return (
			<div className="news-page">
				<ul className="menu-list">
					<ListItem title="发送合作请求" href="sendRecord" />
					<ListItem title="收到合作请求" href="invited?state=0" />
				</ul>
				<Nav pathname={pathname} />
			</div>
		)
	}
}