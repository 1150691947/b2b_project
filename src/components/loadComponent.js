import React from "react";
import "../css/loadComponent.css";
export const NoData = ( props ) => (
	<div className="load-tip">
		<i className="iconfont">&#xe605;</i>
		<div className="fontsize30">暂无符合条件的数据</div>
	</div>
	
)
const loadingStyle = {
	"display":"inline-block",
	"position":"relative",
	"left":"50%",
	"transform":"translateX(-50%)"
}
export const Loading = ( props ) => (
	<div className="loader" style={loadingStyle}>
	    <div className="loader-inner ball-pulse">
	      	<div></div>
	      	<div></div>
	     	<div></div>
	    </div>
  </div>
)

export const RequestLoading = props => (
	<div className="request-loading" style={{ "display": props.isFetching ? "block" : "none" }}>
		<div className="load"></div>
		<span className="tip fontsize30">{props.loadingText}</span>
	</div>
)
	