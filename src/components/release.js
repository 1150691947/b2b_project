import React, { Component } from "react";
import { Link } from "react-router";
import { Form, Control, Errors } from "react-redux-form";

import TextareaAutosize from 'react-autosize-textarea';

import Datepicker from "./datepicker.js";

import "../css/release.css"
// <input type="text" className="fontsize30"  />
const Input = (props) => {
	return (
		<input type="text" {...props} className="fontsize30"  />	
	)
}

const InfoItem = (props) => {
	return (
		<label htmlFor={props.id}>
			<div className="info-item fontsize30">
				<div className="left">{props.title}</div>
				<div className="right">
					<Control id={props.id} validators={{
					    isRequired: (val) => val && val.length,
					  }} validateOn="blur"  model={`.${props.model}`} component={props.component} />
					<Errors model={`.${props.model}`} messages={{
					    isRequired: 'isRequired',
					  }} show="touched" />
				</div>
			</div>  
		</label>
	)
}

const Radio = (props) => {
	return (
		<label className="label">
			<Control.radio model={`.${props.model}`} value={props.value} />{props.value}
			<div className="radio">
				<i className="iconfont fontsize24">&#xe601;</i>
			</div>
		</label>
	) 
}


export default class ReleasePage extends Component {
	handleSubmit(values){
		console.log( values )
	}
	render(){
		//所属行业的数据
		const { checkedIndex, industryArr } = this.props.selectIndustry;
		//地区数据
		const { checkedCitys } = this.props.selectCity;
		return (
			<div className="release-page">
				<Form model="form.releaseForm" onSubmit={(val) => this.handleSubmit(val)}>
					<InfoItem title="标题" model="title" id="title" component={TextareaAutosize} />
					<InfoItem title="品牌名称" model="brandName" id="brandName" component={TextareaAutosize} />

					<div className="info-item radio-container fontsize30">
						<div className="left">我是该品牌</div>
						<Radio model="is_brandSide" value="品牌主" />
						<Radio model="is_brandSide" value="品牌主或合作方" />		
					</div>

					<div className="info-item radio-container budget fontsize30">
						<div className="left">是否有预算</div>
						<Radio model="budget" value="否" />
						<div>
							<Radio model="budget" value="是" />
							<div className="budget-content">
								<Control model=".budgetContent" component={Input} />
							</div>
						</div>

					</div>
					<Link to="release/sector">		
						<div className="info-item fontsize30">
							<div className="left">品牌所属行业</div>
							<Control component={Input} model=".sector" disabled={true} mapProps={{className:"fontsize30",value: industryArr[checkedIndex].text}}  />
							<i className="iconfont fontsize36">&#xe602;</i>
						</div>
					</Link>

					<Link to="release/findIndustry">		
						<div className="info-item fontsize30">
							<div className="left">寻找行业</div>
							<Control component={Input} model=".findIndustry" disabled={true} mapProps={{
								className:"fontsize30"}} />
							<i className="iconfont fontsize36">&#xe602;</i> 
						</div>
					</Link>

					<Link to="release/selectCity">		
						<div className="info-item fontsize30">
							<div className="left">合作地区</div>
							<Control component={Input} model=".area" disabled={true} mapProps={{
								value:checkedCitys,
								className:"fontsize30"}} />
							<i className="iconfont fontsize36">&#xe602;</i>
						</div>
					</Link>	

					<div className="info-item fontsize30">
						<div className="left">有效时间</div>
						<Datepicker/>
						<i className="iconfont fontsize36">&#xe602;</i>
					</div>
						
					<InfoItem title="手机" model="tel" id="tel" component={Input} />

					<button>提交</button>
				</Form>
			</div>
		)
	}
} 

// {industryArr[checkedIndex].text}