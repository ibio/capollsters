import React from 'react';
import ReactDOM from 'react-dom';
// import Dropdown from 'bootstrap/dropdown';
// https://github.com/flatiron/director/issues/349#issuecomment-286476621
import {Router} from 'director/build/director';
import Config from  'helper/config';
import Util from   'helper/util';
import Main from 'view/page/main';
import P404 from 'view/page/p404';

let _router;

function init(debug) {
	let routes = {};
	//https://github.com/flatiron/director#wildcard-routes
	routes['/((\w|.)*)'] = render.bind(this);
	_router = Router(routes);
	_router.init('/');
}

function render() {
	let path = document.location.hash.split('/')[1] || '';
	let node = null;
	let navObj, searchMode;
	// console.log(document.location.href);
	if(document.location.pathname === '/'){
		switch(path){
			case Config.NAV_MAIN:
				document.title = 'Main';
				navObj = Util.getReportNav(Config.NAV_REPORT + '/');
				searchMode = (navObj.navs[0] === Config.NAV_SEARCH);
				node = <Main title={document.title} navs={navObj.navs} nid={navObj.nid} searchMode={searchMode} />;
				break;
			default:
				document.title = 'Page Not Found - 404';
				node = <P404 title={document.title} />;
		}
	}else{
		document.location.href = document.location.origin;
	}
	//
	if(node){
		ReactDOM.render(node, document.getElementById('app'));
	}
	
}

init();