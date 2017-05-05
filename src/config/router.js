import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import App from "../App";
/*找主办*/
import HomePage from "../components/homePage";
/*品牌入驻*/
import BrandSettled from "../components/brandSettled";
import BrandDetails from "../components/brandDetails";//品牌详情
/*找赞助*/
import FindSponsor from "../components/findSponsor";
/*详情页*/
import DetailsPage from "../components/details";
/*合作请求页*/
import RequestPage from "../components/request";
/*合作发布*/
import ReleasePage from "../components/release";
import Sector from "../components/sector";
import SelectCity from "../components/selectCity";
import FindIndustry from "../components/findIndustry";
/*消息页*/
import News from "../components/news";
import SendRecord from "../components/sendRecord";//发送记录
import Invited from "../components/invited";//邀请合作
import InvitedDetails from "../components/invitedDetails";//邀请合作详情
  
import My from "../components/my";
import Setup from "../components/setup";
import IRelease from "../components/iRelease";//发布的合作
import Partake from "../components/partake";//参与的合作
import PartakeDetails from "../components/partakeDetails";//参与的合作详情
import SuccessCooper from "../components/successCooper";//成功合作
import EntCer from "../components/entCer";//企业认证
import UploadLicense from "../components/uploadLicense";//上传执照
import CompanyProfile from "../components/companyProfile";//企业简介填写
import ProInfo from "../components/proInfo";//职业信息表单
import ProSector from "../components/pro_sector";//职业信息所属行业
import UploadInfo from "../components/uploadInfo";//上传职业信息
import Job from "../components/job";//职务
import Success from "../components/success";//认证上传成功后
const RouterConfig = (  
	<Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
		<Route path="/" component={App}>
			<IndexRoute component={HomePage} />//找主办 
			<Route path="findSponsor" component={FindSponsor} /> //找赞助
			<Route path="brandSettled" component={BrandSettled} /> //品牌入驻
			<Route path="brandDetails" component={BrandDetails} />
			<Route path="details" component={DetailsPage} />//详情页
			<Route path="request" component={RequestPage} />//请求页
			<Route path="release" component={ReleasePage} />//发布页
			<Route path="release/sector" component={Sector} />
			<Route path="release/selectCity" component={SelectCity} />
			<Route path="release/findIndustry" component={FindIndustry} />
			<Route path="news" component={News} />
			<Route path="news/sendRecord" component={SendRecord} />
			<Route path="news/invited" component={Invited} />
			<Route path="/invitedDetails" component={InvitedDetails} /> 
			<Route path="my" component={My} />
			<Route path="entCer" component={EntCer} />
			<Route path="companyProfile" component={CompanyProfile} />
			<Route path="uploadLicense" component={UploadLicense} />
			<Route path="my/setup" component={Setup} />
			<Route path="/successCooper" component={SuccessCooper} />
			<Route path="/iRelease" component={IRelease} />
			<Route path="/partake" component={Partake} />
			<Route path="/partake/partakeDetails" component={PartakeDetails} />
			<Route path="/proInfo" component={ProInfo} />
			<Route path="/pro_sector" component={ProSector} />
			<Route path="/uploadInfo" component={UploadInfo} /> 
			<Route path="/success" component={Success} />
			<Route path="/job" component={Job} />
		</Route>
	</Router>
)

export default RouterConfig  

