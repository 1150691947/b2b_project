import React from "react";
import { Control, Errors } from "react-redux-form";

const errorStyle = {
	"color": "#ff6767",
	"textAlign": "center",
	"paddingTop": ".1rem"
}

function toNum(value) { 
	if( value.length > 13 ){
		return value.substr(0,13)
	}
  return value.replace(/\D/g,'');
}
  
const InfoItem = (props) => (
		<label htmlFor={props.id}>
			<div className="info-item fontsize30">
				<div className="left">{props.title}</div>
				<div className="right">
					<Control id={props.id} validators={{
					    isRequired: (val) => !!val,
					  }} validateOn={["blur","change"]} disabled={props.disabled} type={props.type ? props.type :"text"} parser={ props.type === "number" ? toNum : value => value } ignore={['focus', 'blur']} placeholder={props.placeholder} model={`.${props.model}`}  component={props.component} />
				</div>
			</div> 
			<Errors model={`.${props.model}`} wrapper={(props) => <div className="errors fontsize28" style={errorStyle}>{props.children}</div>} messages={{
					    isRequired: props.errorMessages ? props.errorMessages : '请输入该项',
					  }} show="touched" />
		</label> 
	)  

 
export default InfoItem;