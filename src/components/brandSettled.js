import React,{ Component } from "react";
import { Link } from "react-router";
import LazyLoad from 'react-lazyload';
import "../css/brandSettled.css";

/*图片资源*/
import lamborghini from "../images/1.png";
import zegna from "../images/8.png";
import azimut from "../images/4.png";
import parmigiani from "../images/7.png";
import SRLogoLetterEagle from "../images/5.png";
import rollsroyce from "../images/2.png";
import riedel from "../images/6.png";
import mclaren from "../images/3.png";
 
const brandArr = [
    {
        "name":"兰博基尼",
        "enName": "LAMBORGHINI",
        "logo": lamborghini,
        "link": "1"
    },
    {
        "name":"劳斯莱斯",
        "enName": "Rolls-Royce",
        "logo": rollsroyce,
        "link": "2"
    },
    {
        "name":"迈凯伦",
        "enName": "MCLAREN",
        "logo": mclaren,
        "link": "3"
    },{
        "name":"阿兹慕",
        "enName": "Azimut",
        "logo": azimut,
        "link": "4"
    },{
        "name":"",
        "enName": "STEFANO RICCI",
        "logo": SRLogoLetterEagle,
        "link": "5"
    },{
        "name":"",
        "enName": "RIEDEL",
        "logo": riedel,
        "link": "6"
    },{
        "name":"帕玛强尼",
        "enName": "PARMIGIANI",
        "logo": parmigiani,
        "link": "7" 
    },{
        "name":"杰尼亚",
        "enName": "Zegna",
        "logo": zegna,
        "link": "8"
    }
];

const BrandItem = ( props ) => (
    <li className="brand-item">
        <Link to={`brandDetails?id=${props.link}`}>
             <div className="logo-container">
                <LazyLoad>
                    <img src={props.logo} alt="" />
                </LazyLoad>
            </div>
            <div className="brand-name fontsize24">
                <p>{props.enName}</p>
                <p>{props.name}</p>
            </div>
        </Link> 
    </li>
)

export default class BrandSettled extends Component {

    render() { 
        return (
            <div className="brand-settled">
                <ul className="brand-list"> 
                    {
                        brandArr.map(( item, index ) => {
                            return <BrandItem key={index} {...item} />
                        }) 
                    }
                </ul>
            </div>
        )
    }
}
