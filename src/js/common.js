// let storage=require "./storage"
import storage from "./storage"
let common={};
common.config={
  domain:"http://api.scuplus.cn"
}

common.isLogin=function(callback) {
  let url=this.config.domain+"/login/check";
	this.get(url,null,callback);
}

//ajax操作,默认需要登录信息
common.ajax=function(method,url,data,async,callback){
  let d=data;
  if(!d){
    d={};
  }
  if(typeof d !='object'){
    console.warn("参数类型错误，请输入一个数组数据！");
    callback("餐宿类型错误请输入一个数组数据！");
  }
  let backUrl=location.hash;
  d.token= storage.get("token");
    $.ajax({
      url: url,
      async:async,
      data: d,
      type: method,
      success: function(r) {
          if (r.status == 1) {
            callback(null,r);
          }else{
            callback(r.msg)
          }
      },
      error: function(x, t, e) {
        let r=x.response;
        let msg="";
        switch(x.status) {
          case 422://参数错误
            if(r.error){
              msg=r.error;
            }else{
              msg="参数错误！";
            }
            break;
          case 401://认证失败
              msg="用户尚未登录，或登录信息已失效！";
              setTimeout(function() {
                location.href="/#!/login?back=/"+backUrl;
              },1500);
            break;
          case 400://一般错误
            msg=r.error;
            break;
          default:
            msg="错误！"
            break;
        }
        callback(msg);
        console.warn(x);
      }
    });
}

//get操作，默认异步
common.get=function(url,data,callback){
  this.ajax("get",url,data,true,callback);
}

//post操作，默认异步操作
common.post=function(url,data,callback){
  this.ajax("post",url,data,true,callback);
}

module.exports=common;
