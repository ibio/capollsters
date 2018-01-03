import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import BaseModel from 'model/base';

const STORAGE_PAGE_DATA = 'fordham-bi-page';

export default class PageModel extends BaseModel{

	constructor(){
		super();
		this.title = '';
		this.content = '';
		this.pageList = [];
	}

	fetch(slug, silent, callback, scope){
		var self = this;
		var data = Util.store(STORAGE_PAGE_DATA, null, true);
		var obj = data[slug];
		if(obj){
			this.title = obj.title;
			this.content = obj.content;
			if(!silent){
				this.notify();
			}
			callback && callback.call(scope);
		}else{
			$.get(Config.URL_PAGE + '?slug=' + slug, function(response) {
				obj = self._prepareData(response);
				self.title = obj.title;
				self.content = obj.content;
				//save to local
				console.log('fetched, and saving STORAGE_PAGE_DATA(' + slug +') to local ...');
				data[slug] = obj;
				Util.store(STORAGE_PAGE_DATA, data, true);
				if(!silent){
					self.notify();
				}
				callback && callback.call(scope);
			})
		}
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

	/*
	 * private methods
	 */
	_prepareData(response){
		var title = '';
		var content = '';
		response = response || [];
		response.forEach(function (item) {
			if(item.title && item.title.rendered){
				//use the last title
				title = item.title.rendered;
			}
			if(item.content && item.content.rendered){
				content += item.content.rendered;
			}
		}, this);
		//
		return {title:title, content:content};
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
