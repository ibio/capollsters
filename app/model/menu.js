import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

const STORAGE_MENU_RAW = 'fordham-bi-menu-raw';

export default class MenuModel extends ProxyModel {

	constructor(list){
		super();
		this.itemList = [];
		this._addAll(list);
	}

	fetch(navs, showSub, callback){
		const list = Util.store(STORAGE_MENU_RAW, null, true);
		let items = [];
		// local
		// http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
		if(list && list.length){
			items = this._prepareData(list, navs, showSub);
			this._addAll(items);
			callback && callback();
		}else{
			this.get(Config.URL_DEPAT, null, response => {
				// NOTICE: needs to save response(raw data) because in every fetch, showSub will change
				console.log('fetched, and saving STORAGE_MENU_RAW to local...');
				Util.store(STORAGE_MENU_RAW, response, true);
				items = this._prepareData(response, navs, showSub);
				this._addAll(items);
				callback && callback();
			});
		}
	}

	/*item
	{
		orderKey
		menu: {id, name, url}
		showSub : true
		list:[
			{id, name, url}
		]
	}*/
	update(list){
		this.itemList = list;
		this.notify();
	}

	addTo(orderKey, id, name, url, showSub, sublist, collection){
		collection = collection || [];
		collection.push({
				orderKey:orderKey,
				menu: {id: id, name: name, url: url},
				showSub: showSub,
				list: this._createSub(url, sublist)
		});
		return collection;
	}

	toggleSub(obj){
		this.itemList = this.itemList.map(item => {
			return obj === item ? _.extend({}, obj, {showSub: !obj.showSub}) : item;
		});
		this.notify();
	}

	getActiveNav(list){
		const navs = list || [];
		const url = [Config.DIR_RULE, Config.NAV_REPORT, navs.join('/')].join('/');
		let data = {};
		this.itemList.forEach(item => {
			// menu
			if(item.menu.url === url){
				data = item.menu;
				return;
			}
			// submenu
			item.list.forEach(subItem => {
				if(subItem.url === url){
					data = subItem;
					return;
				}
			});
		});
		return data;
	}



	/*
	 * private methods
	 */
	_addAll(collection){
		var list = Util.clone(this.itemList);
		// NOTICE: collection can be both [] and {}
		for(var o in collection){
			var item = collection[o];
			this.addTo(item.orderKey, item.menu.id, item.menu.name, [Config.DIR_RULE, Config.NAV_REPORT, item.menu.url].join('/'), item.showSub, item.list, list);
		}
		this.itemList = _.orderBy(list, 'orderKey', 'asc');
		this.notify();
	}

	_prepareData(response, navs, showSub){
		var items = {};
		response = response || [];
		// console.log(response);
		response.forEach(item => {
			var obj = {id:item.id, name:item.name, url:item.slug};
			//has a parent
			if(item.parent){
				items[item.parent] = items[item.parent] || {};
				items[item.parent].list = items[item.parent].list || [];
				items[item.parent].list.push(_.extend({}, obj));
			}else{
				items[item.id] = _.extend(
					items[item.id], 
					{orderKey:item.slug, menu:_.extend({}, obj), showSub:this._isActiveParent(navs, obj.url) || showSub}
				);
			}
		});
		return items;
	}

	_isActiveParent(navs, url){
		var parent = navs ? navs[0] : null;
		return parent === url;
	}

	_createSub(parentUrl, list){
		list = list || [];
		return list.map(item => {
			item.url = parentUrl + '/' + item.url;
			return _.extend({}, item);
		});
	}

}
