import _ from 'lodash';
import Util from 'helper/util';
import Config from 'helper/config';
import ProxyModel from 'model/proxy';

const STORAGE_REPORT_DATA = 'fordham-bi-report';

export default class ReportModel extends ProxyModel {

	constructor(){
		super();
		this.itemList = [];
		// either fetch or from search
		this._baseList = [];
	}

	getAllList(){
		const list = Util.store(STORAGE_REPORT_DATA, null, true) || [];
		return list;
	}
	
	fetch(callback, silent){
		const list = this.getAllList();
		if(list && list.length){
			this._baseList = list;
			this._addAll(this._baseList, silent);
			callback && callback(this._baseList);
		}else{
			this.get(Config.URL_REPORTS, null, result => {
				const response = result || [];
				const list = this._parseList(response);
				console.log('fetched, and saving STORAGE_REPORT_DATA to local...');
				Util.store(STORAGE_REPORT_DATA, list, true);
				this._baseList = list;
				this._addAll(this._baseList, silent);
				callback && callback(this._baseList);
			});
		}
	}

	search(keyword, filters, callback){
		const tagList = filters || [];
		this.get(Config.URL_SEARCH + keyword, null, result => {
			const response = result || [];
			this._baseList = this._parseList(response);
			// if it needs filter, don't trigger event then
			this._addAll(this._baseList, tagList.length > 0);
			if(tagList.length){
				this.filter({tagList:tagList});
			}
			callback && callback(this._baseList);
		});
	}

	saveFavorite(data, callback){
		// NOTICE: do NOT use _baseList here, because it needs to save all reports again
		const originalList = this.getAllList();
		this.post(Config.URL_FAV, {id:data.id}, null, null, err => {
		
		//   success: function(response){
		//   	// callback && callback.call(scope, response);
		//   },
	 //    complete: function(xhr, textStatus) {
	 //    	//404 "error"

      console.log(err.status);
      //NOTICE: I-don't-know-what's-going-on-here
      //needs to login
      if(err.status === 403){
      	//
      //since it's always returning a 404 and no success called, moving callback here
      }else{
      	// console.log(Config.favorites);
				//add new favorite
				// TODO: needs to rethink
				if(data.favorite){
					Config.favorites.push(data.id);
				}else{
					_.remove(Config.favorites, id => {
					  return id === data.id;
					});
				}
				// console.log(Config.favorites, data.favorite);
      	// manually update favorite
	      originalList.forEach(o => {
	      	if(o.id === data.id){
	      		o.favorite = data.favorite;
	      		return;
	      	}
	      });
	      // save
	      Util.store(STORAGE_REPORT_DATA, originalList, true);
				this.notify();
	      //
	      callback && callback();
      }
		});
		/*
		$.post(Config.URL_FAV, {id:data.id}, function(response) {
			//...
		})
		*/
	}

	filter(fileds){
		// {menuId:this.menuId, key:this.props.nid}
		this.itemList = _.filter(this._baseList, item => {
			const isFavorite = (fileds.menuId === -1) && item.favorite;
			// console.log('-->', fileds.menuId, item.favorite);
			//menuId = 0 show all
			//menuId > 1 show elements
			return fileds.menuId === 0 													||
						this._tagsCheck(fileds.tagList, item) 				||
						_.find(item.departments, {id: fileds.menuId}) ||
						isFavorite
		});
		this.notify();
	};

	sort(field, order){
		this.itemList = _.orderBy(this.itemList, field, order);
		this.notify();
	};

	getItemByProp(key, value){
		let data;
		this.itemList.forEach(function (item) {
			if(item[key] === value){
				data = item;
				return;
			}
		});
		return data;
	};

	// *** private ***
	_addAll(originalList, silent){
		this.itemList = _.cloneDeep(originalList);
		// console.log('this._originalList', this.itemList);
		if(!silent){
			this.notify();
		}
	}

	_parseList(list){
		let originalList = [];
		list = list || [];
		//NOTICE: list can be both [] and {}
		originalList = list.map(item => {
			// console.log('departments', item.departments.map);
			item.departments = item.departments || [];
			return {
				key: item.slug,
				favorite:_.includes(Config.favorites, item.id),
				id: item.id, 
				name: item.title.rendered, 
				author: item.author, 
				overview: item.overview, 
				thumb: item.thumbnail, 
				report: item.external,
				departments: item.departments.map(function (o) {return {id:o.term_id, name:o.name}; }, this),
				sources: item.sources.concat(), 
				tables: item.tables.concat(), 
				fields: item.fields.concat(), 
				types: this._truncateList(item.acf.report_type, 4) || [],
				modifiedDate: item.modified, 
				createdDate: item.date,
			};
		});

		//default: sort by alphabetical
		originalList = _.orderBy(originalList, 'name', 'asc');
		return originalList;
	}

	/*
	 * private methods
	 */
	_tagsCheck(tagList, item){
		const list = item.sources.concat(item.tables, item.fields);
		tagList = tagList || [];
		return _.find(list, str => { return _.includes(tagList, str); });
	}

	_truncateList(data, num){
		const list = data || [];
		return list.filter((item, index) => {
			return index < num;
		});
	}

}
