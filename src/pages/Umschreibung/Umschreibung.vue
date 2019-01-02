<template>
    <div>
        <div class="banner">
            <Banner></Banner>
        </div>
        <div class="upload">
            <ul>
                <li v-for="(item,index) in upload" :key="index">
                    <div @click="show_Eg(index)">
                        <img :src="addImg" alt="">
                    </div>
                    <span>{{item.desc}}</span>
                </li>
                <div v-show="showMark" class="mark">
                    <img :src="current.pic">
                    <div>
                        <button @click="uploads(1)">拍照</button>
                        <button @click="uploads(2)">相册</button>
                        <button @click="cancel">取消</button>
                    </div>
                </div>
            </ul>
        </div>
        <ul class="sel">
            <li @click="selectMold(0)">
                <p>服务类型</p>
                <span>换驾照></span>
            </li>
            <li @click="selectMold(1)">
                <p>
                    <span>当前驾照签发城市</span>

                </p>
                <p>请选择签发地</p>
            </li>
            <li @click="selectMold(2)">
                <span>可补换的签发城市</span>
                <span>请选择补换地</span>
            </li>
            <li>
                <p>服务费</p>
                <div>￥399</div>
            </li>
        </ul>
        <div class="discounts">
            <p>优惠</p>
            <p>></p>
        </div>
        <div class="more_discounts">
            <a href=""><u>常见问题</u></a>
        </div>
        <footer>
            <div>
                <span>
                    实付:
                </span>
                399
            </div>
            <p>立即支付</p>
        </footer>
        <mt-popup
            v-model="popupVisible"
            position="bottom"
        >
            <mt-picker :slots="slots[selectIndex]" @change="onValuesChange"></mt-picker>
        </mt-popup>
        
    </div>
    
</template>
<script>
import Vue from 'vue';
import add from '@/assets/add.png';
import { mapState } from 'vuex';
import Banner from '../../components/banner/banner';
import { Picker,Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
export default {
    data () {
        return {
            popupVisible:false,
            selectIndex:0,
            showMark:false,
            current:{},
            slots: [[
                {
                    flex: 1,
                    values: ['换驾照', '补驾照'],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],[
                {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot1',
                    textAlign: 'right'
                }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                }, {
                    flex: 1,
                    values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                    className: 'slot3',
                    textAlign: 'left'
                }
            ],],
        }
    },
    components: {
        Banner
    },
    computed: {
        addImg(){
            return add
        },
        ...mapState({
            upload:state=>state.upload.uploadList
        })
    },
    methods: {
        selectMold(index){
            this.selectIndex = index;
            this.popupVisible = true;
        },
        show_Eg(index){
            this.current = this.upload[index];
            this.showMark = true;
        },
        uploads(){

        },
        cancel(){
            this.showMark = false;
        },
        onValuesChange(){

        }
    },
}
</script>
<style lang="scss" scoped>
    $baseline-px:37.5px;
    @function px2rem ($px-values) {
        $baseline-rem: $baseline-px / 1rem * 1;
        $px-values: $px-values / $baseline-rem;
        @return $px-values;
    }
    .banner{
        width: 100%;
        height:3rem;
    }
    .upload{
        width: 100%;
        height:px2rem(100px);
        background: #fff;
        margin-top:px2rem(10px);
        >ul{
            width: 100%;
            height:100%;
            display: flex;
            justify-content: space-around;
            padding:px2rem(10px) 0;
            li{
                width: 16%;
                height:px2rem(80px);
                >div{
                    width: 100%;
                    height: px2rem(50px);
                    border:1px solid rgba(153, 153, 153, 0.692);
                    padding:px2rem(5px) px2rem(10px);
                    border-radius: px2rem(10px);
                    img{
                        width: 100%;
                        height:auto;
                    }
                }
            }
            .mark{
                position: absolute;
                top:0;
                left:0;
                width: 100%;
                height:100%;
                z-index: 200;
                text-align: center;
                img{
                    width: 80%;
                    height:auto;
                    transform: translateY(50px);
                    &.active{
                        transform: translateY(-110%);
                    }
                }
                >div{
                    display: flex;
                    flex-direction: column;
                    button{
                        width: 100%;
                        height:px2rem(30px)；
                    }
                }
            }
        }
    }
    .sel{
        width: 100%;
        padding-left:px2rem(10px);
        background: #fff;
        margin-top: px2rem(15px);
        li{
            width: 100%;
            height:px2rem(40px);
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            justify-content: space-between;
            padding-right:px2rem(10px);
            font-size: px2rem(16px);
            line-height: px2rem(40px);
            >div{
                color:red
            }
        }
    }
    .discounts{
        background: #fff;
        padding:0 px2rem(10px);
        width: 100%;
        display: flex;
        justify-content: space-between;
        height:px2rem(40px);
        font-size: px2rem(16px);
        line-height: px2rem(40px);
        margin-top: px2rem(20px);
    }
    .more_discounts{
        width: 100%;
        text-align: center;
        a{
            font-size: px2rem(14px);
            line-height: px2rem(50px);
            color:#3aaffd;
        }
    }
    footer{
        width: 100%;
        position: absolute;
        bottom:0;
        left:0;
        height:px2rem(50px);
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding-left:px2rem(20px);
        line-height: px2rem(50px);
        font-size: px2rem(16px);
        >div{
            color:red;
            span{
                color:#222;
            }
        }
        >p{
            width: px2rem(100px);
            height:100%;
            background: #999;
            color:#fff;
            text-align: center;
            &.active{
                background: #3aaffd;
            }
        }
    }
    .mint-popup-bottom{
        width: 100%;
    }
</style>
