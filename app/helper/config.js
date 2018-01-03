import _ from 'lodash';

const _wpInfo = window.wpInfo || {};
const _wpApiSettings = window.wpApiSettings || {};

//output
var data = {};

data.isLogin = parseInt(_wpInfo.isLogin) === 1;
data.logoutUrl = _wpInfo.logoutUrl;
// data.isLogin = true;
//favorite ids
//NOTICE: it will be modified at report.js
data.favorites = document.getElementById('app').getAttribute('data-favs').split(',').map(_.toNumber);
// [89, 250] console.log('data.favorites', data.favorites);

data.ROOT = _wpApiSettings.root;
data.STATIC_ROOT = _wpInfo.staticRoot + '/';
data.HOST = document.location.origin + '/';
// data.HOST = 'http://analytics.ufordh.am/';
//
data.URL_DEPAT = data.ROOT === '' ? 'res/departments.json' : data.ROOT + _wpApiSettings.versionString + 'departments?per_page=100';
data.URL_REPORTS = data.ROOT === '' ? 'res/reports.json' : data.ROOT + _wpApiSettings.versionString + 'reports?per_page=100';
data.URL_SEARCH = data.ROOT === '' ? 'res/search.json?search=' : data.ROOT + _wpApiSettings.versionString + 'reports?per_page=100&search=';
data.URL_PAGE = data.ROOT === '' ? 'res/pages-category.json' : data.ROOT + _wpApiSettings.versionString + 'pages';
data.URL_FAV = data.ROOT === '' ? 'res/reports.json' : data.STATIC_ROOT + 'fav.php';
data.SPLASH_STORIES_ID = data.ROOT.indexOf('fordham.edu') > -1 ? 391 : 392;

data.DIR_RULE = '#';
data.NAV_MAIN = 'main';
data.NAV_INCOMPLETED = 'incompleted';
data.NAV_COMPLETED = 'completed';


data.SEARCH_SPLITOR = '+';

// data.VALID_SEARCH = '^_\\d+$';

// console.log(data);

export default data;
