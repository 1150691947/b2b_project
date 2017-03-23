import React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "../App";
/*首页*/
import HomePage from "../components/homePage";
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
import SendRecord from "../components/sendRecord";

import My from "../components/my";

const RouterConfig = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={HomePage} />
			<Route path="details" component={DetailsPage} />
			<Route path="request" component={RequestPage} />
			<Route path="release" component={ReleasePage} />//发布页
			<Route path="release/sector" component={Sector} />
			<Route path="release/selectCity" component={SelectCity} />
			<Route path="release/findIndustry" component={FindIndustry} />
			<Route path="news" component={News} />
			<Route path="news/sendRecord" component={SendRecord} />
			<Route path="my" component={My} />
		</Route>
	</Router>
)

export default RouterConfig  