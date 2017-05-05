import React, { Component } from 'react';
import { Form, Control } from "react-redux-form";
import "../css/setup.css";
function toNum(value) {
  return parseInt(value) || "";
}

export default class Setup extends Component {
	submit(values){
		console.log( values )
	}
	render(){ 
		return (
			<div className="setup-page">
				<Form model="form.setup" onSubmit={ ( val ) => this.submit(val)}>
					<div className="form-container fontsize30">
						<div className="form-item clearfix">
							<Control model=".tel" type="number" parser={toNum} placeholder="请输入手机号" />
							<button className="get-vcode fontsize24 fr">获取验证码</button>
						</div>
						<div className="form-item">
							<Control model=".v_code" type="number" parser={toNum} placeholder="输入手机短信验证码"  />
						</div>
					</div>
					<button className="btn fontsize36">保存</button>
				</Form>
			</div>
		)
	}
}