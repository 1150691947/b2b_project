import React, { Component } from "react";
import classnames from "classnames";


import "../css/sector.css";


export default class Sector extends Component {
	handleClick(index){

		const { selectIndustry } = this.props.actions;
		//传入点击的 下标
		selectIndustry( "THE_INDUSTRY", index );
	}

	componentDidMount(){
				//选择行业的reducer
		const { selectIndustry } = this.props.actions,

			  { checkedIndex } = this.props.selectIndustry;

			  selectIndustry( "THE_INDUSTRY", checkedIndex );
	}

	componentWillReceiveProps(nextProps){
		//选择新的行业后，直接跳转
		if( nextProps.selectIndustry.checkedIndex !== this.props.selectIndustry.checkedIndex ){
			//回退
			this.props.router.goBack(); 

		}

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
