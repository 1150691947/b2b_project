// import { createAction } from 'redux-actions';
import url from "../plugin/config.js";
import axios from "axios";
// import fetch from 'isomorphic-fetch';
const BASIC_URL = url; //host

const received = ( type, json ) => {
	return {
		type,
		payload : json
	} 
}   
  
const requestStart = ( type ) => {
	return { 
		type
	} 
}  
  
const post = ( type, payload ) => {
	return {
		type,
		payload
	}
}
 
/*提交请求*/

/*提交请求*/ 
  
//拉取首页数据
//options 可以是对象 包含页面传过来的数据
//p=页码
let p1 = 0;
let p2 = 0;
export const fetchData = ( type, pageName, options ) => ( dispatch ) => {
	let url = ''; 
	switch( pageName ){
		case "homePage": 
			p1++;
			url = `${BASIC_URL}cooperation?p=${p1}&tab=1`;
			dispatch(requestStart("REQUEST_HOMEPAGE"));
		break;
		case "findSponsor": 
			p2++;
			url = `${BASIC_URL}cooperation?p=${p2}`;
			dispatch(requestStart("REQUEST_FINDSPONSOR"));
		break;
		case "details": url = `${BASIC_URL}cooperation/info/id/${options}`; 
			dispatch(requestStart("REQUEST_DETAILS"));
		break;
		case "sendRecord": 
			url = `${BASIC_URL}supplier/news?tab=${options}`; //发送记录
			dispatch(requestStart("REQUEST_SEND_RECORD"));
		break;
		case "sendRecord_details": url = `${BASIC_URL}supplier/news_info?id=${options}`; //发送记录详情
		break;
		case "invited_details": url = `${BASIC_URL}supplier/news_info?id=${options}&method=issue`; //邀合作详情
		break;
		case "iRelease_details": url = `${BASIC_URL}supplier/issue?id=${options}`; //我发送详情
		break;
		case "invited": 	
			url = `${BASIC_URL}supplier/news?method=issue&tab=${options}`; //邀合作
			dispatch(requestStart("REQUEST_INVITED")); 
		break;
		case "myPage": url = `${BASIC_URL}supplier`;
		break;
		case "invited_argee": url = `${BASIC_URL}supplier/update?id=${options.id}&val=${options.val}`;
		break;
		case "iRelease": 
			url = `${BASIC_URL}supplier/issue`;
			dispatch(requestStart("REQUEST_IRELEASE"));
		break;
		case "partake": 
			url = `${BASIC_URL}supplier/partake`;
			dispatch(requestStart("REQUEST_PARTAKE"));
		break;
		case "partakeDetails": url = `${BASIC_URL}supplier/partake?id=${options}`;
		break;
		case "invitedDetails": url = `${BASIC_URL}supplier/update?id=${options.id}&val=${options.method}`;
		break;
		case "getToken": url = `${BASIC_URL}home/getToken`;
		break;
		case "getImgHost": url = `${BASIC_URL}home/getQiniudomain`;
		break;
		case "successCooper": url = `${BASIC_URL}supplier/coedlist?tab=${options}`;
			dispatch(requestStart("REQUEST_SUCCESS_COOPER"));
		break;
		case "timeExpand": url = `${BASIC_URL}supplier/upseven?id=${options}`;
			dispatch(requestStart("TIME_EXPAND"));
		break;
		case "getProInfo": url = `${BASIC_URL}supplier/profile`;
			dispatch(requestStart("TIME_EXPAND"));
		break;
		default : url = '';
	}
	 
	axios( url )
	.then( response  => {
		if( typeof response.data === "object" ){
			dispatch ( received( type, {data: response.data} ))
		}else {
			response.data = [];
			dispatch ( received( type, {data: response.data} ))
		}
	})
	.catch( err  =>  {
		// console.log( err )	
	});
}   

//选择行业
export const selectIndustry = ( type, index ) => {
	return { type, index } 
} 

//发送表单
export const postFormData = ( pageName, formData ) => ( dispatch ) => {
	let url = '';
	dispatch(post("POST_FORMDATA"));
	switch( pageName ){
		case "request": 
			url = `${BASIC_URL}cooperation/request`;
		break;
		case "release":
			url = `${BASIC_URL}supplier/save`;
		break;
		case "proinfo":
			url = `${BASIC_URL}supplier/profile`;
		break;
		case "entCer":
			url = `${BASIC_URL}supplier/Ent_cert`;
		break;
		default : "";
	}

	axios.post(url, {
    	...formData
 	})
	.then(function (response) {
	    dispatch( post("POST_SUCCESS",response.data))
	})
	.catch(function (error) {
	   dispatch( post("POST_ERROR",error))
	});
}

export const resetPostFormState = () => {
	return {
		type:"POST_RESET_STATE"
	}
}
 
// export const dispatch = ( action ) => action;

export const getImgUrl = ( type, payload ) => {
	return {
		type,
		payload
	}
}

//选择地区
export const selectArea = ( type, index ) => { return { type, index }}