import React, { Component } from "react";
import classnames from "classnames";

import "../css/partakeDetails.css";

const LogoAndName = ( props ) => {
	return (
		<div className="logo-container fl">
			<div className="logo fl"><img src={props.headimgurl} alt=""/></div>
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

export default class PartakeDetails extends Component {
	constructor(){
		super();

		this.state = {
			isBlockList : false
		} 
	}
	//点击添加黑名单
	clickAddBlackList(){
		this.setState({
			isBlockList : !this.state.isBlockList
		})
	}

	componentDidMount(){
		const { id } = this.props.location.query;
		 this.props.actions.fetchData( "GET_PARTAKE_DETAILS_DATA", "partakeDetails", id );
	}
	render(){
		const { partakeDetailsData } = this.props;
		return (
			<div className="partakeDetails-page">
				<div className="container">
					<div className="clearfix">
						<LogoAndName {...partakeDetailsData} />
						<div className="reprot fontsize30 fr" onClick={ ( ev ) => { alert("举报功能暂未开放") } }>举报</div>
					</div>
					<Info {...partakeDetailsData} />
				</div>
				<div className="introduce">
					<h2 className="title fontsize30">公司介绍</h2>
					<p className="desc fontsize28">{partakeDetailsData.company_describe}</p>
				</div>

				<div className="blacklist clearfix">
					<div className="fl fontsize28 text">加入黑名单</div>
					<div className={classnames("blacklist-btn fr",{"blacklist-btn-right":this.state.isBlockList})} onClick={this.clickAddBlackList.bind(this)}>
						<div className="round"></div>
					</div>
				</div>
			</div>
		)
	}
}