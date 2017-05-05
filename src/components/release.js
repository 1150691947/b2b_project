/*发布页面*/
import React, { Component } from "react";
import { Link, hashHistory } from "react-router";
import { Form, Control } from "react-redux-form";
import classnames from "classnames";
// import { Field, reduxForm } from 'redux-form';
// import TextareaAutosize from 'react-autosize-textarea';
import Datepicker from "./datepicker.js";
import InfoItem from "./formItem.js";
import DialogComponent from "./dialog";
import { RequestLoading } from "./loadComponent";
import Qiniu from "react-qiniu";
// import autosize from "autosize";
import "../css/release.css"

const Input = (props) => (
	<input type="text" {...props} className="fontsize30"  />	
)

const Radio = (props) =>  ( 
	<label className="label">
		<Control.radio model={`.${props.model}`}  value={props.value} />{props.value}
		<div className="radio">
			<i className="iconfont fontsize24">&#xe601;</i>
		</div> 
	</label> 
)    

class LinkInput extends Component{
	render(){
		const props = this.props;
		// console.log(releaseReducer( form.releaseForm, actions.change( track( `form.releaseForm.${props.model}`, 123 ) ) ));

		return (
			<Link to={props.href}>		
					<div className="info-item fontsize30">
					<div className="left">{props.title}</div>
					<Control component={Input}  ignore={['focus', 'blur']} {...props} updateOn={['change', 'blur']} model={`.${props.model}`} />
					<i className="iconfont fontsize36">&#xe602;</i>
				</div>
			</Link>  
		)
	} 
} 
  
const TextareaComponent = ( props ) => ( 
	<div className="textarea-container fontsize30">
		<div className={classnames("container",{"open": props.logged})} >
			<div className="clearfix header">
				<div className="title fl">{props.title}</div>
				<div className={classnames("toggle fr",{"toggle-right": props.logged})} onClick={props.handleChange}><div className="round"></div></div>
			</div>
			<div className="textarea">
				<Control.textarea placeholder={props.placeholder} mapProps={{className:"fontsize30"}} model={`.${props.model}`} />
			</div>
		</div>
	</div> 
)


// const TextareaAutosize = ( props ) => (
// 	<textarea {...props} className="textarea-autosize"></textarea>
// )

export default class ReleasePage extends Component {
	constructor(){ 
		super(); 
		this.state = {
			timeValue : "",
			datepickerIsDisplay: false,
			imgurl: "",
			isSelectImg: false,
			open: false,
			dialogContent: "",
			imgkey:"",
			spLogged: true,
			hoLogged: true
		}
	} 
	componentWillReceiveProps( nextProps, nextState ){
		if( this.props !== nextProps ){
			const { postFormData } = nextProps;
			const { resetPostFormState } = this.props.actions;
			if( postFormData.didInvalidate ){
				if( postFormData.response.data > 0 ){
					// this.setState({
					// 	dialogContent: "发布成功",
					// 	open: true
					// });
					resetPostFormState();//重置表单状态
					hashHistory.push("/iRelease");
				}else {
					this.setState({
						dialogContent: "发布失败",
						open: true
					});
				}
			}else if( postFormData.error ){
				this.setState({
					dialogContent: "服务发生错误，请稍候再试",
					open: true
				});
			}
		} 
	}
	//提交表单 
	handleSubmit(values){
		const { postFormData } = this.props.actions;  
		//所属行业的数据
		const { checkedIndex, industryArr } = this.props.selectIndustry;
		//寻找行业的数据
		const { findInd } = this.props.findIndustry;
		//地区数据
		const { checkedCitys } = this.props.selectCity;

		const name = values.brandName,
			  title = values.title,
			  brand = values.is_brandSide,
			  budget = values.budget,
			  budgetContent = values.budgetContent,
			  trade = industryArr[checkedIndex] ? industryArr[checkedIndex].text : "",
			  seek_trade = findInd.length === 23 ? "不限" : findInd.toString(),
			  valid_time = this.state.timeValue,
			  city = checkedCitys.toString(),
			  supply = values.provide,
			  need = values.need,
			  tel = values.tel,
			  imgurl = this.state.imgkey,
			  property = "231",
			  scale = "12",
			  company_describe = "2";
 
		let  sn = 2;
			  if( supply === "" ){
			  	sn = 1; // 提供是空的话 就是找赞助
			  }else if( need === "" ){
			  	sn = 0; // 需要是空的话 就是找主办
			  }

			  if( budget === "是" && budgetContent === "" ){
 
			  	this.setState({
			  		open: true,
			  		dialogContent: "输入预算有多少"
			  	});
			  	return 

			  }else if( trade === "" ){
			  	this.setState({
			  		open: true,
			  		dialogContent: "请选择所属行业"
			  	});
			  	return 
			  }else if( seek_trade === "" ){
			  	this.setState({
			  		open: true,
			  		dialogContent: "请选择寻找的行业"
			  	});
			  	return 
			  }else if( city === "" ){
			  	this.setState({
			  		open: true,
			  		dialogContent: "请选择合作城市"
			  	});
			  	return
			  }else if( valid_time === "" ){
			  	this.setState({
			  		open: true,
			  		dialogContent: "请选择有效时间"
			  	});
			  	return
			  }

			  if( supply === "" && need === "" ){
			  	this.setState({
			  		open: true,
			  		dialogContent: "您是主办方还是赞助商呢？"
			  	});
			  	return 
			  }  

		try {
			const formData = {
				name,//品牌名称
				title, //标题
				brand, //品牌的
				budget: budgetContent,//预算
				trade,//所属行业
				seek_trade,//寻找行业
				valid_time,//有效时间
				city,//合作城市
				supply,//提供 
				need,//需要
				tel,//电话
				imgurl,//图片
				property,//性质
				scale,//规模
				company_describe,//公司描述
				sn//主办or赞助
			}
			postFormData( "release", formData ); 
		}catch(err){
			

		}
	} 
	handleSelectTime(value){
		this.setState({
			timeValue : value,
			datepickerIsDisplay: false
		});
	}
	//file change事件
	// handleFileChange(){
	// 	//文件对象列表 
	// 	let files = this.refs.file.files;
	// 	//FileReader对象转base64
	// 	const fr = new FileReader(),
	// 		  that = this;
	// 	//类数组对象转数组
	// 	files = Array.prototype.slice.call( files );
	// 	// files = Array.from( files ); //等同于上
	// 	if( !files[0] ) return ;
	// 	if( files[0] && files[0].type.indexOf('image') === -1 ) {
	// 		alert("请选择正确的图片")
	// 		return; //如果不是图片对象，就不操作	
	// 	} 
	// 	that.setState({
	// 		isSelectImg: true
	// 	})
	// 	//FileReader 把 file 对象转为 base64
	// 	fr.readAsDataURL(files[0]);
	// 	fr.onload = function( e ) {	
	// 		//创建canvas对象 使用canvas对象压缩图片
	// 		const canvas= document.createElement("canvas"),
	// 			  context= canvas.getContext("2d");
	// 		const img= new Image(),
	// 			  src= e.target.result;//图片base64
	// 			  img.src = src;
	// 		img.onload= function(){ 
	// 			canvas.width= img.width; 
	// 			canvas.height= img.height;
	// 			//绘制图片
	// 			context.drawImage(img,0,0);
	// 			const dataUrl = canvas.toDataURL("image/jpeg", 0.5); //压缩 参数（压缩的类型，压缩比例0-1）
	// 			that.setState({
	// 				imgurl: dataUrl,
	// 				isSelectImg: false
	// 			})
	// 		}	  
	// 	};
	// }
	//删除图片
	deleteImg(){
		this.setState({
			imgurl: "",
			imgkey:""
		})
	}
	componentDidMount(){
		// autosize(document.querySelectorAll('.textarea-autosize'));
		const { fetchData } = this.props.actions;
		fetchData( "GET_TOKEN", "getToken" );
	}
	handleClose(){
		const { resetPostFormState } = this.props.actions;
		resetPostFormState();//重置表单状态
		this.setState({
			open: false
		})
	}
	//Qiniu upload  
	upload(files){
		this.setState({
			isSelectImg: true
		})
		var getResponseImg = window.setInterval(function() {
	      if (files[0].request.xhr.response) {
	        var key = JSON.parse(files[0].request.xhr.response).key;
	      	this.setState({
				imgurl: files[0].preview,
				isSelectImg: false,
				imgkey:key
			});
	        window.clearInterval(getResponseImg);
	      }
	    }.bind(this), 500);
	}

	//toggle change 
	handleSpToggleChange(){
		this.setState({
			spLogged: !this.state.spLogged
		})
	}
	handleHoToggleChange(){
		this.setState({
			hoLogged: !this.state.hoLogged
		})
	}
	render(){
		//所属行业的数据
		const { checkedIndex, industryArr } = this.props.selectIndustry;
		//寻找行业的数据
		const { findInd } = this.props.findIndustry;
		//地区数据
		const { showCheckedCitys } = this.props.selectCity;
		//state的值 
		const { timeValue } = this.state;
		//token 和 uploadkey 
		const { token } = this.props.uploadToken;	
		//是否在请求
		const isFetching = this.props.postFormData.isFetching;	
		return (
			<div className="release-page">
				<div className="label-block fontsize24">发布供需信息</div>
				<DialogComponent open={this.state.open} content={this.state.dialogContent} onRequestClose={this.handleClose.bind(this)} />
				<RequestLoading loadingText="发布中..." isFetching={isFetching} />
				<Form model="form.releaseForm" onSubmit={(val) => this.handleSubmit(val)}>
					<InfoItem title="标题" placeholder="输入标题" errorMessages="标题不能为空" model="title" id="title" component={Input} />
					<InfoItem title="品牌名称" placeholder="输入品牌名称" errorMessages="名称不能为空" model="brandName" id="brandName" component={Input} />
					<div className="info-item radio-container fontsize30">
						<div className="left">我是该品牌</div>
						<Radio model="is_brandSide" value="品牌主" />
						<Radio model="is_brandSide" value="品牌代理或合作方" />		
					</div>
					<div className="info-item radio-container budget fontsize30">
						<div className="left">是否有预算</div>
						<Radio model="budget" value="否" />
						<div> 
							<Radio model="budget" value="是" />
							<div className="budget-content">
								<Control placeholder="输入预算" model=".budgetContent" component={Input} />
							</div>
						</div> 
					</div>
					<LinkInput href="release/sector" title="品牌所属行业" model="sector" value={ industryArr[checkedIndex] ? industryArr[checkedIndex].text : "" } />
					<LinkInput href="release/findIndustry" title="寻找行业" model="findIndustry" value={findInd.length === 23 ? "不限" : findInd.toString() } />
					<LinkInput href="release/selectCity" title="合作地区" model="area" value={ showCheckedCitys.toString() } />
					<div className="info-item fontsize30" onClick={ () => this.setState({datepickerIsDisplay:true}) } >
						<div className="left">有效时间</div>
						<Datepicker datepickerIsDisplay={this.state.datepickerIsDisplay} handleCancel={ () => this.setState({datepickerIsDisplay:false}) } handleSelectTime={this.handleSelectTime.bind(this)} />
						{/*<Control component={Input} model=".time" disabled={true} mapProps={{
								value: timeValue }} /> */}
							<div style={{"textAlign":"right","flexGrow": 2 }}>{timeValue}</div>
						<i className="iconfont fontsize36">&#xe602;</i>
					</div>
					<InfoItem title="联系方式" placeholder="输入联系方式" errorMessages="联系方式不能为空" type="number" model="tel" id="tel" component={Input} />
					<TextareaComponent title="我是赞助商" logged={this.state.spLogged} handleChange={this.handleSpToggleChange.bind(this)} placeholder="预算、礼品赠品、流量导入、代金券等等" model="provide" />
					<TextareaComponent title="我是主办方" logged={this.state.hoLogged} handleChange={this.handleHoToggleChange.bind(this)} placeholder="预算、礼品赠品、流量导入、代金券等等" model="need" />
					<div className="upload-container clearfix">
						{/*<div className="upload-btn fl" style={{"display": !this.state.imgurl ? "block" : "none"}}>
							<input type="file" ref="file" onChange={this.handleFileChange.bind(this)} />
							<i className="iconfont">&#xe604;</i>
						</div>*/}
						<Qiniu onUpload={this.upload.bind(this)} onDrop={ () => {} } style={{"display": !this.state.imgurl ? "block" : "none"}} token={token}>
							<i className="iconfont">&#xe604;</i>
						</Qiniu>
						<div className="tip fontsize30 fl" style={{"display": this.state.isSelectImg ? "block" : "none", "background": this.state.imgurl ? "#333" : "", "color": this.state.imgurl ? "#fff" : ""}}>上传中...</div>
						<div className="img-container fl" style={{"display": this.state.imgurl ? "block" : "none"}}>
							<img src={this.state.imgurl} alt=""/>
							<i className="iconfont fontsize40" onClick={this.deleteImg.bind(this)}>&#xe68a;</i>
						</div>
					</div> 
					<button disabled={isFetching} className="btn fontsize36">提交</button>
				</Form> 
			</div>
		) 
	}
} 

// {industryArr[checkedIndex].text}  