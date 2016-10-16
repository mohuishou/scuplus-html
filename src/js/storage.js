let storage={
	is_cookie:false,
	type:1
};

storage.set=function(k,v){
	if(!window.localStorage){
		console.log("浏览器不支持现代浏览器储存功能！");
		if(storage.is_cookie){
			$.fn.cookie(k,v);
		}
		return;
	}

	if(typeof v=="object"){
		v=JSON.stringify(v);
	}

	if(storage.type==2){
		localStorage[k]=v;
	}else if(storage.type==1){
		sessionStorage[k]=v;
	}
}

storage.get=function(k){
	let v;
	v=sessionStorage[k];
	if(v)
		return v;
	v=localStorage[k];
	if(v)
		return v;
	v=$.fn.cookie(k);
	if(v)
		return v;
	return null;
}


function cookie(){

}

module.exports=storage;
