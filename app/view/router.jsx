import React from 'react';
import ReactDOM from 'react-dom';
// import Dropdown from 'bootstrap/dropdown';
// https://github.com/flatiron/director/issues/349#issuecomment-286476621
import {Router} from 'director/build/director';
import Config from  'helper/config';
import Util from   'helper/util';
import StudentHome from 'view/page/studenthome';
import TeacherHome from 'view/page/teacherhome';
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
	let path = document.location.hash.split(Config.DIR_RULE + '/')[1] || '';
	let navObj = {};
	let node = null;
	//strip ids
	path = path.split(':')[0] || '';
	// let navObj, searchMode;
	if(document.location.pathname === '/' || Config.TEST_MODE){
		navObj = Util.getNav(Config.DIR_RULE);
		// searchMode = (navObj.navs[0] === Config.NAV_SEARCH);
		switch(path){
			case Config.NAV_STUDENT:
				document.title = 'Student Home';
				node = <StudentHome title={document.title} />;
				break;
			case Config.NAV_STUDENT_POLL:
					document.title = 'Student Poll';
					node = <Incompleted nid={navObj.nid} title={document.title} />;
					break;
      case Config.NAV_STUDENT_COMPLETED:
          document.title = 'Student Completed';
          node = <Completed role="student" title={document.title} />;
          break;
			case Config.NAV_STUDENT_RESULT:
          document.title = 'Student Poll Result';
          node = <Result title={document.title} navs={navObj.navs} nid={navObj.nid} />;
          break;
			case Config.NAV_TEACHER:
				document.title = 'Teacher Home';
				node = <TeacherHome title={document.title} />;
				break;
				case Config.NAV_TEACHER_COMPLETED:
						document.title = 'Teacher Completed';
						node = <Completed role="teacher" title={document.title} />;
						break;
				case Config.NAV_TEACHER_RESULT:
						document.title = 'Teacher Poll Result';
						node = <Result title={document.title} navs={navObj.navs} nid={navObj.nid} />;
						break;
      case Config.NAV_TEACHER_CREATE_POLL:
          document.title = 'Teacher Create New Poll';
          node = <CreatePoll title={document.title} />;
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
