import React, { Component } from "react";

import "../css/selectCity.css";

export default class SelectCity extends Component {
	
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

	handleClick(){
		//action
		const { selectArea } = this.props.actions;
		selectArea( "GET_CITY" );

		this.props.router.goBack();
	}

	render(){
		//数据数组
		const { provinceArr, checkedCitys } = this.props.selectCity;
		return ( 
			<div className="select-city">
				<ul className="checked-list">
					{
						checkedCitys.map(( item, index ) => {
							return (
								<li className="checked-item fontsize26" key={index}>{ item }</li>	
							)
						}) 
					} 
				</ul> 
				<ul className="province-list fontsize30">
					{	/****
							嵌套循环出 城市数据列表
						****/ 
						provinceArr.map(( item, p_index ) =>{
							return (<li className="province-item" key={p_index}>
								<div className="item-content" style={{background: item.is_open && !item.city ? "#ccc":"#fff"}} key={p_index} onClick={ this.provinceHandleClick.bind( this, p_index )}>{item.province} { item.city ? (item.is_open ? <i className="iconfont fontsize30 fr">&#xe764;</i> : <i className="iconfont fontsize30 fr">&#xe602;</i>) : ""}</div>
								<ul className="city-list" >{
								item.is_open && item.city ? //如果 is_open 为true 循环子列表
									item.city.map(( c_item, c_index ) => {
										return (<li className="city-item" style={{background:c_item.is_checked ? "#ccc":"#fff"}} key={c_index} onClick={ this.cityHandleClick.bind( this, p_index,c_index ) }>{ c_index === 0 ? "全部" : c_item.cityName}</li>)
									}) : ''
								
							}</ul>
							</li>)	
						})
					}
				</ul>
				<div className="btn fontsize36" onClick={ this.handleClick.bind(this) }>确定</div>	
			</div>
		)
	}
}
