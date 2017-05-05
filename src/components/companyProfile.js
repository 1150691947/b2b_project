import React,{Component} from "react";
import { Form, Control } from "react-redux-form";
import TextareaAutosize from 'react-autosize-textarea';
import DialogComponent from "./dialog";
import "../css/companyProfile.css";

const maxLength = (val) => {
	return (val.length > 300) ? val.substr(0,300) : val;
}

class CompanyProfile extends Component {
	constructor(){
		super();

		this.state = {
			open: false,
			dialogContent: "公司简介不能为空哦。"
		}
	}
	handleClose(){
		this.setState({
			open: false
		})
	}
	handleSubmit(values){
		const val = values.profile;

		if( val === "" ){
			this.setState({
				open: true
			})

			return;
		}

		this.props.router.goBack();
	}
	render(){
		return (
			<div className="company-profile">
				<DialogComponent open={this.state.open} content={this.state.dialogContent} onRequestClose={this.handleClose.bind(this)} />
				<Form model="form.company" onSubmit={(val) => this.handleSubmit(val)}>
					<label htmlFor="profile">
						<div className="textarea-container">
							<Control model=".profile" id="profile" parser={ maxLength } className="fontsize28" component={TextareaAutosize} placeholder="可输入300字" />
						</div>
					</label>
					<button className="btn fontsize30">保存</button>
				</Form>
			</div>
		)
	}
}

export default CompanyProfile;