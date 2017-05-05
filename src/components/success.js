import React from "react";
import { Link } from "react-router";
import "../css/success.css";

const Success = React.createClass({
	render:function(){
		return (
			<div className="success-page">
				<i className="iconfont">&#xe60b;</i>
				<p className="tip fontsize36">提交成功，需等1个工作日进行审核</p>
				<Link to="/my" className="btn fontsize30">回到首页</Link>	
			</div>
		)
	}
});

export default Success;