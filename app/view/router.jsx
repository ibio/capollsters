import React from 'react';
import ReactDOM from 'react-dom';
// import Dropdown from 'bootstrap/dropdown';
// https://github.com/flatiron/director/issues/349#issuecomment-286476621
import {Router} from 'director/build/director';
import Config from  'helper/config';
import Util from   'helper/util';
import Main from 'view/page/main';
import Incompleted from 'view/page/incompleted';
import Completed from 'view/page/completed';
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
	// let navObj, searchMode;
	if(document.location.pathname === '/' || Config.TEST_MODE){
		// navObj = Util.getReportNav(path + '/');
		// searchMode = (navObj.navs[0] === Config.NAV_SEARCH);
		switch(path){
			case Config.NAV_MAIN:
				document.title = 'Main';
				node = <Main title={document.title} />;
				break;
			case Config.NAV_INCOMPLETED:
					document.title = 'Incompleted';
					node = <Incompleted title={document.title} />;
					break;
      case Config.NAV_COMPLETED:
          document.title = 'Completed';
          node = <Completed title={document.title} />;
          break;
			default:
				document.title = 'Page Not Found - 404';
				node = <P404 title={document.title} />;
		}
	}else{
		// document.location.href = document.location.origin;
		console.log('Config.TEST_MODE', Config.TEST_MODE);
		console.log('document.location.pathname', document.location.pathname);
		console.log('document.location.origin', document.location.origin);
	}
	//
	if(node){
		ReactDOM.render(node, document.getElementById('app'));
	}

}

init();
