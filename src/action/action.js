// const BASIC_URL = ""; //最初的url

const received = ( type, json ) => {
	return {
		type,
		payload : json
	}
}


//拉取首页数据
export const fetchData = (  ) => ( dispatch ) => {

	let arr = [{title:"cece"}];

	dispatch (received("GET_DATA",{data : arr}))
}   

//选择行业
export const selectIndustry = ( type, index ) => {

	return { type, index }
} 


//选择地区
export const selectArea = ( type, index ) => {

	return { type, index }

}