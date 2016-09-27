// let storage=require "./storage"
import storage from "./storage"
let common={};
common.isLogin=function(token,isJump) {
	let r=false;
	if(!token){
		if(isJump){
			alert("用户尚未登录！");
        	location.href="/#!/login";
		}
        return false;
	}
	let url = "http://api.scuplus.cn/jwc/grade";
        $.ajax({
            url: url,
            async:false,
            data: {
                token: token
            },
            type: 'get',
            success: function(r) {
                console.log(r);
                if (r.status == 1) {
                }
                r=true;
                // callback(null);

            },
            error: function(x, t, e) {
            	console.warn(x);
            	if(x.status==401){
            		// callback("获取成绩错误！用户token无效");
            		if(isJump){
            			alert("用户登录信息已失效！");
			        	location.href="/#!/login";
					}
            	}
            }
        });
        return r;
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
                location.href="/#!/login?/"+backUrl;
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

//get操作
common.get=function(url,data,async,callback){
  this.ajax("get",url,data,async,callback);
}

//post操作
common.post=function(url,data,async,callback){
  this.ajax("post",url,data,async,callback);
}

module.exports=common;
