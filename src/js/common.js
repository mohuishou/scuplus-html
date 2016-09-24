
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

module.exports=common;
