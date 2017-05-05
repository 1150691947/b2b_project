import React from "react";
// import { Control, Errors } from "react-redux-form";
import { Field } from 'redux-form';


const InfoItem = (props) => (
		<label htmlFor={props.id}>
			<div className="info-item fontsize30">
				<div className="left">{props.title}</div>
				<div className="right">
					<Field name={props.name} props={{"className":props.className,}} component={props.component} />
				</div>
			</div>  
		</label> 
	)   

 
export default InfoItem;

// <Control id={props.id} validators={{
// 					    isRequired: (val) => true,
// 					  }} validateOn="blur" ignore={['focus', 'blur']} model={`.${props.model}`}  component={props.component} />
// 					<Errors model={`.${props.model}`} messages={{
// 					    isRequired: '请输入该项',
// 					  }} show="touched" />