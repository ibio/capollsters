import _ from 'lodash';
import request from 'superagent';
import Config from 'helper/config';
import Util from 'helper/util';
import BaseModel from 'model/base';

export default class ProxyModel extends BaseModel {

  constructor() {
    super();
  }

  put(url, data, headers, success, failer){
    request
    .put(url)
    // headers cannot be null
    .set(headers || {})
    .send(data)
    .end(function(err, res){
      if(err){
        failer && failer(err);
      }else{
        success && success(res.body);
      }
    });
  }

  delete(url, headers, success, failer){
    request
    .delete(url)
    .set(headers || {})
    .end(function(err, res){
      if(err){
        failer && failer(err);
      }else{
        success && success(res.body);
      }
    });
  }

  get(url, headers, success, failer){
    request
    .get(url)
    .set(headers || {})
    .end(function(err, res){
      if(err){
        failer && failer(err);
      }else{
        success && success(res.body);
      }
    });
  }

  post(url, data, headers, success, failer){
    request
    .post(url)
    .set(headers || {})
    .send(data)
    .end(function(err, res){
      if(err){
        failer && failer(err);
      }else{
        success && success(res.body);
      }
    });
  }

}
