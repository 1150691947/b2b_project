import { combineReducers } from "redux";
import { combineForms } from "react-redux-form";
//行业数据
import { industryArr } from "../data/industryData";

/*首页数据*/
const getIndexPageData = ( state = {listData:[]}, action ) => {
 	switch( action.type ){
 		case "GET_DATA" : 
 		return Object.assign({},state,{
 			listData : state.listData.concat(action.payload.data)
 		})
 		default : return state ;
 	}
}  
/*首页数据*/


/*发布页 选择行业*/


const selectIndustry = ( state = {checkedIndex:0,industryArr}, action ) => {
	switch( action.type ){
 		case "THE_INDUSTRY" : 
 		const newArr = state.industryArr;
 		state.industryArr.map((item,index) => {
 			index === action.index ? newArr[index].checked = true : newArr[index].checked = false;		
			return newArr;
 		});
 		const newState = {
 			checkedIndex : action.index,
 			industryArr : newArr
 		}
 		return {...state,...newState};
 		case "FIND_INDUSTRY" : 
 		
 		default : return state ;
 	}
}
/*发布页 选择行业*/

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

const selectCity = ( state = { provinceArr, checkedCitys : [] }, action ) => {

	switch( action.type ){
		case "SELECT_PROVINCE" : 
			const newProvinceArr = state.provinceArr;
			newProvinceArr.map(( item, index ) => {
				if( index === action.index ){
					newProvinceArr[index].is_open = !newProvinceArr[index].is_open;	
					newProvinceArr[index].city = cityArr[index].city;
				}	
			});
		const newState = {
			provinceArr : newProvinceArr
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
							})
							//添加第0项得
							item.city[0].is_checked = !item.city[0].is_checked;									
						}					
					});	
				}	
			});
			let checkedCitys = [];
			//循环数据 所有为ture的都添加进数组 checkedCitys
			provinceArr.map(( item, index ) => {
				if( item.city ){
					item.city.map(( c_item, cityIndex ) => {
						if( c_item.is_checked ){
							checkedCitys.push( c_item.cityName )
						}	
					})
				}
			});
		const newCityState = {
			provinceArr,//省份数组
			checkedCitys//选中的城市数组
		}
		//返回新的state
		return { ...state, ...newCityState };

		default : return state;
	}

};

/*发布页 选择城市*/

//表单数据
const form = {
	requestText : { text : '' },
	releaseForm : {
		title : "",//标题
		brandName : "",//品牌名称
		is_brandSide : "",//是该品牌的
		budget : "",//预算
		budgetContent : "",//预算内容 
		sector : "",//所属行业
		area : "",//地区
		tel : ""//电话
	}
}
 
const rootReducer = combineReducers({
	getIndexPageData,
	selectIndustry,
	selectCity,
	form : combineForms({...form},'form')
});

export default rootReducer 
   