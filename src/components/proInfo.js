import React, { Component } from "react";
import { hashHistory, Link } from "react-router";
import { Form, Control } from "react-redux-form";
import InfoItem from "./formItem.js";
import DialogComponent from "./dialog";
import "../css/proInfo.css";

const Input = (props) => {
	return (
		<input type="text" {...props} className="fontsize30"  />	
	)
} 
 

class LinkInput extends Component{
	render(){
		const props = this.props;
		// console.log(releaseReducer( form.releaseForm, actions.change( track( `form.releaseForm.${props.model}`, 123 ) ) ));

		return (
			<Link to={props.href}>		
					<div className="info-item fontsize30">
					<div className="left">{props.title}</div>
					<span style={{"lineHeight":"1.12rem"}}>{props.value}</span>
					<i className="iconfont fontsize36">&#xe602;</i>
				</div> 
			</Link>  
		)
	}   
}  
// nickname = value.userName,
export default class ProInfo extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			dialogContent: ""
		}
	}
	handleSubmit( value ){
		const { ...props } = this.props.proInfo;
			  // { postFormData } = this.props.actions;
		const trade = props.industryIndex.toString()  ? props.industry[props.industryIndex].text : "",
			  job_level = props.jobLevelIndex.toString()  ? props.jobLevel[props.jobLevelIndex].text: "",
			  job = props.jobIndex.toString() ? props.job[props.jobIndex].text : "";
		if( trade === '' ){
			this.setState({
				open: true,
				dialogContent: "请选择行业"
			})
			return
		}else if( job_level === '' ){
			this.setState({
				open: true,
				dialogContent: "请选择职务级别"
			})
			return
		}else if( job === '' ){
			this.setState({
				open: true,
				dialogContent: "请选择职务"
			})
			return
		}  
		hashHistory.push( "/uploadInfo?entry=proInfo" );
	}
	handleClose(){
		this.setState({
			open: false
		});
	}
	render(){
		const { ...props } = this.props.proInfo;
		const { status } = this.props.myPageData;
		return ( 
			<div className="pro-info">
				<div className="label-block fontsize24">上传材料证明职业身份，才可发布职业信息</div>
				<DialogComponent open={this.state.open} content={this.state.dialogContent} onRequestClose={this.handleClose.bind(this)} />
				<Form model="form.proInfo" onSubmit={ ( val ) => this.handleSubmit( val ) }>
					<InfoItem title="姓名" disabled={status === 1} placeholder="输入姓名（姓名设置后无法更改）" errorMessages="姓名不能为空" model="name" component={Input} />
					<InfoItem title="手机号" placeholder="输入手机号" type="number" errorMessages="手机号不能为空" model="tel" component={Input} />
					<LinkInput title="所在行业" href="/pro_sector" model="industry" value={ props.industry[props.industryIndex] ? props.industry[props.industryIndex].text : ""} /> 
					<InfoItem title="公司" placeholder="输入公司名" errorMessages="公司名不能为空" model="company" component={Input} />
					<InfoItem title="品牌" placeholder="输入品牌名" model="brand" errorMessages="品牌名不能为空" component={Input} />
					<LinkInput title="职务级别" model="level" href="/job?entry=level" value={ props.jobLevelIndex.toString() ? props.jobLevel[props.jobLevelIndex].text : ""}  />
					<LinkInput title="职位" model="job" href="/job?entry=job" value={ props.jobIndex.toString() ? props.job[props.jobIndex].text : ""} />
					<button className="btn fontsize36">下一步</button> 
				</Form> 
			</div>
		) 
	}
} 
// <InfoItem title="用户名" model="userName"  component={Input} />
 