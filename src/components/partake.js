/*我参与的 页面*/
import React, { Component } from "react";
import { NoData, Loading } from "./loadComponent";
import "../css/partake.css";

import Item from "./newsPageItem";
export default class Partake extends Component {
	componentDidMount(){
		 this.props.actions.fetchData( "GET_PARTAKE_DATA", "partake" );
	}
	render(){
		const { partakeData } = this.props;
		return(
			<div className="partake-page">
				<ul className="list">
					{
					 	partakeData.data.length === 0 ? ( partakeData.isFetching ? <Loading /> : <NoData /> ) : partakeData.data.map((item,index) => <Item {...item} />)
					}
				</ul>
			</div>
		)
	} 
}