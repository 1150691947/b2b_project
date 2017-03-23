import React, { Component } from 'react';
import { Link } from "react-router";

import classnames from "classnames";

import "../css/details.css";

export default class DetailsPage extends Component {
	render(){
		return (
			<div className="details-page">
				<div className="cover"><img src="" alt=""/></div>

				<div className="title-container">
					<div className="title fontsize30">
						提供旗下签约主播网红艺人／直播／微博／资源／网综广告位资源，寻求资源置换。
					</div>
				</div>

				<CompanyInfo />

				<TabBlock />

				<Link to='/request' className="btn fontsize36"><i className="iconfont fontsize44">&#xe763;</i>合作请求</Link>
			</div>
		)
	}
}

class CompanyInfo extends Component{
	constructor(){
		super(); 

		this.state = {
			
		}
	}
	handleClick(){

	} 
	render(){
		return (
			<div className="company-info">
				<div className="info-container">
					<div className="container">
						<div className="top-container clearfix">

							<img src="" alt="" className="logo fl"/>

							<div className="info fl">
								<div className="company-name fontsize30">
									公司名称
								</div>
								<div className="time fontsize24">上升时间</div>
							</div>
							<div className="fr" onClick={this.handleClick.bind(this)}>
								<i className="iconfont fontsize32">&#xe667;</i>
							</div>
						</div>

						<div className="bottom-container fontsize24">							
							<div className="find-industry">寻找行业：互联网／it</div>	
							<div className="clearfix">
								<div className="range-area fl fontsize30">合作地区：全国</div>
								<div className="effective-time fr fontsize28">有效时间：2017.05.08</div>
							</div>
						</div>
					</div>
				</div>

				<div className="company-intr">
					<div className="intr fontsize30">公司介绍</div>
					<div className="content">差距啊圣诞节啊哈阿斯顿回家啊啊圣诞节啊哈说的话就啊的话阿斯顿回家啊好多阿斯顿回家啊说阿斯顿回家啊说的话阿斯顿回家啊说阿斯顿回家啊说</div>
				</div>

			</div>
		)
	}
}

class TabBlock extends Component {
	constructor(){
		super();
		this.state = {
			isDisplay : true
		}
	}
	handleClick(){

		this.setState({

			isDisplay : !this.state.isDisplay

		})
	}
	render(){
		let {isDisplay} = this.state;
		return (
			<div className="tab-wrap">
				<div className="tab-nav">
					<div className={classnames("nav-item provide fontsize30",{"current-nav" :isDisplay})} onClick={!isDisplay ? this.handleClick.bind(this) : ""}>我们提供</div>
					<div className={classnames("nav-item need fontsize30",{"current-nav" :!isDisplay}) } onClick={isDisplay ? this.handleClick.bind(this) : ""}>我们需要</div>
				</div>
				<div className="tab-content fontsize28">
					<div className={classnames("content-item ",{"current-content":isDisplay})} >
						阿斯顿回家的话阿斯顿回家的话阿斯顿回家啊电话sad 回家啊说的话大会sad 回家啊电话阿斯顿回家的话阿斯顿回家的话阿斯顿回家啊电话sad阿斯顿回家的话阿斯顿回家的话阿斯顿回家啊电话sad阿斯顿回家的话阿斯顿回家的话阿斯顿回家啊电话sad
					</div>
					<div className={classnames("content-item ",{"current-content":!isDisplay})} >
						1232阿斯顿回家的话阿斯顿回家的话阿斯顿回家啊电话sad 回家啊说的话大会sad 回家啊电话
					</div>
				</div>
				<div className="tab-footer">
					<div className="container fr fontsize24">
						<span><i className="iconfont fontsize24">&#xe61a;</i></span>
						<span className="coop"><i className="iconfont fontsize30">&#xe62d;</i>4222</span>
						<span className="see"><i className="iconfont fontsize30">&#xe700;</i>2222</span>
					</div>
				</div>
			</div>	
		)
	}
}