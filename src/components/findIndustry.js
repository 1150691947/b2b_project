import React, { Component } from "react";
import classnames from "classnames";

import "../css/findIndustry.css"

export default class FindIndustry extends Component {
	handleClick(index){
		const { selectIndustry } = this.props.actions;
		//传入点击的 下标
		selectIndustry( "FIND_INDUSTRY", index ); 
	} 
	ensure(){
		const { selectIndustry } = this.props.actions;
		selectIndustry( "GET_INDUSTRY" ) 
		this.props.router.goBack();	
	} 
	render (){
		const { industryArr } = this.props.findIndustry;
		return (
			<div className="find-industry">
				<ul className="industry-list fontsize24 clearfix">
					{
						industryArr.map((item,index) => {
							return (
								<li key={index} onClick={ this.handleClick.bind( this, index ) } className={classnames("item",{ checked: !item.checked })}>
									<span>{item.text}</span>
								</li>
							) 
						})
					}
				</ul>
				<div className="btn fontsize36" onClick={ this.ensure.bind(this) }>确定</div>
			</div>
		)
	}
}