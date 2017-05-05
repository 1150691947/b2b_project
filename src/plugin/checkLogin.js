import url from "./config.js";
//写cookies
function setCookie(name,value){
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

// function getCookie(name) //读取cookie
// { 
//     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
//     if(arr=document.cookie.match(reg))
 
//         return unescape(arr[2]); 
//     else  
//         return null; 
// }  
 
// function delCookie(name)//删除cookie
// {
//     var exp = new Date();
//     exp.setTime(exp.getTime() - 1);
//     var cval=getCookie(name);
//     if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
// }


const checkLogin = () => {
    var href = location.href;
    // delCookie("target_url");
    setCookie("target_url",href);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",url + "home/checkLogin",true);
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState === 4){ 
            if(xmlhttp.status === 200){
                if(xmlhttp.responseText === "false"){    
                    location.href = url + 'wechat/Oauth';
                }
            }else{
                console.log("AJAX服务器返回错误！"); 
            }    
        }   
    }
    xmlhttp.send(); 
}

export default checkLogin;
	
    