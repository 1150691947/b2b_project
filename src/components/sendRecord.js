/**发送记录页面**/
import React, { Component } from 'react';
import { Link } from "react-router";
import classnames from "classnames";
import "../css/sendRecord.css";

import { NoData, Loading } from "./loadComponent";

const menu = ["全部","未回应","已合作"];

const TabMenu = ( props ) => {

	const { activeIndex, handleClick } = props;

	return (
		<div className="tab-menu fontsize36">
			{
				menu.map(( item, index ) => {
					return (
						<div className={classnames("menu-item",{"active" : activeIndex === index})} key={index} onClick={handleClick.bind(null,index)}>{item}</div>
					)
				}) 
			}
		</div>
	) 
}  

const Linkman = (props) => (
	<div className="link-man fl">联系人：{props.linkman}{(props.status === 1 )&& <span> | {props.tel}</span>}</div>
)

const RemainingTime = (props) => {
	
	return (
		<div className="remaining-time fr">剩余时间{props.remainTime}</div>
	)
} 
	


const Expire = (props) => (
	<div className="expire fr">已过期</div>
)

const Item = ( props ) => {
	return ( 
		<li className="item">
			<Link to={`/details?id=${props.id}&entryPage=sendRecord`} className="item-container" >
				<div className="content-container">
					<div className="head-container clearfix">
						<div className="logo fl">
							<img src={props.headimgurl} alt="" />
						</div>
						<div className="center fl ">
							<p className="company-name fontsize36">{props.nickname}</p>
							<p className="release-time fontsize24">发布时间：{props.create_time}</p>
						</div>
						{/*<span className="time fr fontsize24">{props.c_time}</span>*/}
					</div>
					<div className="body-container">
						<div className="container">
							<p className="title fontsize28">{`【${props.name}】${props.title}`}</p>
							<div className="label fontsize22">
								<span className="industry">所属行业：{props.trade}</span>
								<span>合作地区：{props.city}</span>
							</div> 
						</div>
					</div>
					<div className="footer-container fontsize30 clearfix">
						{ props.linkman && <Linkman linkman={props.linkman} status={props.status} tel={props.tel} />}
						{ props.is_expire ? <Expire /> : ( props.status === 1 ? "" : <RemainingTime remainTime={props.remain_time} />)}
					</div>
				</div>

			</Link>
		</li>
	)
}



const  mapItem = ( data ) => {
	return data.map(( item, index ) => (
		<Item key={index} {...item} />
	))
}

export default class SendRecord extends Component {
	constructor(){
		super();
		this.state = {
			menuActive : 0
		}
	}
	handleClick(index = this.state.menuActive){
		this.setState({
			menuActive : index 
		});
		const { fetchData } = this.props.actions;
		const { ...sendRecordData } = this.props.sendRecordData;
		if( index === 0 && !sendRecordData.allDidInvalidate ){
			fetchData( "GET_ALL", "sendRecord", 3 );
		}else if( index === 1 && !sendRecordData.notDidInvalidate ){
			fetchData( "GET_NOT_RESPONED", "sendRecord", 2 );
		}else if( index === 2 && !sendRecordData.proDidInvalidate ){
			fetchData( "GET_PROCESSED", "sendRecord", 1 );
		}
	}

	componentDidMount(){
		const { fetchData } = this.props.actions;
		const { ...sendRecordData } = this.props.sendRecordData;
		if( sendRecordData.all.length === 0 ){
			fetchData( "GET_ALL", "sendRecord", 3 );
		}
	}

	render(){
		const { menuActive } = this.state;
		const { ...sendRecordData } = this.props.sendRecordData;
		return (
			<div className="send-record">
				<TabMenu activeIndex={this.state.menuActive} handleClick={this.handleClick.bind(this)} />
				<ul className="list" style={{display:menuActive === 0 ? "block" : "none"}}> 
					 { sendRecordData.all.length === 0 ? ( sendRecordData.isFetching ? <Loading /> : <NoData /> ) : mapItem( sendRecordData.all ) }
				</ul>
				<ul className="list" style={{display:menuActive === 1 ? "block" : "none"}}> 
					{sendRecordData.notRespond.length === 0 ? ( sendRecordData.isFetching ? <Loading /> : <NoData /> ) : mapItem( sendRecordData.notRespond )}
				</ul>
				<ul className="list" style={{display:menuActive === 2 ? "block" : "none"}}> 
					{ sendRecordData.processed.length === 0 ? ( sendRecordData.isFetching ? <Loading /> : <NoData /> ) : mapItem( sendRecordData.processed )}
				</ul>
			</div>
		)
	}
}