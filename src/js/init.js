/**
 * 初始化，登录之后自动获取，成绩，课程表，图书馆，个人信息并且保存在sessionstorage
 */
const common = require('./common');
let s=common.storage;
let init={};

init.init=function (callback) {
  this.userInfo(callback);
}

/**
 * 成绩获取
 * @method grade
 * @return {[type]} [description]
 */
init.grade=function () {

};

/**
 * 课程表获取
 * @method schedule
 * @return {[type]} [description]
 */
init.schedule=function () {

}

/**
 * 用户信息获取
 * @method userInfo
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
init.userInfo=function (callback,update=false){
  let user=s.get("user");
  if(!user){
    common.get("/user",null,function(e,r){
      if(e!=null){
        callback(e);
        return;
      }
      if(r.status==1){
        s.set("user",r.data);
        callback(null,r.data);
      }else {
        callback("个人信息获取失败！");
      }
    });
  }else {
    callback(null,JSON.parse(user));
  }
}
module.exports=init;
