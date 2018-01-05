import React from 'react';
import ReactDOM from 'react-dom';
// import Dropdown from 'bootstrap/dropdown';
// https://github.com/flatiron/director/issues/349#issuecomment-286476621
import {Router} from 'director/build/director';
import Config from  'helper/config';
import Util from   'helper/util';
import Home from 'view/page/home';
import Incompleted from 'view/page/incompleted';
import Completed from 'view/page/completed';
import CreatePoll from 'view/page/createpoll';
import Result from 'view/page/result';
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
	let navObj = {};
	let node = null;
	// let navObj, searchMode;
	if(document.location.pathname === '/' || Config.TEST_MODE){
		navObj = Util.getNav(Config.DIR_RULE);
		// searchMode = (navObj.navs[0] === Config.NAV_SEARCH);
		switch(path){
			case Config.NAV_DEFAULT:
				document.title = 'Home';
				node = <Home title={document.title} />;
				break;
			case Config.NAV_INCOMPLETED:
					document.title = 'Incompleted';
					node = <Incompleted title={document.title} />;
					break;
      case Config.NAV_COMPLETED:
          document.title = 'Completed';
          node = <Completed title={document.title} />;
          break;
      case Config.NAV_CREATE_POLL:
          document.title = 'Create New Poll';
          node = <CreatePoll title={document.title} />;
          break;
			case Config.NAV_RESULT:
          document.title = 'Result';
          node = <Result title={document.title} navs={navObj.navs} nid={navObj.nid} />;
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
