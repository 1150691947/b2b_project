import React, { Component } from 'react';
import { Link } from "react-router";
import mask2 from "../images/mask_2.png";
import "../css/my.css";

import Nav from "./nav";
//没认证
const NotAuth = (props) => (
	<div className="fl not-auth fontsize30">
		<p className="wx-name fl">用户名：{props.wxname}</p>
		<div className="tel fl">
			<i className="iconfont fontsize34">&#xe625;</i>
			<span className="num">{props.tel}</span>
		</div>
	</div>
)    
  
//认证  职位认证 企业认证 
const Auth = ( props ) => ( 
	<div className="fl auth">
		<div className="auth-info fontsize30" >
			<span className="auth-name">{props.name}</span>
			<span className="auth-work">{props.company}<span className="line">|</span>{props.job}</span>
		</div> 
		<div className="fontsize24 wx-info clearfix">
			<p className="wx-name fl">用户名：{props.wxname}</p> 
			<div className="tel fl">
				<i className="iconfont fontsize32">&#xe625;</i>
				<span className="num">{props.tel}</span> 
			</div>	
		</div>	
		<p className="level fontsize24">认证等级：{props.auth_level}</p>
	</div>
)
 
const Info = ( props ) => {
	return (
		<div className="info-container clearfix">
			<div className="logo fl">
				<img src={props.headimgurl} alt="头像" />
			</div>
			{
				props.status === 1 ? <Auth {...props} /> : <NotAuth {...props} />
			}
		</div>
	)
} 

const DataShow = ( props ) => {
	return (
		<div className="data-show">
			<div className="data-item">
				<Link to="/successCooper">
					<p className="num fontsize36">{props.successful_cq || 0}</p>
					<p className="text fontsize24">成功合作</p>
				</Link>
			</div>
			<div className="data-item">
				<Link to="/news/invited?state=0">
					<p className="num fontsize36">{props.receive_cq || 0}</p>
					<p className="text fontsize24">收到请求</p>
				</Link>
			</div>
			<div className="data-item">
				<Link to="/news/sendRecord">
					<p className="num fontsize36">{props.send_cq || 0}</p>
					<p className="text fontsize24">发送请求</p>
				</Link>
			</div> 
		</div>
	)
}

const MenuList = ( props ) => {
	return (
		<div className="menu-container">
			<div style={{"backgroundColor":"#fff"}}>
				<div className="item-container">
					<Link to="/proInfo"  className="menu-item fontsize30">
						<div className="left">{ (props.status === 0) ? "职业认证" : "修改资料"}</div>
						<i className="iconfont fontsize30">&#xe602;</i>
					</Link>
				</div>
				{(props.status === 1) && <div className="item-container">
					<Link to="/entCer"  className="menu-item fontsize30">
						<div className="left">企业认证</div>
						<i className="iconfont fontsize30">&#xe602;</i>
					</Link>
				</div>}
				<div className="item-container">
					<Link to="/iRelease"  className="menu-item fontsize30">
						<div className="left">我发布的合作信息</div>
						<i className="iconfont fontsize30">&#xe602;</i>
					</Link>
				</div>
				<div className="item-container">
					<Link to="/partake"  className="menu-item fontsize30" style={{"borderBottom":"none"}}>
						<div className="left">我参与的合作信息</div>
						<i className="iconfont fontsize30">&#xe602;</i>
					</Link>
				</div> 
			</div>
			
			
		</div>
	) 
} 
 // to="my/setup" 

//  <div className="item-container" style={{"marginTop":".13333333rem"}}>
// 	<Link className="menu-item fontsize30" style={{"borderBottom":"none"}}>
// 		<div className="left">设置</div>
// 		<i className="iconfont fontsize30">&#xe602;</i>
// 	</Link>
// </div>
export default class My extends Component {
	constructor(){
		super();
		this.state = {
			showState: false
		}
	}

	componentDidMount(){
		const { fetchData } = this.props.actions;
		const { myPageData } = this.props;
		myPageData.tel || fetchData( "GET_MYPAGE_DATA", "myPage" );
		
	}
	// componentWillUnmount(){
	// 	localStorage.clear()//清除web存储
	// }
	handleClick(){
		localStorage.fristVisit = "no";
		this.setState({
			showState: true
		})
	}
	render(){
		const { myPageData } = this.props;
		const pathname = this.props.location.pathname;
		if( myPageData.status === 1 ) {
			localStorage.fristVisit = "no";
		}
		const fristVisit = localStorage.fristVisit;
		return (
			<div className="my-page">
				<div className="mask" onClick={this.handleClick.bind(this)} style={{"display": !fristVisit ? "block" : "none" }}>
					<img src={mask2} className="mask-img" alt=""/>
				</div>
				<Info {...myPageData} />
				<DataShow {...myPageData} />
				<MenuList status={myPageData.status} />	
				<Nav pathname={pathname} />
			</div> 
		)
	}
}