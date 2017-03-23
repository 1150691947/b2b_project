import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import Banner from "./banner";
import Nav from "./nav";
import ReactPullLoad from "react-pullload";

import "../css/homePage.css";

export default class HomePage extends Component {

	refresh(resolve, reject){

		//拒绝下拉刷新是
		reject();
	} 

	loadmore(resolve){ 

		this.props.actions.fetchData()

		console.log( this.props )

		resolve();
 
	}

	componentDidMount() {

		this.props.actions.fetchData();
	}
	
	render(){

		let { listData } = this.props.getIndexPageData;

		return (
			<div className="home-page-container">

				<Banner />

				{/*******列表组件********/}
				<ReactPullLoad  downEnough={150} onRefresh={this.refresh.bind(this)} onLoadMore={this.loadmore.bind(this)}>
					{
						listData.map((item,index)=>{

							return <Item key={index} {...item} />

						})
					}
				</ReactPullLoad>

				<div className="edit">
					<Link to="/release"><i className="iconfont">&#xe655;</i></Link>
				</div>
				<Nav />
			</div>	
		)	
	} 
}

HomePage.propTypes = {
	getIndexPageData : PropTypes.objectOf(
			PropTypes.arrayOf(
				PropTypes.object.isRequired
			).isRequired
		).isRequired,
	actions : PropTypes.object
}


const Item = ( props ) => {
	return (
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
					<div className="btn fr fontsize24">
						<i className="iconfont fontsize32">&#xe763;</i>
						<span>合作请求</span>
					</div>
				</div>

				<div className="body-container">
					<div className="container clearfix">
						<div className="left fl">
							<p className="title fontsize28">{props.title}</p>
							<div className="info clearfix fontsize22">
								<span className="industry fl">所属行业：娱乐</span>
								<span className="range fr">
									合作地区：全国
								</span>
							</div>
						</div>
						<div className="cover fr">
							<img src="" alt=""/>
						</div>
					</div>
				</div>

				<div className="footer-container fontsize22 clearfix">
					<div className="contacts fl">
						联系人：阿萨大<span className="vertical-line">|</span>职位
					</div>

					<div className="right fr">
						<div className="cpt-num fl">
							<i className="iconfont fontsize28">&#xe62d;</i>
							<span>22</span>
						</div>
						<div className="see-num fr">
							<i className="iconfont fontsize28">&#xe700;</i>
							<span>422</span>
						</div>
					</div>

				</div>
			</div>

		</Link>
	)
}
