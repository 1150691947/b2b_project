import React, { Component } from "react";
import { hashHistory, Link } from "react-router";
// import InfoItem from "./formItem.js";
import DialogComponent from "./dialog";
import "../css/proInfo.css";
import "../css/entCer.css";
import Qiniu from "react-qiniu";

 
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

const Item = ( props ) => (
	<div className="info-item fontsize30">
		<div className="left">{props.title}</div>
		<div className="right" style={{"lineHeight":"1.12rem","textAlign":"right"}}>
			{props.value}
		</div>
	</div> 
)
// nickname = value.userName,
export default class EntCer extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			dialogContent: "",
			isSelectImg: false
		}
	}
	componentDidMount(){
		const { token } = this.props.uploadToken;
		const { entCer } = this.props;
		const { fetchData } = this.props.actions;
		!entCer.brand && fetchData("GET_PROINFO","getProInfo"); 
		!token && fetchData( "GET_TOKEN", "getToken" );
	}	
	handleSubmit( ){
		const { ...props } = this.props.entCer;
			  // { postFormData } = this.props.actions;
		const scale = props.scaleIndex ? props.scale[props.scaleIndex].text : "",
			  nature = props.natureIndex ? props.nature[props.natureIndex].text: "",
			  profile = this.props.form.company.profile,
			  logoimg = props.imgurl;
		if( logoimg === '' ){
			this.setState({
				open: true,
				dialogContent: "请上传一张企业的logo"
			})
			return
		}else if( scale === '' ){
			this.setState({
				open: true,
				dialogContent: "请选择规模"
			})
			return
		}else if( profile === '' ){
			this.setState({
				open: true,
				dialogContent: "请填写公司简介"
			})
			return
		}else if( nature === '' ){
			this.setState({
				open: true,
				dialogContent: "请选择性质"
			})
			return
		} 
		hashHistory.push( "/uploadLicense?entry=entCer" );
	}
	handleClose(){
		this.setState({
			open: false
		}); 
	}
	//Qiniu upload  
	upload(files){
		this.setState({
			isSelectImg: true
		})
		var getResponseImg = window.setInterval(function() {
	      if (files[0].request.xhr.response) {
	        var key = JSON.parse(files[0].request.xhr.response).key;
			this.props.actions.getImgUrl("GET_LOGO_IMG",{
				imgurl: files[0].preview,
				imgkey: key
			});
			this.setState({
				isSelectImg: false
			})
	        window.clearInterval(getResponseImg);
	      }
	    }.bind(this), 500);
	}
	render(){
		const { ...props } = this.props.entCer;
		//token 和 uploadkey 
		const { token } = this.props.uploadToken;
		const profile = this.props.form.company.profile;
		return ( 
			<div className="pro-info ent-cer">
				<div className="label-block fontsize24">上传材料证明企业身份，才可发布职业信息</div>
				<DialogComponent open={this.state.open} content={this.state.dialogContent} onRequestClose={this.handleClose.bind(this)} />
					<div className="header">
						<Qiniu onUpload={this.upload.bind(this)} className="logo-upload" style={{"border":"none"}} onDrop={ () => {} } token={token}>
							<i className="iconfont" style={{"display":props.imgurl ? "none" : "block"}}>LOGO</i>
							<img src={props.imgurl} alt=""/>
						</Qiniu>
						<div className="tip fontsize30">{ this.state.isSelectImg ? "上传中..." : ( !props.imgurl && "上传企业logo")}</div>
					</div>
					<Item title="姓名" value={props.nickname} />
					<Item title="所在行业" value={props.trade} /> 
					<LinkInput title="规模" href="/job?entry=scale" value={ props.scaleIndex.toString() ? props.scale[props.scaleIndex].text : ""}  />
					<LinkInput title="企业简介" href="/companyProfile?entry=nature" value={ profile && `${profile.substr(0,8)}...`} />
					<LinkInput title="性质" href="/job?entry=nature" value={ props.natureIndex.toString() ? props.nature[props.natureIndex].text : ""} />
					<Item title="公司" value={props.company} />
					<Item title="品牌" value={props.brand} />
					<Item title="职务级别" value={props.job_level} />
					<Item title="职位" value={props.job} />
					<button className="btn fontsize36" onClick={this.handleSubmit.bind(this)}>下一步</button> 
			</div>
		) 
	}
} 
// <InfoItem title="用户名" model="userName"  component={Input} />
 