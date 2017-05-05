import React, { Component } from "react";
import { Link  } from "react-router";
import Banner from "./banner";
import Nav from "./nav";
import ReactPullLoad,{ STATS } from "react-pullload";
import { NoData, Loading } from "./loadComponent";
import "../css/homePage.css";
import Item from "./homePageItem";

class HomePage extends Component {
	constructor(){
		super();

		// this.state = {
		// 	action: STATS.init
		// }
	}
	refresh(resolve, reject){
		//拒绝下拉刷新 
		reject();
	} 
	loadmore(resolve){ 
		this.props.actions.fetchData( "GET_HOMEPAGE_DATA", "homePage" )
		resolve();  
	}  

	 handleAction = (action) => {
	    console.info(action, this.state.action,action === this.state.action);
	    //new action must do not equel to old action 
	    if(action === this.state.action){
	      return false
	    }
	 
	    if(action === STATS.refreshing){
	      this.handRefreshing();
	    } else if(action === STATS.loading){
	      this.handLoadMore();
	    } else{
	      //DO NOT modify below code 
	      this.setState({
	        action: action
	      })
	    }
	  }
	componentDidMount() {
		const {fetchData} = this.props.actions;
		const { listData, hasMore, isFetching } = this.props.getIndexPageData;
		const { imghost } = this.props.uploadToken;
		!imghost && fetchData( "GET_IMGHOST", "getImgHost" );
		!isFetching && hasMore && ( listData.length === 0 ) && this.props.actions.fetchData( "GET_HOMEPAGE_DATA", "homePage" );
	}
	render(){
		let { listData,hasMore, isFetching } = this.props.getIndexPageData;
		listData = listData || [];
		const isEmpty = listData.length === 0;
		const pathname = this.props.location.pathname;
		const { imghost } = this.props.uploadToken;
		return (
			<div className="home-page-container">
				<Banner /> 
				{/*******列表组件********/}
				<ReactPullLoad downEnough={150} hasMore={hasMore} onRefresh={this.refresh.bind(this)} onLoadMore={this.loadmore.bind(this)}>
					{
						isEmpty ? ( isFetching ? <Loading /> : <NoData />  ) : listData.map((item,index)=>{

							return <Item key={index} imghost={imghost} {...item} />

						})
					}
				</ReactPullLoad>
				<div className="edit">
					<Link to="/release?entry=home"><i className="iconfont">&#xe648;</i></Link>
				</div>
				<Nav pathname={pathname} /> 
			</div>	
		)	
	} 
}

// HomePage.propTypes = {
// 	getIndexPageData : PropTypes.objectOf(
// 			PropTypes.arrayOf(
// 				PropTypes.object.isRequired
// 			).isRequired
// 		).isRequired,
// 	actions : PropTypes.object
// }




export default HomePage;
