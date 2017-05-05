/*发布页面*/
import React, { Component } from "react";
import { Link } from "react-router";
import { Field, reduxForm, change  } from 'redux-form';
import Datepicker from "./datepicker.js";
import InfoItem from "./formItem.js";
import autosize from "autosize"; 
import "../css/release.css"

const Input = (props) => (
	<input type="text" {...props} style={{"textAlign":"right"}} className="fontsize30"  />	
)

const Radio = (props) =>  (
	<label className="label">
		<Field name={props.name} component="input" type="radio" value={props.value} />{props.value}
		<div className="radio">
			<i className="iconfont fontsize24">&#xe601;</i>
		</div>
	</label>
) 

class LinkInput extends Component{
	componentWillReceiveProps( nextProps ){
		const props = this.props;
		// props.dispatch(change("release",props.name,props.value));
	}
	render(){
		const props = this.props;
		return (
			<Link to={props.href}>		
					<div className="info-item fontsize30">
					<div className="left">{props.title}</div>
						<Field name={props.name} disabled={true} props={{"className":"fontsize30"}} component="input" type="text" value={props.value} />
					<i className="iconfont fontsize36">&#xe602;</i>
				</div>
			</Link>  
		)
	} 
} 
 
const TextareaComponent = ( props ) => (
	<div className="textarea-container fontsize30">
		<div className="title">{props.title}</div>
		<div className="textarea">
			<Field component="textarea" props={{className:"fontsize30"}} name={props.name} />
		</div>
	</div> 
)



class FormComponent extends Component {
	constructor(){
		super(); 
		this.state = {
			timeValue : "",
			datepickerIsDisplay: false,
			imgurl: "",
			isSelectImg: false
		}
	}
	
	handleSelectTime(value){
		this.setState({
			datepickerIsDisplay: false
		});

		console.log( value )
		this.props.data.actions.dispatch(change("release","time",value));
	}
	//file change事件
	handleFileChange(){
		//文件对象列表 
		let files = this.refs.file.files;
		//FileReader对象转base64
		const fr = new FileReader(),
			  that = this;
		//类数组对象转数组
		// files = Array.prototype.slice.call( files );
		files = Array.from( files ); //等同于上
		if( !files[0] ) return ;
		if( files[0] && files[0].type.indexOf('image') === -1 ) {
			alert("请选择正确的图片")
			return; //如果不是图片对象，就不操作	
		} 

		that.setState({
			isSelectImg: true
		});

		//FileReader 把 file 对象转为 base64
		fr.readAsDataURL(files[0]);

		fr.onload = function( e ) {	
			//创建canvas对象 使用canvas对象压缩图片
			const canvas = document.createElement("canvas"),
				  context = canvas.getContext("2d");
			const img = new Image(),
				  src = e.target.result;//图片base64
				  img.src = src;
			img.onload = function(){ 
				canvas.width = img.width;
				canvas.height = img.height;
				//绘制图片
				context.drawImage(img,0,0);

				const dataUrl = canvas.toDataURL("image/jpeg", 0.5); //压缩 参数（压缩的类型，压缩比例0-1）
				that.setState({
					imgurl: dataUrl,
					isSelectImg: false
				});

				that.props.getImg(dataUrl)
			}	  
		};
	}
	//删除图片
	deleteImg(){
		this.setState({
			imgurl: ""
		})
	}
	render(){
		//所属行业的数据
		const { checkedIndex, industryArr, findIndystry } = this.props.data.selectIndustry;
		//地区数据
		const { showCheckedCitys } = this.props.data.selectCity;

		//state的值 
		const { timeValue } = this.state;
		return (
			<form onSubmit={this.props.handleSubmit}>
				<InfoItem title="标题" name="title" id="title" className="textarea-autosize" component={"textarea"} />
				<InfoItem title="品牌名称" name="name" id="brandName" className="textarea-autosize" component={"textarea"} />
				<div className="info-item radio-container fontsize30">
					<div className="left">我是该品牌</div>
					<Radio name="is_brandSide" value="品牌主" />
					<Radio name="is_brandSide" value="品牌主或合作方" />		
				</div>
				<div className="info-item radio-container budget fontsize30">
					<div className="left">是否有预算</div>
					<Radio name="budget" value="否" />
					<div> 
						<Radio name="budget" value="是" />
						<div className="budget-content">
							<Field name="budgetContent" props={{"className":"fontsize30"}} component="input" type="text" />
						</div>
					</div>
				</div>
				<LinkInput href="release/sector" title="品牌所属行业" name="sector" value={ industryArr[checkedIndex] ? industryArr[checkedIndex].text : "" } dispatch={this.props.data.actions.dispatch} />
				<LinkInput href="release/findIndustry" title="寻找行业" name="findIndustry" value={findIndystry.length === 0 ? '' : findIndystry.toString() } dispatch={this.props.data.actions.dispatch} />
				<LinkInput href="release/selectCity" title="合作地区" name="area" value={ showCheckedCitys.toString() } dispatch={this.props.data.actions.dispatch} />
				<div className="info-item fontsize30" onClick={ () => this.setState({datepickerIsDisplay:true}) } >
					<div className="left">有效时间</div>
					<Datepicker datepickerIsDisplay={this.state.datepickerIsDisplay} handleCancel={ () => this.setState({datepickerIsDisplay:false}) } handleSelectTime={this.handleSelectTime.bind(this)} />
						<Field name="time" disabled={true} props={{"className":"fontsize30 t-r"}} component="input" type="text" />
					<i className="iconfont fontsize36">&#xe602;</i>
				</div>
				<InfoItem title="手机" name="tel" id="tel" className="fontsize30 t-r" component={"input"} />
				<TextareaComponent title="我们提供" name="provide" />
				<TextareaComponent title="我们需要" name="need" />
				<div className="upload-container clearfix">
					<div className="upload-btn fl">
					<input type="file" ref="file" onChange={this.handleFileChange.bind(this)} />
						<i className="iconfont">&#xe604;</i>
					</div>
					<div className="tip fontsize30 fl" style={{"display": this.state.isSelectImg ? "block" : "none", "background": this.state.imgurl ? "#333" : "", "color": this.state.imgurl ? "#fff" : ""}}>上传中...</div>
					<div className="img-container fl" style={{"display": this.state.imgurl ? "block" : "none"}}>
						<img src={this.state.imgurl} alt=""/>
						<i className="iconfont fontsize40" onClick={this.deleteImg.bind(this)}>&#xe68a;</i>
					</div>
				</div> 
				<button className="btn fontsize36">提交</button>
			</form> 
		)
	}
}

FormComponent = reduxForm({
	"form" : "release"
})(FormComponent)

export default class ReleasePage extends Component {

	constructor(){
		super();

		this.state= {
			imgurl: ""
		}
	}
	
	componentWillUpdate( nextProps, nextState ){
		if( this.props !== nextProps ){
			const { postFormData } = nextProps;
			if( postFormData.isFetching ){
				alert("发送中")
			}else if( postFormData.didInvalidate ){
				alert("发送完成")
			}
		}
	}

	getImg(imgurl){
		this.setState({
			imgurl
		});
	}
	
	//提交表单
	handleSubmit(values){
		// const { postFormData } = this.props.actions;
		// //所属行业的数据
		// const { checkedIndex, industryArr, findIndystry } = this.props.selectIndustry;
		// //地区数据
		// const { checkedCitys } = this.props.selectCity;
		// try {
		// 	const formData = {
		// 		name: values.brandName,//品牌名称
		// 		title: values.title, //标题
		// 		brand: values.is_brandSide, //品牌的
		// 		budget: values.budget,//预算
		// 		trade: industryArr[checkedIndex].text,//所属行业
		// 		seek_trade: values.findIndustry.toString(),//寻找行业
		// 		valid_time: this.state.timeValue,//有效时间
		// 		city: checkedCitys.toString(),//合作城市
		// 		supply: values.provide,//提供
		// 		need: values.need,//需要
		// 		tel: values.tel,//电话
		// 		imgurl: this.state.imgurl//图片
		// 	}

		// 	postFormData( "release", formData );

		// }catch(err){
			

		// }
		values.imgurl = this.state.imgurl;
		console.log( values )
	} 

	componentDidMount(){

		autosize(document.querySelectorAll('.textarea-autosize'));

	}


	render(){	

		return (
			<div className="release-page">
				<FormComponent data={this.props} onSubmit={this.handleSubmit.bind(this)} getImg={this.getImg.bind(this)} />
			</div>
		) 
	}
} 

// {industryArr[checkedIndex].text} 