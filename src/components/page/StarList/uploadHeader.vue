<template>
    <div class="uploadHeader-area">
        <div class="card-area">
            <div class="row-text">头像</div>
            <!-- <div  class="tips">
                    添加明星时可不上传，可等该明星开屏资源快要满足时上传


                </div> -->
            <Button type="primary" @click="uploadImg">上传头像</Button>
            <!-- <div class="card-header">
                    <img :src="imgHeader" />
                </div> -->
        </div>

        <Modal v-model="modalCarousel" title="上传头像" width="600" footer-hide>
            <div>
                <div class="tips">图片格式必须为：png,bmp,jpeg,jpg,gif；不可大于2M</div>
                <div class="crop-demo-btn">
                    <Button type="primary" style="margin-top: 20px">上传文件</Button>
                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" :value="upload_input" />
                </div>

                <div class="crop-demo">
                 
                    <!-- <img :src="home1Colone" class="pre-img" /> -->
                    <div class="card-area" v-if="home1Colone">
                        <div class="card-content">
                            <div class="card">
                                <div class="text">头像预览</div>
                                <viewer :images="[home1Colone]">
                                    <div style="display: inline-block; margin: 0 auto">
                                        <div class="preview-headers">
                                            <img :src="home1Colone" style="width: 100px; height: 100px; border-radius: 50px" />
                                        </div>
                                    </div>
                                </viewer>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 20px" slot="footer">
                    <Button type="primary" @click="confirm">提交</Button>
                </div>
            </div>
        </Modal>

        <el-dialog title="裁剪头像" :visible.sync="dialogVisible" width="30%"> 
            <!-- {{ imgSrc }} -->
            <VueCropper
                style="width: auto; height: 300px"
                ref="cropper"
                :img="imgSrc"
                :cropmove="cropImage"
                :zoom="cropImage"
                :ready="cropImage"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox="option.centerBox"
                :infoTrue="option.infoTrue"
                :fixedBox="option.fixedBox"
            ></VueCropper>
            <!-- 
            <div style="display: inline-block; margin: 0 auto">
                <div class="preview-headers">
                    <div>预览</div>
                    <img :src="home1Colone" style="width: 100px; height: 100px; border-radius: 50px" />
                </div>
            </div> -->

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCrop">取 消</el-button>
                <el-button type="primary" @click="clickDiolog">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 
        <el-dialog :visible.sync="dialogVisible" width="30%" append-to-body :close-on-click-modal="false" :show-close="false">
            <vue-cropper
                ref="cropper"
                class="cropper"
               
                  :cropmove="cropImage"
                :zoom="cropImage"
                :ready="cropImage"

                :auto-crop="true"
                :fixed-box="true"
                enlarge="2"
                :output-size="option.size"
                :output-type="option.outputType"
                :center-box="option.centerBox"
                :fixed-number="[25, 14]"
            />
          <div style="display: inline-block; margin: 0 auto">
                <div class="preview-headers">
                    <div>预览</div>
                    <img :src="home1Colone" style="width: 100px; height: 100px; border-radius: 50px" />
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCrop">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
    name: 'upload',
    components: {
        VueCropper
    },
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
        }

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
            upload_input:"",
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 200, // 默认生成截图框宽度
                autoCropHeight: 200, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [5, 5], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            flieData: null, //上传的文件数据
            modalCarousel: false,
            home1Colone: this.homeImg,

            defaultSrc: require('../../../assets/img/icon_add.png'),
            fileList: [],
            imgSrc: '',

            dialogVisible: false
        };
    },

    methods: {
        uploadImg() {
            this.modalCarousel = true;
        },
        confirm() {
            this.okUpload();
        },
        clickDiolog() {
            this.$refs.cropper.getCropData((data) => {
                //   console.log(data)
                // this.imgSrc = data;
                this.home1Colone = data;
            });
            this.dialogVisible = false;
        },
        // 截取图片上传图片，拿到图片url
        okUpload() {
            if (!this.flieData) {
                this.$Message.error('请先上传图片');
                return false;
            }

            this.axios
                .post(`/common/uploadBase64`, {
                    baseStr: this.home1Colone
                })
                .then((res) => {
                    this.home1Colone = res.data;

                    this.$emit('updateCarouselImg', this.home1Colone);
                    this.modalCarousel = false;
                })
                .catch((err) => {
                    this.$Message.error(err);
                });
        },
        setImage(e) {
            this.upload_input = ""
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
            // this.home1Colone = "";
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
        // this.home1Colone = this.home1Colone ? this.home1Colone : this.defaultSrc;
    }
};
</script>

<style lang="less" scoped>
/deep/ .cropper-view-box {
    border-radius: 50%;
}
/deep/ .cropper-face {
    background: none;
}
/deep/ .cropper-view-box {
    outline: none;
}

.card-area {
    display: inline-block;

    .card-content {
        display: flex;
        justify-content: left;
        align-items: center;
        .card {
            
            padding: 20px;
            .img {
                width: 150px;
            max-height: 150px;
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
// .preview-headers {
//     // display: flex;
//     // justify-content: center;
//     // align-items: center;
// }
.el-dialog__body {
    text-align: center;
}
// .cropper-view-box,.cropper-crop-box{
//     width:200px!important;
//     height: 200px!important;
//     border-radius: 100px;
// }
/deep/ .vue-cropper{
    background-image:none;
}
/deep/ .cropper-modal{
   background: rgba(255, 255, 255, .5);
}
</style>
