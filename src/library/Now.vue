<template>
<div id="library">
    <table class="table table-resposive table-bordered">
      <caption> <b>当前图书借阅信息</b>
      </caption>
      <thead>
        <tr class="title">
          <th>书名</th>
          <th>作者</th>
          <th>到期时间</th>
          <th><x-button @click="loanAll()"  mini text="续借全部" plain></x-button></th>
        </tr>
        <tbody>
          <tr v-for="now in libraryNow">
            <td>{{now.title}}</td>
            <td>{{now.author}}</td>
            <td>{{ now.end_day }}</td>
            <td>
              <x-button @click="loanOne(now.review_id)" :type="now.status>0 ? 'primary' : 'warn'" mini :text="now.status<0 ? ('欠费：'+now.money):'续借'" :disabled="now.status<0 ? true : false" plain></x-button>
            </td>
          </tr>

        </tbody>

      </thead>
    </table>

  <loading :show="loadingShow" :text="loading"></loading>
</div>
<!-- 更新按钮 -->
<div @click="update(true)" id="search-switch">
  <div class="icon" @click="update">
    <i class="iconfont icon-refresh"></i>
  </div>
</div>
<!-- 更新按钮end -->
</template>

<script>
import Loading from 'vux/src/components/loading'
import init from '../js/init'
import common from '../js/common'
import XButton from 'vux/src/components/x-button'
import g from '../js/grade'
import {
  update_title
} from '../vuex/actions'

/**
 * 计算图书状态：1:正常，0：5天内超期，-1：已超期
 * @param  {[type]} datas [description]
 * @return {[type]}       [description]
 */
function checkLibrary(datas) {
  for (let i=0;i < datas.length ;  i++) {
    //计算剩余时间
    let data=datas[i];
    data.end_day=data.end_day.trim();
    let end_day=data.end_day.substring(0,4)+"-"+data.end_day.substring(4,6)+"-"+data.end_day.substring(6);
    end_day=Date.parse(new Date(end_day));
    let now_day=Date.parse(new Date());
    //剩余时间（天）
    let duration=((end_day-now_day)/(1000*60*60*24)).toFixed(0);
    if (duration<0) {
      data.status=-1;
    }else if (duration<5) {
      data.status=0;
    }else {
      data.status=1;
    }
    datas[i]=data;
  }
  return datas;
}

export default {
  components: {
    Loading,XButton
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data() {
    return {
      libraryNow: {},
      loading: "获取中，请稍候",
      loadingShow: false,
    }
  },
  methods: {
    //更新当前
    update:function (show=false) {
      let _this = this;
      if(show) this.loadingShow=true;
      common.post("/library/now",null,function (e,r) {
        if (show) {
          if (e!=null) {
            _this.$vux.toast.show({
              type: "warn",
              text: e
            });
            return;
          }
          if(r.status==1){
            _this.$vux.toast.show({
              type: "success",
              text: r.msg
            });
          }
        }
        common.storage.set("library_now",r.data);
        _this.init();
        _this.loadingShow=false;
      });
    },
    //初始化
    init:function () {
      let _this = this;
      init.libraryNow(function (e,r){
        if (e!=null) {
          _this.$vux.toast.show({
            type: "warn",
            text: e
          });
          return;
        }
        _this.libraryNow=checkLibrary(r);
      });
    },
    //续借单本
    loanOne: function(id) {
      let data={
        review_id:id
      };
      let _this = this;
      this.loadingShow=true;
      common.post("/library/loan/one",data,function (e,r) {
        _this.loadingShow=false;
        if (e!=null) {
          _this.$vux.toast.show({
            type: "warn",
            text: e
          });
          return;
        }
        if(r.status==1){
          _this.$vux.toast.show({
            type: "success",
            text: r.msg
          });
          _this.update();
        }
      });

    },
     //续借全部
    loanAll: function() {
      let _this = this;
      this.loadingShow=true;
      common.post("/library/loan/all",null,function (e,r) {
        _this.loadingShow=false;
        if (e!=null) {
          _this.$vux.toast.show({
            type: "warn",
            text: e
          });
          return;
        }
        if(r.status==1){
          _this.$vux.toast.show({
            type: "success",
            text: r.msg
          });
          _this.update();
        }
      });
    }
  },
  ready() {
    this.update_title("当前借阅");
    this.init();
  }
}
</script>
<style lang="less">
#library {
    background: #fefefe;
    padding: 10px;
}

#library {
    table {
        width: 95%;
        margin: 20px auto !important;
        padding: 0;
        border-collapse: collapse;
        border-spacing: 0;
        margin: 0 auto;
        font-size: 14px;
        color: #333244;
    }
    table,tr,td,th{
       border: 1px solid #ddd;
    }
    table td{
      min-width:40px;
    }
    table caption,
    table tr {
        padding: 5px;
    }
    table td,
    table th {
        padding: 5px 8px;
        text-align: center;
    }
    table th {
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 1px;
    }
    tbody tr:nth-child(even) {
        background: #fbf9fe;
    }
    table caption {
        background: #495c70;
        color: #fff;
        border-bottom: none;
        font-size: 16px;
    }
    table .title {
        border: 1px solid #ddd;
    }
    tr:hover{
      background:#efefef;
    }

    
    @media (max-width:500px) {
      table th{
        font-size:13px;
      }
      table td{
        font-size:12px;
      }
      .weui_btn.weui_btn_mini {
          line-height: 1.5;
          font-size:12px;
          padding: 0 .5em;
          display: inline-block;
      }
    }
}
</style>
