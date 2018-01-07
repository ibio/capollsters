import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

export default class SurveyModel extends ProxyModel{

	constructor(){
		super();
		this.title = '';
		this.description = '';
		this.surveyQuestionList = [];
		this.resultQuestionList = [];
		this.surveyList = [];
	}

	fetchAllSurveys(silent, callback, scope){
		var self = this;
		this.get(Config.URL_GET_ALL_SURVEY, 'null', function(response){
			// console.log('response', response);
			self.surveyList = response || [];
			if(!silent){
				self.notify();
			}
			callback && callback.call(scope);
		});
	}

	fetchSurvey(id, silent, callback, scope){
		var self = this;
		this.get(Config.URL_SURVEY + '?id=' + id, null, function(response) {
			self.title = response.title;
			self.description = response.description;
			self.surveyQuestionList = response.questions;
			if(!silent){
				self.notify();
			}
			callback && callback.call(scope);
		})
	}

	fetchResult(id, silent, callback, scope){
		var self = this;
		this.get(Config.URL_RESULT + '?id=' + id, null, function(response) {
			self.resultQuestionList = response.questionResults;
			//save to local
			if(!silent){
				self.notify();
			}
			callback && callback.call(scope);
		})
	}

	createPoll(list, silent, callback, scope){
		console.log('list', list);
		const questions = list.map(value => {
			const question = {};
			question.text = value.text;
			if(value.options && value.options.length){
				question.type = 'SINGLE_CHOICE';
				question.options = value.options.map(option => ({text:option.text}));
			}else{
				question.type = 'OPEN_RESPONSE';
				question.options = [];
			}
			return question;
		});
		const data = {
			owner: null,
			isDisplayed: true,
			title: 'Example Survey',
			description: 'Example Survey Description',
			description: 'Example Survey Description',
			expires: null,
			expires: null,
			createdOn: null,
			questions
		};
		this.post(Config.URL_CREATE_POLL, data, null, function(response){
			callback && callback();
		});
	}

	//http://v2.wp-api.org/reference/pages/
	fetchBatch(where, silent, callback, scope){
		var url = Config.URL_PAGE;
		var self = this;
		//parent=392 splash-page-category
		for(var key in where){
			url = Util.addUrlParam(url, key, where[key]);
		}
		// $.get(url, function(response){
		// 	self.pageList = self._prepareBatch(response);
		// 	if(!silent){
		// 		self.notify();
		// 	}
		// 	callback && callback.call(scope, self.pageList);
		// })
	}

	_prepareBatch(response){
		var title, content, parent, head;
		var data = Util.store(STORAGE_PAGE_DATA, null, true);
		var pageList = [];
		response = response || [];
		//
		response.forEach(function (item){
			var temp;
			if(item._embedded && item._embedded['wp:featuredmedia']){
				temp = item._embedded['wp:featuredmedia'] || [];
				temp = temp[0] || {};
				temp = temp.media_details || {};
				temp = temp.sizes || {};
				temp = temp.medium_large || {};
				temp = temp.source_url;
			}
			if(item.title && item.title.rendered){
				//use the last title
				title = item.title.rendered;
			}
			if(item.content && item.content.rendered){
				content = item.content.rendered;
			}
			parent = item.parent;
			//
			data[item.slug] = {title:title, content:content, url:item.slug, head:temp};
			pageList.push(data[item.slug]);
		}, this);
		console.log('fetched, and saving STORAGE_PAGE_DATA(parent=' + parent +') to local ...');
		Util.store(STORAGE_PAGE_DATA, data, true);
		return pageList;
	}
}
