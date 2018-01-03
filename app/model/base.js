import Util from 'helper/util';

export default class BaseModel {

	constructor(){
		//for updating views
		this._subscriberList = [];
		// console.log('call BaseModel constructor');
	}

	subscribe(callback){
		this._subscriberList.push({callback});
	}

	notify(){
		this._subscriberList.forEach(function (props) { props.callback && props.callback(); });
	}

}