var wbpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html

var publicPath = "/dist/"; //服务器路径
var path = __dirname + "/dist/";

var plugins = [];

plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包

plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    filename: '../index.html', //生成的html存放路径，相对于 path
    template: './src/template/index.html', //html模板路径
    hash: true,    //为静态资源生成hash值
}));

module.exports = {
	//入口文件
	entry : {
		app : "./src/App"
	},
	//输出文件
	ouput : {
		publicPath, //编译好的文件，在服务器的路径
        path, //编译到当前目录
        filename: '[name].js' //编译后的文件名字
	},
	module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel?presets=es2015'
            }, {
                test: /\.scss$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }
        ]
    },
	resolve: {
        extensions: ['', '.js', '.jsx','scss'], //后缀名自动补全
    }
};