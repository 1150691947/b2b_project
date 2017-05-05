import React, { Component } from "react";
import classnames from "classnames";

import "../css/sector.css";

export default class ProSector extends Component {
	handleClick(index){

		const { selectIndustry } = this.props.actions;
		//传入点击的 下标
		selectIndustry( "SELECT_SECTOR", index );

		this.props.router.goBack();
	}

	// componentWillReceiveProps(nextProps){
	// 	//选择新的行业后，直接跳转
	// 	if( nextProps.proInfo.industryIndex !== this.props.proInfo.industryIndex ){
	// 		//回退
	// 		this.props.router.goBack(); 

	// 	}
	// }

	render (){

		const { industry } = this.props.proInfo;

		return (
			<div>
				<ul className="industry-list fontsize24 clearfix">
					{
						industry.map((item,index) => {
							return (
								<li key={index} onClick={ this.handleClick.bind(this,index) } className={classnames("item",{ checked : item.checked })}>
									<span>{item.text}</span>
								</li> 
							)
						})
					}
				</ul>
			</div> 
		)
	}
}
