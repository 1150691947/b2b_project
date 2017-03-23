import React, { Component } from 'react';
import { Link } from "react-router";
import classnames from "classnames";

import "../css/sendRecord.css";

const menu = ["全部","未回应","已合作"];

const TabMenu = ( props ) => {

	const { activeIndex, handleClick } = props;

	return (
		<div className="tab-menu fontsize36">
			{
				menu.map(( item, index ) => {
					return (
						<div className={classnames("menu-item",{"active" : activeIndex === index})} key={index} onClick={handleClick.bind(null,index)}>{item}</div>
					)
				})
			}
		</div>
	)
}

const Item = ( props ) => {
	return (
		<li className="item">
			<Link to="/details" className="item-container" >
				<div className="content-container">
					<div className="head-container clearfix">
						<div className="logo fl">
							<img src="" alt="" />
						</div>
						<div className="center fl ">
							<p className="company-name fontsize36">公司名称</p>
							<p className="release-time fontsize24">时间</p>
						</div>
						<span className="time fr fontsize24">今天12:09</span>
					</div>

					<div className="body-container">
						<div className="container">
							<p className="title fontsize28">提供旗下签约主播网红艺人／直播／微博／资源／网综广告位资源，寻求资源置换。</p>
							<div className="label">
								<span className="industry">所属行业：娱乐</span>
								<span>合作地区：全国</span>
							</div>
						</div>
					</div>

					<div className="footer-container fontsize22 clearfix">

					</div>
				</div>

			</Link>
		</li>
	)
}

export default class SendRecord extends Component {

	constructor(){
		super();

		this.state = {
			menuActive : 0
		}
	}

	handleClick(index = this.state.menuActive){
		this.setState({
			menuActive : index
		})
	}

	render(){
		return (
			<div className="send-record">
				<TabMenu activeIndex={this.state.menuActive} handleClick={this.handleClick.bind(this)} />
				<ul className="list"> 
					<Item />
				</ul>
			</div>
		)
	}
}