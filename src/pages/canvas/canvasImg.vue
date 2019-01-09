<template>
    <div>
        <!-- <input type="file" name="" id="" @change="fileLoad"> -->
        <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import Bg from '@/assets/bg.jpg';
import { canvasImg } from '@/api/index'
export default {
    data() {
        return {
            src:'',
        }
    },
    mounted () {
        this.changeActiveIndex({
            index:this.$route.query.id
        })
        this.init()
    },
    computed: {
        canvas(){
            return this.$refs.canvas;
        },
        context(){
            return this.$refs.canvas.getContext('2d');
        }
    },
    methods: {
        ...mapMutations({
            changeActiveIndex:'indexStore/changeActiveIndex'
        }),
        async init(){
            // let reader = new FileReader()
            // reader.readAsDataURL(e.target.files[0]);
            // reader.onload = ()=> {
            //     this.src = reader.result;
            //     var img = new Image();
            //     img.src=reader.result;
            //     img.onload = async ()=>{
            //         var canvas = document.getElementById('canvas');
            //         var context = canvas.getContext('2d');
            //         canvas.width = img.width;
            //         canvas.height = img.height;
            //         context.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width/6, img.height/4)
            //     }
                //http://img.hb.aicdn.com/ecf0e9b44c91393b7d49bc1a8ff639b805f9df024f9ac-iQieFK_fw658
            //     var img2 = new Image();
            //     img2.src = 'http://img.hb.aicdn.com/ecf0e9b44c91393b7d49bc1a8ff639b805f9df024f9ac-iQieFK_fw658';
            //     img2.onload = async() => {            
            //     }
            // }
            let {canvas,context} = this;
            let img = await this.loadImage(Bg);
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0,0,img.width,img.height, 0,0,img.width,img.height);
            const res = await canvasImg()
            let avatar = await this.loadImage(res);
            context.drawImage(avatar, 0, 0, avatar.width, avatar.height, 97, 747, 86, 86);
            context.font = '26px 微软雅黑';
            context.fillStyle = '#265f18';
            let text = context.measureText("张宇");
            context.fillText('张宇', 140-text.width/2, 860);
            context.save();
        },
        loadImage(src){
        return new Promise((resolve, reject)=>{
            let img = new Image();
            img.src = src;
            img.onload = ()=>{
                resolve(img);
            }
            img.onerrpr = ()=>{
                reject();
            }
        })
        }
    },

}
</script>
<style lang="scss">
    canvas{
    width: 100%;
  }
</style>