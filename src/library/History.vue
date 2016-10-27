<template>
<div id="library">
    <table class="table table-resposive table-bordered">
      <caption> <b>当前图书借阅信息</b>
      </caption>
      <thead>
        <tr class="title">
          <th>书名</th>
          <th>作者</th>
          <th>借阅时间</th>
          <th>归还时间</th>
        </tr>
        <tbody>
          <tr v-for="data in libraryHistory">
            <td>{{data.title}}</td>
            <td>{{data.author}}</td>
            <td>{{ data.start_day }}</td>
            <td>
              {{ data.end_day }}
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
import {
  update_title
} from '../vuex/actions'


export default {
  components: {
    Loading
  },
  vuex: {
    actions: {
      update_title
    }
  },
  data() {
    return {
      libraryHistory: {},
      loading: "获取中，请稍候",
      loadingShow: false,
    }
  },
  methods: {
    //更新当前
    update:function (show=false) {
      let _this = this;
      if(show) this.loadingShow=true;
      common.post("/library/history",null,function (e,r) {
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
        common.storage.set("library_history",r.data);
        _this.init();
        _this.loadingShow=false;
      });
    },
    //初始化
    init:function () {
      let _this = this;
      init.libraryHistory(function (e,r){
        if (e!=null) {
          _this.$vux.toast.show({
            type: "warn",
            text: e
          });
          return;
        }
        console.log(r.length);
        _this.libraryHistory=r;
      },true);
    },
  },
  ready() {
    this.update_title("历史借阅");
    this.init();
  }
}
</script>
<style lang="less">

</style>
