import _ from 'lodash';

//output
var data = {};

data.ROOT = '';
data.STATIC_ROOT = '/';
data.HOST = document.location.origin + '/';
//
data.URL_SURVEY = data.ROOT === '' ? 'res/survey.json' : data.ROOT + 'survey?id=100';

data.DIR_RULE = '#';
data.NAV_MAIN = 'main';
data.NAV_INCOMPLETED = 'incompleted';
data.NAV_COMPLETED = 'completed';


data.SEARCH_SPLITOR = '+';

// data.VALID_SEARCH = '^_\\d+$';

// console.log(data);

export default data;
