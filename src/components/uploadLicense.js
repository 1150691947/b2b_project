import React,{ Component } from "react";
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import { hashHistory } from "react-router";
import '../css/uploadInfo.css';
import { RequestLoading } from "./loadComponent";
import DialogComponent from "./dialog";
import zz from "../images/zz.jpg";
import Qiniu from "react-qiniu";


const TabsComponent = (props) => (
    <div className="tabs-container">
    	<div className="tip-block fontsize36">营业执照<span style={{"color":"#ff4242"}}>（带有公章）</span></div>
        <div className="content-item zz">
			<div className="img">
          		<img src={zz} alt="在职证明" />
          	</div>
        </div>
      <p className="tip-text fontsize30">须拍摄纸质名片，确保公司，职位，姓名等信息区域清晰</p>
    </div> 
);

class SelectUploadMode extends Component {

	// handleChange( ){
	// 	const that = this;
	// 	//文件对象列表 
	// 	let files = this.refs.file.files;
	// 	//FileReader对象转base64
	// 	const fr = new FileReader();
	// 	//类数组对象转数组
	// 	files = Array.prototype.slice.call( files );
	// 	// files = Array.from( files ); //等同于上
	// 	if( files[0].type.indexOf('image') === -1 ) return; //如果不是图片对象，就不操作
	// 	//FileReader 把 file 对象转为 base64
	// 	fr.readAsDataURL(files[0]);
	// 	fr.onload = function( e ) {	
	// 		//创建canvas对象 使用canvas对象压缩图片
	// 		const canvas = document.createElement("canvas"),
	// 			  context = canvas.getContext("2d");
	// 		const img = new Image(),
	// 			  src = e.target.result;//图片base64
	// 			  img.src = src;
	// 		img.onload = function(){ 
	// 			canvas.width = img.width;
	// 			canvas.height = img.height;
	// 			//绘制图片
	// 			context.drawImage(img,0,0);
	// 			const dataUrl = canvas.toDataURL("image/jpeg", 0.3); //压缩 参数（压缩的类型，压缩比例0-1）
	// 			that.props.handleSelect( dataUrl );
	// 		}	  
	// 	};
	// }

	
	//Qiniu upload  
	upload(files){
		this.setState({
			isSelectImg: true
		})
		var getResponseImg = window.setInterval(function() {
	      if (files[0].request.xhr.response) {
	        var key = JSON.parse(files[0].request.xhr.response).key;
			this.props.handleSelect( key );
			this.setState({
				isSelectImg: false
			});

	        window.clearInterval(getResponseImg);
	      }
	    }.bind(this), 500);
	}
	render(){
		const { token } = this.props;
		return (
			<div className="select-uploadmode fontsize36">
				<div className="mode-item">
					{/*<input type="file" className="file" ref="file" onChange={ this.handleChange.bind(this) } />
										<span>从手机相册选择</span>*/}
				<Qiniu onUpload={this.upload.bind(this)}  className="file" className="logo-upload" style={{"border":"none"}} onDrop={ () => {} } token={token}>
							<span>从手机相册选择</span>
						</Qiniu>
				</div>

				<div className="mode-item" onClick={ () => this.props.handleClick() } >取消</div>
			</div>
		) 
	}
}

export default class UploadLicense extends Component {
	constructor(){
		super();
		this.state = {
			open:false,
			dialogContent: ""
		};

	}
	componentWillReceiveProps( nextProps ){
		if( this.props !== nextProps ){ 
			const { postFormData, actions } = nextProps;
			if( postFormData.didInvalidate ){
				if( postFormData.response.data === 1){
					// localStorage.proinfo = nextProps.form.proInfo;
					actions.resetPostFormState();//重置表单状态
					hashHistory.push("/success") 
				}else{
					this.setState({
						open:true,
						dialogContent: "上传失败"
					});					
				}
			}else if( postFormData.error ){
				this.setState({
					open:true,
					dialogContent: "服务器发生错误，请稍后再试！"
				});
			}
		}
	}
	handleClose(){
		const { resetPostFormState } = this.props.actions;
		resetPostFormState();//重置表单状态
		this.setState({
			open: false
		})
	}
	componentDidMount(){
		// autosize(document.querySelectorAll('.textarea-autosize'));
		const { token } = this.props.uploadToken;
		const { fetchData } = this.props.actions;
		!token && fetchData( "GET_TOKEN", "getToken" )
	}
	handleSelect( urlData ){
		const props = this.props.entCer,
			  { postFormData } = this.props.actions;
		const scale = props.scaleIndex ? props.scale[props.scaleIndex].text : "",
			  property = props.natureIndex ? props.nature[props.natureIndex].text: "",
			  logo = props.imgkey,
			  summary = this.props.form.company.profile;

		// localStorage.visiting_card = urlData;
		const formData = {
			scale,
			property,
			logo,
			license:urlData,
			summary
		}
		postFormData( "entCer", formData ); 
	} 
	render(){ 
		const isFetching = this.props.postFormData.isFetching;	
		//token 和 uploadkey 
		const { token } = this.props.uploadToken; 
		return (
			<div className="upload-info ">
				<div className="label-block fontsize24">上传材料证明职业身份，才可发布职业信息</div>
				<TabsComponent />
				<RequestLoading loadingText="上传中..." isFetching={isFetching} />
				<DialogComponent open={this.state.open} content={this.state.dialogContent} onRequestClose={this.handleClose.bind(this)} />
				<SelectUploadMode token={token} handleSelect={ this.handleSelect.bind(this) } handleClick={ () => this.props.router.goBack() } />
			</div>
		)
	}
}

// reactMixin( UploadInfo.protoType, Lifecycle )