import React, { Component } from "react";
import classnames from "classnames";


import "../css/sector.css";


export default class Job extends Component {
	handleClick(index){

		const { selectIndustry } = this.props.actions;
		//传入点击的 下标
		const { entry } = this.props.location.query;
		if( entry === 'job' ){
			selectIndustry( "SELECT_JOB", index );
		}else if( entry === 'level' ){
			selectIndustry( "SELECT_LEVEL", index );
		}else if( entry === 'scale' ){
			selectIndustry( "SELECT_SCALE", index );
		}else if( entry === 'nature' ){
			selectIndustry( "SELECT_NATURE", index );
		}
	} 

	componentWillReceiveProps(nextProps){
		
		//传入点击的 下标
		const { entry } = this.props.location.query;
		if( entry === 'job' ){
			if( nextProps.proInfo.jobIndex !== this.props.proInfo.jobIndex ){	
				//回退
				this.props.router.goBack(); 
			}
		}else if( entry === 'level' ){
			if( nextProps.proInfo.jobLevelIndex !== this.props.proInfo.jobLevelIndex ){	
				//回退
				this.props.router.goBack(); 
			}
		}else if( entry === 'scale' ){
			if( nextProps.entCer.scaleIndex !== this.props.entCer.scaleIndex ){	
				//回退
				this.props.router.goBack(); 
			}
		}else if( entry === 'nature' ){
			if( nextProps.entCer.natureIndex !== this.props.entCer.natureIndex ){	
				//回退
				this.props.router.goBack(); 
			}
		}

	}

	render (){

		let dataArr=  [];
		const { entry } = this.props.location.query;
		if( entry === 'job' ){
			dataArr = this.props.proInfo.job;
		}else if( entry === 'level' ){
			dataArr = this.props.proInfo.jobLevel;
		}else if( entry === 'scale' ){
			dataArr = this.props.entCer.scale;
		}else if( entry === 'nature' ){
			dataArr = this.props.entCer.nature;
		}
		console.log( entry )
		return (
			<div>
				<ul className="industry-list fontsize24 clearfix">
					{
						dataArr.map((item,index) => {
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
