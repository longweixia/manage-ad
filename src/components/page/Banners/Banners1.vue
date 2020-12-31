<template>
    <Modal v-model="modalBannaerInit" title="上传" width="600" footer-hide>
        <div>
            <div class="row-text">上传轮播图</div>
            <div class="tips">图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于2M</div>
            <div class="crop-demo-btn">
                <Button>上传文件</Button>
                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
            </div>
       
            <div class="crop-demo">
                <img :src="home1Colone" class="pre-img" />
            </div>

            <!-- 上传二级页面 -->
            <div class="row-text">上传二级页面</div>
            <div class="tips">图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于7M M</div>
            <div class="crop-demo-btn">
                <Button>上传文件 </Button>
                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
            </div>
            {{ level1Colone }}
            <div class="crop-demo">
                <img :src="level1Colone" class="pre-img" />
            </div>
            <!--  -->

            <el-dialog title="上传文件" :visible.sync="dialogVisible" width="30%">
                <vue-cropper
                    ref="cropper"
                    :src="imgSrc"
                    :ready="cropImage"
                    :zoom="cropImage"
                    :cropmove="cropImage"
                    style="width: 100%; height: 300px"
                ></vue-cropper>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelCrop">取 消</el-button>
                    <el-button type="primary" @click="okUpload">确 定</el-button>
                </span>
            </el-dialog>
            <template> </template>
            <div style="text-align: center" slot="footer">
                <Button type="primary" @click="confirm">提交</Button>
            </div>
            {{bannerObj}}
        </div>
    </Modal>
</template>

<script>
import VueCropper from 'vue-cropperjs';
export default {
    name: 'upload',
    props: {
        modalBannaer: {
            type: Boolean,
            default: false
        },
        home1: {
            type: String,
            default: ''
        },
        level1: {
            type: String,
            default: ''
        },
        bannerData: {
            type: Object,
            default: {}
        }
    },
    watch: {
        
       
        modalBannaer: {
            handler(newval, oldval) {
                this.modalBannaerInit = newval;
            },
            immediate: true
        },
        bannerData: {
            handler(newval, oldval) {
                this.bannerObj = newval;
            },
            immediate: true
        },
        home1: {
            handler(newval, oldval) {
                this.home1Colone = newval;
            },
            immediate: true
        },
        level1: {
            handler(newval, oldval) {
                this.level1Colone = newval;
            },
            immediate: true
        }
        // imgSrc: {
        //     handler(newval, oldval) {
        //          this.$emit("upImageUrl1", [newval,this.flieData])
        //     },
        //         immediate: true
        // },
        // modalBannaerInit(newval, oldval) {
        //     this.$emit('closeBanner1', newval);

        //     // if(this.fileFormat){
        //     //     this.$emit("upImageUrl", [val,this.flieData])
        //     // }else{
        //     //     this.$emit("upImageUrl", val)
        //     // }
        // }
    },
    data() {
        return {
             bannerObj: this.bannerData, //轮播对象
            flieData: null, //上传的文件数据
            modalBannaerInit: this.modalBannaerInit,
            home1Colone: this.home1,
            level1Colone: this.level1,
            defaultSrc: require('../../../assets/img/img.jpg'),
            fileList: [],
            imgSrc: '',

            dialogVisible: false
        };
    },
    components: {
        VueCropper
    },
    methods: {
        confirm() {
            // let params = {
            //     "home1": this.home1Colone,
            //     "id": 0,
            //     "level1": this.level1Colone,
            //     "open": 1
            // }
            this.bannerObj.home1 = this.home1Colone
            // console.log(this.bannerObj.id,22)
            // this.bannerObj.id = BigInt(this.bannerObj.id)
          
            
        

            this.axios
                .post(`/carousel/addOrUpdateCarousel`,this.bannerObj)
                .then((res) => {
                       this.$emit('closeBanner1', false);
                       this.$Message.success('上传成功');
                })
                .catch((err) => {
                    this.$Message.error(err);
                });

         
        },
        okUpload() {
            const formData = new FormData();
            formData.append('file', this.flieData); //todo 接口类型错误，应该是file不是string
            this.axios
                .post(`/common/upload`, formData)
                .then((res) => {
                    this.home1Colone = res.data;
                    this.dialogVisible = false;
                })
                .catch((err) => {
                    console.log('err', err);
                });
        },
        setImage(e) {
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
            this.flieData = file;
            // 组装参数
        },

        cropImage() {
            this.home1Colone = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        cancelCrop() {
            this.dialogVisible = false;
            this.home1Colone = this.defaultSrc;
        },
        imageuploaded(res) {
            console.log(res);
        },
        handleError() {
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
            });
        }
    },
    mounted() {
        this.home1Colone = this.home1Colone ? this.home1Colone : this.defaultSrc;
    }
};
</script>

<style scoped>
.content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo {
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    /* padding: 0 20px; */
    /* margin-left: 30px; */
    /* background-color: #409eff; */
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
.tips {
    color: #a7a7a7;
}
.row-text {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
}
</style>