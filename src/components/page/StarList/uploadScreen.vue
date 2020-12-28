<template>
    <div>
          <div class="card-area">
                <div class="row-text">小程序开屏图(选填)</div>
                <div  class="tips">
                    添加明星时可不上传，可等该明星开屏资源快要满足时上传


                </div>
                <Button type="primary" @click="uploadImg">上传开屏图</Button>
                <!-- <div class="card-header">
                    <img :src="imgHeader" />
                </div> -->
            </div>
  
        <Modal v-model="modalCarousel" title="上传开屏图" width="600" footer-hide>
            <div>
                <div class="tips">图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于2M</div>
                <div class="crop-demo-btn">
                    <Button type="primary" style="margin-top:20px;">上传文件</Button>
                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
                </div>

                <div class="crop-demo" >
                    <img :src="home1Colone" class="pre-img" />
                    <div class="card-area" >
                    <div class="card-content">
                        <div class="card">
                            <div class="text">开屏图预览</div>
                              <viewer :images="[home1Colone]">
                            <img :src="home1Colone" class="img" />
                              </viewer>
                        </div>
                     
                    </div>
                </div>
                </div>
                
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
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <template> </template>
                <div style="text-align: center;margin-top:20px" slot="footer">
                    <Button type="primary" @click="confirm">提交</Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
export default {
    name: 'upload',
    props: {
        homeImg: {
            type: String,
            default: ''
        }
    },
    watch: {
        modalBannaer: {
            handler(newval, oldval) {
                this.modalCarousel = newval;
            },
            immediate: true
        },
        homeImg: {
            handler(newval, oldval) {
                this.home1Colone = newval;
            },
            immediate: true
        },

        // imgSrc: {
        //     handler(newval, oldval) {
        //          this.$emit("upImageUrl1", [newval,this.flieData])
        //     },
        //         immediate: true
        // },
        // modalCarousel(newval, oldval) {
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
            flieData: null, //上传的文件数据
            modalCarousel: false,
            home1Colone: this.homeImg,

            defaultSrc: require('../../../assets/img/icon_add.png'),
            fileList: [],
            imgSrc: '',

            dialogVisible: false
        };
    },
    components: {
        VueCropper
    },
    methods: {
        uploadImg() {
            this.modalCarousel = true;
        },
        confirm() {
            this.okUpload();
        },
        // 截取图片上传图片，拿到图片url
        okUpload() {
            if(!this.flieData){
               this.$Message.error('请先上传图片');
               return false
            }
            // const formData = new FormData();
            // formData.append('file', this.flieData); //todo 接口类型错误，应该是file不是string
            this.axios
                .post(`/common/uploadBase64`, { baseStr: this.home1Colone})
                .then(res => {
                    this.home1Colone = res.data;
                    
                    this.$emit("updateCarouselImg", this.home1Colone)
                    this.modalCarousel = false
                })
                .catch(err => {
                     this.$Message.error(err);
                });
        },
        setImage(e) {
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = event => {
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

<style lang="less" scoped>
.card-area {
    display:inline-block;
    
    .card-content {
        display: flex;
        justify-content: left;
        align-items: center;
        .card {
            width: 150px;
            height: 150px;
            padding: 20px;
            .img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

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
