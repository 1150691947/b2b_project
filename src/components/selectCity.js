import React, { Component } from "react";

import "../css/selectCity.css";

export default class SelectCity extends Component {
	constructor(props){
		super(props);

	}

	provinceHandleClick ( index ) {

		//action
		const { selectArea } = this.props.actions;

		selectArea( "SELECT_PROVINCE", index );

	}

	cityHandleClick (p_index,c_index) {

		//action
		const { selectArea } = this.props.actions;

		selectArea( "SELECT_CITY", {p_index,c_index} );

	}

	render(){
		console.log( this.props )
		//数据数组
		const { provinceArr, checkedCitys } = this.props.selectCity;
		
		return (
			<div>
				<ul className="checked-list">
					{
						checkedCitys.map(( itme, index ) => {
							return (
								<li className="checked-item fontsize26" key={index}>{itme}</li>	
							)
						})
					}
				</ul> 
				<ul className="province-list">
					{	/****
							嵌套循环出 城市数据列表
						****/
						provinceArr.map(( item, p_index ) =>{
							return (<li className="province-item" key={p_index}>
								<div className="item-content" onClick={ this.provinceHandleClick.bind( this, p_index )}>{item.province}</div>
								<ul className="city-list" >{
								item.is_open ? //如果 is_open 为true 循环子列表
									item.city.map(( item, c_index ) => {
										return (<li className="city-item" key={c_index} onClick={ this.cityHandleClick.bind( this, p_index,c_index ) }>{item.cityName}</li>)
									}) : ''
								
							}</ul>
							</li>)	
						})
					}
				</ul>	
			</div>
		)
	}
}
