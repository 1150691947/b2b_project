import React, { Component } from 'react';
// import { Link } from "react-router";
// import classnames from "classnames";
import "../css/brandDetails.css";
// import LazyLoad from 'react-lazyload';

// const PlaceholderComponent = ( props ) => (
// 	<div className="img-placeholder">微 耀</div>
// )
 
export default class BrandDetails extends Component {
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
		// const detailsPageData = this.props.detailsPageData.data;
		// const { entryPage } = this.props.location.query;
		// const { imghost } = this.props.uploadToken;
		
		return ( 
			<div className="brand-details">
				<header className="header clearfix">
					<div className="left-container fl">
						<div className="logo-container">
							<img src="" alt=""/>
						</div>
					</div>
					<div className="right-container fontsize24 fl">
						<p className="txt">name</p>
						<p className="txt">行业：</p>
						<p className="txt">所在地：</p>
						<p className="txt">公司：</p>
						<p className="txt">性质：</p>
					</div>
				</header>

				<div className="brief-introduction">
					<div className="title-container">
						<h2 className="title fontsize30">公司简介</h2>
					</div>
					<div className="content fontsize24">发觉送的啊看成绩可长时间啊lj</div>
				</div>
			</div>
		)
	}
}