import React from "react";
import { Link  } from "react-router";
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PlaceholderComponent = ( props ) => (
	<div className="img-placeholder">微 耀</div>
)
const Item = ( props ) => (
	<Link to={`/details?id=${props.id}&entryPage=homePage`} className="item-container" >
		<div className="content-container">
			<div className="head-container clearfix">
				<div className="logo fl">
					<LazyLoad throttle={300} height={43}>
						<img src={props.headimgurl} alt="头像" />
					</LazyLoad> 
				</div>
				<div className="center fl ">
					<div className="company-name fontsize36">{props.nickname}</div>
					<p className="release-time fontsize24">发布时间：{props.create_time}</p>
				</div>
				<Link to={`/request?id=${props.id}`} className="btn fr fontsize24">
					<i className="iconfont fontsize32">&#xe763;</i>
					<span>合作请求</span>
				</Link>
			</div> 
 
			<div className="body-container">
				<div className="container clearfix">
					<div className="left fl" style={{"width": props.imgurl ? "6.34667rem" : "100%"}}>
						<p className="title fontsize28">{ props.budget !== "" && <span className="icon-budget fontsize20">预</span>}{`【${props.name}】${props.title}`}</p>
						<div className="info clearfix fontsize22">
							<span className="industry fl">所属行业：{props.trade}</span>
							<span className="range fr">
								合作地区：{`${props.city.split(",")[0]}`}
							</span>
						</div>
					</div>
					{props.imgurl &&<div className="cover fr">
						<LazyLoad throttle={200} height={81} placeholder={<PlaceholderComponent />} >
				            <ReactCSSTransitionGroup
				              transitionName="fade"
				              transitionAppear={true}
				              transitionAppearTimeout={500}
				              transitionEnter={false}
				              transitionLeave={false}>
				              <img src={`${props.imghost}${props.imgurl}`} alt="" />
				            </ReactCSSTransitionGroup>
				          </LazyLoad>
					</div>}
				</div>
			</div> 

			<div className="footer-container fontsize22 clearfix">
				<div className="contacts fl">
					{`联系人：${props.linkman} | ${props.job_level}`}
				</div>

				<div className="right fr fontsize24">
					<div className="cpt-num fl">
						<i className="iconfont fontsize28">&#xe62d;</i>
						<span>{props.cq}</span>
					</div>
					<div className="see-num fr">
						<i className="iconfont fontsize28">&#xe6ac;</i>
						<span>{props.pv}</span>
					</div>
				</div>
			</div>
		</div>
	</Link>
);
//<span className="vertical-line">|</span>职位

export default Item;