import React, { Component } from "react";
import classnames from "classnames";


import "../css/sector.css";


export default class Sector extends Component {
	handleClick(index){
		// const { industryArr } = this.props.selectIndustry;

		const { selectIndustry } = this.props.actions;
		//传入点击的 下标
		selectIndustry( "THE_INDUSTRY", index );

		this.props.router.goBack();
	}

	render (){
		const { industryArr } = this.props.selectIndustry;
		return ( 
			<div>
				<ul className="industry-list fontsize24 clearfix">
					{
						industryArr.map((item,index) => {
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
