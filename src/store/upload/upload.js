import pic_1 from '@/assets/id-a.png';
import pic_2 from '@/assets/id-b.png';
import pic_3 from '@/assets/licence-a.png';
import pic_4 from '@/assets/licence-b.png';
import pic_5 from '@/assets/photo.png';
const state = {
    uploadList:[{
        src:"",
        pic:pic_1,
        desc: '身份证正面'
    },{
        src:"",
        pic:pic_2,
        desc: '身份证反面'
    },{
        src:"",
        pic:pic_3,
        desc: '驾驶证正页'
    },{
        src:"",
        pic:pic_4,
        desc: '驾驶证反页'
    },{
        src:"",
        pic:pic_5,
        desc: '白底半身照'
    }]
}
export default {
    namespaced: true,
    state
}