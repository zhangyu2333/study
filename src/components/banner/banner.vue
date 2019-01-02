<template>
    <mt-swipe :auto="30000">
        <mt-swipe-item>
            <img src="http://localhost:8081/src/assets/banner@3x.png" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
            <img src="http://localhost:8081/src/assets/banner@3x.png" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
            <img src="http://localhost:8081/src/assets/banner@3x.png" alt="">
        </mt-swipe-item>
    </mt-swipe>
</template>
<script>
import Vue from 'vue';
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {

}
</script>
<style lang="scss" scoped>
    img{
        width: 100%;
        height:auto;
    }
</style>
