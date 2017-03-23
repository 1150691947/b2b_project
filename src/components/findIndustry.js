import React, { Component } from "react";
import classnames from "classnames";

import "../css/findIndustry.css"

export default class FindIndustry extends Component {
	handleClick(index){

		const { selectIndustry } = this.props.actions;
		//传入点击的 下标
		selectIndustry( "FIND_INDUSTRY", index );
	}

	componentDidMount(){
				//选择行业的reducer
		const { selectIndustry } = this.props.actions,

			  { checkedIndex } = this.props.selectIndustry;

			  selectIndustry( "FIND_INDUSTRY", checkedIndex );
	}

	render (){

		const { industryArr } = this.props.selectIndustry;

		return (
			<div>
				<ul className="industry-list fontsize30 clearfix">
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