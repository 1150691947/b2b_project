/*我参与的 页面*/
import React, { Component } from "react";
import { NoData, Loading } from "./loadComponent";
import classnames from "classnames";
import "../css/partake.css";
import "../css/successCooper.css";
import Item from "./newsPageItem";
export default class SuccessCooper extends Component {
	constructor(){
		super();
		this.state = {
			index : 0
		}
	}
	componentDidMount(){
		 this.props.actions.fetchData( "SUCCESS_COOPER_HOSTARR", "successCooper", '' );
	}
	handleClick(index){
		this.setState({
			index
		});	
		if( index === 0 ){
			this.props.actions.fetchData( "SUCCESS_COOPER_HOSTARR", "successCooper", "" );	
		}else {
			this.props.actions.fetchData( "SUCCESS_COOPER_SPONSOR", "successCooper", 1 );
		}
		
	}
	
	render(){
		const { successCooper } = this.props;
		const { index } = this.state;
		return(
			<div className="partake-page success-cooper">
				<div className="tab-container fontsize36">
					<div className={classnames("tab",{"active":index === 0})} onClick={this.handleClick.bind(this,0)}>主办</div>
					<div className={classnames("tab",{"active":index === 1})} onClick={this.handleClick.bind(this,1)}>赞助</div>
				</div>
				<ul className={classnames("list",{"hide":index === 1})}>
					{
					 	successCooper.hostArr.length === 0 ? ( successCooper.isFetching ? <Loading /> : <NoData /> ) : successCooper.hostArr.map((item,index) => <Item {...item} />)
					}
				</ul> 
				<ul className={classnames("list",{"hide":index === 0})}>
					{
					 	successCooper.sponsor.length === 0 ? ( successCooper.isFetching ? <Loading /> : <NoData /> ) : successCooper.sponsor.data.map((item,index) => <Item {...item} />)
					}
				</ul>

			</div> 
		)
	}
}