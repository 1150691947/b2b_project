import { combineReducers } from "redux";
// import { reducer as formReducer } from 'redux-form';
import { combineForms } from "react-redux-form";
//行业数据
import { industryArr, industryArr2, jobLevel, job, scale, nature } from "../data/industryData";

/*首页数据*/
const indexInitialState = {
	isFetching: false,
	didInvalidate: false,
	hasMore: true,
	listData: []
} 
const getIndexPageData = ( state = indexInitialState , action ) => {
 	switch( action.type ){
 		case "REQUEST_HOMEPAGE" :  
 		return {
 			...state, 
 			isFetching: true, 
 			didInvalidate: false 
 		} 
 		case "GET_HOMEPAGE_DATA" :  
 		return Object.assign({},state,{
 			listData: state.listData.concat(action.payload.data.data),
 			hasMore: !(action.payload.data.data.length < 10),
 			isFetching: false,
 			didInvalidate: true
 		})
 		default : return state ;  
 	} 
}  
/*首页数据*/ 

const findSponsorState = {
	isFetching: false,
	didInvalidate: false,
	hasMore: true,
	listData: []
} 
/*找赞助*/
const getFindSponsorData = ( state = findSponsorState , action ) => {
 	switch( action.type ){
 		case "REQUEST_FINDSPONSOR" :  
 		return {
 			...state, 
 			isFetching: true, 
 			didInvalidate: false 
 		} 
 		case "GET_FINDSPONSOR_DATA" : 
 		return Object.assign({},state,{
 			listData: state.listData.concat(action.payload.data.data),
 			hasMore: !(action.payload.data.data.length < 10),
 			isFetching: false,
 			didInvalidate: true
 		})
 		default : return state ; 
 	} 
}
/*找赞助*/


/*详情数据*/
const detailsInitialState = {
	isFetching: false,
	didInvalidate: false,
	data:{}
}

const detailsPageData = ( state = detailsInitialState, action ) => {
	switch( action.type ){
		case "REQUEST_DETAILS":
		return { 
			...state,
			isFetching: true,
			didInvalidate: false
		}
		case "GET_DETAILS_DATA" :
		return { 
			...state, 
			data: action.payload.data.data, 
			isFetching: false, 
			didInvalidate: true 
		};
		default : return state;
	} 
} 
/*详情数据*/
 
/*我的页面*/
const myPageData = ( state = {}, action ) => {
	switch( action.type ){ 
		case "GET_MYPAGE_DATA" :
		return { ...state,...action.payload.data.data };
		default : return state; 
	}
}
/*我的页面*/

/*获取 上传图片的token*/
const uploadTokenState = {
	token : "",
	imghost: ""
}
const uploadToken = ( state = uploadTokenState, action ) => {
	switch( action.type ){
		case "GET_TOKEN" : 
		return {...state,token:action.payload.data.data};
		case "GET_IMGHOST":
		return {...state,imghost:action.payload.data.data}
		default: return state;
	}
}
/*获取 上传图片的token*/

/*我发布的页面*/
const iReleaseState = {
	data: [],
	isFetching: false,
	didInvalidate: false
}
const iReleaseData = ( state = iReleaseState, action ) => {
	switch( action.type ){ 
		case "REQUEST_IRELEASE" :
		return {
			...state,
			isFetching: true,
			didInvalidate: false
		}
		case "GET_IRELEASE_DATA" : 
 		return Object.assign({},state,{
 			data: action.payload.data.data,
 			isFetching: false,
 			didInvalidate: true
 		})
		default : return state; 
	}
}
/*我发布的页面*/

/*我参与的页面*/
const partakeState = {
	data:[],
	isFetching: false,
	didInvalidate: false	
}
const partakeData = ( state = partakeState, action ) => {
	switch( action.type ){ 
		case "REQUEST_PARTAKE" :
		return {
			...state,
			isFetching: true
		}
		case "GET_PARTAKE_DATA" : 
 		return Object.assign({},state,{
 			data: action.payload.data.data,
 			isFetching: false,
 			didInvalidate: true
 		})
		default : return state; 
	}
}
/*我参与的页面*/

/*我参与的详情页面*/
const partakeDetailsData = ( state = {}, action ) => {
	switch( action.type ){ 
		case "GET_PARTAKE_DETAILS_DATA" : 
 		return { ...state,...action.payload.data.data };
		default : return state; 
	}
}
/*我参与的详情页面*/

/*发送记录页面*/
const sendRecordInitialState = {
	all : [], 
	notRespond : [],//未回应
	processed : [],//已处理
	isFetching: false,
	allDidInvalidate: false,
	notDidInvalidate: false,
	proDidInvalidate: false
}
const sendRecordData = ( state = sendRecordInitialState, action ) => {
	switch( action.type ){
		case "REQUEST_SEND_RECORD" : 
		return {
			...state,
			isFetching: true,
			notDidInvalidate: false,
			allDidInvalidate: false,
			proDidInvalidate: false
		}
		case "GET_ALL" : 
		return Object.assign( {}, state, {
			all :  action.payload.data.data,
			isFetching: false,
			allDidInvalidate: true
		});
		case "GET_NOT_RESPONED" : 
		return Object.assign( {}, state, {
			notRespond :  action.payload.data.data,
			isFetching: false,
			notDidInvalidate: true
		});
		case "GET_PROCESSED" : 
		return Object.assign( {}, state, {
			processed :  action.payload.data.data,
			isFetching: false,
			proDidInvalidate: true
		});
		default : return state;
	}
}
/*发送记录页面*/
 

/*邀请合作*/
const invitedInitialState = {
	notRespond : [],//未回应
	processed : [],//已处理
	isFetching: false,
	notDidInvalidate: false,
	proDidInvalidate: false
}
const invitedData = ( state = invitedInitialState, action ) => {
	switch( action.type ){
		case "REQUEST_INVITED" : 
		return {
			...state,
			isFetching: true,
			notDidInvalidate: false,
			proDidInvalidate: false
		}
		case "GET_PROCESSED" : 
		return Object.assign( {}, state, {
			processed : action.payload.data.data,
			isFetching: false,
			proDidInvalidate: true
		});
		case "GET_NOT_PROCESSED" : 
		return Object.assign( {}, state, {
			notRespond : action.payload.data.data,
			isFetching: false,
			notDidInvalidate: true
		})
		default : return state;
	}
}
/*邀请合作*/

/*发布页 选择行业*/ 

const selectIndustry = ( state = { checkedIndex: '', industryArr }, action ) => {
	switch( action.type ){ 
 		case "THE_INDUSTRY" : 
 		const t_arr = state.industryArr;
 		state.industryArr.map(( item, index ) => {
 			index === action.index ? t_arr[index].checked = true : t_arr[index].checked = false;		
			return t_arr; 
 		});
 		return {...state, checkedIndex: action.index, industryArr: t_arr };
 		default : return state ;
 	}
}
/*发布页 选择行业*/

/*所属行业*/
const findIndustry = ( state = { industryArr: industryArr2, findInd: [] }, action ) => {
	switch( action.type ){ 
 		case "FIND_INDUSTRY" : 
 			const f_arr = state.industryArr;
			state.industryArr.map(( item, index ) => {
	 			 index === action.index && ( f_arr[action.index].checked = !f_arr[action.index].checked );	
				return f_arr; 
 			});

 		return { ...state, industryArr: f_arr};
 		case "GET_INDUSTRY" : 
 			const arr = [];
 			 state.industryArr.map(( item, index ) => {
 					if( !item.checked ){
 						arr.push( item.text )
 					}
 				return arr;
 			})
 			return Object.assign( {}, state, { findInd: arr});
 		default : return state ;
 	}
}
/*所属行业*/

/*发布页 选择城市*/
 
/********
	
	state :

	   	[{	
	   		name : "",
			isOpen : true,
			city : [
				{
					cityName : '',
					is_selected : true
				}
			]
	   	}]

************/

//城市数据
import { provinceArr, cityArr } from "../data/cn_area";

const selectCity = ( state = { provinceArr, checkedCitys : [], showCheckedCitys:[] }, action ) => {
	let checkedCitys = [];
	switch( action.type ){
		case "SELECT_PROVINCE" : 
			const newProvinceArr = state.provinceArr;
			// if( action.index !== 0 ){
				newProvinceArr.map(( item, index ) => {
					if( index === action.index ){
						newProvinceArr[index].is_open = !newProvinceArr[index].is_open;	
						if( cityArr[index].city.length !== 1 ){
							newProvinceArr[index].city = cityArr[index].city;	
						}
					}	

					return newProvinceArr;
				});
				//循环数据 所有为ture的都添加进数组 checkedCitys
				newProvinceArr.map(( item, index ) => {
					if( item.is_open && !item.city ){
						checkedCitys.push(item.province)
					}
					if( item.city ){
						item.city.map(( c_item, cityIndex ) => {
							if( c_item.is_checked ){
								checkedCitys.push( c_item.cityName )
							}	
							return ''
						})
					}
					return ''
				});
			// }
			
		const newState = {
			provinceArr: newProvinceArr,
			checkedCitys
		}
		//返回新的state
		return {...state,...newState}

		case "SELECT_CITY" :

		/***
			p_index ： 选择省份的下标
			c_index ： 选择城市的下标
		***/
			const { provinceArr } = state;
			provinceArr.map(( item, index ) => {
				if( action.index.p_index === index && provinceArr[action.index.p_index].is_open ){
					item.city.map((cityItem, index) => {
						if( action.index.c_index !== 0 && index === action.index.c_index ){
							cityItem.is_checked = !cityItem.is_checked;	
							item.city[0].is_checked = false;				
						}else if( action.index.c_index === 0 && index === action.index.c_index ){
							//把不是第0项得都去掉
							item.city.map((newItem,index)=>{
								if( index !== 0 ){
									newItem.is_checked = false;
								}
								return ''
							});
							//添加第0项得
							item.city[0].is_checked = !item.city[0].is_checked;									
						}
						return '';					
					});	
				}	
				return '';
			});
				
			//循环数据 所有为ture的都添加进数组 checkedCitys
			provinceArr.map(( item, index ) => {
				if( item.is_open && !item.city ){
					checkedCitys.push(item.province)
				}
				if( item.city ){
					item.city.map(( c_item, cityIndex ) => {
						if( c_item.is_checked ){
							checkedCitys.push( c_item.cityName )
						}	
						return "";
					})
				}
				return "";
			});
		const newCityState = {
			provinceArr,//省份数组
			checkedCitys//选中的城市数组
		}
		//返回新的state
		return { ...state, ...newCityState };

		case "GET_CITY" :

		return { ...state, showCheckedCitys: state.checkedCitys }

		default : return state;
	}

};

/*职业信息*/
const proInfoInitialState = {
	industry: industryArr,
	jobLevel,
	job,
	industryIndex:'',
	jobLevelIndex:'',
	jobIndex:''
}
const proInfo = ( state = proInfoInitialState, action ) => {
	switch( action.type ){
		case "SELECT_SECTOR" : 
 		const i_arr = state.industry;
 		state.industry.map(( item, index ) => {
 			index === action.index ? i_arr[index].checked = true : i_arr[index].checked = false;		
			return i_arr; 
 		});
 		return {...state,industry:i_arr,industryIndex:action.index}
 		case "SELECT_JOB" : 
 		const j_arr = state.job;
 		state.job.map(( item, index ) => {
 			index === action.index ? j_arr[index].checked = true : j_arr[index].checked = false;		
			return j_arr; 
 		});
 		return {...state,job:j_arr,jobIndex:action.index}
 		case "SELECT_LEVEL" : 
 		const l_arr = state.jobLevel;
 		state.jobLevel.map(( item, index ) => {
 			index === action.index ? l_arr[index].checked = true : l_arr[index].checked = false;		
			return l_arr; 
 		});
 		return {...state,jobLevel:l_arr,jobLevelIndex:action.index}
 		default: return state;
	}
}
/*职业信息*/


/*企业信息*/
const entCerInitialState = {
	scale,
	nature,
	scaleIndex:'',
	natureIndex:'',
	name: "",
	trade: "",
	job_level: "",
	job: "",
	brand: "",
	company:"",
	imgkey: "",
	imgurl: ""
}
const entCer = ( state = entCerInitialState, action ) => {
	switch( action.type ){
		case "SELECT_SCALE" : 
 		const i_arr = state.scale;
 		state.scale.map(( item, index ) => {
 			index === action.index ? i_arr[index].checked = true : i_arr[index].checked = false;		
			return i_arr; 
 		});
 		return {...state,scale:i_arr,scaleIndex:action.index}
 		case "SELECT_NATURE" : 
 		const j_arr = state.nature;
 		state.nature.map(( item, index ) => {
 			index === action.index ? j_arr[index].checked = true : j_arr[index].checked = false;		
			return j_arr; 
 		});
 		return {...state,nature:j_arr,natureIndex:action.index}
 		case "GET_PROINFO" : 
 		return { 
 			...state,
 			...action.payload.data.data
 		};
 		case "GET_LOGO_IMG": 
 		return {
 			...state,
 			...action.payload
 		}
 		default: return state;
	}
}
/*企业信息*/

/*发送表单数据*/
const postFormIniaitlState = {
	isFetching: false,
	didInvalidate: false,
	response:{},
	error:false
}
const postFormData = ( state = postFormIniaitlState, action ) => {
	switch( action.type ){
		case "POST_FORMDATA" :
		return { ...state, isFetching: true, didInvalidate: false,error:false};
		case "POST_SUCCESS" :
		return { ...state, isFetching: false, didInvalidate: true,error:false,response:action.payload};
		case "POST_ERROR" :
		return { ...state, isFetching: false,didInvalidate:true,error:true };
		case "POST_RESET_STATE" :
		return { ...state, isFetching: false,didInvalidate:false,error:false };
		default: return state; 
	}
}
/*发送表单数据*/

/*成功合作数据*/
const successCooperState = {
	isFetching: false,
	didInvalidate:  false,
	hostArr: [],
	sponsor: []
}
const successCooper = ( state = successCooperState, action ) =>{
	switch( action.type ){
		case "REQUEST_SUCCESS_COOPER":
 		return {
 			...state,
 			isFetching: true, 
 			didInvalidate: false
 		}
		case "SUCCESS_COOPER_HOSTARR":
		return Object.assign({},state,{
			hostArr: action.payload.data.data,
			isFetching: false,
			didInvalidate: true
		});
		case "SUCCESS_COOPER_SPONSOR":
		return Object.assign({},state,{
			sponsor: action.payload.data.data,
			isFetching: false,
			didInvalidate: true
		});
		default : return state;
	}
}
/*成功合作数据*/

/*发布页 选择城市*/
// const dialogState = ( state = {open:false}, action ) => {
// 	switch( action.type ){
// 		case "OPEN_DIALOG":
// 		return {...state,open:true};
// 		case "CLOSE_DIALOG":
// 		return {...state,open:false}
// 		default: return state;
// 	}
// }
//表单数据
const form = {
	requestText : { text : '' },
	releaseForm : {
		title : "",//标题
		brandName : "",//品牌名称
		is_brandSide : "",//是该品牌的
		budget : "",//预算
		budgetContent : "",//预算内容 
		time : "",//有效时间
		sector : "",//所属行业
		findIndustry : "",//寻找行业
		area : "",//地区
		tel : "",//电话
		provide: "",//提供
		need: ""
	},
	proInfo : {
		// userName : "",//用户名
		name : localStorage.name || "",//姓名
		tel: localStorage.tel || "",//手机
		industry : localStorage.trade || "",//所在行业
		company : localStorage.company || "",//公司
		brand : localStorage.brand || "",//品牌
		level : localStorage.jobLevel || "",//职位级别
		job : localStorage.job || ""//职务
	},
	setup: {
		tel: "",
		v_code:""
	},
	//企业
	company: {
		profile:""//简介
	}
} 

const reducers = {
  // ... your other reducers here ...
  	getIndexPageData,
  	getFindSponsorData,
	selectIndustry,
	selectCity,
	findIndustry,
	detailsPageData,
	postFormData,
	sendRecordData,
	myPageData,
	proInfo,//职业信息
	entCer,//企业信息
	invitedData,
	iReleaseData,
	partakeData,
	partakeDetailsData,
	uploadToken,
	successCooper,
	// dialogState,
  	// form: formReducer,  // <---- Mounted at 'form'
	form : combineForms({...form},'form') 

}
 
const rootReducer = combineReducers(reducers);

export default rootReducer 
   