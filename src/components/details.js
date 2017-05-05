import React, { Component } from 'react';
import { Link } from "react-router";
import classnames from "classnames";
import "../css/details.css";
import LazyLoad from 'react-lazyload';
class CompanyInfo extends Component{
	constructor(){
		super(); 
		this.state = {
			showIntroduce : false
		} 
	} 
	handleClick(){ 
		this.setState({
			showIntroduce : !this.state.showIntroduce//显示与隐藏公司介绍
		});
	}  
	render(){  
		const props = this.props;
		const trade = props.seek_trade && props.seek_trade.split(",");
		return (
			<div className={classnames("company-info",{"show":this.state.showIntroduce})}>
				<div className="info-container"> 
					<div className="container">
	 					<div className="top-container clearfix">

							<img src={props.headimgurl} alt="头像" className="logo fl"/>

							<div className="info fl">
								<div className="company-name fontsize30">
									{props.nickname}
								</div>
								<div className="time fontsize24">发布时间：{props.create_time}</div>
							</div>
							<div className="fr triangle" onClick={this.handleClick.bind(this)}>
								<i className="iconfont fontsize32">&#xe667;</i>
							</div>
						</div>

						<div className="bottom-container fontsize24">							
							<div className="find-industry">寻找行业：{trade && trade.length === 23 ? "不限" : props.seek_trade}</div>	
							<div className="range-area">合作地区：{props.city}</div>
							<div className="clearfix">
							{ props.budget !== "" && <div className="fl">预算：<span className="budget fontsize28">{props.budget}</span></div> }
								<div className="effective-time fr">有效时间：{props.valid_time}</div>
							</div>
						</div>
					</div>
				</div>

				<div className="company-intr">
					<div className="intr fontsize30">公司介绍</div>
					<div className="content">{props.company_describe}</div>
				</div>

			</div>
		) 
	} 
}



class TabBlock extends Component {
	constructor(){
		super();
		this.state = {
			isDisplay : true //显示状态
		}
	}
	//点击切换tab
	handleClick(){
		this.setState({
			isDisplay : !this.state.isDisplay
		})
	}
	render(){
		let {isDisplay} = this.state;
		const props = this.props;
		return (
			<div className="tab-wrap"> 
				<div className="tab-nav"> 
				{ props.supply && props.need && <div>
						<div className={classnames("nav-item provide fontsize30",{"current-nav" :isDisplay})} onClick={!isDisplay ? this.handleClick.bind(this) : ""}>我们提供</div>
						<div className={classnames("nav-item need fontsize30",{"current-nav" :!isDisplay}) } onClick={isDisplay ? this.handleClick.bind(this) : ""}>我们需要</div>
					</div> }
					{ (props.supply && !props.need) && <div className="nav-item need fontsize30" style={{"width":"100%"}}>我们提供</div> }
					{ (!props.supply && props.need) && <div className="nav-item need fontsize30" style={{"width":"100%"}}>我们需要</div> }
				</div>
				<div  className="tab-content fontsize28">
					{ props.supply && props.need && <div>
						<div className={classnames("content-item ",{"current-content":isDisplay})} >
							{props.supply}
						</div>
						<div className={classnames("content-item ",{"current-content": !isDisplay})} >
							{props.need}
						</div>
					</div>}
					{ (props.supply && !props.need) && <div className="content-item" style={{"display":"block"}}>{props.supply}</div> }
					{ (!props.supply && props.need) && <div className="content-item" style={{"display":"block"}}>{props.need}</div> }
				</div>

				<div className="tab-footer">
					<div className="container fr fontsize24">
						<span><i className="iconfont fontsize24">&#xe61a;</i></span>
						<span className="coop"><i className="iconfont fontsize30">&#xe62d;</i>{props.cq}</span>
						<span className="see"><i className="iconfont fontsize30">&#xe6ac;</i>{props.pv}</span>
					</div>
				</div>
			</div>	 
		)
	}
} 
 
const PlaceholderComponent = ( props ) => (
	<div className="img-placeholder">微 耀</div>
)

export default class DetailsPage extends Component {
	componentDidMount(){
		const pageId = this.props.location.query.id,
			  { fetchData } = this.props.actions;
		//拉取数据
		const { entryPage } = this.props.location.query;
		const { imghost } = this.props.uploadToken;
		!imghost && fetchData( "GET_IMGHOST", "getImgHost" );
		if( entryPage === "homePage" ){
			fetchData( "GET_DETAILS_DATA", "details", pageId );
		}else if( entryPage === "sendRecord" ){
			fetchData( "GET_DETAILS_DATA", "sendRecord_details", pageId );
		}else if( entryPage === "iRelease" ){
			fetchData( "GET_DETAILS_DATA", "iRelease_details", pageId );
		} 
	}
	render(){ 
		const detailsPageData = this.props.detailsPageData.data;
		const { entryPage } = this.props.location.query;
		const { imghost } = this.props.uploadToken;
		let bottomBtn = '';
		if( entryPage === "homePage" && detailsPageData.is_req ){
			bottomBtn = <Link to={`/request?id=${detailsPageData.id}`} className="btn fontsize36"><i className="iconfont fontsize44">&#xe763;</i>合作请求</Link>
		}else if( entryPage === "sendRecord" ){
			bottomBtn = <div className="surplus fontsize36">{ detailsPageData.status === 1 ? <div>{`${detailsPageData.linkman} | ${detailsPageData.tel}`}</div> : <div>剩余时间：{detailsPageData.remain_time}</div>}</div>
		}else if( entryPage === "iRelease" ){
			bottomBtn = detailsPageData["is_expire "] ? ( ( detailsPageData.cq > 0 ) ? <div className="btn fontsize36">{detailsPageData.linkman+detailsPageData.tel}</div> : <div className="surplus fontsize36">已过期</div> ) :  <div className="surplus fontsize36">剩余时间：{detailsPageData.remain_time}天</div>
		}  
		return ( 
			<div className="details-page">
				{ detailsPageData.imgurl &&<div className="cover">
					 <LazyLoad placeholder={<PlaceholderComponent />}>
						<img src={`${imghost}${detailsPageData.imgurl}`} alt="头像" />
					</LazyLoad>
				</div> }
				<div className="title-container">
					<div className="title fontsize30">
						{`【${detailsPageData.name}】${detailsPageData.title}`}
					</div>
				</div>
				<CompanyInfo {...detailsPageData} />
				<TabBlock {...detailsPageData} />
				{ bottomBtn }
			</div>
		)
	}
}