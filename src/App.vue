<template>
  <div>
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
    login(){
      chelunJSBridge.invoke('app', 'login', {
        loginCallBackName: res=>{
          console.log('res...', res);
        }
      });
    }
  },
  computed: {

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

