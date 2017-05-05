import React from "react";
import { Link } from "react-router";
import "../css/newsPageItem.css";
const LogoAndName = ( props ) => {
	return (
		<div className="logo-container fl">
			<div className="logo fl">
				<img src={props.headimgurl} alt=""/>
			</div>
			<div className="fl">
				<p className="name fontsize30">{props.nickname}</p>
				<p className="time fontsize24">{props.create_time}</p>
			</div>
		</div> 
	)
}

const Info  = ( props ) => {
	return (
		<div className="info-container fontsize24">
			<p className="industry">行业：{props.trade}</p>
			<p className="nature">性质：{props.property}</p>
			<p className="scale">规模：{props.scale}</p>
		</div>
	) 
} 

const Item = ( props ) => {
	return (
		<li className="item">
			<Link to={`/partake/partakeDetails?id=${props.id}`}>
				<div className="container">
					<div className="clearfix">
						<LogoAndName {...props} />
						<div className="reprot fontsize30 fr">举报</div>
					</div>
					<Info {...props} />
				</div>
				<div className="footer-container fontsize30">
					<div className="cooperation">联系人：{props.linkman}<span className="line">|</span>{props.tel}</div>	
				</div>
			</Link>
		</li>
	)
}

export default Item;