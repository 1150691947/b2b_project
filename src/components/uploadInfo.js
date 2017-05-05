import React,{ Component } from "react";
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SwipeableViews from 'react-swipeable-views';
import { hashHistory } from "react-router";
import '../css/uploadInfo.css';
import { RequestLoading } from "./loadComponent";
import DialogComponent from "./dialog";
import cardimg from "../images/card.jpg";
import caemployeerdimg from "../images/employee.jpg";
import zmimg from "../images/zm.jpg";
import Qiniu from "react-qiniu";
const tabItemContainerStyle = {
	"height" : "1.2rem",
	"background" : "#Fff",
	"color" : "#333"
}

const tabItemStyle = {
	"color":"#333",
	"fontSize":".48rem"
} 

const inkBarStyle ={
	"background": "#666",
	"height": ".05333333333333rem" 
}

class TabsComponent extends Component {
  state = {
    index: 0,
  };

  handleChangeTabs = (value) => () => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const {
      index,
    } = this.state; 

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="tabs-container">
          <Tabs value={index} contentContainerClassName="tabs" inkBarStyle={inkBarStyle} tabItemContainerStyle={tabItemContainerStyle}>
            <Tab label="名片" style={tabItemStyle} value={0} onClick={this.handleChangeTabs(0)} />
            <Tab label="工作证" style={tabItemStyle} value={1} onClick={this.handleChangeTabs(1)} />
            <Tab label="在职证明" style={tabItemStyle} value={2} onClick={this.handleChangeTabs(2)} />
          </Tabs> 
          <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            <div className="content-item business">
              	<div className="img">
              		<img src={cardimg} alt="名片" />
              	</div>
            </div> 
            <div className="content-item employee">
             	<div className="img">
              		<img src={caemployeerdimg} alt="工作证" />
              	</div>
            </div>
            <div className="content-item prove">
				<div className="img">
              		<img src={zmimg} alt="在职证明" />
              	</div>
            </div>
          </SwipeableViews>
          <p className="tip-text fontsize30">须拍摄纸质名片，确保公司，职位，姓名等信息区域清晰</p>
        </div> 
      </MuiThemeProvider>
    );
  }
}

class SelectUploadMode extends Component {

	handleChange( ){
		const that = this;
		//文件对象列表 
		let files = this.refs.file.files;
		//FileReader对象转base64
		const fr = new FileReader();
		//类数组对象转数组
		files = Array.prototype.slice.call( files );
		// files = Array.from( files ); //等同于上
		if( files[0].type.indexOf('image') === -1 ) return; //如果不是图片对象，就不操作
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
				const dataUrl = canvas.toDataURL("image/jpeg", 0.3); //压缩 参数（压缩的类型，压缩比例0-1）
				that.props.handleSelect( dataUrl );
			}	  
		};
	}
	// upload(files){
	// 	var getResponseImg = window.setInterval(function() {
	//       if (files[0].request.xhr.response) {
	//         var key = JSON.parse(files[0].request.xhr.response).key;
	//       	this.props.handleSelect( key );
	//         window.clearInterval(getResponseImg);
	//       }
	//     }.bind(this), 500);
	// }
	render(){
		return (
			<div className="select-uploadmode fontsize36">
				<div className="mode-item">
					<input type="file" className="file" ref="file" onChange={ this.handleChange.bind(this) } />
										<span>从手机相册选择</span>
				{/*<Qiniu onUpload={this.upload.bind(this)} style={{"width":"100%"}} token={this.props.token}>
									<span>从手机相册选择</span>
								</Qiniu>*/}
				</div>

				<div className="mode-item" onClick={ () => this.props.handleClick() } >取消</div>
			</div>
		) 
	}
}

// else if( postFormData.response.data === 1 && status === 1 ){
// 	// actions.resetPostFormState();//重置表单状态
// 	// hashHistory.push("/my") 	
// }

export default class UploadInfo extends Component {
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
			const { status } = this.props.myPageData;
			if( postFormData.didInvalidate ){
				if( postFormData.response.data === 1 ){
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
		const props = this.props,
			  { ...proInfo } = props.proInfo,
			  { postFormData } = props.actions,
			  { ...value } = props.form.proInfo;
		const industry = proInfo.industryIndex ? proInfo.industry[proInfo.industryIndex].text.toString() : "",
			  jobLevel = proInfo.jobLevelIndex ? proInfo.jobLevel[proInfo.jobLevelIndex].text.toString() : "",
			  job = proInfo.jobIndex ? proInfo.job[proInfo.jobIndex].text.toString() : "";

		localStorage.name = value.name;
		localStorage.tel = value.tel;
		localStorage.trade = value.industry;	
		localStorage.company = value.company; 
		localStorage.brand = value.brand;
		localStorage.jobLevel = jobLevel;
		localStorage.job = job;
		// localStorage.visiting_card = urlData;
		const formData = {
			// nickname: value.userName,
			name: value.name,
			tel: value.tel,
			trade: industry,
			company: value.company,
			brand: value.brand,
			job_level: jobLevel,
			job,
			visiting_card: urlData
		}
		postFormData( "proinfo", formData ); 
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