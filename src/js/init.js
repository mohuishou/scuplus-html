/**
 * 初始化，登录之后自动获取，成绩，课程表，图书馆，个人信息并且保存在sessionstorage
 */
const common = require('./common');
const g = require('./grade');
let s=common.storage;
let init={};

init.init=function (callback) {
  this.userInfo(callback,true);
  this.grade(callback,true);
  this.schedule(callback,true);
  this.exam(callback,true);
  this.libraryNow(callback,true);
  this.libraryHistory(callback,true);
}

/**
 * 成绩获取
 * @method grade
 * @param  {Function} callback       [description]
 * @param  {Boolean}  [update=false] [description]
 * @return {[type]}                  [description]
 */
init.grade=function (callback,update=false) {
  let grade_data=s.get("grade");
  let url = "/jwc/grade";
  if(!grade_data||update){
    common.get(url,null,function(e,r){
      if(e!=null){
        callback(e);
      }else{
        let grade_data=g.cal(r.data);
        s.set("grade",grade_data);
        callback(null,grade_data);
      };
    });
  }else {
    callback(null,JSON.parse(grade_data));
  }
};

/**
 * 课程表信息初始化
 * @method schedule
 * @param  {Function} callback       [description]
 * @param  {Boolean}  [update=false] [description]
 * @return {[type]}                  [description]
 */
init.schedule=function (callback,update=false) {
  let schedule=s.get("schedule");
  let url = "/jwc/schedule";
  if(!schedule||update){
    common.get(url,null,function(e,r){
      if(e!=null){
        callback(e);
      }else{
        s.set("schedule",r.data);
        callback(null,r.data);
      };
    });
  }else {
    callback(null,JSON.parse(schedule));
  }
}

/**
 * 用户信息获取
 * @method userInfo
 * @param  {Function} callback       [description]
 * @param  {Boolean}  [update=false] [是否直接从服务器获取数据]
 * @return {[type]}                  [description]
 */
init.userInfo=function (callback,update=false){
  let user=s.get("user");
  if(!user||update){
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

/**
 * 考试信息获取
 * @method exam
 * @param  {Function} callback       [description]
 * @param  {Boolean}  [update=false] [description]
 * @return {[type]}                  [description]
 */
init.exam=function(callback,update=false) {
  let exam=s.get("exam");
  if(!exam||update){
    common.get("/jwc/exam",null,function(e,r){
      if(e!=null){
        callback(e);
        return;
      }
      if(r.status==1){
        s.set("exam",r.data);
        callback(null,r.data);
      }else {
        callback("教务处错误！");
      }
    });
  }else {
    callback(null,JSON.parse(exam));
  }
}

/**
 * 获取图书馆当前借阅数据
 * @param  {Function}
 * @param  {Boolean}
 * @return {[type]}
 */
init.libraryNow=function(callback,update=false){
  let data=s.get("library_now");
  if(!data||update){
    common.get("/library/now",null,function (e,r) {
        if(e!=null){
          callback(e);
          return;
        }
        if(r.status==1){
          s.set("library_now",r.data);
          callback(null,r.data);
        }else {
          callback(r.msg);
        }
    });
  }else {
    callback(null,JSON.parse(data));
  }

}

/**
 * 获取图书馆历史借阅数据
 * @param  {Function}     callback       [description]
 * @param  {Boolean}      [update=false] [description]
 */
init.libraryHistory=function(callback,update=false){
  let data=s.get("library_history");
  if(!data||update){
    common.get("/library/history",null,function (e,r) {
        if(e!=null){
          callback(e);
          return;
        }
        if(r.status==1){
          s.set("library_history",r.data);
          callback(null,r.data);
        }else {
          callback(r.msg);
        }
    });
  }else {
    callback(null,JSON.parse(data));
  }

}

module.exports=init;
