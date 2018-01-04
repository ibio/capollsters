import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

export default class SurveyModel extends ProxyModel{

	constructor(){
		super();
		this.title = '';
		this.description = '';
		this.questionList = [];
	}

	fetch(id, silent, callback, scope){
		var self = this;
		$.get(Config.URL_SURVEY + '?id=' + id, function(response) {
			self.title = response.title;
			self.description = response.description;
			self.questionList = response.questions;
			//save to local
			if(!silent){
				self.notify();
			}
			callback && callback.call(scope);
		})
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
