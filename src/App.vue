<template>
  <div>
    <!-- <button @click="login">登陆</button> -->
    <div class="title">
      <div class="active">定单提交</div>
      <div>填写收货地址</div>
      <div>正在办理</div>
      <div>办理完成</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
// import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
const JSBridge = require('./utils/JSBridge');
export default {
   name: 'app',
    data () {
      return {
      }
  },
  mounted () {

  },
  methods : {
    // ...mapMutations({
    //   changeNum:'indexStore/changeNum'
    // }),
    // ...mapActions({
    //   changeNumAsync:'indexStore/changeNumAsync'
    // }),
    // changeNum(type){
    //   // this.$store.commit({
    //   //   type:"indexStore/changeNum",
    //   //   payload:type
    //   // })
    //   this.changeNumAsync(type).then(res => {
    //     console.log('你可算完成了');
    //   })
    // }
    login(){
      chelunJSBridge.invoke('app', 'login', {
        loginCallBackName: res=>{
          console.log('res...', res);
        }
      });
    }
  },
  computed: {
    // ...mapState({
    //   num:state=>state.indexStore.num
    // }),
    // ...mapGetters({
    //   formatNum:'indexStore/formatNum'
    // })
  }
}
</script>
<style lang="scss">
  @import './common/css/common.scss';
  body{
    background: #eee;
  }
  .title{
    width:100%;
    height:px2rem(40px);
    display: flex;
    align-items: stretch;
    overflow: hidden;
    >div{
      flex: 1;
      text-align: center;
      color: #3aaffd;
      background-color: #fff;
      flex-basis: auto;
      position: relative;
      font-size: px2rem(16px);
      line-height: px2rem(40px);
      &::after{
        content:"";
        display: block;
        position: absolute;
        border-top: px2rem(20px) solid #fff;
        border-bottom:  px2rem(20px) solid #fff;
        border-left:  px2rem(8px) solid #fff;
        top: 0;
        right: -.15rem;
        z-index: 1;
      }
      &.active{
        color: #fff;
        background-color: #3aaffd;
        &::after{
        content:"";
        display: block;
        position: absolute;
        border-top: px2rem(20px) solid #fff;
        border-bottom:  px2rem(20px) solid #fff;
        border-left:  px2rem(8px) solid #3aaffd;
        top: 0;
        right: -.15rem;
        z-index: 1;
      }
      }
    }
  }
  
</style>

